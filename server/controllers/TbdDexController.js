/* eslint-disable no-await-in-loop */
import dotenv from 'dotenv';
import { VerifiableCredential, PresentationExchange } from '@web5/credentials';
import { DidDht } from '@web5/dids';
import pfiList from '../utils/pfiList';
import mockOfferings from '../utils/mockOfferings';
import pool from '../utils/db';
import PollPfi from '../utils/pfiPoll';
import getTbdexHttpClient from '../utils/tbdexClient';

dotenv.config();

export default class TbdDexController {
  static async getOfferings(req, res) {
    const { payin, payout } = req.query;
    if (!payin || !payout) {
      return res.status(401).json({ error: 'Currency Required' });
    }

    const { TbdexHttpClient } = await getTbdexHttpClient();
    const offerings = {};

    // Incase you are getting a 'Failed to get offerings from did:dht:...'
    // or 'InvalidDidError: Failed to resolve DID: did:dht:...', i have
    // provided a mock offering containing all the offerings offered by the mock PFI's,
    // the error is a mobile newtork issue, for me though. The try block handles that,
    // THIS SHOULD BE REMOVED ON PRODUCTION

    try {
      await Promise.all(
        Object.entries(pfiList).map(async ([Key, value]) => {
          const offering = await TbdexHttpClient.getOfferings({ pfiDid: value });
          offerings[`${Key}`] = offering;
        }),
      );
    } catch (err) {
      console.error(err);
      // offerings = mockOfferings;
    }

    if (offerings) {
      const selectedOffering = {};
      for (const pfi of Object.keys(offerings)) {
        for (const offering of offerings[pfi]) {
          if (offering.data.payin.currencyCode === payin
            && offering.data.payout.currencyCode === payout) {
            selectedOffering[pfi] = offering;
          }
        }
      }

      let offeringFormat = {};
      const availableOffering = [];

      if (selectedOffering) {
        for (const offers of Object.keys(selectedOffering)) {
          const payinRequired = {};
          for (const method of selectedOffering[offers].data.payin.methods) {
            payinRequired[method.kind] = method.requiredPaymentDetails.required;
          }
          const payoutRequired = {};
          for (const method of selectedOffering[offers].data.payout.methods) {
            payoutRequired[method.kind] = method.requiredPaymentDetails.required;
          }
          offeringFormat = {
            pfi_name: offers,
            offering_id: selectedOffering[offers].metadata.id,
            pfi_did: selectedOffering[offers].metadata.from,
            pfi_rate: `1 ${payin} Per ${selectedOffering[offers].data.payoutUnitsPerPayinUnit} ${payout}`,
            description: selectedOffering[offers].data.description,
            payin_requirements: payinRequired,
            payout_requirements: payoutRequired,
            required_credentials: selectedOffering[offers].data.requiredClaims.name ? selectedOffering[offers].data.requiredClaims.name : 'Name not specified by Pfi',
          };

          availableOffering.push(offeringFormat);
        }
        return res.status(200).json(availableOffering);
      }
    }

    return res.status(200).json(offerings);
  }

  static async credentials(req, res) {
    const { userId, signedVcJwt } = req.body;
    const result = await pool.query(`
        UPDATE accounts
        SET user_VC = CASE
          WHEN $1 = ANY(user_VC) THEN user_VC
          ELSE array_append(user_VC, $1)
        END
        WHERE user_id = $2;
      `, [signedVcJwt, userId]);

    if (result) {
      return res.status(201).json({ status: 'VC added' });
    }
    return res.status(401).json({ error: 'Unauthorized' });
  }

  static async sendRfq(req, res) {
    // Route building still in progress
    const {
      userId, OfferingId, PfiDid,
      payinAmount, requiredPayinDetails,
      requiredPayoutDetails,
    } = req.body;
    const {
      TbdexHttpClient, Rfq,
    } = await getTbdexHttpClient();
    const accInfo = await pool.query(`
      SELECT user_did, user_VC
      FROM accounts
      WHERE user_id = $1;
      `, [userId]);

    let offering;

    try {
      const pfiOfferings = await TbdexHttpClient.getOfferings({ pfiDid: PfiDid });
      offering = pfiOfferings.filter((offering) => offering.metadata.id === OfferingId);
    } catch (error) {
      console.error(error);
    }

    try {
      PresentationExchange.satisfiesPresentationDefinition({
        vcJwts: accInfo.rows[0].user_vc,
        presentationDefinition: offering[0].data.requiredClaims,
      });
      console.log('Matched results');
    } catch (error) {
      console.error('Claims verification failed', error);
      return res.status(403).json({ message: 'Your Credentials don\'t satisfy this pfi. Choose another' });
    }

    const selectedCredentials = PresentationExchange.selectCredentials({
      vcJwts: accInfo.rows[0].user_vc,
      presentationDefinition: offering[0].data.requiredClaims,
    });

    const payinDetails = {
      kind: offering[0].data.payin.methods[0].kind,
      amount: payinAmount,
      paymentDetails: requiredPayinDetails,
    };

    const payoutDetails = {
      kind: offering[0].data.payout.methods[0].kind,
      paymentDetails: requiredPayoutDetails,
    };

    // eslint-disable-next-line no-undef
    const BPortableDid = atob(accInfo.rows[0].user_did);
    const portableDid = JSON.parse(BPortableDid);
    console.dir(portableDid, { depth: null, colors: true });
    const bearerDid = await DidDht.import({ portableDid });
    console.dir(bearerDid, { depth: null, colors: true });

    // if (portableDid) {
    //   return res.status(200).json(portableDid);
    // }

    const rfq = Rfq.create({
      metadata: {
        to: PfiDid,
        from: bearerDid.uri,
        protocol: '1.0',
      },
      data: {
        offeringId: OfferingId,
        payin: payinDetails,
        payout: payoutDetails,
        claims: selectedCredentials,
      },
    });

    console.log(rfq);

    try {
      rfq.verifyOfferingRequirements(offering[0]);
    } catch (e) {
      console.error('Offering Verification Failed ->>: ', e);
    }

    try {
      await rfq.sign(bearerDid);
      await TbdexHttpClient.createExchange(rfq);
    } catch (error) {
      console.error('Exchange Creation Failed ->>: ', error);
    }

    const { quote } = await PollPfi(rfq.metadata.to, bearerDid, rfq.exchangeId, 2000);
    if (quote) {
      return res.status(200).json(quote);
    }

    return res.status(401).json({ error: 'Please Try again!' });
  }

  static async closeExchange(req, res) {
    const {
      TbdexHttpClient, Close,
    } = await getTbdexHttpClient();
    const { portableDid, quote } = req.body;
    console.log(portableDid, '\n', quote);
    const customerDid = await DidDht.import({ portableDid });
    console.log(customerDid);

    const close = Close.create({
      metadata: {
        from: customerDid.uri,
        to: quote.metadata.from,
        exchangeId: quote.metadata.exchangeId,
        protocol: '1.0',
      },
      data: { reason: 'Canceled by customer' },
    });

    try {
      await close.sign(customerDid);
      await TbdexHttpClient.submitClose(close);
    } catch (error) {
      console.error('Order Couldn\'nt be closed: ', error);
      return res.json({ error: "order failed" })
    }

    return res.status(200).json({ message: 'Order Closed', close });
  }
}
