import dotenv from 'dotenv';
import { VerifiableCredential, PresentationExchange } from '@web5/credentials';
import pfiList from '../utils/pfiList';
import mockOfferings from '../utils/mockOfferings';

dotenv.config();
async function getTbdexHttpClient() {
  // eslint-disable-next-line no-eval
  const module = await eval('import("@tbdex/http-client")');
  return module.TbdexHttpClient;
}

export default class TbdDexController {
  static async getOfferings(req, res) {
    const { payin, payout } = req.query;
    if (!payin || !payout) {
      return res.status(401).json({ error: 'Currency Required' });
    }

    const TbdexHttpClient = await getTbdexHttpClient();
    let offerings = {};

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
      offerings = mockOfferings;
    }

    // Incase you are getting a 'Failed to get offerings from did:dht:...'
    // or 'InvalidDidError: Failed to resolve DID: did:dht:...', i have
    // provided a mock offering containing all the offerings offered by the mock PFI's,
    // the error is a mobile newtork issue, for me though. Uncomment the line below

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
}
