import { chromium, ChromiumBrowser, Page } from "playwright";

describe("Game", () => {
  let browser: ChromiumBrowser
  let page: Page

  beforeAll(async () => {
    browser = await chromium.launch()
  })

  afterAll(async () => {
    await browser.close()
  })

  beforeEach(async () => {
    page = await browser.newPage()
  })

  afterEach(async () => {
    await page.close()
  })

  it("renders", async () => {
    await page.goto("http://localhost:8080/");
    const $game = await page.$(".game");
    expect($game).toBeTruthy()
  });
});
