import "dotenv/config";
import { defineWalletSetup } from "@synthetixio/synpress";
import { MetaMask } from "@synthetixio/synpress/playwright";

const SEED_PHRASE = process.env.SEED_PHRASE;
const WALLET_PASSWORD = process.env.WALLET_PASSWORD;

export default defineWalletSetup(
  WALLET_PASSWORD,
  async (context, walletPage) => {
    const metamask = new MetaMask(context, walletPage, WALLET_PASSWORD);
    await metamask.importWallet(SEED_PHRASE);
  },
);
