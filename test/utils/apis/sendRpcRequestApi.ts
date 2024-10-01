import { APIRequestContext, APIResponse } from "@playwright/test";

let response: APIResponse;
export async function postRPCRequest(
  request: APIRequestContext,
  nodeUrl: string,
  method: string,
  params: any[] = [],
) {
  response = await request.post(`${nodeUrl}`, {
    data: {
      jsonrpc: "2.0",
      method: method,
      params: params,
      id: 1,
    },
  });
  return await response.json();
}
