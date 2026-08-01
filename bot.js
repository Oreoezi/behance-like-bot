const { chromium } = require('playwright');
const button_path = "div[data-adobe-analytics='AppreciateClick']";
const isClicked = "div[data-adobe-analytics='UnappreciateClick']";

process.on('uncaughtException', () => {
    process.exit(-1);
});
process.on('unhandledRejection', () => {
    process.exit(-1);
});

async function main() {
    const browser = await chromium.launch({
        args: [
            '--proxy-server=socks4://' + process.argv[2],
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--disable-gpu'
        ]
    });

    const context = await browser.newContext({
        viewport: {
            width: 1800 + Math.floor(Math.random() * 100),
            height: 900 + Math.floor(Math.random() * 100)
        },
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'
    });

    await context.route('**/*', (route) => {
        const resourceType = route.request().resourceType();
        if (resourceType === 'image' || resourceType === 'stylesheet' || resourceType === 'font') {
            return route.abort();
        }
        return route.continue();
    });

    const page = await context.newPage();
    await page.goto(process.argv[3]);
    await page.waitForSelector(button_path);
    await page.waitForTimeout(1000);
    await page.click(button_path);
    await page.waitForSelector(isClicked);

    await page.close();
    await context.close();
    await browser.close();
}

main();
