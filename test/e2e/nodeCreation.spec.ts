import "dotenv/config";
import { Page } from "@playwright/test";
import { testWithSynpress } from "@synthetixio/synpress";
import { MetaMask, metaMaskFixtures } from "@synthetixio/synpress/playwright";
import basicSetup from "../wallet-setup/basic.setup";
import { BasePage } from "../pageObjects/basePage";
import { LandingPage } from "../pageObjects/landingPage";
import { postRPCRequest } from "../utils/apis/sendRpcRequestApi";
import { getWalletNFTs } from "../utils/apis/getWalletNftsApi";
import {
  EthBlockNumberResponse,
  EthGetBlockByNumberResponse,
  EthTransactionResponse,
} from "../utils/interface/sendRPCRequest";

let nodeUrl: string;
let apiKeyText: string;
let ethBlockNumber: string | null = null;
let blockDetailsResponse: EthGetBlockByNumberResponse;
let transactionResponse: EthTransactionResponse;

const test = testWithSynpress(metaMaskFixtures(basicSetup));
test.beforeEach(async ({ page }: { page: Page }) => {
  let basePage = new BasePage(page);
  await basePage.openUrl(process.env.URL_UNDER_TEST);
});

test.afterEach(async ({ page }: { page: Page }) => {
  let landingPage = new LandingPage(page);
  await landingPage.selectNodeTab();
  await landingPage.selectRemoveNode();
  await landingPage.selectDeletButton();
  await landingPage.createNodeButtonVisible();
});

const { expect } = test;

test.describe("Node Creation", () => {
  test("Verify node creation and post RPC request and getwallet NFT response", async ({
    context,
    page,
    metamaskPage,
    extensionId,
    request,
  }) => {
    const metamask = new MetaMask(
      context,
      metamaskPage,
      basicSetup.walletPassword,
      extensionId,
    );
    let landingPage = new LandingPage(page);
    await landingPage.connectMetaMaskWallet(metamask);
    await landingPage.createNode("Ethereum", "Sepolia");
    nodeUrl = await landingPage.getNodeUrl();
    await expect(nodeUrl).toContain("sepolia");

    const blockNumberResponse: EthBlockNumberResponse = await postRPCRequest(
      request,
      nodeUrl,
      "eth_blockNumber",
    );
    ethBlockNumber = blockNumberResponse.result;
    expect(ethBlockNumber).toBeDefined();

    blockDetailsResponse = await postRPCRequest(
      request,
      nodeUrl,
      "eth_getBlockByNumber",
      [ethBlockNumber, true],
    );
    const resultHash = blockDetailsResponse.result?.transactions[0]?.hash;
    expect(blockDetailsResponse.result).toBeDefined();

    transactionResponse = await postRPCRequest(
      request,
      nodeUrl,
      "eth_getTransactionByHash",
      [resultHash],
    );
    expect(transactionResponse.result).toBeDefined();

    await landingPage.selectHomTab();
    apiKeyText = await landingPage.getAPIKey();

    const fromAddress = transactionResponse.result?.from ?? "";
    const responseBody = await getWalletNFTs(request, fromAddress, apiKeyText);
    expect(responseBody.result).toBeDefined();
  });
});
