import puppeteer from "puppeteer";
jest.setTimeout(10000);
test("Should open the app", async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("http://localhost:3000");
  await page.click("#username");
  await page.type("#username", "GilMaor");
  await page.click("#password");
  await page.type("#password", "123456");
  await page.click(".MuiButton-label");
  const cookies = await page.cookies();
  expect(cookies).toBe("GilMaor");
  browser.close();
});
