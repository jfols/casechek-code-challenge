// test.js
const timeout = 5000;

describe(
  "/ (Home Page)",
  () => {
    let page;
    beforeAll(async () => {
      page = await global.__BROWSER__.newPage();
      await page.goto("http://localhost:9000");
    }, timeout);

    it("should load without error", async () => {
      const text = await page.evaluate(() => document.body.textContent);
      expect(text).toContain("Casechek");
    });

    it("should load users on search", async () => {
      await page.waitForSelector("input[name=search]");
      await page.focus("input[name=search]");
      page.keyboard.type("jfols");
      await page.waitForSelector('[data-testid="usercard"]');
    });
  },
  timeout
);
