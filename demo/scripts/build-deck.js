// Builds EduSphere demo decks in English and Hindi with pptxgenjs.
const pptxgen = require("pptxgenjs");
const path = require("path");
// Optional: set APPLY_THEME_PATH to a script exporting applyTheme(deckPath, theme) to write theme colors.
const applyTheme = process.env.APPLY_THEME_PATH ? require(process.env.APPLY_THEME_PATH).applyTheme : async () => {};

const SHOT = (f) => path.join(__dirname, "deckshots", f);
const HEX = {
  navy: "0B1640", ink: "0F172A", indigo: "4F46E5", blue: "2563EB", violet: "7C3AED",
  emerald: "059669", amber: "F59E0B", soft: "EEF2FF", muted: "64748B", line: "E2E8F0", white: "FFFFFF",
};

const T = {
  en: {
    file: "EduSphere_Demo_English.pptx",
    font: { head: "Arial", body: "Calibri" },
    footer: "EduSphere · UI Demo Walkthrough",
    title: "EduSphere",
    subtitle: "School, College & Sports Management System",
    titleNote: "UI Demo Walkthrough · Login page · 3 dashboards · Responsive design",
    sections: ["Overview", "Login", "Dashboards", "Technical"],
    built: {
      title: "What we built",
      cards: [
        ["Premium login page", "Two-column SaaS layout with branding, illustrations and a secure login card"],
        ["Three workspaces", "Separate dashboards for School, College and Sports Academy"],
        ["Dummy login & validation", "Field errors, wrong-password error, loading and success states"],
        ["Fully responsive", "Works on desktop, tablet and mobile with a slide-in menu"],
      ],
    },
    login: {
      title: "Login page",
      points: [
        "Left: brand, heading “Manage Learning. Empower Growth.” and 3 feature cards",
        "Workspace Type: School, College or Sports Academy",
        "Organization ID / Email and Password with Show/Hide",
        "Remember me, Forgot password and Contact Support",
        "Sign In with loading state, plus Google Sign-In",
      ],
    },
    flow: {
      title: "Login flow, step by step",
      steps: ["Choose workspace", "Enter ID / email", "Enter password", "Sign In", "Open dashboard"],
      capL: "Login screen: workspace, ID / email and password",
      capA: "Empty form → clear field-level errors",
      capB: "Workspace Type dropdown with 3 options",
    },
    accounts: {
      title: "Demo accounts",
      head: ["Workspace", "Email", "Organization ID", "Password", "Opens"],
      rows: [
        ["School", "admin@greenvalley.edu.in", "GVS-1024", "Demo@123", "School dashboard"],
        ["College", "admin@stxavierscollege.edu.in", "SXC-2045", "Demo@123", "College dashboard"],
        ["Sports Academy", "admin@championsacademy.in", "CSA-3310", "Demo@123", "Sports dashboard"],
      ],
      note: "Wrong password shows an error. Correct login shows “Welcome” and redirects to the right dashboard. The “Try a demo workspace” buttons fill these details in one click.",
    },
    school: {
      title: "School dashboard",
      kpis: [["1,254", "Students"], ["82", "Active staff"], ["75%", "Fees collected"], ["450", "Transport"]],
      points: ["Admissions trend, fee collection and module activity charts", "Command Center, school calendar and recent admissions", "35+ modules in 9 sidebar groups"],
    },
    modules: { title: "School modules (sidebar)" },
    college: {
      title: "College dashboard",
      kpis: [["8,420", "Students"], ["386", "Faculty"], ["₹4.2 Cr", "Fees"], ["87%", "Placement"]],
      points: ["CGPA trend, enrollment by program and results overview", "Exams & Results, LMS, Placements, NAAC & NIRF", "Academic calendar and upcoming examinations"],
    },
    sports: {
      title: "Sports Academy dashboard",
      kpis: [["640", "Players"], ["38", "Coaches"], ["₹18.6 L", "Revenue"], ["6", "Tournaments"]],
      points: ["Training attendance, players by sport and medal tally", "Tournaments, fixtures, performance and fitness", "Academy calendar and upcoming fixtures"],
    },
    mobile: { title: "Module screens & mobile view", capA: "Every sidebar item opens its own module screen", capB: "Mobile login", capC: "Mobile dashboard" },
    tech: {
      title: "Technology & folder structure",
      stack: [["Next.js 15 + React 19", "App Router, static pages"], ["Tailwind CSS v4", "Theme tokens, responsive grid"], ["shadcn/ui + Lucide", "Select, Checkbox, Button, icons"], ["Recharts", "Area, bar and donut charts"]],
    },
    run: {
      title: "How to run the demo",
      steps: [["Open the project folder", "Desktop\\DEV\\edusphere"], ["Install packages", "npm install"], ["Start the app", "npm run dev"], ["Open in browser", "localhost:3000/login"]],
      nextTitle: "Next steps",
      next: ["Connect real authentication (backend API)", "Load live data into dashboards", "Build full module screens one by one"],
    },
    thanks: "Thank you",
    thanksSub: "EduSphere – Manage Learning. Empower Growth.",
  },
  hi: {
    file: "EduSphere_Demo_Hindi.pptx",
    font: { head: "Nirmala UI", body: "Nirmala UI" },
    footer: "EduSphere · UI डेमो वॉकथ्रू",
    title: "EduSphere",
    subtitle: "स्कूल, कॉलेज और स्पोर्ट्स मैनेजमेंट सिस्टम",
    titleNote: "UI डेमो वॉकथ्रू · लॉगिन पेज · 3 डैशबोर्ड · रिस्पॉन्सिव डिज़ाइन",
    sections: ["परिचय", "लॉगिन", "डैशबोर्ड", "तकनीकी"],
    built: {
      title: "हमने क्या बनाया",
      cards: [
        ["प्रीमियम लॉगिन पेज", "ब्रांडिंग, इलस्ट्रेशन और सुरक्षित लॉगिन कार्ड वाला दो-कॉलम लेआउट"],
        ["तीन वर्कस्पेस", "स्कूल, कॉलेज और स्पोर्ट्स एकेडमी के लिए अलग डैशबोर्ड"],
        ["डमी लॉगिन और वैलिडेशन", "फ़ील्ड एरर, गलत पासवर्ड एरर, लोडिंग और सक्सेस मैसेज"],
        ["पूरी तरह रिस्पॉन्सिव", "डेस्कटॉप, टैबलेट और मोबाइल पर, स्लाइड होने वाले मेन्यू के साथ"],
      ],
    },
    login: {
      title: "लॉगिन पेज",
      points: [
        "बाईं ओर: ब्रांड, हेडिंग “Manage Learning. Empower Growth.” और 3 फ़ीचर कार्ड",
        "वर्कस्पेस टाइप: स्कूल, कॉलेज या स्पोर्ट्स एकेडमी",
        "ऑर्गनाइजेशन ID / ईमेल और पासवर्ड (दिखाएँ/छुपाएँ)",
        "Remember me, Forgot password और Contact Support",
        "लोडिंग के साथ Sign In बटन और Google Sign-In",
      ],
    },
    flow: {
      title: "लॉगिन प्रक्रिया, स्टेप बाय स्टेप",
      steps: ["वर्कस्पेस चुनें", "ID / ईमेल डालें", "पासवर्ड डालें", "Sign In", "डैशबोर्ड खुले"],
      capL: "लॉगिन स्क्रीन: वर्कस्पेस, ID / ईमेल और पासवर्ड",
      capA: "खाली फॉर्म → हर फ़ील्ड की साफ़ एरर",
      capB: "वर्कस्पेस टाइप ड्रॉपडाउन, 3 विकल्प",
    },
    accounts: {
      title: "डेमो अकाउंट",
      head: ["वर्कस्पेस", "ईमेल", "ऑर्गनाइजेशन ID", "पासवर्ड", "क्या खुलेगा"],
      rows: [
        ["स्कूल", "admin@greenvalley.edu.in", "GVS-1024", "Demo@123", "स्कूल डैशबोर्ड"],
        ["कॉलेज", "admin@stxavierscollege.edu.in", "SXC-2045", "Demo@123", "कॉलेज डैशबोर्ड"],
        ["स्पोर्ट्स एकेडमी", "admin@championsacademy.in", "CSA-3310", "Demo@123", "स्पोर्ट्स डैशबोर्ड"],
      ],
      note: "गलत पासवर्ड पर एरर दिखती है। सही लॉगिन पर “Welcome” मैसेज आता है और सही डैशबोर्ड खुलता है। “Try a demo workspace” बटन एक क्लिक में ये जानकारी भर देते हैं।",
    },
    school: {
      title: "स्कूल डैशबोर्ड",
      kpis: [["1,254", "छात्र"], ["82", "स्टाफ"], ["75%", "फीस जमा"], ["450", "ट्रांसपोर्ट"]],
      points: ["एडमिशन ट्रेंड, फीस कलेक्शन और मॉड्यूल एक्टिविटी चार्ट", "कमांड सेंटर, स्कूल कैलेंडर और हाल के एडमिशन", "साइडबार में 9 ग्रुप, 35+ मॉड्यूल"],
    },
    modules: { title: "स्कूल मॉड्यूल (साइडबार)" },
    college: {
      title: "कॉलेज डैशबोर्ड",
      kpis: [["8,420", "छात्र"], ["386", "फैकल्टी"], ["₹4.2 Cr", "फीस"], ["87%", "प्लेसमेंट"]],
      points: ["CGPA ट्रेंड, प्रोग्राम अनुसार एडमिशन और रिज़ल्ट", "Exams & Results, LMS, प्लेसमेंट, NAAC और NIRF", "एकेडमिक कैलेंडर और आने वाली परीक्षाएँ"],
    },
    sports: {
      title: "स्पोर्ट्स एकेडमी डैशबोर्ड",
      kpis: [["640", "खिलाड़ी"], ["38", "कोच"], ["₹18.6 L", "आय"], ["6", "टूर्नामेंट"]],
      points: ["ट्रेनिंग अटेंडेंस, खेल अनुसार खिलाड़ी और मेडल तालिका", "टूर्नामेंट, फिक्सचर, परफॉर्मेंस और फिटनेस", "एकेडमी कैलेंडर और आने वाले मैच"],
    },
    mobile: { title: "मॉड्यूल स्क्रीन और मोबाइल व्यू", capA: "साइडबार का हर आइटम अपनी मॉड्यूल स्क्रीन खोलता है", capB: "मोबाइल लॉगिन", capC: "मोबाइल डैशबोर्ड" },
    tech: {
      title: "टेक्नोलॉजी और फ़ोल्डर संरचना",
      stack: [["Next.js 15 + React 19", "App Router, स्टैटिक पेज"], ["Tailwind CSS v4", "थीम कलर, रिस्पॉन्सिव ग्रिड"], ["shadcn/ui + Lucide", "Select, Checkbox, Button, आइकन"], ["Recharts", "एरिया, बार और डोनट चार्ट"]],
    },
    run: {
      title: "डेमो कैसे चलाएँ",
      steps: [["प्रोजेक्ट फ़ोल्डर खोलें", "Desktop\\DEV\\edusphere"], ["पैकेज इंस्टॉल करें", "npm install"], ["ऐप शुरू करें", "npm run dev"], ["ब्राउज़र में खोलें", "localhost:3000/login"]],
      nextTitle: "आगे के कदम",
      next: ["असली लॉगिन (बैकएंड API) जोड़ना", "डैशबोर्ड में लाइव डेटा लाना", "हर मॉड्यूल की पूरी स्क्रीन बनाना"],
    },
    thanks: "धन्यवाद",
    thanksSub: "EduSphere – Manage Learning. Empower Growth.",
  },
};

const SCHOOL_GROUPS = [
  ["Academics", "Academic Planning, Exams & Assessment, Certificates, Study Materials, AI Teacher Assistant"],
  ["Student Management", "Admissions, Student Roster"],
  ["Mentoring & Careers", "Internship Tracking, Mentor Matching, Learning Paths, Innovation Hub"],
  ["HR & Administration", "Teachers & Staff, Attendance, Leave Management, Teacher Training"],
  ["Operations", "Fee Management, Transport, Inventory, Payroll, School Migration"],
  ["Community & Comms", "Communication, Events & Notices, Marketing"],
  ["Policy & Compliance", "NEP & NCrF, Large-Scale Assessments, Cooperatives, SSSA"],
  ["System", "Settings & Onboarding, Audit Log"],
  ["Dashboard", "Overview with KPIs, charts, Command Center and calendar"],
];

const TREE = `src/
├─ app/
│  ├─ login/page.tsx
│  └─ dashboard/[workspace]/page.tsx
├─ components/
│  ├─ auth/       login-card, login-form,
│  │              workspace-select, brand-panel…
│  ├─ dashboard/  sidebar, topbar, stat-card,
│  │              charts, calendar-card…
│  ├─ brand/      logo
│  └─ ui/         shadcn components
├─ config/workspaces.ts   (menus + sample data)
└─ lib/  auth.ts · validation.ts`;

async function build(lang) {
  const L = T[lang];
  const pres = new pptxgen();
  pres.layout = "LAYOUT_WIDE"; // 13.333 x 7.5
  pres.title = `EduSphere UI Demo (${lang === "en" ? "English" : "Hindi"})`;
  const THEME = {
    name: "EduSphere",
    headFontFace: L.font.head,
    bodyFontFace: L.font.body,
    colors: {
      dk1: HEX.ink, lt1: HEX.white, dk2: "1E2A78", lt2: HEX.soft,
      accent1: HEX.indigo, accent2: HEX.blue, accent3: HEX.violet, accent4: HEX.emerald, accent5: HEX.amber, accent6: "E11D48",
      hlink: HEX.indigo, folHlink: HEX.violet,
    },
  };
  pres.theme = { headFontFace: L.font.head, bodyFontFace: L.font.body };
  const C = pres.SchemeColor;
  const LS = lang === "hi" ? 1.2 : 1.0;

  pres.defineSlideMaster({
    title: "DARK_TITLE",
    background: { color: HEX.navy },
    objects: [
      { placeholder: { options: { name: "title", type: "title", x: 0.8, y: 2.3, w: 11.7, h: 1.3, fontSize: 60, bold: true, color: C.background1, valign: "bottom", align: "left", margin: 0 }, text: "" } },
      { placeholder: { options: { name: "body", type: "body", x: 0.8, y: 3.75, w: 11.7, h: 1.4, fontSize: 24, color: "C7D2FE", valign: "top", margin: 0 }, text: "" } },
    ],
  });
  pres.defineSlideMaster({
    title: "CONTENT",
    background: { color: HEX.white },
    margin: [0.5, 0.6, 0.6, 0.6],
    objects: [
      { placeholder: { options: { name: "title", type: "title", x: 0.6, y: 0.35, w: 12.1, h: 0.85, fontSize: 36, bold: true, color: C.text1, valign: "middle", margin: 0 }, text: "" } },
      { text: { text: L.footer, options: { x: 0.6, y: 7.0, w: 6, h: 0.3, fontSize: 10, color: HEX.muted, margin: 0, isTextBox: true } } },
    ],
    slideNumber: { x: 12.2, y: 7.0, w: 0.5, h: 0.3, fontSize: 10, color: HEX.muted, align: "right" },
  });

  const shadow = () => ({ type: "outer", color: "1E293B", blur: 8, offset: 2, angle: 90, opacity: 0.18 });
  const frame = (s, img, x, y, w, h, name) => {
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: x - 0.06, y: y - 0.06, w: w + 0.12, h: h + 0.12, rectRadius: 0.12, fill: { color: HEX.white }, line: { color: HEX.line, width: 1 }, shadow: shadow(), objectName: name + " frame" });
    s.addImage({ path: SHOT(img), x, y, w, h, objectName: name, altText: name });
  };
  const numCircle = (s, n, x, y, d = 0.5, color = C.accent1) => {
    s.addShape(pres.shapes.OVAL, { x, y, w: d, h: d, fill: { color }, line: { color, width: 0 }, objectName: `step ${n}` });
    s.addText(String(n), { x, y, w: d, h: d, fontSize: 16, bold: true, color: C.background1, align: "center", valign: "middle", margin: 0, isTextBox: true });
  };
  const bullets = (s, items, x, y, w, h, size = 16) =>
    s.addText(
      items.map((t, i) => ({ text: t, options: { bullet: { indent: 18 }, breakLine: i < items.length - 1, paraSpaceAfter: 10 } })),
      { x, y, w, h, fontSize: size, color: C.text1, valign: "top", margin: 0, isTextBox: true, objectName: "bullets", lineSpacingMultiple: LS }
    );
  const kpiRow = (s, kpis, x, y, w, color) => {
    const gap = 0.15, cw = (w - gap) / 2;
    kpis.forEach(([v, l], i) => {
      const cx = x + (i % 2) * (cw + gap);
      const y0 = y; y = y0 + Math.floor(i / 2) * 1.2;
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: cx, y, w: cw, h: 1.05, rectRadius: 0.1, fill: { color: HEX.soft }, line: { color: HEX.soft, width: 0 }, objectName: `kpi ${l}` });
      s.addText(v, { x: cx, y: y + 0.08, w: cw, h: 0.55, fontSize: 22, bold: true, color, align: "center", valign: "middle", margin: 0, isTextBox: true });
      s.addText(l, { x: cx, y: y + 0.62, w: cw, h: 0.35, fontSize: 12, color: HEX.muted, align: "center", valign: "middle", margin: 0, isTextBox: true });
      y = y0;
    });
  };
  const content = (section, title) => {
    const s = pres.addSlide({ masterName: "CONTENT", sectionTitle: section });
    s.addText(title, { placeholder: "title" });
    return s;
  };

  // 1. Title
  pres.addSection({ title: L.sections[0] });
  let s = pres.addSlide({ masterName: "DARK_TITLE", sectionTitle: L.sections[0] });
  s.addImage({ path: path.join(__dirname, "deckshots", "logo.png"), x: 0.8, y: 1.0, w: 1.1, h: 1.1, objectName: "logo", altText: "EduSphere logo" });
  s.addText(L.title, { placeholder: "title" });
  s.addText([{ text: L.subtitle, options: { breakLine: true, bold: true, color: "FFFFFF" } }, { text: L.titleNote, options: { fontSize: 18 } }], { placeholder: "body" });
  s.addText("November 2026", { x: 0.8, y: 6.6, w: 4, h: 0.4, fontSize: 14, color: "A5B4FC", margin: 0, isTextBox: true });

  // 2. What we built
  s = content(L.sections[0], L.built.title);
  L.built.cards.forEach(([h, d], i) => {
    const col = i % 2, row = Math.floor(i / 2);
    const x = 0.6 + col * 6.15, y = 1.55 + row * 2.6, w = 5.95, hh = 2.35;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h: hh, rectRadius: 0.15, fill: { color: HEX.white }, line: { color: HEX.line, width: 1 }, shadow: shadow(), objectName: `card ${i + 1}` });
    numCircle(s, i + 1, x + 0.35, y + 0.4, 0.65, [C.accent1, C.accent2, C.accent3, C.accent4][i]);
    s.addText(h, { x: x + 1.25, y: y + 0.35, w: w - 1.55, h: 0.75, fontSize: 22, bold: true, color: C.text1, valign: "middle", margin: 0, isTextBox: true });
    s.addText(d, { x: x + 1.25, y: y + 1.1, w: w - 1.55, h: 1.0, fontSize: 16, color: HEX.muted, valign: "top", margin: 0, isTextBox: true, lineSpacingMultiple: LS });
  });

  // 3. Login page
  pres.addSection({ title: L.sections[1] });
  s = content(L.sections[1], L.login.title);
  frame(s, "login.png", 0.6, 1.45, 7.6, 4.75, "Login page screenshot");
  bullets(s, L.login.points, 8.65, 1.5, 4.1, 5.0, 16);

  // 4. Flow
  s = content(L.sections[1], L.flow.title);
  const sw = 2.3, sg = 0.15;
  L.flow.steps.forEach((t, i) => {
    const x = 0.6 + i * (sw + sg + 0.03);
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y: 1.4, w: sw, h: 0.95, rectRadius: 0.12, fill: { color: i === 4 ? HEX.indigo : HEX.soft }, line: { color: i === 4 ? HEX.indigo : HEX.soft, width: 0 }, objectName: `flow ${i + 1}` });
    numCircle(s, i + 1, x + 0.18, 1.62, 0.5, i === 4 ? C.background1 : C.accent1);
    if (i === 4) s.addText("5", { x: x + 0.18, y: 1.62, w: 0.5, h: 0.5, fontSize: 16, bold: true, color: C.accent1, align: "center", valign: "middle", margin: 0, isTextBox: true });
    s.addText(t, { x: x + 0.8, y: 1.4, w: sw - 0.9, h: 0.95, fontSize: 15, bold: true, color: i === 4 ? C.background1 : C.text1, valign: "middle", margin: 0, isTextBox: true });
  });
  frame(s, "login.png", 0.6, 2.85, 5.6, 3.5, "Login screen");
  frame(s, "login-validation.png", 7.1, 2.85, 5.6, 3.5, "Validation and workspace dropdown");
  s.addText(L.flow.capL, { x: 0.6, y: 6.45, w: 5.6, h: 0.35, fontSize: 12, color: HEX.muted, margin: 0, isTextBox: true });
  s.addText(L.flow.capA + " · " + L.flow.capB, { x: 7.1, y: 6.45, w: 5.6, h: 0.35, fontSize: 12, color: HEX.muted, margin: 0, isTextBox: true });

  // 5. Accounts
  s = content(L.sections[1], L.accounts.title);
  const hdr = L.accounts.head.map((t) => ({ text: t, options: { bold: true, color: HEX.white, fill: { color: HEX.indigo } } }));
  const rows = L.accounts.rows.map((r, ri) => r.map((t, ci) => ({ text: t, options: { color: HEX.ink, bold: ci === 0, fill: { color: ri % 2 ? HEX.white : "F8FAFC" }, fontFace: ci === 1 || ci === 2 || ci === 3 ? "Calibri" : undefined } })));
  s.addTable([hdr, ...rows], { x: 0.6, y: 1.55, w: 12.1, colW: [2.1, 3.9, 2.1, 1.6, 2.4], rowH: 0.62, fontSize: 15, valign: "middle", border: { type: "solid", color: HEX.line, pt: 1 }, margin: [0, 0.12, 0, 0.12], objectName: "Demo accounts table" });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.6, y: 4.45, w: 12.1, h: 1.6, rectRadius: 0.15, fill: { color: HEX.soft }, line: { color: HEX.soft, width: 0 }, objectName: "note box" });
  numCircle(s, "i", 0.95, 4.95, 0.6, C.accent1);
  s.addText(L.accounts.note, { x: 1.85, y: 4.6, w: 10.6, h: 1.3, fontSize: 16, color: C.text1, valign: "middle", margin: 0, isTextBox: true, lineSpacingMultiple: LS });

  // 6–9 dashboards
  pres.addSection({ title: L.sections[2] });
  const dash = (cfg, img, color, imageLeft) => {
    const sl = content(L.sections[2], cfg.title);
    const ix = imageLeft ? 0.6 : 5.1, tx = imageLeft ? 8.6 : 0.6;
    frame(sl, img, ix, 1.45, 7.6, 4.75, cfg.title);
    kpiRow(sl, cfg.kpis, tx, 1.45, 4.1, color);
    bullets(sl, cfg.points, tx, 4.1, 4.1, 2.2, 16);
    return sl;
  };
  dash(L.school, "school.png", HEX.blue, true);

  s = content(L.sections[2], L.modules.title);
  SCHOOL_GROUPS.forEach(([g, items], i) => {
    const col = i % 3, row = Math.floor(i / 3);
    const x = 0.6 + col * 4.1, y = 1.45 + row * 1.85, w = 3.9, h = 1.65;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h, rectRadius: 0.12, fill: { color: i === 8 ? HEX.soft : HEX.white }, line: { color: HEX.line, width: 1 }, objectName: `group ${g}` });
    s.addText(g, { x: x + 0.25, y: y + 0.15, w: w - 0.5, h: 0.4, fontSize: 16, bold: true, color: C.accent1, valign: "middle", margin: 0, isTextBox: true, fontFace: "Calibri" });
    s.addText(items, { x: x + 0.25, y: y + 0.58, w: w - 0.5, h: 0.95, fontSize: 13, color: HEX.ink, valign: "top", margin: 0, isTextBox: true, fontFace: "Calibri" });
  });

  dash(L.college, "college.png", HEX.violet, false);
  dash(L.sports, "sports.png", HEX.emerald, true);

  // 10. module + mobile
  s = content(L.sections[2], L.mobile.title);
  frame(s, "module.png", 0.6, 1.45, 7.0, 4.375, "Module screen");
  s.addText(L.mobile.capA, { x: 0.6, y: 5.95, w: 7.0, h: 0.4, fontSize: 14, color: HEX.muted, margin: 0, isTextBox: true });
  const ph = 4.6, pw = ph * (390 / 844);
  frame(s, "mobile-login.png", 8.3, 1.45, pw, ph, "Mobile login");
  frame(s, "mobile-dashboard.png", 8.3 + pw + 0.35, 1.45, pw, ph, "Mobile dashboard");
  s.addText(L.mobile.capB, { x: 8.3, y: 6.15, w: pw, h: 0.35, fontSize: 12, color: HEX.muted, align: "center", margin: 0, isTextBox: true });
  s.addText(L.mobile.capC, { x: 8.3 + pw + 0.35, y: 6.15, w: pw, h: 0.35, fontSize: 12, color: HEX.muted, align: "center", margin: 0, isTextBox: true });

  // 11. tech
  pres.addSection({ title: L.sections[3] });
  s = content(L.sections[3], L.tech.title);
  L.tech.stack.forEach(([h, d], i) => {
    const y = 1.5 + i * 1.3;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.6, y, w: 5.6, h: 1.1, rectRadius: 0.12, fill: { color: HEX.white }, line: { color: HEX.line, width: 1 }, shadow: shadow(), objectName: `tech ${i + 1}` });
    numCircle(s, i + 1, 0.85, y + 0.28, 0.55, [C.accent1, C.accent2, C.accent3, C.accent4][i]);
    s.addText(h, { x: 1.65, y: y + 0.12, w: 4.4, h: 0.45, fontSize: 18, bold: true, color: C.text1, valign: "middle", margin: 0, isTextBox: true });
    s.addText(d, { x: 1.65, y: y + 0.57, w: 4.4, h: 0.4, fontSize: 14, color: HEX.muted, valign: "middle", margin: 0, isTextBox: true });
  });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 6.7, y: 1.5, w: 6.0, h: 5.0, rectRadius: 0.15, fill: { color: HEX.navy }, line: { color: HEX.navy, width: 0 }, objectName: "folder tree box" });
  s.addText(TREE, { x: 7.0, y: 1.75, w: 5.5, h: 4.5, fontSize: 13, fontFace: "Courier New", color: "E0E7FF", valign: "top", margin: 0, isTextBox: true, objectName: "folder tree" });

  // 12. run
  s = content(L.sections[3], L.run.title);
  L.run.steps.forEach(([h, cmd], i) => {
    const y = 1.5 + i * 1.25;
    numCircle(s, i + 1, 0.6, y + 0.2, 0.6, C.accent1);
    s.addText(h, { x: 1.4, y, w: 4.6, h: 0.5, fontSize: 18, bold: true, color: C.text1, valign: "middle", margin: 0, isTextBox: true });
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 1.4, y: y + 0.52, w: 5.6, h: 0.5, rectRadius: 0.08, fill: { color: "F1F5F9" }, line: { color: HEX.line, width: 1 }, objectName: `cmd ${i + 1}` });
    s.addText(cmd, { x: 1.55, y: y + 0.52, w: 5.4, h: 0.5, fontSize: 14, fontFace: "Courier New", color: HEX.ink, valign: "middle", margin: 0, isTextBox: true });
  });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 7.7, y: 1.5, w: 5.0, h: 3.0, rectRadius: 0.15, fill: { color: HEX.soft }, line: { color: HEX.soft, width: 0 }, objectName: "next steps box" });
  s.addText(L.run.nextTitle, { x: 8.05, y: 1.75, w: 4.3, h: 0.55, fontSize: 22, bold: true, color: C.accent1, valign: "middle", margin: 0, isTextBox: true });
  bullets(s, L.run.next, 8.05, 2.5, 4.3, 1.8, 16);

  // 13. thanks
  s = pres.addSlide({ masterName: "DARK_TITLE", sectionTitle: L.sections[3] });
  s.addImage({ path: path.join(__dirname, "deckshots", "logo.png"), x: 0.8, y: 1.0, w: 1.1, h: 1.1, objectName: "logo", altText: "EduSphere logo" });
  s.addText(L.thanks, { placeholder: "title" });
  s.addText(L.thanksSub, { placeholder: "body" });

  const out = path.join(__dirname, "output", L.file);
  await pres.writeFile({ fileName: out });
  await applyTheme(out, THEME);
  console.log("wrote", out);
}

(async () => {
  require("fs").mkdirSync(path.join(__dirname, "output"), { recursive: true });
  await build("en");
  await build("hi");
})();
