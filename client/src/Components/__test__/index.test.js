import puppeteer from "puppeteer";
jest.setTimeout(10000);
test("Should login", async () => {
  const browser = await puppeteer.launch({ headless: false, slowMo: 50 });
  const page = await browser.newPage();
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
  browser.close();
});
