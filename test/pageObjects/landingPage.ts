import { Locator, Page, test } from "@playwright/test";
import landingSelector from "../selectors/landing.selector";
import { MetaMask } from "@synthetixio/synpress/playwright";
import { retry } from "../utils/jsUtils";

export class LandingPage {
  readonly page: Page;
  readonly connectWalletButton: Locator;
  readonly nodeTabInLeftPane: Locator;
  readonly homeTabInLeftPane: Locator;
  readonly selectAccount: Locator;
  readonly createNodeButton: Locator;
  readonly selectProtocol: Locator;
  readonly selectNetwork: Locator;
  readonly createNodeWithSelection: Locator;
  readonly nodeCreationSuccesElement: Locator;
  readonly nodeUrlText: Locator;
  readonly apiKeyText: Locator;
  readonly removeNodeButton: Locator;
  readonly deleteButton: Locator;
  readonly inputEmail: Locator;
  readonly inputPassWord: Locator;
  readonly loginButton: Locator;
  readonly alertToasters: Locator;

  constructor(page: Page) {
    this.page = page;
    this.connectWalletButton = page.locator(
      landingSelector.connectWalletButton,
    );

    this.selectAccount = page.locator(
      landingSelector.connectionPopUp.selectAccount,
    );

    this.nodeTabInLeftPane = page.locator(landingSelector.nodeTabInLeftPane);

    this.homeTabInLeftPane = page.locator(landingSelector.homeTabInLeftPane);

    this.createNodeButton = page
      .locator(landingSelector.createNodeButton)
      .and(page.getByText("Create Node"));

    this.selectProtocol = page.locator(landingSelector.selectProtocol);

    this.selectNetwork = page.locator(landingSelector.selectNetwork);

    this.createNodeWithSelection = page.locator(
      landingSelector.createNodeWithSelection,
    );

    this.nodeCreationSuccesElement = page.locator(
      landingSelector.nodeCreationSuccesElement,
    );

    this.nodeUrlText = page.locator(landingSelector.nodeUrlText);

    this.apiKeyText = page.locator(landingSelector.apiKeyText);

    this.removeNodeButton = page.locator(landingSelector.removeNodeButton);

    this.deleteButton = page.locator(landingSelector.deleteButton);

    this.inputEmail = page.locator(landingSelector.inputEmail);

    this.inputPassWord = page.locator(landingSelector.inputPassWord);

    this.loginButton = page.locator(landingSelector.loginButton);

    this.alertToasters = page.locator(
      landingSelector.notificationToaster.alertToasters,
    );
  }

  async connectMetaMaskWallet(metamask: MetaMask) {
    await test.step(`Connecting MetaMask account`, async () => {
      await this.connectWalletButton.click();
      await this.selectAccount.click();
      await retry(() => metamask.approveTokenPermission(), 3, 10000);
      await retry(() => metamask.confirmSignature(), 3, 10000);
    });
  }

  async createNode(protocolName: string, networkName: string) {
    await test.step(`Waiting for node tab to load`, async () => {
      await this.nodeTabInLeftPane.waitFor({ state: "attached" });
    });
    await test.step(`Node tab is invoked`, async () => {
      await this.nodeTabInLeftPane.click();
    });
    await test.step(`Create Node button is clicked`, async () => {
      await this.createNodeButton.click();
    });
    await test.step(`Select Protocol`, async () => {
      await this.selectProtocol.selectOption(protocolName);
    });
    await test.step(`Select Network`, async () => {
      await this.selectNetwork.selectOption(networkName);
    });
    await test.step(`Creating node with the selected Protocol:${protocolName} and Network name:${networkName}`, async () => {
      await this.createNodeWithSelection.click();
    });
    await test.step(`Node creation has been successfuly completed and waiting for node to appear`, async () => {
      await this.nodeCreationSuccesElement.waitFor({ state: "attached" });
    });
  }

  async createNodeButtonVisible() {
    await test.step(`Create Node button is visible and node is removed`, async () => {
      await this.createNodeButton.waitFor({ state: "attached" });
    });
  }

  async selectNodeTab() {
    await test.step(`Node tab is selected`, async () => {
      await this.nodeTabInLeftPane.click();
    });
  }

  async selectHomTab() {
    await test.step(`Home tab is invoked`, async () => {
      await this.homeTabInLeftPane.click();
    });
  }

  async getNodeUrl(): Promise<string> {
    return await test.step(`Returning node url string`, async () => {
      let value = await this.nodeUrlText.nth(0).getAttribute("value");
      return value as string;
    });
  }

  async getAPIKey(): Promise<string> {
    return await test.step(`Returning API key string`, async () => {
      let value = await this.apiKeyText.getAttribute("id");
      return value as string;
    });
  }

  async selectRemoveNode() {
    await test.step(`Remove tab is invoked`, async () => {
      await this.removeNodeButton.nth(1).click();
    });
  }

  async selectDeletButton() {
    await test.step(`Delet button selected`, async () => {
      await this.deleteButton.click();
    });
  }

  async fillEmailAddess(email:string) {
    await test.step(`Providing email address`, async () => {
      await this.inputEmail.fill(email);
    });
  }

  async fillPassword(password:string) {
    await test.step(`Providing Password`, async () => {
      await this.inputPassWord.fill(password);
    });
  }

  async selectLoginButton() {
    await test.step(`Select login button`, async () => {
      await this.loginButton.click();
    });
  }

  async waitForUnsuccessfullLoginAlertToaster() {
    return await test.step(`Unable to login toaster to appear`, async () => {
      const alerts = await this.alertToasters;
      await alerts
        .locator(
          landingSelector.notificationToaster.alertTextUnableToLogin,
        )
        .waitFor({ state: "visible" });
      const alertTextUnableToLoginText = await alerts
        .locator(
          landingSelector.notificationToaster.alertTextUnableToLogin,
        )
        .textContent();
      return alertTextUnableToLoginText as string;
    });
  }
}
