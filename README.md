# Behance like bot

This is a simple bot to boost the like and view count of your project on Behance using puppeteer.<br>
What it does: 
 - Downloads proxies
 - Likes the page while connected to those proxies


# Beginner Guide

- You will need node.js in order to use this script. You can download it <a href="https://nodejs.org/en/">here</a>.
- After cloning the repository, open it up in ``cmd/powershell/terminal``.
- Install the dependencies by running ``npm install``.
- After that it's as simple as running ``node master.js``/``npm start``.

# Installation 

Edit ``config.json`` and change the options to something fitting.
```
{
    "project_page": "https://www.behance.net/gallery/1234/cool-renders",
    "like_count": 50,
    "downloadProxies": true,
    "instances": 10
}
```
- ``project_page`` is the URL of the page you want to likebot
- ``like_count`` stops the script after adding the specified number of likes
- ``download_proxies``:  
  - when enabled downloads proxies from proxyscan.io
  - when disabled uses proxies from proxylist.txt
- ``instances``:
  - decides how many chromium instances to run at once
  - each instance takes ~100mb of memory

## Will you get banned for this?
<br>
Worst that can happen is your likes will get removed. There is no way for Behance to tie the likes back to you.
