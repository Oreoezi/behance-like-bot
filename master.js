const {spawn} = require("child_process");
const config = require("./config.json");
var proxies = [];
var likecount = 0, i=0, count=0, fails=0;
function loop() {
    var proc = spawn("node", ["bot.js", proxies[i], config.project_page]);
    proc.on("exit", (code) => {
        console.clear();
        if (code != 0) {
            console.log("[!] Proxy failed " + ++fails);
        }
        else {
            console.log("[*] Added like (" + ++likecount + ")");
            fails = 0;
            if (likecount >= config.like_count) process.exit();
        }
        count--;
        loop();
    });
    if (++i >= proxies.length) i = 0;
    if (++count < config.instances) loop();
}
if (config.download_proxies) {
    const {get} = require("https");
    get("https://www.proxyscan.io//download?type=socks4", res => {
        var buf = "";
        res.on("data", data => buf += data);
        res.on("end", () => {
            proxies = buf.split("\n");
            loop();
        });
    })
}
else {
    const {readFileSync} = require("fs");
    proxies = readFileSync("proxylist.txt").toString().split("\n");
    loop();
}