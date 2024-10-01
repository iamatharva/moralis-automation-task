import { APIRequestContext, APIResponse } from "@playwright/test";

let response: APIResponse;
export async function getWalletNFTs(
  request: APIRequestContext,
  fromAdress: string,
  apiKey: string,
) {
  response = await request.get(
    `https://deep-index.moralis.io/api/v2/nft/${fromAdress}`,
    {
      headers: {
        "X-API-Key": apiKey,
      },
    },
  );
  return await response.json();
}
