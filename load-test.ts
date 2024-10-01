import http from 'k6/http';
import { check } from 'k6';
import "dotenv/config";

export let options = {
  vus: 10,
  duration: '30s',
};

const WALLET_ADDRESS = process.env.WALLET_ADDRESS;
const API_KEY = process.env.API_KEY;


export default function () {
  const url = `https://deep-index.moralis.io/api/v2/nft/${WALLET_ADDRESS}`;
  const params = {
    headers: {
      'X-API-Key': `${API_KEY}`,
    },
  };

  let res = http.get(url, params);
  check(res, {
    'status is 200': (r) => r.status === 200,
  });
}
