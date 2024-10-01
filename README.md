# Intro

This repository contains automated test scripts for verifying the creation and management of blockchain nodes using Moralis, integrating both UI and API testing. The tests cover key features like node creation, transaction validation, and fetching wallet NFTs, utilizing Playwright and Synpress for seamless automation.

# Enviorment Step and Pre requisites

Please follow the guide to setup the [EnviormentSetup.md](EnviormentSetup.md)

# 🧑‍💻 Usage

1. Install dependencies with pnpm version 9.7.1

```bash
nvm use
```

```bash
pnpm install
```

2. Start MetaMask Test Dapp in a seprate Terminal [If runing locally]:

```bash
pnpm run serve:test-dapp
```

3. Install Playwright: [If not already installed]

```bash
pnpm exec playwright install
```

4. Either export the variables to your local ~/.zshrc or locally add it to the .env file:

```bash
export SEED_PHRASE=<Your seed phrase>
```

```bash
export WALLET_PASSWORD=<Your wallet password>
```

5. Build cache with our CLI by using a script:

```bash
# You can either build cache in a headed mode:
pnpm run build:cache

# Or in a headless mode:
pnpm run build:cache:headless
```

6. Run Playwright tests as you would normally do:

```bash
# Use one of our scripts:
pnpm run test:playwright:headful
pnpm run test:playwright:headless

### ⚠️ Important note ⚠️

Currently, tests are triggered in a headed mode by default. Add `HEADLESS=true` to run them in a headless mode.
```
# 🧑‍💻 Running load test

1. Install K6.
2. Either export the variables to your local ~/.zshrc or locally add it to the .env file:

```bash
export API_KEY=<Your moralis API key>
```

```bash
export WALLET_ADDRESS=<Wallet address needs to be tested>
```
3. To run the script use below command
```bash
npx k6 run script.ts
```