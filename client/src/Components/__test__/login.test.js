import puppeteer from "puppeteer";
jest.setTimeout(10000);
let browser;
let page;
describe("Frontend test", () => {
  test("Should login", async () => {
    browser = await puppeteer.launch({ headless: false });
    page = await browser.newPage();
    await page.goto("http://localhost:8080");
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
    await page.waitForSelector("#add-button");
    await page.click("#add-button");
    await page.waitForSelector("h4.MuiTypography-h4");
    const heading1 = await page.$eval(
      "h4.MuiTypography-h4",
      (el) => el.textContent
    );
    expect(heading1).toBe("Add Post");
  });

  test("Should take to My posts page", async () => {
    await page.waitForSelector("svg.MuiSvgIcon-root");
    await page.click("svg.MuiSvgIcon-root");
    const [button] = await page.$x("//a[contains(., 'My Posts')]");
    if (button) {
      await button.click();
    }
    await page.waitForSelector("h2.MuiTypography-h2");
    const heading1 = await page.$eval(
      "h2.MuiTypography-h2",
      (el) => el.textContent
    );
    expect(heading1).toBe("My Posts");
  });

  test("Should logout", async () => {
    await page.waitForSelector("#logoutButton");
    await page.click("#logoutButton");
    await page.waitForSelector("h1.MuiTypography-h5");
    const heading1 = await page.$eval(
      "h1.MuiTypography-h5",
      (el) => el.textContent
    );

    expect(heading1).toBe("Sign in");
    browser.close();
  });
});
