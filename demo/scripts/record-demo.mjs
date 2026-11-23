// Records a silent, step-by-step demo of the EduSphere UI with bilingual captions.
import { chromium } from "playwright";
import fs from "node:fs";

const BASE = "http://localhost:3200";
const W = 1440, H = 900;
fs.mkdirSync("raw", { recursive: true });

const OVERLAY = () => {
  const install = () => {
    if (document.getElementById("demo-cursor")) return;
    const style = document.createElement("style");
    style.textContent = `
      #demo-cursor{position:fixed;left:0;top:0;width:22px;height:22px;z-index:2147483647;pointer-events:none;transform:translate(-3px,-2px);transition:transform .05s}
      #demo-ripple{position:fixed;width:36px;height:36px;margin:-18px 0 0 -18px;border-radius:50%;border:3px solid rgba(79,70,229,.85);z-index:2147483646;pointer-events:none;opacity:0}
      #demo-ripple.go{animation:rip .45s ease-out}
      @keyframes rip{0%{opacity:1;transform:scale(.3)}100%{opacity:0;transform:scale(1.4)}}
      #demo-caption{position:fixed;left:50%;bottom:22px;transform:translateX(-50%);z-index:2147483645;pointer-events:none;
        background:rgba(15,23,42,.92);color:#fff;border-radius:16px;padding:12px 22px;max-width:980px;text-align:center;
        box-shadow:0 20px 50px -10px rgba(0,0,0,.45);font-family:'Plus Jakarta Sans',system-ui,sans-serif;transition:opacity .3s}
      #demo-caption .s{display:inline-block;background:linear-gradient(90deg,#6366f1,#3b82f6);border-radius:999px;padding:2px 10px;font-size:12px;font-weight:700;margin-bottom:6px;letter-spacing:.03em}
      #demo-caption .en{font-size:17px;font-weight:700}
      #demo-caption .hi{font-size:15px;color:#c7d2fe;margin-top:3px;font-family:'Nirmala UI','Mangal',system-ui,sans-serif}
      #demo-card{position:fixed;inset:0;z-index:2147483640;display:flex;align-items:center;justify-content:center;flex-direction:column;
        background:radial-gradient(circle at 30% 20%,#4338ca,#0b1640 70%);color:#fff;font-family:'Plus Jakarta Sans',system-ui,sans-serif;text-align:center}
      #demo-card h1{font-size:56px;font-weight:800;margin:18px 0 6px;letter-spacing:-.02em}
      #demo-card p{font-size:20px;color:#c7d2fe;margin:4px}
      #demo-card .hi{font-family:'Nirmala UI','Mangal',sans-serif}
    `;
    document.head.appendChild(style);
    const c = document.createElement("div");
    c.id = "demo-cursor";
    c.innerHTML = `<svg width="22" height="22" viewBox="0 0 24 24"><path d="M4 2l16 9.5-7 1.6-3.6 6.9z" fill="#0f172a" stroke="#fff" stroke-width="1.6" stroke-linejoin="round"/></svg>`;
    const r = document.createElement("div");
    r.id = "demo-ripple";
    document.body.append(c, r);
    const pos = window.__demoPos || { x: W / 2, y: H / 2 };
    c.style.left = pos.x + "px"; c.style.top = pos.y + "px";
    document.addEventListener("mousemove", (e) => { c.style.left = e.clientX + "px"; c.style.top = e.clientY + "px"; window.__demoPos = { x: e.clientX, y: e.clientY }; }, true);
    document.addEventListener("mousedown", (e) => { r.style.left = e.clientX + "px"; r.style.top = e.clientY + "px"; r.classList.remove("go"); void r.offsetWidth; r.classList.add("go"); }, true);
  };
  const W = 1440, H = 900;
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", install); else install();
  new MutationObserver(install).observe(document.documentElement, { childList: true, subtree: false });
};

const browser = await chromium.launch({ channel: "chrome" });

async function newRecorder(viewport, dir) {
  const ctx = await browser.newContext({ viewport, recordVideo: { dir, size: viewport }, deviceScaleFactor: 1 });
  await ctx.addInitScript(OVERLAY);
  const page = await ctx.newPage();
  return { ctx, page };
}

// ---------- helpers ----------
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
function api(page) {
  let cur = { x: W / 2, y: H / 2 };
  const caption = async (step, en, hi) => {
    await page.evaluate(([step, en, hi]) => {
      let el = document.getElementById("demo-caption");
      if (!el) { el = document.createElement("div"); el.id = "demo-caption"; document.body.appendChild(el); }
      el.innerHTML = `<div class="s">${step}</div><div class="en">${en}</div><div class="hi">${hi}</div>`;
      el.style.opacity = 1;
    }, [step, en, hi]);
  };
  const hideCaption = () => page.evaluate(() => { const el = document.getElementById("demo-caption"); if (el) el.style.opacity = 0; });
  const card = async (html, ms) => {
    await page.evaluate((html) => { const d = document.createElement("div"); d.id = "demo-card"; d.innerHTML = html; document.body.appendChild(d); }, html);
    await wait(ms);
    await page.evaluate(() => document.getElementById("demo-card")?.remove());
  };
  const moveTo = async (x, y, steps = 28) => { await page.mouse.move(x, y, { steps }); cur = { x, y }; };
  const point = async (loc, dwell = 500) => {
    await loc.scrollIntoViewIfNeeded();
    const b = await loc.boundingBox();
    await moveTo(b.x + b.width / 2, b.y + b.height / 2);
    await wait(dwell);
  };
  const click = async (loc, dwell = 350) => { await point(loc, 200); await page.mouse.down(); await page.mouse.up(); await wait(dwell); };
  const type = async (loc, text) => { await click(loc, 150); await loc.pressSequentially(text, { delay: 75 }); await wait(300); };
  const scrollMain = async (y) => { await page.evaluate((y) => document.getElementById("main-scroll")?.scrollTo({ top: y, behavior: "smooth" }), y); await wait(1400); };
  const scrollNav = async (y) => { await page.evaluate((y) => document.querySelector('[data-testid="sidebar-nav"]')?.scrollTo({ top: y, behavior: "smooth" }), y); await wait(1200); };
  return { caption, hideCaption, card, moveTo, point, click, type, scrollMain, scrollNav };
}

// ---------- desktop recording ----------
{
  const { ctx, page } = await newRecorder({ width: W, height: H }, "raw/desktop");
  const a = api(page);
  await page.goto(BASE + "/login", { waitUntil: "networkidle" });
  await wait(600);

  await a.card(`<svg width="84" height="84" viewBox="0 0 40 40"><rect width="40" height="40" rx="11" fill="#4f46e5"/><circle cx="20" cy="20" r="9.5" fill="none" stroke="#fff" stroke-width="2"/><ellipse cx="20" cy="20" rx="15" ry="5.2" fill="none" stroke="#a5b4fc" stroke-width="1.8" transform="rotate(-24 20 20)"/><path d="M14.5 19.2 20 16.6l5.5 2.6L20 21.8z" fill="#fff"/></svg>
    <h1>EduSphere</h1><p>School · College · Sports Management System</p><p style="margin-top:22px;font-weight:700;color:#fff">Product Demo – Step by Step</p><p class="hi">प्रोडक्ट डेमो – स्टेप बाय स्टेप</p>`, 4200);

  // STEP 1 – login page tour
  await a.caption("STEP 1 · LOGIN PAGE", "Premium two-column login: branding on the left, secure login card on the right", "लॉगिन पेज: बाईं ओर ब्रांडिंग, दाईं ओर सुरक्षित लॉगिन कार्ड");
  await a.moveTo(300, 220); await wait(1600);
  await a.caption("STEP 1 · LOGIN PAGE", "Three product modules: School, College and Sports Management", "तीन मॉड्यूल: स्कूल, कॉलेज और स्पोर्ट्स मैनेजमेंट");
  for (const t of ["School Management", "College Management", "Sports Management"]) await a.point(page.getByText(t, { exact: true }), 900);
  await a.point(page.getByRole("heading", { name: "Welcome Back!" }), 900);

  // STEP 2 – validation
  await a.caption("STEP 2 · FORM VALIDATION", "Clicking Sign In with empty fields shows clear field-level errors", "खाली फॉर्म पर Sign In दबाने से हर फ़ील्ड की गलती दिखती है");
  await a.click(page.getByTestId("sign-in"), 2600);

  // STEP 3 – wrong password
  await a.caption("STEP 3 · WORKSPACE TYPE", "Choose the workspace: School, College or Sports Academy", "वर्कस्पेस चुनें: स्कूल, कॉलेज या स्पोर्ट्स एकेडमी");
  await a.click(page.getByTestId("workspace-trigger"), 1600);
  await a.point(page.getByTestId("workspace-college"), 500);
  await a.point(page.getByTestId("workspace-sports"), 500);
  await a.click(page.getByTestId("workspace-school"), 600);
  await a.caption("STEP 3 · WRONG PASSWORD", "Wrong credentials show a clear error message", "गलत पासवर्ड पर साफ़ एरर मैसेज दिखता है");
  await a.type(page.locator("#identifier"), "admin@greenvalley.edu.in");
  await a.type(page.locator("#password"), "wrong123");
  await a.click(page.getByTestId("sign-in"), 2600);

  // STEP 4 – correct login school
  await a.caption("STEP 4 · SCHOOL LOGIN", "Show/Hide password, then sign in with the correct password", "पासवर्ड दिखाएँ/छुपाएँ, फिर सही पासवर्ड से साइन इन करें");
  await page.locator("#password").fill("");
  await a.type(page.locator("#password"), "Demo@123");
  await a.click(page.getByTestId("toggle-password"), 1200);
  await a.click(page.getByTestId("toggle-password"), 600);
  await a.caption("STEP 4 · SCHOOL LOGIN", "Loading state → success message → redirect to School dashboard", "लोडिंग → सक्सेस मैसेज → स्कूल डैशबोर्ड");
  await a.click(page.getByTestId("sign-in"), 400);
  await page.waitForURL("**/dashboard/school");
  await wait(1800);

  // STEP 5 – school dashboard
  const tour = async (label, hi, items, extra) => {
    await a.caption(`${label} DASHBOARD`, "KPI cards: key numbers at a glance", "KPI कार्ड: मुख्य आंकड़े एक नज़र में");
    const cards = page.locator('[data-testid^="overview-"] .grid').first().locator(":scope > div");
    for (let i = 0; i < 4; i++) await a.point(cards.nth(i), 650);
    await a.caption(`${label} DASHBOARD`, "Live charts: trends, comparisons and distribution", "चार्ट्स: ट्रेंड, तुलना और वितरण");
    await a.scrollMain(330); await a.moveTo(480, 450); await wait(900); await a.moveTo(860, 480); await wait(900); await a.moveTo(1180, 470); await wait(900);
    await a.caption(`${label} DASHBOARD`, "Command Center, calendar and recent records", "कमांड सेंटर, कैलेंडर और हाल के रिकॉर्ड");
    await a.scrollMain(700); await wait(1200);
    await a.scrollMain(1200); await wait(1300);
    await a.scrollMain(0);
    await a.caption(`${label} · SIDEBAR`, "Full module navigation, grouped by department", "साइडबार: सभी मॉड्यूल, विभाग के अनुसार");
    await a.moveTo(140, 400); await a.scrollNav(500); await a.scrollNav(1100); await a.scrollNav(2000); await a.scrollNav(0);
    for (const it of items) {
      await a.caption(`${label} · MODULE`, `Open module: ${it}`, `${hi}: "${it}" मॉड्यूल खोलें`);
      const nav = page.getByTestId(`nav-${it}`);
      await a.click(nav, 2200);
    }
    if (extra) await extra();
    await a.click(page.getByTestId("nav-Dashboard"), 1200);
    await a.caption(`${label} · LOGOUT`, "Logout returns to the login page", "लॉगआउट करने पर वापस लॉगिन पेज");
    await a.click(page.getByTestId("logout"), 400);
    await page.waitForURL("**/login");
    await wait(1500);
  };
  await tour("SCHOOL", "स्कूल", ["Admissions", "Fee Management", "Attendance"]);

  // STEP 6 – college login using Organization ID
  await a.caption("STEP 6 · COLLEGE LOGIN", "Sign in to the College workspace using an Organization ID", "ऑर्गनाइजेशन ID से कॉलेज वर्कस्पेस में लॉगिन");
  await a.click(page.getByTestId("workspace-trigger"), 900);
  await a.click(page.getByTestId("workspace-college"), 500);
  await page.locator("#identifier").fill("");
  await a.type(page.locator("#identifier"), "SXC-2045");
  await page.locator("#password").fill("");
  await a.type(page.locator("#password"), "Demo@123");
  await a.click(page.getByTestId("sign-in"), 400);
  await page.waitForURL("**/dashboard/college");
  await wait(1800);
  await tour("COLLEGE", "कॉलेज", ["Exams & Results", "LMS & Course Content", "Placements & Internships"]);

  // STEP 7 – sports login with demo chip
  await a.caption("STEP 7 · SPORTS LOGIN", "Quick demo access: one click fills Sports Academy credentials", "डेमो बटन: एक क्लिक में स्पोर्ट्स एकेडमी की जानकारी भर जाती है");
  await a.click(page.getByRole("button", { name: "Sports Academy" }), 1800);
  await a.click(page.getByTestId("sign-in"), 400);
  await page.waitForURL("**/dashboard/sports");
  await wait(1800);
  await tour("SPORTS ACADEMY", "स्पोर्ट्स", ["Tournaments", "Performance Tracking", "Session Schedule"]);

  await a.hideCaption();
  await ctx.close();
  fs.renameSync(await page.video().path(), "raw/desktop.webm");
}

// ---------- mobile recording ----------
{
  const MW = 390, MH = 844;
  const { ctx, page } = await newRecorder({ width: MW, height: MH }, "raw/mobile");
  const a = api(page);
  await page.goto(BASE + "/login", { waitUntil: "networkidle" });
  await page.addStyleTag({ content: "#demo-caption{max-width:360px;bottom:12px;padding:10px 14px}#demo-caption .en{font-size:14px}#demo-caption .hi{font-size:13px}" });
  await a.caption("STEP 8 · MOBILE", "Fully responsive login on mobile", "मोबाइल पर पूरी तरह रिस्पॉन्सिव");
  await a.moveTo(200, 300); await wait(1500);
  await a.click(page.getByRole("button", { name: "School", exact: true }), 1500);
  await a.click(page.getByTestId("sign-in"), 400);
  await page.waitForURL("**/dashboard/school");
  await page.addStyleTag({ content: "#demo-caption{max-width:360px;bottom:12px;padding:10px 14px}#demo-caption .en{font-size:14px}#demo-caption .hi{font-size:13px}" });
  await a.caption("STEP 8 · MOBILE", "Dashboard adapts to small screens", "डैशबोर्ड छोटी स्क्रीन पर भी सही दिखता है");
  await wait(1500);
  await page.evaluate(() => document.getElementById("main-scroll").scrollTo({ top: 900, behavior: "smooth" })); await wait(1800);
  await page.evaluate(() => document.getElementById("main-scroll").scrollTo({ top: 1900, behavior: "smooth" })); await wait(1800);
  await page.evaluate(() => document.getElementById("main-scroll").scrollTo({ top: 0, behavior: "smooth" })); await wait(1200);
  await a.caption("STEP 8 · MOBILE", "Slide-in sidebar menu on mobile", "मोबाइल पर स्लाइड होने वाला मेन्यू");
  await a.click(page.getByLabel("Open menu"), 1500);
  await a.click(page.getByTestId("nav-Transport"), 2200);
  await ctx.close();
  fs.renameSync(await page.video().path(), "raw/mobile.webm");
}

// ---------- outro ----------
{
  const { ctx, page } = await newRecorder({ width: W, height: H }, "raw/outro");
  const a = api(page);
  await page.goto(BASE + "/login", { waitUntil: "networkidle" });
  await a.card(`<h1>Thank you</h1><p>EduSphere – Manage Learning. Empower Growth.</p><p class="hi">धन्यवाद – EduSphere</p>
    <p style="margin-top:26px;font-size:16px">Next.js · Tailwind CSS · shadcn/ui · Lucide Icons</p>`, 4000);
  await ctx.close();
  fs.renameSync(await page.video().path(), "raw/outro.webm");
}

await browser.close();
console.log("recorded");
