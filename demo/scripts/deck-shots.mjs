// Clean screenshots (charts fully animated) for the slide decks.
import { chromium } from "playwright";
import fs from "node:fs";
const out = "deckshots";
fs.mkdirSync(out, { recursive: true });
const base = "http://localhost:3200";
const browser = await chromium.launch({ channel: "chrome" });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1.5 });
const settle = (ms = 2500) => page.waitForTimeout(ms);

await page.goto(base + "/login", { waitUntil: "networkidle" });
await settle(1200);
await page.screenshot({ path: `${out}/login.png` });
await page.getByTestId("sign-in").click();
await page.getByTestId("workspace-trigger").click();
await settle(600);
await page.screenshot({ path: `${out}/login-validation.png` });
await page.keyboard.press("Escape");

for (const ws of ["school", "college", "sports"]) {
  await page.goto(base + "/dashboard/" + ws, { waitUntil: "networkidle" });
  await settle();
  await page.screenshot({ path: `${out}/${ws}.png` });
}
await page.getByTestId("nav-Tournaments").click();
await settle(900);
await page.screenshot({ path: `${out}/module.png` });

const m = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
await m.goto(base + "/login", { waitUntil: "networkidle" });
await m.waitForTimeout(1000);
await m.screenshot({ path: `${out}/mobile-login.png` });
await m.goto(base + "/dashboard/school", { waitUntil: "networkidle" });
await m.waitForTimeout(1500);
await m.screenshot({ path: `${out}/mobile-dashboard.png` });
const lp = await browser.newPage({ viewport: { width: 400, height: 400 } });
await lp.setContent(`<html><body style="margin:0;background:transparent"><svg width="400" height="400" viewBox="0 0 40 40"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#4f46e5"/><stop offset="1" stop-color="#1e3a8a"/></linearGradient></defs><rect width="40" height="40" rx="11" fill="url(#g)"/><circle cx="20" cy="20" r="9.5" fill="none" stroke="#fff" stroke-opacity=".9" stroke-width="2"/><ellipse cx="20" cy="20" rx="15" ry="5.2" fill="none" stroke="#a5b4fc" stroke-width="1.8" transform="rotate(-24 20 20)"/><path d="M14.5 19.2 20 16.6l5.5 2.6L20 21.8z" fill="#fff"/><path d="M16.6 20.6v2.6c1.9 1.3 4.9 1.3 6.8 0v-2.6" fill="none" stroke="#fff" stroke-width="1.4" stroke-linecap="round"/><circle cx="32.2" cy="13.4" r="2" fill="#fbbf24"/></svg></body></html>`);
await lp.screenshot({ path: `${out}/logo.png`, omitBackground: true });
await browser.close();
console.log("deck shots done");
