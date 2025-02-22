/* eslint-disable no-await-in-loop */
import getTbdexHttpClient from './tbdexClient';

let quote;
let close;
let exchange;
let attempts = 0;
const maxAttempts = 20;

export default async function PollPfi(pfiDid, customerDid, exchangeId, delay = 2000) {
  const {
    TbdexHttpClient, Close, Quote,
  } = await getTbdexHttpClient();

  while (!quote && attempts < maxAttempts) {
    try {
      exchange = await TbdexHttpClient.getExchange({
        pfiDid,
        did: customerDid,
        exchangeId,
      });

      quote = exchange.find((msg) => msg instanceof Quote);

      if (!quote) {
        close = exchange.find((msg) => msg instanceof Close);
        console.log(close);

        if (close) { break; } else {
          await new Promise((resolve) => setTimeout(resolve, delay));
        }
      } else {
        return { quote };
      }
    } catch (error) {
      if (error.statusCode === 404 || error.statusCode === 401) {
        console.error('Currently Polling Server, Please Make Sure Requried Informations Are Accurate: ', error);
      } else throw new Error('Exchange Could not be resolved ->>: ', error);
    }
    attempts += 1;
  }

  return null;
}
