import puppeteer from "puppeteer";
jest.setTimeout(10000);
let browser;
let page;
describe("Frontend test", async () => {
  test("Should login", async () => {
    browser = await puppeteer.launch({ headless: false, slowMo: 50 });
    page = await browser.newPage();
    await page.goto("http://localhost:3000");
    await page.click("#username");
    await page.type("#username", "GilMaor");
    await page.click("#password");
    await page.type("#password", "123456");
    await page.click(".MuiButton-label");
    await page.waitForSelector("h2.MuiTypography-root");
    const heading1 = await page.$eval(
      "h2.MuiTypography-root",
      (el) => el.textContent
    );
    expect(heading1).toBe("Feed");
  });

  test("Should take to AddPost page", async () => {
    await page.click(".makeStyles-rootFloating-14");
    await page.waitForSelector("h4.MuiTypography-h4");
    const heading1 = await page.$eval(
      "h4.MuiTypography-h4",
      (el) => el.textContent
    );
    expect(heading1).toBe("Add Post");
  });
});
