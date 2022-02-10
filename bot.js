const puppeteer = require("puppeteer");
const button_path = "div[data-adobe-analytics='AppreciateClick']";
const isClicked = "div[data-adobe-analytics='UnappreciateClick']";
process.on("uncaughtException", () => {
    process.exit(-1);
});
process.on("unhandledRejection", () => {
    process.exit(-1);
});
async function main() {
    const browser = await puppeteer.launch({
        args: [ "--proxy-server=socks4://" + process.argv[2],
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-accelerated-2d-canvas",
        "--no-first-run",
        "--no-zygote",
        "--disable-gpu"],
        defaultViewport: {
            width: 1800 + Math.floor(Math.random() * 100),
            height: 900 + Math.floor(Math.random() * 100),
            deviceScaleFactor: 1,
            hasTouch: false,
            isLandscape: false,
            isMobile: false
        }
    });
    const page = await browser.newPage();
    await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36");
    await page.setRequestInterception(true);
    page.on("request", req => {
        if (req.resourceType() == "image" || 
        req.resourceType() == "stylesheet" ||
        req.resourceType() == "font") return req.abort();
        req.continue();
    });
    await page.goto(process.argv[3]);
    await page.waitForSelector(button_path);
    await new Promise((res,rej) => setTimeout(res, 1000));
    await page.click(button_path);
    await page.waitForSelector(isClicked);
    await page.close();
    await browser.close();
}
main();