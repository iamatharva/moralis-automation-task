import "dotenv/config";
import { Page, test } from "@playwright/test";
import { BasePage } from "../pageObjects/basePage";
import { LandingPage } from "../pageObjects/landingPage";
import { getWalletNFTs } from "../utils/apis/getWalletNftsApi";

test.beforeEach(async ({ page }: { page: Page }) => {
  let basePage = new BasePage(page);
  await basePage.openUrl(process.env.URL_UNDER_TEST);
});

const { expect } = test;

test.describe("Negative Scenarios", () => {
  test("Try with invalid credentials", async ({
    page,
  }) => {
    let landingPage = new LandingPage(page);
    await landingPage.fillEmailAddess("invalidEmail@invalidProvider.com")
    await landingPage.fillPassword("invalidPassword")
    await landingPage.selectLoginButton()
    const warningText = await landingPage.waitForUnsuccessfullLoginAlertToaster()
    await expect(warningText).toContain("Something went wrong")
  });

  test("Try with invalid API-Key", async ({
    request,
  }) => {
    const responseBody = await getWalletNFTs(request, '0x4281ecf07378ee595c564a59048801330f3084ee', "Invalid-API-Key");
    expect(responseBody.message).toContain('Token is invalid format')
  });
});
