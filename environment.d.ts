declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SEED_PHRASE: string;
      WALLET_PASSWORD: string;
      DAPP_URL: string;
      URL_UNDER_TEST: string;
      WALLET_ADDRESS:string
      API_KEY:string
    }
  }
}

export {};
