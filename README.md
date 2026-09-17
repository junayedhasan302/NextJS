# Next.js Complete Learning Guide (Bangla)

> **যাদের জন্য এই guide:** যারা React-এর fundamentals (component, props, state, event, `useEffect`) জানে কিন্তু Next.js-এ নতুন।
> **Router:** শুধুমাত্র modern **App Router**. Pages Router শুধু তখনই আসবে যখন পার্থক্য বোঝানো দরকার।
> **Version base:** Next.js **16.3.x** (2026), Node.js **20.9+**.
> **ভাষা:** ব্যাখ্যা বাংলায়, code / API / keyword / file name ইংরেজিতে।

---

## ⚠️ শুরুতেই পড়ে নাও — কোন কোন terminology বদলে গেছে

অনেক পুরোনো tutorial এখনো YouTube/blog-এ আছে। নিচের পরিবর্তনগুলো না জানলে তুমি পুরোনো জিনিস শিখে ফেলবে।

| পুরোনো (Next.js 13–15 era) | এখন (Next.js 16.x) | মন্তব্য |
|---|---|---|
| `middleware.ts` | **`proxy.ts`** | `middleware.ts` এখনো চলে কিন্তু **deprecated** |
| `fetch()` default-ভাবে cached | **default-ভাবে cached নয়** | Next.js 15 থেকে পরিবর্তিত |
| "Server Actions" | **"Server Functions"** (docs-এর নতুন নাম) | concept একই, `'use server'` |
| `params` / `searchParams` sync object | **`Promise`** — `await` করতে হয় | Next.js 15 থেকে |
| `cookies()` / `headers()` sync | **async** — `await` করতে হয় | Next.js 15 থেকে |
| route-level `export const revalidate` | **`use cache` + `cacheLife()`** (Cache Components) | নতুন model, opt-in |
| Webpack default bundler | **Turbopack** default | Next.js 16 |
| `next/image` পুরোনো defaults | নতুন defaults | Next.js 16 breaking change |

> **নোট:** এই guide-এ যেখানে দুটো model আছে (বিশেষ করে caching), সেখানে **দুটোই** দেখানো হয়েছে — কারণ নতুন model (`cacheComponents`) এখনো **opt-in flag**, আর বেশিরভাগ real project এখনো পুরোনো/default model-এ চলছে।

---

## 📑 Table of Contents

- Phase 0 — Prerequisites
- Phase 1 — Next.js Foundation
- Phase 2 — App Router & Routing
- Phase 3 — Special File Conventions
- Phase 4 — Server & Client Components
- Phase 5 — Rendering
- Phase 6 — Data Fetching & Caching
- Phase 7 — Search Params & URL State
- Phase 8 — Forms & Mutations (Server Functions)
- Phase 9 — Route Handlers / API
- Phase 10 — Cookies & Headers
- Phase 11 — Authentication & Authorization
- Phase 12 — Proxy (আগের Middleware)
- Phase 13 — Images
- Phase 14 — Fonts
- Phase 15 — Metadata & SEO
- Phase 16 — Database
- Phase 17 — Environment Variables
- Phase 18 — Error Handling
- Phase 19 — Performance
- Phase 20 — Accessibility
- Phase 21 — Security
- Phase 22 — TypeScript with Next.js
- Phase 23 — Testing
- Phase 24 — Deployment
- Phase 25 — Real Project Architecture
- Phase 26 — Build Projects
- Complete Learning Roadmap
- Documentation References

---

# Phase 0 — Prerequisites

Next.js শেখার আগে নিচের জিনিসগুলো "কাজ চালানোর মতো" জানা দরকার। এখানে এগুলো শেখানো হবে না — শুধু **কেন দরকার** সেটা বলা হবে, যাতে তোমার কোথায় ফাঁক আছে বুঝতে পারো।

| বিষয় | কেন দরকার |
|---|---|
| **HTML** | Next.js শেষমেশ HTML-ই পাঠায়। Semantic tag (`header`, `main`, `nav`, `form`) না জানলে SEO আর accessibility দুটোই ভাঙবে। |
| **CSS** | Layout, responsive design, Tailwind — সবই CSS-এর উপর। `flex`, `grid`, media query জানা লাগবে। |
| **JavaScript** | Next.js একটা JS framework। function, object, array method (`map`, `filter`), scope না জানলে কিছুই বোঝা যাবে না। |
| **ES6+** | `import/export`, destructuring, spread, arrow function, template literal, optional chaining — Next.js code-এ প্রতি লাইনে আছে। |
| **TypeScript basics** | `create-next-app` এখন default-এ TypeScript দেয়। `type`, `interface`, generic-এর basic ধারণা না থাকলে error message ভয় লাগবে। |
| **React components** | Next.js-এর page, layout — সবই React component। |
| **Props** | Server Component থেকে Client Component-এ data পাঠানোর একমাত্র রাস্তা props। |
| **State** | `useState` — শুধু Client Component-এ চলে। কোথায় state দরকার সেটা বোঝা Next.js-এ সবচেয়ে বড় সিদ্ধান্ত। |
| **Events** | `onClick`, `onChange` — এগুলো browser-এর জিনিস, তাই Client Component লাগে। |
| **useEffect** | Next.js-এ তুমি অনেক কম `useEffect` লিখবে (data fetching server-এ চলে যায়) — কিন্তু কখন **লাগে না** সেটা বুঝতে হলে আগে জানতে হবে কী করে। |
| **async/await, Promise** | Server Component নিজেই `async` হতে পারে। `params`, `cookies()` সব Promise। |
| **API, HTTP, JSON** | `GET`/`POST`, status code, header, JSON parse — Route Handler আর data fetching-এর ভিত্তি। |
| **Git / GitHub** | Deployment (Vercel ইত্যাদি) git push-এর উপর চলে। |

### Practice Task

একটা plain React (Vite) project-এ একটা component বানাও যেটা `useEffect` দিয়ে `https://jsonplaceholder.typicode.com/posts` থেকে data এনে list দেখায় — loading আর error state সহ।
পরে Phase 6-এ দেখবে Next.js-এ এই একই কাজ কত কম code-এ হয়। তুলনাটা মনে রাখার জন্যই এটা আগে করা দরকার।

### What I should be able to explain

1. `useEffect` দিয়ে data fetch করলে "loading flash" কেন হয়?
2. `props` আর `state`-এর মূল পার্থক্য কী?
3. `async function` একটা Promise return করে — এর মানে কী?
4. `interface` আর `type` দিয়ে object-এর shape কীভাবে লিখি?

---

# Phase 1 — Next.js Foundation

## 1. What is Next.js?

#### Definition

**Next.js হলো React-এর উপরে তৈরি একটা full-stack framework।** React নিজে শুধু একটা UI library — সে শুধু জানে "state পেলে screen-এ কী দেখাবে"। কিন্তু একটা real website বানাতে আরও অনেক কিছু দরকার: routing, server-side rendering, data fetching, image optimization, SEO metadata, API endpoint, bundling, deployment। Next.js এই সব একসাথে দেয়।

**কোন problem solve করে?** Plain React (Vite/CRA) দিয়ে site বানালে তোমাকে নিজে ঠিক করতে হয়:
- URL অনুযায়ী কোন component দেখাবে → নিজে `react-router` লাগাও
- Google bot খালি `<div id="root"></div>` দেখে → SEO খারাপ
- সব JavaScript একসাথে browser-এ যায় → প্রথম load ধীর
- Backend API আলাদা project-এ লিখতে হয়

Next.js এগুলোর জন্য **convention** ঠিক করে দেয়: folder বানালেই route হয়ে যায়, component default-ভাবে server-এ render হয়, একই project-এ backend code লেখা যায়।

**ভেতরে কী হচ্ছে (beginner level)?** Next.js-এর দুইটা অংশ:
1. একটা **build tool** (Turbopack) — তোমার code bundle করে।
2. একটা **server** — request এলে ঠিক করে: এই page-টা আগে থেকেই HTML বানানো আছে (static), নাকি এখন বানাতে হবে (dynamic)। তারপর HTML পাঠায়, সাথে সামান্য JavaScript পাঠায় যাতে browser-এ interactivity যোগ হয় (এটাকে **hydration** বলে)।

#### Real-life Analogy

React = একজন দক্ষ **রাজমিস্ত্রি**। তাকে ইট-সিমেন্ট দিলে সুন্দর দেয়াল বানিয়ে দেবে। কিন্তু বাড়ির নকশা, রাস্তা, বিদ্যুৎ লাইন, পানির লাইন, gate — এগুলো তার কাজ না।

Next.js = পুরো **housing project-এর contractor**। রাজমিস্ত্রি (React) তার টিমেই আছে, কিন্তু সাথে নকশা, রাস্তা (routing), বিদ্যুৎ (server), নিরাপত্তা (auth) — সব প্যাকেজে দেওয়া।

#### Where I use this concept

- **ব্যবহার করব:** blog, e-commerce, dashboard, marketing site, SaaS — অর্থাৎ যেখানে SEO, fast first load, বা server-side data দরকার।
- **কেন বাছব:** convention আগে থেকেই ঠিক, তাই টিমে সবাই একই ভাবে code লেখে; আর performance-এর অনেক কাজ free-তে পাওয়া যায়।
- **কখন ব্যবহার করব না:** পুরোপুরি internal admin tool যেটা login-এর পেছনে, SEO দরকার নেই, আর একটা static host-এ চললেই হয় — সেখানে plain Vite + React যথেষ্ট আর হালকা। একটা mobile app-এর জন্যও Next.js নয় (React Native)।

#### Example

```bash
npx create-next-app@latest my-app
cd my-app
npm run dev
```

তিন লাইনেই তোমার কাছে routing + server + TypeScript + Tailwind সহ একটা full-stack project তৈরি।

#### Common mistakes

- ❌ ভাবা যে "Next.js মানে React-এর আরেকটা version" — না, Next.js React **ব্যবহার করে**।
- ❌ Next.js-এ এসেও সব component-এ `useState` + `useEffect` দিয়ে data আনা (Phase 4 ও 6-এ কেন ভুল সেটা দেখবে)।

#### Practice

তোমার আগের বানানো একটা plain React project-এর নাম লিখে ফেলো, আর পাশে লিখো — এই project-এ Next.js-এর কোন ৩টা feature কাজে লাগত?

---

## 2. React vs Next.js

#### Definition

React একটা **library**: তুমি ঠিক করো কী কী tool জোড়া লাগাবে।
Next.js একটা **framework**: সে ঠিক করে দেয় কোথায় কী থাকবে, তুমি সেই নিয়ম মেনে চলো।

| বিষয় | React (Vite) | Next.js (App Router) |
|---|---|---|
| Routing | নিজে library লাগাও (`react-router`) | folder structure = route |
| Rendering | সব browser-এ (CSR) | default server-এ (RSC), দরকারমতো static/dynamic |
| Data fetching | `useEffect` / React Query | `async` Server Component-এ সরাসরি `await` |
| Backend | আলাদা project দরকার | একই project-এ `route.ts`, Server Function |
| SEO | কঠিন | built-in Metadata API |
| Image / Font | manual | `next/image`, `next/font` |
| Bundling | তুমি config করো | Turbopack, built-in code splitting |

#### Real-life Analogy

React = **কাঁচা বাজার**। যা যা লাগবে নিজে বেছে কেনো — স্বাধীনতা বেশি, সময় বেশি লাগে।
Next.js = **রান্না করা থালি**। সব একসাথে সাজানো, কিন্তু নিয়ম মেনে খেতে হবে।

#### Where I use this concept

Interview-এ এই প্রশ্ন প্রায় নিশ্চিত আসে। আর project শুরুর সময় সিদ্ধান্ত নিতে লাগে: "এটার কি SEO দরকার? server থেকে data লাগবে?" — হ্যাঁ হলে Next.js।

#### Common mistake

❌ "Next.js সব ক্ষেত্রেই ভালো" — না। Next.js-এর mental model (server vs client) শেখার একটা cost আছে। ছোট client-only app-এ সেটা খরচ বৃথা।

---

## 3. Why Next.js exists

#### Definition

Plain React-এর তিনটা মূল সমস্যা ছিল:

1. **খালি HTML সমস্যা (SEO + first paint):** browser প্রথমে একটা ফাঁকা `div` পায়, তারপর JS download হয়, তারপর content আসে। search engine আর ধীর network-এ এটা খারাপ।
2. **সব JavaScript client-এ যাওয়া:** একটা date formatting library শুধু text সাজানোর জন্য 70KB JS browser-এ পাঠানো হচ্ছে — অথচ কাজটা server-এ হয়ে গেলে browser-এ 0KB লাগত।
3. **Data fetching waterfall:** parent load → effect চলে → fetch → child render → আবার effect → আবার fetch। প্রতিটা ধাপ browser থেকে server-এ round trip।

Next.js-এর উত্তর: **যে কাজটা server-এ হতে পারে, সেটা server-এ হোক; শুধু যেটা browser ছাড়া সম্ভব নয় সেটা client-এ যাক।**

#### Real-life Analogy

আগে: রেস্টুরেন্টে গিয়ে তোমাকে কাঁচা সবজি, মসলা আর চুলা দেওয়া হলো — নিজে রান্না করো।
এখন: রান্না রান্নাঘরে (server) হলো, প্লেটে সাজানো খাবার এলো (HTML), শুধু লবণটা তুমি টেবিলে ছিটিয়ে নিলে (client interactivity)।

#### Practice

তোমার আগের React project-এ Network tab খুলে দেখো JS bundle কত KB। মনে রেখো সংখ্যাটা — Phase 19-এ তুলনা করবে।

---

## 4. Next.js architecture (beginner level)

#### Definition

একটা request-এর জীবনচক্র:

```text
Browser (user URL হিট করল)
      ↓
proxy.ts  (থাকলে — redirect / rewrite / header)
      ↓
Router (URL মিলিয়ে কোন folder-এর page.tsx?)
      ↓
Server Rendering
   ├── Server Components চলে (DB/API call এখানে)
   └── Client Components-এর শুধু placeholder + props তৈরি হয়
      ↓
HTML + RSC payload + ছোট JS bundle → Browser
      ↓
Hydration (Client Components জীবিত হয়, onClick কাজ করে)
```

তিনটা "জায়গা" সারাক্ষণ মাথায় রাখতে হবে:

| জায়গা | কী থাকে | উদাহরণ |
|---|---|---|
| **Build time** | আগে থেকে HTML বানানো | static blog page |
| **Request time (server)** | প্রতি request-এ server-এ চলে | logged-in user-এর dashboard |
| **Client (browser)** | user-এর interaction | modal open, form typing |

#### Real-life Analogy

**Build time** = সকালে আগেই বানিয়ে রাখা পরোটা (যে চাইবে সাথে সাথে পাবে)।
**Request time** = order দিলে তখন বানানো বিরিয়ানি।
**Client** = টেবিলে বসে তুমি নিজে আচার মেখে নেওয়া।

#### Common mistake

❌ ভুলে যাওয়া যে Server Component-এর code browser-এ **কখনোই** যায় না। তাই সেখানে `window` লিখলে crash, আর সেখানে API key রাখলে সেটা নিরাপদ (Phase 17)।

---

## 5. `create-next-app`

#### Definition

`create-next-app` হলো official scaffolding CLI — এক command-এ একটা চলমান Next.js project বানিয়ে দেয় (dependency, config, folder structure সব সহ)।

#### Where I use this concept

নতুন project শুরু করার সময়। হাতে `package.json` লিখে Next.js setup করা যায়, কিন্তু কোনো কারণ নেই।

#### Example

```bash
# interactive — প্রশ্ন জিজ্ঞেস করবে
npx create-next-app@latest

# প্রশ্ন ছাড়া, default দিয়ে
npx create-next-app@latest my-app --yes
```

Default setup-এ পাও: **TypeScript, Tailwind CSS, ESLint, App Router, Turbopack**, import alias `@/*`, আর coding agent-এর জন্য একটা `AGENTS.md`।

#### Common mistakes

- ❌ `create-next-app` (version pin ছাড়া) পুরোনো global copy থেকে চালানো → `@latest` লেখো।
- ❌ Node version পুরোনো। Next.js 16-এ **Node.js 20.9+** লাগে। `node -v` দিয়ে দেখে নাও।

---

## 6 & 7. Project তৈরি করা এবং dev server চালানো

#### Example

```bash
npx create-next-app@latest nextjs-practice
cd nextjs-practice
npm run dev
```

`http://localhost:3000` খোলো। এখন `app/page.tsx` ফাইলে কিছু লিখে save করো — browser নিজে থেকেই update হবে। এটাকে **Fast Refresh** বলে (state হারায় না)।

#### Common mistake

❌ `npm run build` করে `npm start` দিয়ে development করা — তখন Fast Refresh পাবে না। development-এ সবসময় `npm run dev`।

---

## 8. Project structure

#### Definition

```text
my-app/
├── app/                 ← তোমার সব route + UI এখানে
│   ├── layout.tsx       ← root layout (বাধ্যতামূলক)
│   ├── page.tsx         ← "/" route
│   ├── globals.css
│   └── favicon.ico
├── public/              ← static file (image, robots.txt)
├── next.config.ts       ← framework config
├── tsconfig.json
├── package.json
├── eslint.config.mjs
└── .env.local           ← secret (git-এ যাবে না)
```

#### Real-life Analogy

`app/` = বাড়ির ভেতরের ঘরগুলো (প্রতিটা ঘরের একটা ঠিকানা/URL আছে)।
`public/` = বাড়ির সামনের উঠোন — যে কেউ সরাসরি ঢুকে জিনিস নিতে পারে।
`next.config.ts` = বাড়ির নকশার কাগজ।

#### Common mistake

❌ `app/` folder-এর ভেতরে random component রেখে ভাবা যে ওটা route হয়ে যাবে। **শুধু `page.tsx` (আর `route.ts`) route তৈরি করে** — বাকি file গুলো নিছক file (Phase 2-এ private folder ও colocation দেখবে)।

---

## 9. `app` directory

#### Definition

`app/` হলো App Router-এর ভিত্তি। এই folder-এর ভেতরের **folder structure-ই তোমার URL structure**। আর এখানের component গুলো **default-ভাবে Server Component**।

#### Example

```text
app/page.tsx          →  /
app/about/page.tsx    →  /about
app/blog/page.tsx     →  /blog
```

#### Common mistake

❌ একই সাথে `app/` আর পুরোনো `pages/` folder-এ একই route রাখা → conflict error। নতুন শেখার সময় `pages/` একদমই ধরো না।

---

## 10. `page.tsx`

#### Definition

`page.tsx` একটা folder-কে **publicly accessible route** বানায়। এর default export একটা React component, যেটা ওই URL-এর মূল content।

#### Real-life Analogy

Folder = ঘর। `page.tsx` = ঘরের **দরজা**। দরজা না থাকলে ঘরটা আছে, কিন্তু কেউ ঢুকতে পারে না (URL 404 দেবে)।

#### Where I use this concept

প্রতিটা নতুন page বানানোর সময়। মনে রাখার সহজ নিয়ম: **নতুন URL দরকার মানে নতুন folder + `page.tsx`**।

#### Example

```tsx
// app/about/page.tsx  →  /about
export default function AboutPage() {
  return (
    <main>
      <h1>আমাদের সম্পর্কে</h1>
    </main>
  );
}
```

#### Common mistakes

- ❌ `export default` না দেওয়া → Next.js component খুঁজে পাবে না।
- ❌ file-এর নাম `Page.tsx` বা `pages.tsx` লেখা। নাম **হুবহু** `page.tsx` হতে হবে।

#### Practice

`app/contact/page.tsx` বানিয়ে `/contact`-এ একটা heading দেখাও।

---

## 11. `layout.tsx`

#### Definition

`layout.tsx` হলো এমন UI যেটা তার ভেতরের সব page-এর মধ্যে **শেয়ার** হয় এবং navigation-এ **re-render হয় না, state হারায় না**। সে `children` prop পায় — ওখানেই ভেতরের page বসে।

`app/layout.tsx` (root layout) **বাধ্যতামূলক**, আর এখানেই `<html>` ও `<body>` tag লিখতে হয়।

#### Real-life Analogy

Layout = একটা **ছবির ফ্রেম**, `children` = ভেতরের ছবি। ছবি বদলালেও ফ্রেম একই থাকে — খুলে আবার লাগাতে হয় না।

#### Where I use this concept

- Navbar, footer, sidebar
- `/dashboard/*`-এর সব page-এ একই sidebar
- Global font, theme provider, HTML lang attribute

**কখন layout নয়:** যদি চাও navigation-এ প্রতিবার fresh হোক (যেমন প্রতিবার animation চালানো), তাহলে `template.tsx` (Phase 3)।

#### Example

```tsx
// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "My Site",
  description: "Next.js শেখার practice project",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn">
      <body>
        <header>Navbar</header>
        {children}
        <footer>© 2026</footer>
      </body>
    </html>
  );
}
```

**Code ব্যাখ্যা:** `children` হচ্ছে current route-এর `page.tsx`। `lang="bn"` accessibility ও SEO-র জন্য গুরুত্বপূর্ণ। `metadata` export করলেই Next.js `<title>` ও `<meta description>` বসিয়ে দেয় (Phase 15)।

#### Common mistakes

- ❌ root layout থেকে `<html>`/`<body>` বাদ দেওয়া → error।
- ❌ root layout-এ `"use client"` লিখে দেওয়া → পুরো app client-side হয়ে যাবে, সব benefit শেষ।
- ❌ layout-এ user-specific data fetch করে ভাবা যে navigation-এ refresh হবে — layout re-render হয় না, তাই সেটা page-এ রাখো।

---

## 12. `globals.css`

#### Definition

Global stylesheet — শুধু **root layout**-এ import করা হয়, তাই পুরো app-এ apply হয়। `create-next-app`-এ এখানেই Tailwind import করা থাকে।

#### Example

```css
/* app/globals.css */
@import "tailwindcss";

body {
  font-family: system-ui, sans-serif;
}
```

#### Common mistake

❌ একই global CSS একাধিক layout-এ import করা → duplicate style। Global CSS **একবার**, root layout-এ। Component-specific style-এর জন্য CSS Module (`Button.module.css`) বা Tailwind class।

---

## 13. `public`

#### Definition

`public/` folder-এর file গুলো সরাসরি site-এর root থেকে serve হয়। `public/logo.png` → `/logo.png`।

#### Where I use this concept

Logo, `robots.txt`, `favicon`, download-able PDF, OG image।
**ব্যবহার করব না:** user-upload করা file (ওটা S3/Cloudinary-তে), বা কোনো private file — `public/` মানে **সবাই দেখতে পারবে**।

#### Example

```tsx
import Image from "next/image";

<Image src="/logo.png" alt="Logo" width={120} height={40} />
```

#### Common mistake

❌ `src="/public/logo.png"` লেখা। path-এ `public` শব্দটা **থাকবে না**।

---

## 14. `next.config.ts`

#### Definition

Framework-level configuration file। Remote image domain, redirect, experimental flag — এসব এখানে।

#### Example

```ts
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  // নতুন caching model চালু করতে চাইলে (opt-in):
  // cacheComponents: true,
};

export default nextConfig;
```

#### Common mistake

❌ config বদলে dev server restart না করা — `next.config.ts`-এর পরিবর্তন Fast Refresh-এ আসে না, **restart লাগে**।

---

## 15. TypeScript configuration

#### Definition

`create-next-app` নিজেই `tsconfig.json` বানায় এবং প্রথম dev run-এ `next-env.d.ts` তৈরি করে। সবচেয়ে কাজের অংশ হলো **path alias**:

```json
{
  "compilerOptions": {
    "paths": { "@/*": ["./*"] }
  }
}
```

এর ফলে:

```ts
// ❌ import Button from "../../../components/Button";
import Button from "@/components/Button";
```

#### Common mistake

❌ `next-env.d.ts` হাতে edit করা — ওটা auto-generated। এবং এটা git-এ রাখো (delete করো না)।

---

## 16. npm scripts

| Command | কাজ |
|---|---|
| `npm run dev` | development server (Fast Refresh, detailed error) |
| `npm run build` | production build তৈরি (`.next/`) |
| `npm start` | build করা production server চালানো |
| `npm run lint` | ESLint চালানো |

#### Common mistake

❌ deploy-এর আগে কখনো local-এ `npm run build` না চালানো। অনেক error (type error, prerender error) **শুধু build-এ ধরা পড়ে**, `dev`-এ নয়।

---

## 17. Development vs Production

| | Development (`dev`) | Production (`build` + `start`) |
|---|---|---|
| Speed | ধীর (on-demand compile) | দ্রুত (optimized, minified) |
| Error | পুরো stack trace, overlay | generic message, log-এ detail |
| Caching | অনেক caching বন্ধ | পুরো caching চালু |
| Static generation | প্রতি request-এ render | build-এ একবার |

#### Real-life Analogy

Development = রান্নাঘর, সব উপকরণ ছড়ানো, স্বাদ চেখে দেখা যায়।
Production = পরিবেশন করা প্লেট, সাজানো, দ্রুত, কিন্তু ভেতরে হাত দেওয়া যায় না।

#### Common mistake

❌ "dev-এ তো কাজ করছিল!" — caching আর static generation-এর আচরণ production-এ আলাদা। তাই কোনো data-related সন্দেহ হলে `npm run build && npm start` দিয়ে যাচাই করো।

---

## Phase 1 — Practice Task

একটা নতুন project বানাও, তারপর:
1. Root layout-এ একটা navbar দাও যেটায় Home, About, Contact link আছে (আপাতত `<a>` দিয়েই, Phase 2-এ `Link` শিখব)।
2. `/`, `/about`, `/contact` — তিনটা page বানাও।
3. `public/`-এ একটা logo রাখো আর navbar-এ দেখাও।
4. `npm run build` চালিয়ে দেখো output-এ কোন page গুলো static (`○`) দেখাচ্ছে।

## What I should be able to explain

1. `page.tsx` কে special কেন?
2. `page.tsx` আর `layout.tsx`-এর পার্থক্য কী?
3. `app/about/page.tsx` কীভাবে `/about` হয়?
4. Root layout-এ `<html>` আর `<body>` কেন লিখতে হয়?
5. `public/` folder-এ কী রাখা উচিত নয় এবং কেন?

## Real Project Connection

Real project-এ Phase 1-এর সিদ্ধান্তগুলোই সবচেয়ে বেশিদিন টেকে: root layout-এ font/theme/analytics বসানো, alias (`@/`) ঠিক করা, `next.config` এ image domain whitelist করা। এগুলো ভুল হলে পরে পুরো codebase জুড়ে refactor লাগে।

## Common Interview Questions

1. Next.js কেন React-এর উপরে একটা framework হিসেবে দরকার হলো?
2. App Router-এ route তৈরি হয় কীভাবে?
3. Root layout-এর দায়িত্ব কী কী?
4. Development আর production build-এ আচরণগত পার্থক্য কী?
5. `public/` folder আর `app/` folder-এর ভূমিকা কীভাবে আলাদা?

---

# Phase 2 — App Router & Routing

## 1. App Router

#### Definition

App Router হলো Next.js 13-এ আসা router, যেটা **React Server Components**-এর উপরে তৈরি। এটা file-system based routing দেয়, সাথে nested layout, loading state, error boundary — সব file convention দিয়ে।

পুরোনো **Pages Router** (`pages/` folder) এখনো support করা হয়, কিন্তু নতুন সব feature App Router-এ আসে। **তুমি App Router শিখবে।**

#### Real-life Analogy

Pages Router = পুরোনো ঢাকার গলি: প্রতিটা বাড়ির ঠিকানা আছে, কিন্তু সব বাড়ি আলাদা, শেয়ার করা কিছু নেই।
App Router = planned apartment complex: প্রতিটা floor-এর নিজের common space (layout) আছে, আর ভেতরের flat (page) বদলালেও floor-এর corridor বদলায় না।

#### Common mistake

❌ YouTube tutorial দেখে `getServerSideProps` / `getStaticProps` লেখা। এগুলো **Pages Router-এর জিনিস**, App Router-এ কাজ করবে না। App Router-এ data আসে `async` Server Component-এ সরাসরি।

---

## 2. File-system based routing

#### Definition

তুমি আলাদা কোনো route config লেখো না। **Folder = URL segment**, আর সেই folder-এর `page.tsx` = ওই URL-এর content।

#### Real-life Analogy

তোমার computer-এর folder path আর website-এর URL একই জিনিস — `Documents/CV/2026` যেমন একটা path, `products/phones/iphone` তেমনই একটা URL।

#### Example — একটা structure থেকে URL

```text
app/
├── page.tsx                    →  /
├── about/
│   └── page.tsx                →  /about
├── products/
│   ├── page.tsx                →  /products
│   └── [id]/
│       └── page.tsx            →  /products/1, /products/42, ...
└── blog/
    └── [slug]/
        └── page.tsx            →  /blog/hello-world
```

**নিয়মগুলো:**
- folder-এর নাম = URL-এর সেই অংশ
- `[বর্গাকার]` = dynamic segment (যেকোনো মান বসবে)
- যে folder-এ `page.tsx` নেই, সেটা URL-এ থাকলেও 404 (সে শুধু path-এর অংশ হতে পারে)

#### Common mistake

❌ `app/products/[id].tsx` লেখা (Pages Router-এর style)। App Router-এ **folder** dynamic হয়, তারপর ভেতরে `page.tsx`: `app/products/[id]/page.tsx`।

---

## 3. Static routes

সবচেয়ে সরল route — folder-এর নাম যেমন, URL-ও তেমন।

```text
app/pricing/page.tsx   →  /pricing
```

---

## 4. Nested routes

#### Definition

Folder-এর ভেতরে folder = URL-এর ভেতরে segment।

```text
app/dashboard/settings/profile/page.tsx  →  /dashboard/settings/profile
```

এখানে `/dashboard` ও `/dashboard/settings`-এর নিজেদের `page.tsx` থাকতেও পারে, নাও পারে। না থাকলে ওই URL গুলো 404 হবে, কিন্তু ভেতরের route ঠিকই কাজ করবে।

#### Where I use this concept

Dashboard, documentation site, category → sub-category structure।

---

## 5 & 6. Dynamic routes এবং route parameters

#### Definition

যখন URL-এর একটা অংশ আগে থেকে জানা নেই (product id, blog slug, username), তখন folder-এর নাম `[]`-এ রাখো। Next.js ওই মানটা `params` হিসেবে page-কে দেয়।

**গুরুত্বপূর্ণ (Next.js 15+):** `params` এখন একটা **Promise** — `await` করতে হয়।

#### Real-life Analogy

`[id]` হলো একটা **ফাঁকা ঘর বিশিষ্ট form**: "পণ্য নম্বর ____"। একটাই form দিয়ে হাজারটা পণ্যের কাজ চলে।

#### Where I use this concept

- `/products/[id]` — একটা page দিয়ে ১০,০০০ product
- `/blog/[slug]`
- `/users/[username]`

**কখন নয়:** মাত্র ৩-৪টা fixed page হলে (`/about`, `/contact`) dynamic route বানিয়ে জটিল করার দরকার নেই।

#### Example

```tsx
// app/products/[id]/page.tsx
type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;

  return <h1>Product ID: {id}</h1>;
}
```

**ব্যাখ্যা:** URL `/products/42` হলে `id` হবে `"42"` — **সবসময় string**, number নয়। দরকার হলে `Number(id)` করো। `params` Promise, তাই component `async` আর `await params`।

#### Common mistakes

- ❌ `params.id` সরাসরি পড়া (`await` ছাড়া) → Next.js 16-এ error।
- ❌ `id`-কে number ধরে নিয়ে হিসাব করা।
- ❌ `params` থেকে আসা মান যাচাই না করেই সরাসরি database query-তে বসানো (Phase 21 — validation)।

---

## 7. Catch-all routes — `[...slug]`

#### Definition

একটার বেশি segment একসাথে ধরতে চাইলে `[...slug]`। এটা `slug`-কে একটা **array** হিসেবে দেয়।

```text
app/docs/[...slug]/page.tsx

/docs/a         →  slug = ["a"]
/docs/a/b       →  slug = ["a", "b"]
/docs/a/b/c     →  slug = ["a", "b", "c"]
/docs           →  ❌ 404 (অন্তত একটা segment লাগবে)
```

#### Where I use this concept

Documentation site, CMS থেকে আসা যেকোনো গভীরতার path, file browser।

#### Example

```tsx
// app/docs/[...slug]/page.tsx
export default async function DocsPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  return <p>Path: {slug.join(" / ")}</p>;
}
```

---

## 8. Optional catch-all routes — `[[...slug]]`

#### Definition

Catch-all-এর মতোই, কিন্তু **কোনো segment না থাকলেও** কাজ করে।

```text
app/shop/[[...slug]]/page.tsx

/shop           →  slug = undefined
/shop/men       →  slug = ["men"]
/shop/men/shoes →  slug = ["men", "shoes"]
```

#### Common mistake

❌ `slug` সবসময় array ধরে `slug.join(...)` লেখা — optional হলে সে `undefined` হতে পারে। `slug?.join("/") ?? ""` লেখো।

---

## 9. Route Groups — `(name)`

#### Definition

প্রথম বন্ধনীতে (`(marketing)`) রাখা folder **URL-এ আসে না**। এটা শুধু code organize করার আর **আলাদা layout দেওয়ার** জন্য।

#### Real-life Analogy

অফিসে "Sales টিম" আর "Support টিম" — দুটো আলাদা টিম, আলাদা বসার জায়গা (layout), কিন্তু customer-এর কাছে অফিসের ঠিকানা (URL) একটাই।

#### Where I use this concept

- Marketing page গুলোর একটা layout (বড় navbar + footer), আর dashboard-এর আরেকটা (sidebar) — কিন্তু দুটোই root-level URL।
- একটা বড় team-এ feature অনুযায়ী folder ভাগ করা।

#### Example

```text
app/
├── (marketing)/
│   ├── layout.tsx        ← navbar + footer
│   ├── page.tsx          →  /
│   └── about/page.tsx    →  /about
└── (dashboard)/
    ├── layout.tsx        ← sidebar
    └── dashboard/page.tsx →  /dashboard
```

লক্ষ্য করো: `(marketing)` URL-এ নেই।

#### Common mistakes

- ❌ দুইটা route group-এ একই resolved path বানানো (দুটোতেই `page.tsx` root-এ) → conflict error।
- ❌ ভাবা যে route group নিজেই একটা URL — না, সে অদৃশ্য।

---

## 10. Private folders — `_name`

#### Definition

Underscore দিয়ে শুরু folder (`_components`, `_lib`) routing system থেকে **সম্পূর্ণ বাদ** — সেখানে `page.tsx` থাকলেও route হবে না।

#### Where I use this concept

`app/` এর ভেতরেই কোনো route-এর পাশে তার নিজের component রাখতে চাইলে (**colocation**):

```text
app/dashboard/
├── page.tsx
├── _components/
│   ├── Chart.tsx
│   └── StatCard.tsx
└── _lib/
    └── formatCurrency.ts
```

> আসলে `app/` এর ভেতরে যেকোনো non-`page` file এমনিতেই route হয় না। কিন্তু `_` prefix দিয়ে **intent স্পষ্ট** হয়: "এটা কখনোই route নয়।"

---

## 11 & 12. Multiple layouts এবং nested layouts

#### Definition

প্রতিটা folder-এ নিজের `layout.tsx` থাকতে পারে। Next.js সেগুলোকে **বাইরের থেকে ভেতরের দিকে nest** করে।

#### Example

```text
app/
├── layout.tsx                 ← root: html, body, font
└── dashboard/
    ├── layout.tsx             ← sidebar
    ├── page.tsx               →  /dashboard
    └── settings/
        ├── layout.tsx         ← settings tabs
        └── page.tsx           →  /dashboard/settings
```

`/dashboard/settings` render হলে বাস্তবে যা তৈরি হয়:

```text
RootLayout
 └── DashboardLayout
      └── SettingsLayout
           └── SettingsPage
```

```tsx
// app/dashboard/layout.tsx
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <aside>Sidebar</aside>
      <section className="flex-1">{children}</section>
    </div>
  );
}
```

#### Real-life Analogy

রাশিয়ান পুতুল (matryoshka): বাইরের পুতুলের ভেতরে ছোট পুতুল, তার ভেতরে আরও ছোট। সবচেয়ে ভেতরের পুতুল = তোমার `page.tsx`।

#### Common mistake

❌ nested layout-এ আবার `<html>`/`<body>` লেখা — শুধু root layout-এ।

---

## 13 & 14. `next/link` দিয়ে navigation

#### Definition

`<Link>` হলো HTML `<a>`-এর উপরে Next.js-এর wrapper। পার্থক্য: এটা **client-side navigation** করে — পুরো page reload হয় না, শুধু বদলে যাওয়া অংশটা আসে। সাথে সে link গুলো **prefetch** করে রাখে, তাই click করলে প্রায় সাথে সাথেই page আসে।

#### Real-life Analogy

`<a>` = প্রতিবার বই বন্ধ করে আবার প্রথম পাতা থেকে খুলে ওই অধ্যায়ে যাওয়া।
`<Link>` = বইয়ের ভেতরে bookmark দেওয়া পাতায় সরাসরি লাফ দেওয়া — ফ্রেম (layout) খোলাই থাকে।

#### Where I use this concept

App-এর ভেতরের যেকোনো navigation-এ **সবসময়** `<Link>`। বাইরের site-এ যেতে সাধারণ `<a>` ঠিক আছে।

#### Example

```tsx
import Link from "next/link";

export default function Nav() {
  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/products">Products</Link>
      <Link href={`/products/${1}`}>প্রথম product</Link>
      <a href="https://nextjs.org" target="_blank" rel="noopener noreferrer">
        Docs
      </a>
    </nav>
  );
}
```

### Programmatic navigation — `useRouter`

কোনো event-এর পরে (যেমন button click) navigate করতে হলে Client Component-এ:

```tsx
"use client";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  return <button onClick={() => router.back()}>পেছনে</button>;
}
```

> `useRouter` অবশ্যই `next/navigation` থেকে (পুরোনো `next/router` = Pages Router)।

#### Common mistakes

- ❌ internal link-এ `<a href="/about">` ব্যবহার → full page reload, layout state হারানো, ধীর navigation।
- ❌ Server Component-এ `useRouter` ব্যবহারের চেষ্টা → error। navigation event দরকার হলে ছোট একটা Client Component বানাও।
- ❌ শুধু navigation-এর জন্য `onClick={() => router.push("/x")}` লেখা — `<Link>` ব্যবহার করলে SEO আর prefetch দুটোই পাও।

---

## 15, 16, 17. Redirects এবং `redirect()` / `permanentRedirect()`

#### Definition

- **`redirect(path)`** — server-এ চলার সময় user-কে অন্য route-এ পাঠায়, **307** (temporary) status দিয়ে (Server Function-এ হলে 303)।
- **`permanentRedirect(path)`** — **308** (permanent), SEO-তে "এই URL চিরতরে সরে গেছে" বোঝায়।
- **`next.config.ts` এর `redirects`** — config-level, request-এর একদম শুরুতে হয়, কোনো rendering ছাড়াই।

#### Real-life Analogy

`redirect()` = "স্যার, আজ এই কাউন্টার বন্ধ, পাশের কাউন্টারে যান।"
`permanentRedirect()` = "এই অফিস স্থায়ীভাবে নতুন ঠিকানায় চলে গেছে — ঠিকানার খাতায় লিখে নিন।" (browser আর search engine এটা মনে রাখে)

#### Where I use this concept

- login না থাকলে `/login`-এ পাঠানো → `redirect()`
- Form submit সফল হলে detail page-এ পাঠানো → `redirect()`
- পুরোনো URL structure বদলেছে (`/blog/123` → `/posts/123`) → `permanentRedirect()` বা config redirect

#### Example

```tsx
// app/dashboard/page.tsx
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";

export default async function DashboardPage() {
  const session = await getSession();

  if (!session) {
    redirect("/login"); // এর নিচের code আর চলবে না
  }

  return <h1>স্বাগতম, {session.user.name}</h1>;
}
```

```ts
// next.config.ts — পুরোনো URL সরানো
const nextConfig = {
  async redirects() {
    return [
      { source: "/old-blog/:slug", destination: "/blog/:slug", permanent: true },
    ];
  },
};
```

#### Common mistakes

- ❌ `return redirect("/login")` লেখার দরকার নেই — সে একটা error **throw** করে, তাই execution ওখানেই থামে।
- ❌ `try { ... } catch {}` এর ভেতরে `redirect()` রাখা → catch সেই internal error গিলে ফেলবে, redirect হবে না। `try` block-এর **বাইরে** রাখো।
- ❌ ভুল করে সবসময় `permanent: true` দেওয়া — browser এটা cache করে ফেলে, পরে বদলানো কষ্টকর। সন্দেহ হলে temporary।

---

## 18. `notFound()`

#### Definition

`notFound()` call করলে Next.js rendering থামিয়ে সবচেয়ে কাছের `not-found.tsx` UI দেখায় এবং **404** status পাঠায়।

#### Real-life Analogy

লাইব্রেরিতে বইয়ের নম্বর দিয়ে খুঁজতে গিয়ে দেখলে shelf খালি — তখন "এই বই আমাদের কাছে নেই" বোর্ড টাঙিয়ে দেওয়া।

#### Where I use this concept

Dynamic route-এ database-এ record না পাওয়া গেলে। এটা খুব জরুরি: না হলে `/products/999999` একটা ফাঁকা বা crash page দেখাবে, আর Google সেটাকে **200 OK** ভেবে index করে ফেলবে।

#### Example

```tsx
// app/products/[id]/page.tsx
import { notFound } from "next/navigation";
import { getProduct } from "@/lib/products";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  return <h1>{product.name}</h1>;
}
```

```tsx
// app/products/[id]/not-found.tsx
export default function ProductNotFound() {
  return <p>এই product টি পাওয়া যায়নি।</p>;
}
```

#### Common mistake

❌ `notFound()`-এর বদলে `return <p>Not found</p>` লেখা → status code 200 থাকে, SEO-র জন্য ক্ষতিকর।

---

## Phase 2 — Practice Task

একটা mini shop বানাও:

```text
app/
├── layout.tsx
├── page.tsx
├── (marketing)/about/page.tsx
├── products/
│   ├── page.tsx           ← hardcoded array থেকে list, প্রতিটায় Link
│   └── [id]/
│       ├── page.tsx       ← না পেলে notFound()
│       └── not-found.tsx
└── docs/[...slug]/page.tsx
```

`/products/999`-এ গিয়ে দেখো তোমার `not-found.tsx` আসছে কি না।

## What I should be able to explain

1. `app/products/[id]/page.tsx` কোন কোন URL ধরবে?
2. `[...slug]` আর `[[...slug]]`-এর পার্থক্য কী?
3. Route group `(marketing)` URL-এ আসে না — তাহলে সে কী কাজে লাগে?
4. `<Link>` আর `<a>`-এর ভেতরের পার্থক্য কী?
5. `redirect()` আর `permanentRedirect()` কখন কোনটা?

## Real Project Connection

Real project-এ routing structure মানে business structure। একটা e-commerce team-এ `(shop)`, `(account)`, `(admin)` route group আলাদা থাকে যাতে প্রতিটার নিজের layout, নিজের auth rule থাকে। URL structure একবার public হয়ে গেলে বদলানো মানে SEO risk — তাই শুরুতেই ভাবা হয়।

## Common Interview Questions

1. App Router-এ file-system routing কীভাবে কাজ করে?
2. Nested layout navigation-এ re-render হয় না — এর সুবিধা কী?
3. Dynamic route-এর `params` কেন এখন `await` করতে হয়?
4. `notFound()` ব্যবহার না করলে SEO-তে কী সমস্যা হয়?
5. Route group আর private folder — দুটোর উদ্দেশ্য কীভাবে আলাদা?

---

# Phase 3 — Special File Conventions

App Router-এ কিছু file-এর নাম framework-এর কাছে **বিশেষ অর্থ** বহন করে। এগুলো মুখস্থ করার জিনিস নয় — প্রতিটার একটা নির্দিষ্ট দায়িত্ব আছে।

## এক নজরে

| File | দায়িত্ব | কখন render হয় |
|---|---|---|
| `page.tsx` | route-এর মূল UI | ওই URL-এ |
| `layout.tsx` | শেয়ার করা shell (`children` পায়) | একবার, navigation-এ টিকে থাকে |
| `template.tsx` | layout-এর মতো, কিন্তু প্রতি navigation-এ নতুন instance | প্রতিবার |
| `loading.tsx` | loading UI (Suspense fallback) | data আসার অপেক্ষায় |
| `error.tsx` | error boundary (Client Component) | render-এ exception হলে |
| `not-found.tsx` | 404 UI | `notFound()` call-এ বা unmatched URL-এ |
| `global-error.tsx` | root layout-এর error | root-এ crash হলে |
| `default.tsx` | parallel route-এর fallback slot | slot-এর state না জানা গেলে |
| `route.ts` | HTTP API endpoint | request এলে |

## Nesting-এর ছবি

একটা route render হলে Next.js নিজে থেকে এভাবে wrap করে:

```text
<Layout>
  <Template>
    <ErrorBoundary fallback={<error.tsx />}>
      <Suspense fallback={<loading.tsx />}>
        <NotFoundBoundary fallback={<not-found.tsx />}>
          <Page />
        </NotFoundBoundary>
      </Suspense>
    </ErrorBoundary>
  </Template>
</Layout>
```

এই ছবিটা মনে রাখলে অনেক "আমার error.tsx কাজ করছে না কেন" টাইপ সমস্যার উত্তর পেয়ে যাবে — কারণ **boundary সবসময় নিজের ভেতরের জিনিসকে রক্ষা করে, নিজেকে নয়**।

---

## `template.tsx`

#### Definition

`layout.tsx`-এর মতোই `children` পায়, কিন্তু প্রতিবার navigation-এ **নতুন instance** তৈরি হয় — DOM নতুন হয়, state reset হয়, `useEffect` আবার চলে।

#### Real-life Analogy

Layout = একই ফ্রেমে ছবি বদলানো।
Template = প্রতিবার নতুন ফ্রেমসহ নতুন ছবি টাঙানো।

#### Where I use this concept

- প্রতি page navigation-এ enter animation চালাতে
- প্রতি page view-এ analytics event পাঠাতে
- এমন form যেটা প্রতিবার ফাঁকা থাকা উচিত

**ব্যবহার করব না:** সাধারণ navbar/sidebar-এ — ওটা `layout.tsx`, কারণ template বারবার তৈরি হওয়া মানে বেশি কাজ।

#### Example

```tsx
// app/dashboard/template.tsx
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="animate-in fade-in">{children}</div>;
}
```

---

## `loading.tsx`

#### Definition

কোনো folder-এ `loading.tsx` রাখলে Next.js সেই route segment-কে স্বয়ংক্রিয়ভাবে একটা `<Suspense>` boundary-তে মুড়ে দেয়, আর তোমার `loading.tsx`-কে fallback বানায়। ফলে server-এ data আসার আগেই user instantly কিছু দেখে।

#### Real-life Analogy

রেস্টুরেন্টে অর্ডারের পর সাথে সাথে পানি আর মেনু কার্ড দেওয়া — খাবার আসতে দেরি হলেও তুমি বসে থাকো না, "কিছু একটা হচ্ছে" বুঝতে পারো।

#### Example

```tsx
// app/products/loading.tsx
export default function Loading() {
  return (
    <div className="space-y-2">
      <div className="h-6 w-40 animate-pulse rounded bg-gray-200" />
      <div className="h-6 w-64 animate-pulse rounded bg-gray-200" />
    </div>
  );
}
```

#### Common mistakes

- ❌ শুধু "Loading..." লেখা। **Skeleton** দিলে layout shift কমে, user-এর কাছে দ্রুত মনে হয়।
- ❌ ভাবা যে `loading.tsx` client-side fetch-এর জন্যও কাজ করবে — এটা **server render/data**-এর জন্য।

---

## `error.tsx`

#### Definition

একটা route segment-এর **error boundary**। render-এর সময় unexpected exception হলে পুরো app crash না করে এই UI দেখায়। এটা **অবশ্যই Client Component** (`"use client"`), কারণ এর জন্য React-এর error boundary API আর `reset()` button লাগে।

#### Real-life Analogy

বাড়ির circuit breaker: একটা ঘরে short circuit হলে শুধু ওই ঘরের লাইন বন্ধ হয়, পুরো বাড়ি অন্ধকার হয় না — আর switch টিপে (`reset()`) আবার চালু করার সুযোগ থাকে।

#### Example

```tsx
// app/products/error.tsx
"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div>
      <h2>কিছু একটা সমস্যা হয়েছে</h2>
      <button onClick={() => reset()}>আবার চেষ্টা করুন</button>
    </div>
  );
}
```

**ব্যাখ্যা:** `reset()` ওই segment-টা আবার render করার চেষ্টা করে। Production-এ `error.message` user-কে দেখানো হয় না (secret leak হতে পারে) — শুধু `digest` দিয়ে server log-এ মিলিয়ে দেখা যায়।

#### Common mistakes

- ❌ `"use client"` না দেওয়া → কাজ করবে না।
- ❌ ভাবা যে এটা একই segment-এর `layout.tsx`-এর error ধরবে — ধরবে **না** (boundary layout-এর ভেতরে থাকে)। Layout-এর error ধরতে হলে এক ধাপ উপরের `error.tsx`, আর root layout-এর জন্য `global-error.tsx`।
- ❌ expected error (যেমন "ভুল password") এর জন্য `error.tsx`-এর উপর ভরসা করা। Expected error **return** করো, throw করো না (Phase 8 ও 18)।

---

## `not-found.tsx`

`notFound()` call করলে বা কোনো URL না মিললে render হয়। `app/not-found.tsx` পুরো app-এর global 404।

```tsx
// app/not-found.tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <h2>পাতাটি খুঁজে পাওয়া যায়নি</h2>
      <Link href="/">হোমে ফিরুন</Link>
    </div>
  );
}
```

---

## `default.tsx`

Parallel routes (`@slot` folder) ব্যবহার করলে, full page reload-এর পর Next.js কোনো slot-এর আগের state জানে না। তখন সে সেই slot-এর `default.tsx` দেখায়। Parallel/intercepting route একটা advanced feature — শুরুতে না ধরলেও চলবে, শুধু জেনে রাখো `default.tsx` এই কারণে থাকে।

---

## `route.ts`

একই folder-এ `page.tsx` হলো UI, আর `route.ts` হলো **API endpoint** (HTTP method export করে)। বিস্তারিত Phase 9-এ।

> ⚠️ একই folder-এ `page.tsx` আর `route.ts` **একসাথে রাখা যায় না** — দুজনেই একই URL দাবি করে।

---

## Phase 3 — Practice Task

Phase 2-এর shop project-এ যোগ করো:
1. `app/products/loading.tsx` — skeleton সহ।
2. `app/products/error.tsx` — reset button সহ।
3. `getProduct()` ফাংশনে ইচ্ছে করে `throw new Error("DB down")` বসিয়ে দেখো `error.tsx` আসে কি না, তারপর সরিয়ে ফেলো।
4. `app/not-found.tsx` বানাও, তারপর `/random-url`-এ যাও।

## What I should be able to explain

1. `layout.tsx` আর `template.tsx` কখন কোনটা দরকার?
2. `loading.tsx` ভেতরে আসলে কোন React feature ব্যবহার করে?
3. `error.tsx` কেন Client Component হতে বাধ্য?
4. একই segment-এর `layout.tsx`-এ error হলে সেই segment-এর `error.tsx` কেন ধরে না?
5. `not-found.tsx` আর `error.tsx`-এর দায়িত্ব কীভাবে আলাদা?

## Real Project Connection

Production app-এ এই file গুলোই "খারাপ দিন"-এর অভিজ্ঞতা ঠিক করে। API ধীর হলে user skeleton দেখে (bounce কমে), DB পড়ে গেলে একটা ঘর ভাঙে — পুরো site নয়। Review-তে প্রায়ই ধরা পড়ে: "এই নতুন route-এ `loading` আর `error` নেই কেন?"

## Common Interview Questions

1. App Router-এর special file গুলো কীভাবে nest হয়?
2. `loading.tsx` কীভাবে streaming-এর সাথে যুক্ত?
3. `error.tsx`-এর `reset()` আসলে কী করে?
4. `global-error.tsx` কখন লাগে?
5. একই route-এ `page.tsx` আর `route.ts` একসাথে রাখলে কী হয় এবং কেন?

---

# Phase 4 — Server & Client Components

> এটা App Router-এর **সবচেয়ে গুরুত্বপূর্ণ** mental model। এখানে ভুল বুঝলে বাকি সব phase-এ ভুগবে। ধীরে পড়ো।

## 1. React Server Components (RSC)

#### Definition

Server Component হলো এমন React component যেটার code **শুধু server-এ execute হয়** এবং যার JavaScript **browser-এ পাঠানোই হয় না**। সে render হয়ে একটা serialized description (RSC payload) তৈরি করে, আর browser সেটা থেকে UI বসায়।

**কোন problem solve করে?** আগে যেকোনো component-এর code browser-এ যেতে বাধ্য ছিল। ফলে:
- data আনতে হলে browser থেকে API call → extra round trip
- ব্যবহৃত প্রতিটা library-র ওজন user-এর bundle-এ যোগ হতো
- database credential কখনো component-এ রাখা যেত না

Server Component-এ তুমি সরাসরি `await db.query(...)` লিখতে পারো, আর ওই code-এর এক byte-ও user-এর কাছে যায় না।

**ভেতরে কী হচ্ছে?** Server render করে একটা tree description বানায় — কোথায় HTML, আর কোথায় "এখানে একটা Client Component বসবে, তার props এই" এমন placeholder। Browser সেই description পড়ে, শুধু Client Component গুলোর JS download করে চালায়।

#### Real-life Analogy

Server Component = **রান্নাঘর**। মসলা, তেল, চুলা (database, secret, ভারী library) সব ভেতরে থাকে; customer শুধু প্লেট (render হওয়া UI) পায়। রান্নাঘরটা কেউ দেখে না, বহনও করতে হয় না।

Client Component = **টেবিলের লবণদানি**। এটা customer-এর হাতের কাছেই থাকতে হবে, কারণ সে নিজে ছিটাবে (interaction)।

---

## 2 & 5. Next.js-এ Server Components এবং কেন default

App Router-এ `app/` folder-এর **প্রতিটা component default-ভাবে Server Component** — আলাদা কিছু লিখতে হয় না।

কেন default? কারণ অধিকাংশ UI আসলে static: heading, paragraph, card, table, product list। এগুলোর জন্য browser-এ JavaScript পাঠানো নিছক অপচয়। তাই Next.js উল্টো নিয়ম করেছে: **default-এ কিছুই client-এ যাবে না; যেখানে সত্যিই দরকার, সেখানে তুমি স্পষ্ট করে চাইবে।**

---

## 3 & 4. Client Components এবং `"use client"`

#### Definition

File-এর একদম **প্রথম লাইনে** `"use client"` লিখলে সেই file (এবং সে যা import করে, তার প্রায় সবটা) client bundle-এ যায়। তখন সেখানে state, effect, event handler, browser API — সব ব্যবহার করা যায়।

`"use client"` কোনো "on switch" নয় — এটা একটা **boundary marker**: "এই বিন্দু থেকে নিচের দিকে সব client-side"।

#### Real-life Analogy

`"use client"` = রান্নাঘর আর ডাইনিং-এর মাঝের **দরজা**। দরজার এপাশ (client) customer-এর এলাকা। একবার দরজা পেরিয়ে গেলে সেখানে আর চুলা নেই।

#### Example

```tsx
// app/_components/Counter.tsx
"use client";

import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      চাপা হয়েছে {count} বার
    </button>
  );
}
```

```tsx
// app/page.tsx  ← Server Component (কোনো "use client" নেই)
import Counter from "./_components/Counter";

export default async function Home() {
  const res = await fetch("https://api.example.com/stats", { cache: "no-store" });
  const stats = await res.json();

  return (
    <main>
      <h1>মোট ব্যবহারকারী: {stats.users}</h1>
      <Counter />
    </main>
  );
}
```

**ব্যাখ্যা:** `Home` server-এ চলে, তাই সে সরাসরি `await fetch` করতে পারে — কোনো `useEffect`, কোনো loading state লাগে না। `Counter`-এর `onClick` দরকার, তাই সে client। User-এর browser-এ শুধু `Counter`-এর JS যায়, `Home`-এর নয়।

---

## 6 & 7. কখন কোনটা ব্যবহার করব

| তোমার দরকার | কোনটা |
|---|---|
| Database / ORM query | **Server** |
| Secret / API key ব্যবহার | **Server** |
| External API থেকে data আনা | **Server** |
| বড় library দিয়ে data process (markdown, date, sanitize) | **Server** |
| SEO-র জন্য HTML-এ content থাকা | **Server** |
| `useState`, `useReducer` | **Client** |
| `useEffect` | **Client** |
| `onClick`, `onChange`, `onSubmit` handler | **Client** |
| `window`, `localStorage`, `navigator` | **Client** |
| Browser-only library (chart, map, animation) | **Client** |
| Custom hook (state/effect ব্যবহার করে) | **Client** |
| Context Provider | **Client** |

**সোনালি নিয়ম:** default-এ Server; আর interactivity দরকার হলে সেই ছোট্ট অংশটুকুকেই Client বানাও — পুরো page-কে নয়।

---

## 8. Server vs Client mental model

```text
┌──────────────────── SERVER ────────────────────┐
│  Server Component                              │
│  ✅ async/await, DB, secret, fs, ভারী library   │
│  ❌ useState, useEffect, onClick, window       │
│                                                │
│        ↓ props (JSON-serializable মাত্র)        │
│                                                │
│  ┌───────────── "use client" boundary ───────┐ │
│  │  Client Component                         │ │
│  │  ✅ state, effect, event, browser API      │ │
│  │  ❌ DB query, secret, fs                   │ │
│  └───────────────────────────────────────────┘ │
└────────────────────────────────────────────────┘
```

দিক একমুখী: **Server → Client props পাঠাতে পারে। Client → Server সরাসরি data আনতে পারে না** (তাকে Server Function বা Route Handler-এ call করতে হয়, Phase 8 ও 9)।

---

## 9 & 10. Server-এ কী করা যায়, browser-এ কী লাগে

**Server-এ (Server Component):** file system পড়া, database query, secret env var, ভারী parsing/formatting, third-party API call token সহ, data caching।

**Browser লাগে (Client Component):** যেকোনো state যা user-এর interaction-এ বদলায়, keyboard/mouse event, scroll/resize listener, `localStorage`, geolocation, canvas/WebGL, audio/video control, real-time WebSocket।

---

## 11 & 12. Server → Client props পাঠানো

#### Definition

Server Component তার Client Component-কে props দিতে পারে, কিন্তু props গুলো **serializable** হতে হবে (string, number, boolean, null, array, plain object, Date, এবং Server Function reference)। **Function, class instance, Map/Set, JSX-বহির্ভূত complex object পাঠানো যাবে না।**

#### Real-life Analogy

রান্নাঘর থেকে টেবিলে খাবার পাঠানো যায় (data)। কিন্তু "চুলাটা" পাঠানো যায় না (function/connection) — সেটা রান্নাঘরেই থাকবে।

#### Example — সঠিক pattern

```tsx
// app/products/page.tsx  ← Server
import { getProducts } from "@/lib/products";
import ProductFilter from "./_components/ProductFilter";

export default async function ProductsPage() {
  const products = await getProducts(); // DB query server-এ

  return <ProductFilter products={products} />; // plain data পাঠালাম
}
```

```tsx
// app/products/_components/ProductFilter.tsx  ← Client
"use client";
import { useState } from "react";

type Product = { id: number; name: string };

export default function ProductFilter({ products }: { products: Product[] }) {
  const [query, setQuery] = useState("");
  const visible = products.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      <ul>{visible.map((p) => <li key={p.id}>{p.name}</li>)}</ul>
    </>
  );
}
```

**ব্যাখ্যা:** data আনার ভারী কাজ server-এ, আর শুধু search box-এর state client-এ। Database driver-এর এক লাইনও browser-এ যায়নি।

---

## 13. Client → Server-এর সীমাবদ্ধতা

Client Component:
- Server Component **import করতে পারে না** (import করলে সেটাও client হয়ে যায়)
- সরাসরি database query করতে পারে না
- server-only env var পড়তে পারে না

তাহলে Client Component-এর ভেতরে server-rendered content চাই কীভাবে? **`children` হিসেবে pass করে** — এই pattern খুব গুরুত্বপূর্ণ:

```tsx
// Client — শুধু interactive shell
"use client";
import { useState } from "react";

export default function Accordion({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setOpen(!open)}>টগল</button>
      {open && children}
    </div>
  );
}
```

```tsx
// Server — ভেতরের content server-এই render হলো
import Accordion from "./Accordion";
import { getTerms } from "@/lib/terms";

export default async function Page() {
  const terms = await getTerms();
  return (
    <Accordion>
      <article>{terms.text}</article>
    </Accordion>
  );
}
```

**মূল কথা:** `children` হিসেবে পাঠানো JSX **server-এ render হয়ে** যায়, Client Component শুধু সেটা বসায়। তাই client boundary "উপরে উঠে" content-কে গিলে ফেলে না।

---

## 14. Component boundaries

একবার `"use client"` দিলে সেই component **এবং তার সব child import** client bundle-এ যায়। তাই boundary যত **নিচে** (leaf-এর কাছে) রাখবে, bundle তত ছোট।

```text
❌ খারাপ                               ✅ ভালো
app/page.tsx ("use client")            app/page.tsx (server)
 └── ProductList  (client হয়ে গেল)      ├── ProductList (server)
      └── LikeButton (client)           └── LikeButton ("use client")
পুরো tree browser-এ                     শুধু button browser-এ
```

---

## 15. `"use client"` নিয়ে সাধারণ ভুল

- ❌ **root layout-এ `"use client"`** → পুরো app client-side, সব benefit শেষ।
- ❌ error দেখে অন্ধভাবে `"use client"` বসানো। আগে পড়ো error-টা কী বলছে — প্রায়ই সমাধান হলো interactive অংশটা **আলাদা ছোট component**-এ সরানো।
- ❌ Client Component-এ `useEffect` দিয়ে data fetch করা যেটা Server Component-এ এক লাইনে `await` করা যেত।
- ❌ Client Component-এ secret ব্যবহার (`process.env.API_KEY`) → server-এ `undefined`-এর মতো আচরণ বা bundle-এ leak (Phase 17)।
- ❌ Server Component-এ `onClick` দেওয়া → error: event handler serialize করা যায় না।
- ❌ Client Component-এ Server Component import করে "server-এ চলবে" ভাবা।
- ❌ `"use client"` file-এর মাঝখানে বা কোনো function-এর ভেতরে লেখা — এটা file-এর **একদম প্রথম লাইনে** হতে হবে (comment বাদে)।

---

## Phase 4 — Practice Task

একটা page বানাও যেখানে:
1. Server Component একটা API থেকে ১০টা post আনে (`https://jsonplaceholder.typicode.com/posts?_limit=10`)।
2. একটা Client Component (`SearchBox`) title দিয়ে filter করে।
3. প্রতিটা post-এ একটা `LikeButton` (client, local state) থাকে।
4. তারপর browser-এর DevTools → Network → JS filter দিয়ে দেখো কত JS load হলো।
5. এখন ইচ্ছে করে page-এর উপরে `"use client"` বসিয়ে আবার মাপো — পার্থক্যটা নিজে দেখো, তারপর সরিয়ে ফেলো।

## What I should be able to explain

1. Server Component-এ `useState` কেন কাজ করে না?
2. `"use client"` একটা file-এ দিলে আর কী কী client হয়ে যায়?
3. Server → Client props-এ কী পাঠানো যায় না এবং কেন?
4. Client Component-এর ভেতরে server-rendered content দিতে হলে কী করব?
5. `"use client"` boundary নিচে রাখার সুবিধা কী?

## Real Project Connection

Code review-তে সবচেয়ে বেশি যে আলোচনা হয়: "এটা client হওয়ার দরকার ছিল কি?" একটা dashboard-এ chart library (client) আর data query (server) আলাদা রাখলে bundle অর্ধেক হয়ে যেতে পারে। Senior দের কাজের একটা বড় অংশ হলো boundary ঠিক জায়গায় বসানো।

## Common Interview Questions

1. React Server Component আর SSR-এর পার্থক্য কী?
2. `"use client"` আসলে bundler-কে কী বলে?
3. Client Component কেন Server Component import করতে পারে না?
4. Server Component থেকে Client Component-এ function pass করা যায় না — তাহলে Server Function কীভাবে pass হয়?
5. Boundary ভুল জায়গায় বসালে performance-এ কী প্রভাব পড়ে?

---

# Phase 5 — Rendering

## 1. Rendering কী?

#### Definition

Rendering মানে তোমার component code থেকে **HTML/UI তৈরি হওয়া**। মূল প্রশ্ন দুটো: **কোথায়** হচ্ছে (server না browser) আর **কখন** হচ্ছে (build time, request time, না interaction time)।

#### Real-life Analogy

Rendering = **রান্না**। প্রশ্ন হলো কখন রান্না হবে:
- আগেই রান্না করে রাখা (**static** — build time)
- অর্ডার এলে রান্না (**dynamic** — request time)
- টেবিলে বসে নিজে মেখে নেওয়া (**client** — interaction time)

---

## 2. Static rendering

#### Definition

Page-টা **build time-এ** একবার render হয়ে HTML হিসেবে জমা থাকে, তারপর সব user একই HTML পায় (CDN থেকে)। দ্রুততম ও সস্তা।

#### Where I use this concept

Landing page, blog post, docs, product page (যেখানে price সবার জন্য এক), about/contact।

**কখন নয়:** যেখানে content user-নির্দিষ্ট (dashboard) বা প্রতি সেকেন্ডে বদলায় (live score)।

#### Example

```tsx
// app/about/page.tsx — কোনো runtime data নেই → static
export default function AboutPage() {
  return <h1>আমাদের সম্পর্কে</h1>;
}
```

`npm run build` চালালে output-এ এমন চিহ্ন দেখবে:

```text
Route (app)
┌ ○ /about        ← ○ = static (prerendered)
└ ƒ /dashboard    ← ƒ = dynamic (server-rendered on demand)
```

---

## 3. Dynamic rendering

#### Definition

প্রতিটা request-এ server-এ render হয়। কখন হয়? যখন তোমার page **runtime data** পড়ে — অর্থাৎ যে জিনিস আগে থেকে জানা সম্ভব না:

- `cookies()`, `headers()`
- `searchParams`
- `connection()`
- cache না করা `fetch()` / DB query

#### Real-life Analogy

Static = দোকানে সাজিয়ে রাখা তৈরি পোশাক।
Dynamic = তোমার মাপে বানানো পোশাক — সময় লাগবে, কিন্তু তোমার জন্যই।

#### Example

```tsx
// app/dashboard/page.tsx — cookies পড়ছে → dynamic
import { cookies } from "next/headers";

export default async function Dashboard() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;
  return <p>Session: {token ? "আছে" : "নেই"}</p>;
}
```

#### Common mistake

❌ ভুল জায়গায় `cookies()` বা `headers()` পড়ে গোটা page-কে অকারণে dynamic করে ফেলা। শুধু ওই ছোট অংশটাকে আলাদা component-এ রেখে `<Suspense>`-এ মোড়ালে বাকি page static থাকতে পারে।

---

## 4 & 5. Server rendering vs Client rendering

- **Server rendering:** HTML server-এ তৈরি হয়ে আসে। Content সাথে সাথে দেখা যায়, SEO ভালো।
- **Client rendering:** browser-এ JS চলার পরে UI তৈরি হয়। User-specific interactive অংশের জন্য দরকারি, কিন্তু প্রথম content দেরিতে আসে।

App Router-এ Client Component-ও **প্রথমবার server-এ prerender** হয় (HTML-এ থাকে), তারপর browser-এ hydrate হয়। তাই "Client Component মানে খালি div" — এই ধারণা ভুল।

---

## 6 & 7. Streaming এবং Suspense

#### Definition

Streaming মানে পুরো page তৈরি হওয়া পর্যন্ত অপেক্ষা না করে HTML-কে **টুকরো টুকরো করে** পাঠানো। যে অংশ তৈরি, সেটা আগে যায়; ধীর অংশের জায়গায় fallback (skeleton) যায়, পরে আসল content এসে বসে।

`<Suspense>` হলো সেই সীমানা যেখানে তুমি বলো: "এখানে অপেক্ষা করা যাবে, ততক্ষণ এই fallback দেখাও।"

#### Real-life Analogy

বিয়ের খাবার পরিবেশন: সালাদ আর পোলাও আগে চলে এলো, রোস্ট এখনো হচ্ছে — তাই রোস্টের জায়গায় খালি প্লেট রাখা হলো, পরে এসে বসল। সবাই রোস্টের জন্য বসে থাকল না।

#### Where I use this concept

একই page-এ একটা দ্রুত অংশ (product info) আর একটা ধীর অংশ (recommendation, review) থাকলে।

#### Example

```tsx
// app/products/[id]/page.tsx
import { Suspense } from "react";
import ProductInfo from "./ProductInfo";
import Reviews from "./Reviews";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <>
      {/* দ্রুত: সাথে সাথে আসবে */}
      <ProductInfo id={id} />

      {/* ধীর: fallback আগে, পরে content স্ট্রিম হবে */}
      <Suspense fallback={<p>রিভিউ লোড হচ্ছে...</p>}>
        <Reviews id={id} />
      </Suspense>
    </>
  );
}
```

**ব্যাখ্যা:** `Reviews` নিজে একটা `async` Server Component যে ধীর API call করে। `<Suspense>` তার অপেক্ষাটাকে "আলাদা করে ফেলে", যাতে বাকি page আটকে না থাকে।

#### Common mistakes

- ❌ পুরো page-কে একটা `<Suspense>`-এ মুড়ে দেওয়া → তাহলে streaming-এর লাভ নেই, সব একসাথেই অপেক্ষা করবে। **ধীর অংশটাকেই** মোড়াও।
- ❌ ভাবা যে `<Suspense>` একটা component-কে dynamic বানায় — না। সে শুধু **ইতিমধ্যে async/dynamic** component-কে অপেক্ষা করার জায়গা দেয়।

---

## 8. Partial rendering / Partial Prerendering (PPR)

#### Definition

আধুনিক Next.js-এর লক্ষ্য: একই page-এ static আর dynamic **একসাথে**। Page-এর static অংশ (navbar, layout, product description) আগে থেকেই তৈরি একটা **shell** হিসেবে CDN থেকে instantly যায়, আর dynamic গর্তগুলো (cart count, personalized block) request time-এ stream হয়ে এসে বসে।

Next.js 16-এ এই model-টা **Cache Components** নামে আসে — `next.config.ts`-এ `cacheComponents: true` দিয়ে opt-in করতে হয়। চালু করলে নিয়ম উল্টে যায়: **সব route default-এ dynamic**, আর তুমি `use cache` দিয়ে যেটুকু চাও সেটুকু cache/prerender করো (Phase 6)।

#### Real-life Analogy

খবরের কাগজের template আগেই ছাপা (logo, column layout), শুধু আজকের খবরটা বসানো হচ্ছে।

#### Where I use this concept

E-commerce product page: description static (সবার জন্য এক), কিন্তু stock/price/cart dynamic।

---

## 9. Next.js কীভাবে ঠিক করে কোথায়/কখন render হবে

**Default model (cacheComponents ছাড়া):**

```text
Page-এ কোনো runtime API (cookies/headers/searchParams) বা
uncached fetch আছে?
   ├── না  → Static (build-এ prerender)
   └── হ্যাঁ → Dynamic (প্রতি request-এ render)
```

**Cache Components model (opt-in):**

```text
সব কিছু default-এ Dynamic
   └── যেটায় `use cache` আছে → সেটা cached, static shell-এ ঢুকতে পারে
   └── runtime API পড়া অংশ → <Suspense>-এ মুড়তে হবে, stream হবে
```

## Mental model — এক টেবিলে

| | কোথায় | কখন | কার জন্য | উদাহরণ |
|---|---|---|---|---|
| **Static** | server | build time | সবার জন্য একই | blog post |
| **Dynamic** | server | প্রতি request | request অনুযায়ী | dashboard |
| **Server** | server | build বা request | — | (উপরের দুটোই server rendering) |
| **Client** | browser | hydration + interaction | ওই user | modal, form typing |
| **Streaming** | server → browser | ধাপে ধাপে | — | ধীর review section |

> **সতর্কতা:** Static/Dynamic হলো **কখন** render হচ্ছে; Server/Client হলো **কোথায়** code চলছে। দুটো আলাদা অক্ষ — গুলিয়ে ফেলো না। একটা Client Component-ও static page-এর অংশ হতে পারে।

---

## Phase 5 — Practice Task

1. দুটো page বানাও: `/static-demo` (শুধু hardcoded text) আর `/dynamic-demo` (`cookies()` পড়ে)।
2. `npm run build` চালিয়ে output-এ `○` আর `ƒ` চিহ্ন মিলিয়ে দেখো।
3. একটা page-এ ইচ্ছে করে ধীর component বানাও (`await new Promise(r => setTimeout(r, 3000))`) আর সেটাকে `<Suspense>`-এ মোড়াও। বাকি content আগে আসছে কি না দেখো।

## What I should be able to explain

1. Static আর dynamic rendering-এর মধ্যে Next.js কীভাবে সিদ্ধান্ত নেয়?
2. `cookies()` পড়লে page dynamic হয় কেন?
3. Streaming ছাড়া আর `<Suspense>` সহ — user-এর অভিজ্ঞতায় পার্থক্য কী?
4. "Client Component মানে server-এ কিছুই render হয় না" — এটা কি ঠিক? কেন?
5. PPR / Cache Components কোন সমস্যার সমাধান?

## Real Project Connection

Production-এ এই সিদ্ধান্তগুলোই hosting bill আর Core Web Vitals ঠিক করে। একটা marketing page ভুল করে dynamic হয়ে গেলে প্রতি visit-এ server compute খরচ হয়; ঠিকভাবে static হলে CDN থেকে প্রায় বিনামূল্যে যায়। Build output-এর `○`/`ƒ` চিহ্ন তাই team-এ নিয়মিত দেখা হয়।

## Common Interview Questions

1. SSG, SSR, ISR, CSR — App Router-এর ভাষায় এগুলো কীভাবে মেলে?
2. Streaming কীভাবে TTFB আর perceived performance বদলায়?
3. কোন কোন API একটা route-কে dynamic করে দেয়?
4. PPR-এ static shell আর dynamic hole ধারণাটা বুঝিয়ে বলো।
5. Hydration কী এবং hydration mismatch কেন হয়?

---

# Phase 6 — Data Fetching & Caching

> ⚠️ Next.js-এর যে অংশটা version-এ version-এ সবচেয়ে বেশি বদলেছে সেটা হলো caching। তাই এখানে **দুটো model** আলাদা করে দেখানো হয়েছে। কোনো tutorial পড়ার সময় প্রথমেই দেখো সে কোন model-এর কথা বলছে।

## 1, 2, 3. Server Component-এ data fetching

#### Definition

App Router-এ একটা Server Component নিজেই `async` হতে পারে, আর ভেতরে সরাসরি `await` করা যায়। আলাদা কোনো data-fetching API (`getServerSideProps` ইত্যাদি) লাগে না।

#### Real-life Analogy

আগে: ওয়েটার (browser) খাবার আনতে রান্নাঘরে দৌড়ে যেত, ফিরে এসে বলত "এখনো হয়নি", আবার যেত।
এখন: রান্নাঘরই (server) প্লেট সাজিয়ে পাঠায় — দৌড়াদৌড়ি নেই।

#### Example

```tsx
// app/posts/page.tsx
type Post = { id: number; title: string };

export default async function PostsPage() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5");

  if (!res.ok) {
    throw new Error("Post আনতে ব্যর্থ");
  }

  const posts: Post[] = await res.json();

  return (
    <ul>
      {posts.map((p) => <li key={p.id}>{p.title}</li>)}
    </ul>
  );
}
```

**ব্যাখ্যা:** কোনো `useState`, `useEffect`, loading flag নেই। `res.ok` না হলে `throw` → কাছের `error.tsx` ধরবে। Loading UI-এর জন্য পাশে একটা `loading.tsx` রাখলেই হবে।

#### Common mistakes

- ❌ Client Component-এ `useEffect` দিয়ে একই কাজ করা (অপ্রয়োজনীয় round trip + bundle)।
- ❌ `res.ok` না দেখেই `res.json()` — API 500 দিলে অদ্ভুত error পাবে।
- ❌ Server Component-এ নিজের app-এর `/api/...` route-কে `fetch` করা। সেটা **অতিরিক্ত network hop** — সরাসরি ওই ফাংশন/DB call করো।

---

## 4. External API থেকে fetch

```ts
// lib/weather.ts — server-only helper
export async function getWeather(city: string) {
  const res = await fetch(
    `https://api.example.com/weather?city=${encodeURIComponent(city)}`,
    {
      headers: { Authorization: `Bearer ${process.env.WEATHER_API_KEY}` },
      cache: "no-store", // সবসময় তাজা data
    }
  );
  if (!res.ok) throw new Error("Weather API failed");
  return res.json();
}
```

লক্ষ্য করো: API key `process.env.WEATHER_API_KEY` server-এ থাকছে — browser-এ কখনো যাবে না (Phase 17)।

---

## 5. Database থেকে data আনা

```ts
// lib/products.ts
import { prisma } from "@/lib/prisma";

export async function getProducts() {
  return prisma.product.findMany({ orderBy: { createdAt: "desc" } });
}

export async function getProduct(id: string) {
  return prisma.product.findUnique({ where: { id } });
}
```

```tsx
// app/products/page.tsx
import { getProducts } from "@/lib/products";

export default async function ProductsPage() {
  const products = await getProducts();
  return <ul>{products.map((p) => <li key={p.id}>{p.name}</li>)}</ul>;
}
```

`fetch` ছাড়াও (DB, ORM, SDK) সব `await` করা যায়। বিস্তারিত Phase 16-এ।

---

## 6, 7, 8. Parallel vs Sequential fetching এবং waterfall এড়ানো

#### Definition

- **Sequential:** একটার পর একটা — দুটো 500ms call = 1000ms।
- **Parallel:** একসাথে — দুটো 500ms call = ~500ms।

**Waterfall** হলো অপ্রয়োজনীয় sequential chain, যেটা page-কে ধীর করে।

#### Real-life Analogy

Sequential = একজন একজন করে বাজারে পাঠানো: আগে চাল আনো, ফিরে এলে ডাল আনতে যাও।
Parallel = তিনজনকে একসাথে তিন দোকানে পাঠানো।

#### Example — ❌ Waterfall

```tsx
const user = await getUser(id);       // 300ms
const posts = await getPosts(id);     // 300ms (অপেক্ষা করল অকারণে)
// মোট 600ms
```

#### Example — ✅ Parallel

```tsx
const [user, posts] = await Promise.all([
  getUser(id),
  getPosts(id),
]);
// মোট ~300ms
```

#### কখন sequential দরকার

যখন দ্বিতীয় call-এর জন্য প্রথমটার ফল লাগে:

```tsx
const user = await getUser(id);
const team = await getTeam(user.teamId); // teamId আগে লাগবে — বাধ্য হয়ে sequential
```

#### আরেকটা রাস্তা — streaming দিয়ে waterfall লুকিয়ে ফেলা

Parallel করা সম্ভব না হলে ধীর অংশটাকে আলাদা component + `<Suspense>` এ রাখো। তখন user অপেক্ষা করবে না, শুধু ওই box-টা পরে ভরবে।

#### Common mistakes

- ❌ `Promise.all` এ একটা reject হলে সবটা fail — আংশিক ফল চাইলে `Promise.allSettled`।
- ❌ loop-এর ভেতরে `await` (`for (const id of ids) await getX(id)`) → N-বার waterfall। `Promise.all(ids.map(getX))` ব্যবহার করো (তবে খুব বড় array-তে rate limit খেয়াল রাখো)।

---

## 9 & 10. Loading UI এবং error handling

- **Loading:** ওই segment-এ `loading.tsx` রাখো, অথবা নির্দিষ্ট অংশে `<Suspense fallback={...}>`।
- **Error:** ওই segment-এ `error.tsx` (Client Component)।
- **Not found:** data না পেলে `notFound()`।

```tsx
// app/products/[id]/page.tsx
import { notFound } from "next/navigation";
import { getProduct } from "@/lib/products";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) notFound();          // expected: নেই
  return <h1>{product.name}</h1>;    // DB পড়ে গেলে throw হবে → error.tsx
}
```

---

## 11 → 16. Caching: দুটো model

### Model A — Default model (`cacheComponents` বন্ধ)

এটাই এখনকার default আচরণ এবং বেশিরভাগ project-এ এটাই চলছে।

**মূল নিয়ম:** Next.js 15 থেকে **`fetch()` default-এ cache হয় না**। প্রতি request-এ নতুন call যায়।

```tsx
// প্রতিবার নতুন (default)
await fetch(url);

// cache করাও (build/ISR-এ জমা থাকবে)
await fetch(url, { cache: "force-cache" });

// নির্দিষ্ট সময় পর পর revalidate (ISR)
await fetch(url, { next: { revalidate: 3600 } }); // ১ ঘণ্টা

// tag দিয়ে on-demand invalidate করার সুযোগ রাখা
await fetch(url, { next: { tags: ["products"] } });
```

Route-level নিয়ন্ত্রণ (segment config):

```ts
// app/blog/page.tsx
export const revalidate = 600;        // এই route ১০ মিনিট পর পর regenerate
export const dynamic = "force-static"; // জোর করে static
```

`fetch` নয় এমন কাজ (DB query) cache করতে:

```ts
import { unstable_cache } from "next/cache";

export const getProducts = unstable_cache(
  async () => prisma.product.findMany(),
  ["products"],                       // cache key
  { revalidate: 300, tags: ["products"] }
);
```

Mutation-এর পর invalidate:

```ts
import { revalidateTag, revalidatePath } from "next/cache";

revalidateTag("products");
revalidatePath("/products");
```

### Model B — Cache Components (`cacheComponents: true`, Next.js 16)

```ts
// next.config.ts
const nextConfig = { cacheComponents: true };
```

চালু করলে নিয়ম উল্টে যায়: **কিছুই default-এ cached নয়, সব route dynamic।** তুমি স্পষ্ট করে বলো কোনটা cache হবে — `use cache` directive দিয়ে।

```ts
// lib/data.ts
import { cacheLife, cacheTag } from "next/cache";

export async function getProducts() {
  "use cache";              // এই function-এর ফল cache হবে
  cacheTag("products");     // tag, যাতে পরে invalidate করা যায়
  cacheLife("hours");       // কত সময় বৈধ
  return db.query("SELECT * FROM products");
}
```

`cacheLife` profile গুলো:

| Profile | `stale` | `revalidate` | `expire` |
|---|---|---|---|
| `default` | 5m | 15m | never |
| `seconds` | 30s | 1s | 60s |
| `minutes` | 5m | 1m | 1h |
| `hours` | 5m | 1h | 1d |
| `days` | 5m | 1d | 1w |
| `weeks` | 5m | 1w | 30d |
| `max` | 5m | 30d | 1y |

অথবা নিজের মতো:

```ts
"use cache";
cacheLife({ stale: 3600, revalidate: 7200, expire: 86400 });
```

**Invalidate করার দুটো ফাংশন — পার্থক্যটা গুরুত্বপূর্ণ:**

| | `updateTag` | `revalidateTag` |
|---|---|---|
| কোথায় চলে | শুধু Server Function (Server Action) | Server Function + Route Handler |
| আচরণ | সাথে সাথে expire (নতুন data) | stale-while-revalidate (পুরোনো দেখিয়ে পেছনে refresh) |
| কখন | user নিজের পরিবর্তন সাথে সাথে দেখবে | একটু দেরি হলেও সমস্যা নেই (blog, catalog) |

```ts
"use server";
import { updateTag, revalidateTag } from "next/cache";

export async function createPost(formData: FormData) {
  await db.post.create({ data: { title: String(formData.get("title")) } });
  updateTag("posts");                 // নিজের লেখা সাথে সাথে দেখতে পাবে
}

export async function syncCatalog() {
  await pullFromCMS();
  revalidateTag("products", "max");   // দ্বিতীয় argument = cacheLife profile
}
```

> **নোট:** Next.js 16-এ `revalidateTag('tag')` এক argument-এ deprecated — দ্বিতীয় argument হিসেবে profile (`'max'` সাধারণত) দিতে হয়।

**Runtime data + cache একসাথে:** cached scope-এর ভেতরে `cookies()`/`headers()` পড়া যায় না। নিয়ম হলো — **বাইরে পড়ো, ভেতরে argument হিসেবে পাঠাও**:

```tsx
import { cookies } from "next/headers";

async function getUserPlan(userId: string) {
  "use cache";
  cacheTag(`plan:${userId}`);
  return db.plan.find(userId);
}

export default async function Page() {
  const userId = (await cookies()).get("uid")!.value; // cache-এর বাইরে
  const plan = await getUserPlan(userId);             // argument হিসেবে গেল
  return <p>{plan.name}</p>;
}
```

#### Real-life Analogy (caching)

Cache = **ফ্রিজে রাখা রান্না**।
- `cacheLife` = "কত দিন পর্যন্ত খাওয়া নিরাপদ"।
- `cacheTag` = ফ্রিজের বাটির উপরে লেবেল ("মাছ", "ডাল") — যাতে শুধু ওই বাটিটা ফেলে দেওয়া যায়।
- `revalidateTag` = "এই বাটির খাবার বাসি, পরে বদলে দেব — আপাতত এটাই খাওয়াও"।
- `updateTag` = "এখনই ফেলে দাও, নতুন রান্না চাই"।

#### Common caching mistakes

- ❌ পুরোনো tutorial দেখে ধরে নেওয়া যে `fetch` নিজে থেকেই cached — **আর নয়**।
- ❌ user-specific data cache করে ফেলা (একজনের dashboard আরেকজন দেখছে!) — এটা caching-এর সবচেয়ে বিপজ্জনক ভুল। User-specific জিনিস cache করতে হলে key/tag-এ user id রাখো।
- ❌ Mutation-এর পরে invalidate না করা → user নতুন data দেখে না, refresh করেও না।
- ❌ সব কিছুতে `cache: "no-store"` বসিয়ে দেওয়া → পুরো site dynamic, server bill বাড়ে, performance পড়ে।
- ❌ দুটো model-এর API মিশিয়ে ফেলা (`export const revalidate` + `use cache` একসাথে) → `cacheComponents` চালু থাকলে segment config সরিয়ে `cacheLife` ব্যবহার করতে হয়।

---

## Phase 6 — Practice Task

1. `/posts` page বানাও যেটা external API থেকে data আনে, সাথে `loading.tsx` আর `error.tsx`।
2. একটা page-এ দুটো আলাদা API call sequential-ভাবে লিখে time মাপো (`console.time`), তারপর `Promise.all`-এ বদলে আবার মাপো।
3. একটা fetch-এ `{ next: { revalidate: 30 } }` বসাও, `npm run build && npm start` চালিয়ে ৩০ সেকেন্ডের মধ্যে refresh করে দেখো data একই থাকে কি না।
4. বোনাস: `cacheComponents: true` চালু করে একটা helper-এ `use cache` + `cacheTag` + `cacheLife` লিখে দেখো।

## What I should be able to explain

1. Server Component-এ data fetch করলে `useEffect`-এর চেয়ে কোন কোন সুবিধা পাই?
2. Next.js 15+ এ `fetch`-এর default caching আচরণ কী?
3. Request waterfall কী এবং তা ভাঙার দুটো উপায় কী?
4. `updateTag` আর `revalidateTag` কখন কোনটা?
5. User-specific data cache করা কেন বিপজ্জনক?

## Real Project Connection

Production-এ ৮০% performance সমস্যা এই phase-এ ধরা পড়ে: waterfall, over-fetching, ভুল cache। আর সবচেয়ে ভয়ংকর incident-গুলোর একটা হলো "একজনের data আরেকজন দেখছে" — যা প্রায় সবসময় ভুল caching থেকে হয়। তাই review-তে জিজ্ঞেস করা হয়: "এটা cache হচ্ছে? key-তে user আছে?"

## Common Interview Questions

1. App Router-এ data fetching Pages Router থেকে কীভাবে আলাদা?
2. ISR কীভাবে কাজ করে এবং App Router-এ কীভাবে লিখি?
3. `use cache` directive-এর ভূমিকা কী?
4. Stale-while-revalidate মানে কী?
5. Parallel fetching কীভাবে করো এবং `Promise.all`-এর risk কী?

---

# Phase 7 — Search Params & URL State

## 1 vs 2. `params` আর `searchParams` — মূল পার্থক্য

```text
/products/42?category=phone&page=2
           ↑    └────────── searchParams ──────────┘
        params
```

- **`params`** — route-এর **structure** থেকে আসে (`app/products/[id]`)। URL-এর অংশ, folder দিয়ে ঠিক করা।
- **`searchParams`** — `?`-এর পরের **query string**। কোনো folder লাগে না, যেকোনো key আসতে পারে।

দুটোই Next.js 15+ এ **Promise** — `await` করতে হয়।

#### Real-life Analogy

`params` = বাড়ির **ঠিকানা** (কোন বাড়ি)।
`searchParams` = দরজায় গিয়ে দেওয়া **অতিরিক্ত নির্দেশ** ("বড় সাইজটা দেখাবেন, দাম কম থেকে বেশি সাজিয়ে")।

---

## 3 & 4. Query string পড়া

#### Server Component-এ

```tsx
// app/products/page.tsx
type Props = {
  searchParams: Promise<{ category?: string; page?: string; sort?: string }>;
};

export default async function ProductsPage({ searchParams }: Props) {
  const { category, page = "1", sort = "newest" } = await searchParams;

  const products = await getProducts({
    category,
    page: Number(page),
    sort,
  });

  return <ProductGrid products={products} />;
}
```

**ব্যাখ্যা:** `/products?category=phone&page=2` হলে `category = "phone"`, `page = "2"`। সব মান **string বা undefined** — তাই default দাও আর `Number()` করো। একই key দুইবার থাকলে (`?tag=a&tag=b`) মান হয় `string[]` — type-এ সেটাও ধরা দরকার হলে `string | string[]`।

> `searchParams` পড়া মানে page **dynamic** হয়ে যাওয়া (আগে থেকে জানা সম্ভব নয় কে কী query দেবে)।

#### Client Component-এ

```tsx
"use client";
import { useSearchParams } from "next/navigation";

export default function SortSelect() {
  const searchParams = useSearchParams();
  const sort = searchParams.get("sort") ?? "newest";
  return <span>এখন: {sort}</span>;
}
```

---

## 5, 6, 7, 8. Search, Filter, Sort, Pagination

#### Definition

এই চারটাই আসলে একই জিনিস: **UI-এর state URL-এ রাখা**। `useState`-এ না রেখে URL-এ রাখলে যা পাওয়া যায়:

- link **share** করা যায় (বন্ধুকে ঠিক ওই filter করা list পাঠানো)
- back/forward button ঠিকঠাক কাজ করে
- refresh করলেও state থাকে
- server সেই অনুযায়ী data এনে দিতে পারে (SEO-তেও ধরা পড়ে)

#### Real-life Analogy

URL হলো একটা **রশিদ**। রশিদে লেখা আছে তুমি কী চেয়েছিলে — তাই রশিদ দেখালেই দোকানদার হুবহু একই জিনিস আবার দিতে পারে।

#### Example — search box যা URL আপডেট করে

```tsx
// app/products/_components/SearchBox.tsx
"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";

export default function SearchBox() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function handleSearch(value: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set("q", value);
    } else {
      params.delete("q");
    }
    params.delete("page"); // নতুন search মানে আবার page 1

    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <input
      type="search"
      defaultValue={searchParams.get("q") ?? ""}
      onChange={(e) => handleSearch(e.target.value)}
      placeholder="খুঁজুন..."
    />
  );
}
```

**ব্যাখ্যা:** `URLSearchParams` দিয়ে বর্তমান query copy করে শুধু `q` বদলানো হচ্ছে — এতে `category`, `sort` মুছে যায় না। `router.push` করলে Server Component আবার নতুন `searchParams` নিয়ে render হয়, তাই data server থেকেই filter হয়ে আসে।

#### Pagination — সহজ pattern

```tsx
// Server Component
const page = Number((await searchParams).page ?? "1");
const perPage = 12;

const { items, total } = await getProducts({
  skip: (page - 1) * perPage,
  take: perPage,
});

const totalPages = Math.ceil(total / perPage);
```

```tsx
// Pagination link — Link দিয়েই যথেষ্ট, JS লাগে না
<Link href={`/products?page=${page - 1}`}>আগের</Link>
<Link href={`/products?page=${page + 1}`}>পরের</Link>
```

#### Common mistakes

- ❌ প্রতিটা keystroke-এ `router.push` করা → অসংখ্য request। **Debounce** করো (300ms), নাহলে form submit-এ search করো।
- ❌ `params.set` করার সময় আগের query হারিয়ে ফেলা (`?q=x` লিখে দিলে `category` উড়ে গেল)।
- ❌ Filter বদলে page reset না করা → user page 5-এ থেকে নতুন filter-এ খালি list দেখে।
- ❌ `page` কে validate না করা — `?page=-5` বা `?page=abc` এলে DB query ভাঙতে পারে। `Math.max(1, Number(page) || 1)` করো।
- ❌ Server-এ filter করার সুযোগ থাকতেও পুরো ১০,০০০ item client-এ পাঠিয়ে সেখানে filter করা।

---

## Phase 7 — Practice Task

`/products` page-এ যোগ করো:
1. `?q=` দিয়ে search (debounce সহ)
2. `?category=` দিয়ে filter (dropdown)
3. `?sort=price-asc|price-desc` দিয়ে sort
4. `?page=` দিয়ে pagination (prev/next disabled state সহ)
5. তারপর URL টা copy করে নতুন tab-এ খুলে দেখো হুবহু একই view আসছে কি না।

## What I should be able to explain

1. `/products?category=phone&page=2`-এ `category` আর `page` কোথা থেকে আসে?
2. `params` আর `searchParams` কীভাবে আলাদা?
3. Filter state `useState`-এর বদলে URL-এ রাখার ৩টা সুবিধা কী?
4. `searchParams` পড়লে rendering-এ কী প্রভাব পড়ে?
5. `useSearchParams` কোথায় ব্যবহার করা যায়, কোথায় নয়?

## Real Project Connection

E-commerce, job board, admin table — সব জায়গায় এই pattern। Marketing team প্রায়ই চায় "এই filter করা page-টার একটা link দাও" — URL state ছাড়া সেটা দেওয়াই যায় না।

## Common Interview Questions

1. URL-কে state-এর source of truth বানানোর সুবিধা-অসুবিধা কী?
2. Server-side pagination আর client-side pagination কখন কোনটা?
3. `useSearchParams` ব্যবহার করলে কোন Suspense-সংক্রান্ত সমস্যা হতে পারে?
4. Search input-এ debounce কেন দরকার?
5. Query parameter থেকে আসা মান কেন validate করতে হয়?

---

# Phase 8 — Forms & Mutations (Server Functions)

> **Terminology note:** যেটাকে সবাই **"Server Actions"** বলে, official docs-এ এখন প্রায়ই **"Server Functions"** বলা হয়। Directive একই: `'use server'`। দুটো নামই মেনে নাও।

## 1 & 2. HTML form এবং Next.js-এ submission

#### Definition

Next.js-এ form-এর `action` attribute-এ তুমি একটা **server-side function** সরাসরি দিতে পারো। Browser form submit করলে Next.js ওই function-কে server-এ চালায় — তুমি কোনো `fetch`, কোনো API route, কোনো `onSubmit` handler লেখো না।

#### Real-life Analogy

আগে: form পূরণ করে নিজে ডাকঘরে গিয়ে খাম কিনে, ঠিকানা লিখে, পাঠাতে হতো (fetch call, JSON.stringify, header, error handling)।
এখন: form-এ শুধু লিখে দিলে "এটা এই অফিসারের কাছে যাবে" — বাকিটা ডাক ব্যবস্থা সামলায়।

---

## 3, 4, 5. Server Functions এবং `"use server"`

#### Definition

File-এর প্রথম লাইনে (বা একটা async function-এর প্রথম লাইনে) `"use server"` লিখলে সেটা একটা **server-only function** হয়ে যায়, যাকে client থেকে নিরাপদে call করা যায়। Next.js ভেতরে ভেতরে একটা POST endpoint বানিয়ে দেয়।

> ⚠️ **`"use server"` ≠ `"use client"`-এর উল্টো।** `"use client"` বলে "এটা client bundle-এ যাবে"। `"use server"` বলে "এটা একটা server endpoint, client থেকে call করা যাবে"। মানে এটা কার্যত একটা **public HTTP endpoint** — তাই প্রতিটা Server Function-এ **নিজে auth check আর validation করতে হবে** (Phase 11, 21)।

#### Example — সম্পূর্ণ CRUD

```ts
// app/actions/todo.ts
"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { verifySession } from "@/lib/dal";

const TodoSchema = z.object({
  title: z.string().min(1, "শিরোনাম দিতে হবে").max(200),
});

export type FormState = {
  errors?: { title?: string[] };
  message?: string;
};

// CREATE
export async function createTodo(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const session = await verifySession();          // 1) auth
  if (!session) return { message: "লগইন করুন" };

  const parsed = TodoSchema.safeParse({           // 2) validation
    title: formData.get("title"),
  });
  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors };
  }

  try {                                            // 3) mutation
    await prisma.todo.create({
      data: { title: parsed.data.title, userId: session.userId },
    });
  } catch {
    return { message: "সংরক্ষণ ব্যর্থ হয়েছে, আবার চেষ্টা করুন" };
  }

  revalidatePath("/todos");                        // 4) cache আপডেট
  return { message: "যোগ হয়েছে" };
}

// UPDATE
export async function toggleTodo(id: string) {
  const session = await verifySession();
  if (!session) return;

  const todo = await prisma.todo.findUnique({ where: { id } });
  if (!todo || todo.userId !== session.userId) return; // ownership check!

  await prisma.todo.update({
    where: { id },
    data: { done: !todo.done },
  });
  revalidatePath("/todos");
}

// DELETE
export async function deleteTodo(id: string) {
  const session = await verifySession();
  if (!session) return;

  await prisma.todo.deleteMany({ where: { id, userId: session.userId } });
  revalidatePath("/todos");
}
```

**ব্যাখ্যা:** প্রতিটা function-এ একই চারটা ধাপ — **auth → validate → mutate → revalidate**। মুখস্থ করার মতো ক্রম। `deleteMany({ id, userId })` ব্যবহারের কারণ: অন্যের todo ভুল করেও মুছে ফেলা যাবে না।

---

## 6. `FormData`

`formData.get("name")` সবসময় `FormDataEntryValue | null` দেয় (string বা File)। তাই:

```ts
const title = String(formData.get("title") ?? "");   // safe conversion
const tags = formData.getAll("tags");                 // multiple checkbox
const file = formData.get("avatar") as File | null;   // file input
```

Validation library (Zod) দিয়ে এক ধাপেই type + rule দুটো সামলানো ভালো।

---

## 10 & 11. Validation এবং error handling

#### Definition

দুই ধরনের error আলাদা করে ভাবতে হবে:

| ধরন | উদাহরণ | কী করব |
|---|---|---|
| **Expected** | ভুল email, খালি field, ভুল password | **return** করো একটা state object, UI-তে দেখাও |
| **Unexpected** | DB down, network fail, bug | **throw** হোক → `error.tsx` ধরবে, log হবে |

Expected error কখনো `throw` করো না — তাহলে user একটা crash screen দেখবে, যেখানে আসলে দরকার ছিল input-এর নিচে লাল লেখা।

> **Client-side validation ≠ security।** HTML `required` বা React state-এর check শুধু UX-এর জন্য। আসল check **সবসময় server-এ**, কারণ attacker সরাসরি Server Function-এ request পাঠাতে পারে।

---

## 12. Pending states — `useActionState` ও `useFormStatus`

```tsx
// app/todos/_components/TodoForm.tsx
"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { createTodo, type FormState } from "@/app/actions/todo";

const initialState: FormState = {};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending}>
      {pending ? "সংরক্ষণ হচ্ছে..." : "যোগ করুন"}
    </button>
  );
}

export default function TodoForm() {
  const [state, formAction] = useActionState(createTodo, initialState);

  return (
    <form action={formAction}>
      <label htmlFor="title">কাজের নাম</label>
      <input id="title" name="title" required />

      {state.errors?.title && (
        <p role="alert">{state.errors.title[0]}</p>
      )}
      {state.message && <p>{state.message}</p>}

      <SubmitButton />
    </form>
  );
}
```

**ব্যাখ্যা:**
- `useActionState(action, initialState)` — action-এর return করা state ধরে রাখে, তাই error message দেখানো যায়।
- `useFormStatus` **অবশ্যই form-এর ভেতরের একটা আলাদা child component-এ** থাকতে হবে — একই component-এ `<form>` আর `useFormStatus` একসাথে কাজ করবে না।
- `name="title"` attribute-টাই `formData.get("title")`-এর সাথে মেলে। ভুলে গেলে সব `null`।

#### JavaScript বন্ধ থাকলেও কাজ করে

`<form action={serverFn}>` progressive enhancement দেয় — JS load হওয়ার আগেই বা বন্ধ থাকলেও form submit হয়। এটা `onSubmit` + `fetch`-এর চেয়ে বড় সুবিধা।

---

## 13 & 14. Mutation-এর পরে revalidate ও redirect

```ts
// একই page-এ থেকেই list refresh
revalidatePath("/todos");

// tag-ভিত্তিক (বেশি নিখুঁত)
revalidateTag("todos", "max");     // background refresh
updateTag("todos");                // সাথে সাথে (Cache Components model)

// অন্য page-এ পাঠানো
redirect(`/todos/${newId}`);
```

**ক্রম গুরুত্বপূর্ণ:** আগে revalidate/update, তারপর `redirect`। আর `redirect` কখনো `try` block-এর ভেতরে নয়।

---

## Button দিয়ে mutation (form ছাড়া)

```tsx
// Server Component-এ সরাসরি — কোনো "use client" লাগেনি!
import { deleteTodo } from "@/app/actions/todo";

export default function TodoItem({ todo }: { todo: { id: string; title: string } }) {
  return (
    <li>
      {todo.title}
      <form action={deleteTodo.bind(null, todo.id)}>
        <button type="submit">মুছুন</button>
      </form>
    </li>
  );
}
```

`bind` দিয়ে argument আগেই বেঁধে দেওয়া হলো। এভাবে Server Component থেকেও mutation করা যায়, client JS প্রায় শূন্য।

---

## Common mistakes (Phase 8)

- ❌ Server Function-এ auth check না করা — "UI-তে তো button লুকিয়ে রেখেছি" যথেষ্ট **নয়**, endpoint সবার জন্য খোলা।
- ❌ ownership check ভুলে যাওয়া (`where: { id }` লিখে `userId` না দেওয়া) → একজন আরেকজনের data মুছে ফেলতে পারবে।
- ❌ `input`-এ `name` attribute না দেওয়া।
- ❌ Expected validation error `throw` করা।
- ❌ Mutation-এর পরে revalidate না করা → UI পুরোনো data দেখায়।
- ❌ Server Function-এর ভেতরে secret ফেরত পাঠানো (return value client-এ যায়!)।
- ❌ `useFormStatus` একই component-এ `<form>`-এর সাথে ব্যবহার করা।

## Phase 8 — Practice Task

একটা Todo app বানাও (আপাতত in-memory array বা JSON file দিয়েও চলবে):
1. Add form — Zod validation, error message নিচে দেখাও।
2. Toggle done — button + Server Function।
3. Delete — confirm সহ।
4. Pending state-এ button disable আর text বদল।
5. শেষে DevTools-এ JS disable করে দেখো add form তখনো কাজ করে কি না।

## What I should be able to explain

1. `"use server"` আসলে কী তৈরি করে এবং কেন সেটা নিরাপত্তার দিক থেকে গুরুত্বপূর্ণ?
2. Expected আর unexpected error আলাদা করে সামলাতে হয় কেন?
3. `useActionState` আর `useFormStatus`-এর কাজ কীভাবে আলাদা?
4. Mutation-এর পর `revalidatePath`/`updateTag` না দিলে কী হয়?
5. Client-side validation থাকলেও server-side validation কেন বাধ্যতামূলক?

## Real Project Connection

প্রতিটা real app-এই এই pattern: auth → validate → mutate → revalidate → redirect। Security audit-এ সবার আগে দেখা হয় Server Function-গুলোতে session check আর ownership check আছে কি না।

## Common Interview Questions

1. Server Function আর REST API endpoint-এর পার্থক্য ও মিল কী?
2. Progressive enhancement কীভাবে পাওয়া যায় `<form action={...}>` দিয়ে?
3. Server Function-এ কীভাবে extra argument পাঠাও?
4. Optimistic update (`useOptimistic`) কখন দরকার?
5. Server Function-এ CSRF নিয়ে কী ভাবতে হয়?

---

# Phase 9 — Route Handlers / API

## 1 & 2. Route Handler কী? — `route.ts`

#### Definition

`app/.../route.ts` file-এ HTTP method-এর নামে function export করলে সেটা একটা **API endpoint** হয়ে যায়। এটা Web standard `Request`/`Response` ব্যবহার করে।

#### Real-life Analogy

`page.tsx` = দোকানের **শোরুম** (মানুষ এসে দেখে)।
`route.ts` = দোকানের **সাপ্লাই কাউন্টার** (অন্য machine এসে JSON নেয়/দেয়)।

#### Where I use this concept

- Third-party **webhook** নেওয়া (Stripe payment, GitHub, CMS)
- Mobile app বা অন্য client-এর জন্য public API
- Cron job / health check endpoint
- File download, image/PDF generate, RSS feed
- OAuth callback

**কখন Route Handler নয়:** নিজের Next.js UI থেকে form submit বা mutation করতে — সেখানে **Server Function** সহজ ও কম boilerplate।

---

## 3 → 6. GET, POST, PUT/PATCH, DELETE

```ts
// app/api/users/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifySession } from "@/lib/dal";

// GET /api/users?limit=10
export async function GET(request: NextRequest) {
  const limit = Number(request.nextUrl.searchParams.get("limit") ?? "10");

  const users = await prisma.user.findMany({
    take: Math.min(Math.max(limit, 1), 100),   // clamp করা হলো
    select: { id: true, name: true },          // password কখনো নয়!
  });

  return NextResponse.json({ users });
}

// POST /api/users
export async function POST(request: NextRequest) {
  const session = await verifySession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = UserSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 422 }
    );
  }

  const user = await prisma.user.create({ data: parsed.data });
  return NextResponse.json({ user }, { status: 201 });
}
```

```ts
// app/api/users/[id]/route.ts  — dynamic segment
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;              // এখানেও await
  const body = await request.json();
  const user = await prisma.user.update({ where: { id }, data: body });
  return NextResponse.json({ user });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await prisma.user.delete({ where: { id } });
  return new NextResponse(null, { status: 204 });   // No Content
}
```

---

## 7, 8, 9. Request, Response, `NextResponse`

| দরকার | কীভাবে |
|---|---|
| Query param | `request.nextUrl.searchParams.get("q")` |
| JSON body | `await request.json()` |
| Form body | `await request.formData()` |
| Raw text | `await request.text()` |
| Header পড়া | `request.headers.get("authorization")` |
| Cookie পড়া | `request.cookies.get("session")?.value` |
| JSON পাঠানো | `NextResponse.json(data, { status: 200 })` |
| Redirect | `NextResponse.redirect(new URL("/login", request.url))` |
| Header দেওয়া | `NextResponse.json(d, { headers: { "Cache-Control": "no-store" } })` |
| Cookie বসানো | `res.cookies.set("name", "value", { httpOnly: true })` |

`NextResponse` হলো standard `Response`-এর একটা extension — cookie, redirect ইত্যাদির সুবিধা যোগ করে।

---

## 10 & 11. Headers ও Cookies (Route Handler-এ)

```ts
import { cookies, headers } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const headerList = await headers();

  const token = cookieStore.get("session")?.value;
  const ua = headerList.get("user-agent");

  const res = NextResponse.json({ ok: true });
  res.cookies.set("visited", "1", { httpOnly: true, sameSite: "lax" });
  return res;
}
```

---

## 12 & 13. JSON response আর error response

সবসময় **একই shape** রাখো, যাতে client predictably handle করতে পারে:

```ts
// সফল
{ "data": { ... } }

// ব্যর্থ
{ "error": "Validation failed", "details": { "email": ["ভুল ফরম্যাট"] } }
```

Status code নির্বাচন:

| Code | কখন |
|---|---|
| 200 | সফল GET/PATCH |
| 201 | নতুন কিছু তৈরি হলো |
| 204 | সফল, কিন্তু body নেই (DELETE) |
| 400 | malformed request |
| 401 | login নেই |
| 403 | login আছে, কিন্তু অনুমতি নেই |
| 404 | resource নেই |
| 422 | validation fail |
| 429 | rate limit |
| 500 | server-এর দোষ |

❌ **কখনো** internal error message বা stack trace client-এ পাঠাবে না — log-এ রাখো, response-এ generic message দাও।

---

## 14 & 15. Route Handler vs Server Function

| | Route Handler (`route.ts`) | Server Function (`"use server"`) |
|---|---|---|
| যে call করে | যেকেউ (external client, webhook, curl) | তোমার নিজের app-এর UI |
| Signature | HTTP method, `Request`/`Response` | সাধারণ async function |
| Boilerplate | বেশি (parse, status, JSON) | কম |
| Progressive enhancement | নেই | আছে (`<form action>`) |
| উপযুক্ত | public/3rd-party API, webhook, cron, file | form submit, CRUD, button action |

**সহজ নিয়ম:** ভেতরের কাজে Server Function, বাইরের জগতের জন্য Route Handler।

---

## Common mistakes (Phase 9)

- ❌ শুধু নিজের UI-এর জন্য `/api/...` বানিয়ে Server Component থেকে সেটাকে `fetch` করা → অকারণ network hop।
- ❌ `select` ছাড়া পুরো user row ফেরত দেওয়া (password hash, email leak)।
- ❌ Body validate না করা।
- ❌ auth check ভুলে যাওয়া — route handler-ও public endpoint।
- ❌ একই folder-এ `page.tsx` আর `route.ts` রাখা।
- ❌ `params` `await` না করা।

## Phase 9 — Practice Task

`app/api/todos/route.ts` বানাও: `GET` (list) আর `POST` (create, Zod validation সহ)। তারপর `app/api/todos/[id]/route.ts` এ `PATCH` আর `DELETE`। `curl` বা Thunder Client দিয়ে test করো, আর ইচ্ছে করে ভুল JSON পাঠিয়ে দেখো 400 আসে কি না।

## What I should be able to explain

1. Route Handler আর Server Function কখন কোনটা বাছব?
2. `NextResponse` সাধারণ `Response`-এর চেয়ে কী দেয়?
3. 401 আর 403-এর পার্থক্য কী?
4. Route Handler-এ auth check কেন বাধ্যতামূলক?
5. নিজের Server Component থেকে নিজের API route fetch করা কেন খারাপ?

## Real Project Connection

প্রায় প্রতিটা production app-এ webhook থাকে (payment, email delivery status), আর সেগুলোর জন্য Route Handler ছাড়া উপায় নেই। সেখানে signature verification (Stripe-এর মতো) একটা বাধ্যতামূলক নিরাপত্তা ধাপ।

## Common Interview Questions

1. Route Handler-এ dynamic segment কীভাবে পড়ো?
2. Webhook endpoint-এ কোন নিরাপত্তা ব্যবস্থা লাগে?
3. API response-এর consistent shape রাখা কেন জরুরি?
4. Route Handler cache হয় কি? কীভাবে নিয়ন্ত্রণ করবে?
5. CORS দরকার হলে কোথায় সামলাবে?

---

# Phase 10 — Cookies & Headers

## 1 → 4. Cookies

#### Definition

Cookie হলো ছোট এক টুকরো data যেটা server browser-এ রেখে দেয়, আর browser **প্রতিটা request-এ সেটা নিজে থেকে ফেরত পাঠায়**। HTTP stateless — cookie-ই তাকে "মনে রাখতে" সাহায্য করে।

Next.js-এ `cookies()` ফাংশন `next/headers` থেকে আসে এবং **async**।

#### Real-life Analogy

Cookie = হাসপাতালের **হাতের ব্যান্ড**। একবার পরিয়ে দেওয়া হলে প্রতিটা কাউন্টারে গেলে তারা ব্যান্ড দেখেই বুঝে যায় তুমি কে — বারবার নাম-ঠিকানা বলতে হয় না।

#### কোথায় কী করা যায়

| কাজ | Server Component | Server Function | Route Handler | proxy.ts |
|---|---|---|---|---|
| Cookie **পড়া** | ✅ | ✅ | ✅ | ✅ |
| Cookie **লেখা/মোছা** | ❌ | ✅ | ✅ | ✅ |

> Server Component-এ cookie **set করা যায় না** — কারণ ততক্ষণে response streaming শুরু হয়ে গেছে। তাই login/logout-এর কাজ Server Function বা Route Handler-এ।

#### Example

```ts
// পড়া — যেকোনো Server Component-এ
import { cookies } from "next/headers";

export default async function Page() {
  const cookieStore = await cookies();
  const theme = cookieStore.get("theme")?.value ?? "light";
  return <div data-theme={theme}>...</div>;
}
```

```ts
// লেখা ও মোছা — Server Function-এ
"use server";
import { cookies } from "next/headers";

export async function login(token: string) {
  const cookieStore = await cookies();

  cookieStore.set("session", token, {
    httpOnly: true,                                // JS পড়তে পারবে না
    secure: process.env.NODE_ENV === "production", // শুধু HTTPS-এ
    sameSite: "lax",                               // CSRF কমায়
    path: "/",
    maxAge: 60 * 60 * 24 * 7,                      // ৭ দিন
  });
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}
```

---

## 5, 6. HTTP headers

```ts
import { headers } from "next/headers";

export default async function Page() {
  const headerList = await headers();

  const userAgent = headerList.get("user-agent");
  const referer = headerList.get("referer");
  const lang = headerList.get("accept-language");

  return <p>{userAgent}</p>;
}
```

`headers()` **read-only**। Response header দিতে হলে Route Handler-এর `NextResponse`, `proxy.ts`, বা `next.config.ts`-এর `headers()`।

> `cookies()` বা `headers()` পড়া মানে route **dynamic** হয়ে যাওয়া (Phase 5)। তাই যতটা সম্ভব ছোট component-এ, `<Suspense>`-এর ভেতরে রাখো।

---

## 7. Cookie কেন উপকারী

- **Session/auth** — সবচেয়ে বড় ব্যবহার
- **Preference** — theme, language, currency (server-এ render হওয়ার সময়ই জানা যায়, তাই flicker হয় না)
- **Cart** — guest user-এর cart id
- **A/B test** bucket, analytics id

`localStorage`-এর সাথে পার্থক্য: `localStorage` শুধু browser-এ, server তার কিছুই জানে না। তাই SSR-এ theme ঠিক করতে cookie লাগে, `localStorage` দিয়ে করলে প্রথম render-এ ভুল theme দেখিয়ে "flash" হবে।

---

## 8. Security considerations

| Option | কেন |
|---|---|
| `httpOnly: true` | JavaScript (তাই XSS-ও) cookie পড়তে পারবে না। **Session cookie-তে বাধ্যতামূলক।** |
| `secure: true` | শুধু HTTPS-এ যাবে, network-এ খোলা যাবে না |
| `sameSite: "lax"` বা `"strict"` | অন্য site থেকে আসা request-এ cookie পাঠাবে না → CSRF কমে |
| `maxAge` / `expires` | চিরকাল বসে থাকবে না |
| `path`, `domain` | পরিধি সীমিত রাখা |

আর যা কখনোই করবে না:
- ❌ cookie-তে password, credit card বা কোনো plaintext secret রাখা
- ❌ cookie-তে `{"role":"admin"}` টাইপ data রেখে সেটাকে বিশ্বাস করা — user নিজেই cookie edit করতে পারে! Cookie-র মান **signed/encrypted** (JWT বা encrypted session) হতে হবে, নাহলে শুধু একটা random session id রাখো আর আসল data server-এ (DB/Redis)।

#### Example — session cookie-এর দুই ধরন

```text
1) Stateless (JWT / encrypted cookie)
   cookie = signed token (userId, role, exp)
   ✅ DB lookup লাগে না
   ❌ instantly revoke করা কঠিন

2) Stateful (session id + DB)
   cookie = random id
   server DB-তে মিলিয়ে দেখে
   ✅ যেকোনো সময় logout/revoke
   ❌ প্রতি request-এ একটা lookup
```

## Phase 10 — Practice Task

1. একটা theme toggle বানাও যেটা Server Function দিয়ে `theme` cookie set করে, আর root layout সেটা পড়ে `<html data-theme>` বসায়। refresh করেও theme টিকে থাকা উচিত, আর কোনো flash হওয়া উচিত নয়।
2. একটা page-এ `headers()` দিয়ে user-agent দেখাও।
3. `httpOnly` ছাড়া একটা cookie বসিয়ে DevTools console-এ `document.cookie` লিখে দেখো সেটা পড়া যায়; তারপর `httpOnly: true` দিয়ে আবার দেখো।

## What I should be able to explain

1. Server Component-এ cookie set করা যায় না কেন?
2. `httpOnly` কী রক্ষা করে?
3. `sameSite` কীভাবে CSRF কমায়?
4. Theme রাখার জন্য cookie কেন `localStorage`-এর চেয়ে ভালো (SSR-এর প্রেক্ষিতে)?
5. Cookie-তে সরাসরি role রাখা কেন বিপজ্জনক?

## Real Project Connection

Auth-এর পুরো ভিত্তি এখানে। Production incident-এর একটা প্রচলিত কারণ: `secure`/`httpOnly` ছাড়া session cookie, বা localhost-এ কাজ করলেও production-এ `domain` ভুল থাকায় login না টেকা।

## Common Interview Questions

1. Cookie আর `localStorage`-এর পার্থক্য কী?
2. `httpOnly`, `secure`, `sameSite` — প্রতিটা কী করে?
3. JWT cookie-তে রাখা বনাম session id — trade-off কী?
4. `cookies()` পড়া rendering-এ কী প্রভাব ফেলে?
5. Cookie size limit নিয়ে কী মাথায় রাখতে হয়?

---

# Phase 11 — Authentication & Authorization

> এই phase-এ ভুল করলে **data breach** হয়। ধীরে পড়ো, আর "কাজ করছে" দেখে থেমে যেয়ো না — "নিরাপদ কি?" জিজ্ঞেস করো।

## 1 & 2. Authentication vs Authorization

#### Definition

- **Authentication (AuthN)** — "তুমি কে?" (login, password যাচাই, session তৈরি)
- **Authorization (AuthZ)** — "তুমি কী করতে পারো?" (এই post কি তোমার? তুমি admin?)

#### Real-life Analogy

Authentication = অফিসের **gate-এ ID card দেখানো** (তুমি ঢুকতে পারো)।
Authorization = **কোন কোন ঘরে ঢুকতে পারবে** (server room-এ শুধু IT টিম)।

ID card থাকা মানেই CEO-র ঘরে ঢোকার অধিকার নয় — এই পার্থক্যটাই interview-তে আর code-এ সবচেয়ে বেশি গুলিয়ে যায়।

---

## 3. Session

#### Definition

Session হলো "এই browser-টা এখন এই user" — এই তথ্য একাধিক request জুড়ে ধরে রাখার ব্যবস্থা। সাধারণত একটা `httpOnly` cookie-তে থাকে (Phase 10-এ দেখা stateless বা stateful, দুই ধরনই সম্ভব)।

---

## 4 & 5. Login ও Logout flow

```text
LOGIN
Browser: email + password (form) 
   ↓  Server Function
1. validate input (Zod)
2. DB থেকে user আনো
3. password hash মেলাও (bcrypt/argon2 — কখনো plaintext নয়)
4. session তৈরি করো (signed/encrypted)
5. httpOnly cookie বসাও
6. redirect("/dashboard")

LOGOUT
1. cookie delete করো
2. (stateful হলে) DB-তে session invalid করো
3. redirect("/login")
```

```ts
// app/actions/auth.ts
"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { createSessionToken } from "@/lib/session";

const LoginSchema = z.object({
  email: z.string().email("সঠিক email দিন"),
  password: z.string().min(8, "কমপক্ষে ৮ অক্ষর"),
});

export async function login(prevState: unknown, formData: FormData) {
  const parsed = LoginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors };
  }

  const user = await prisma.user.findUnique({
    where: { email: parsed.data.email },
  });

  // ⚠️ user না থাকলে আর password ভুল হলে — একই message
  if (!user || !(await bcrypt.compare(parsed.data.password, user.passwordHash))) {
    return { message: "Email বা password ভুল" };
  }

  const token = await createSessionToken({ userId: user.id, role: user.role });
  (await cookies()).set("session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  redirect("/dashboard");
}
```

**কেন একই error message?** আলাদা message দিলে attacker বুঝে যায় কোন email গুলো registered আছে (**user enumeration**)।

---

## 10. Authentication logic কোথায় থাকা উচিত — Data Access Layer (DAL)

#### Definition

একটা জায়গায় (`lib/dal.ts`) session যাচাইয়ের logic রাখো, আর **data পড়া/লেখার প্রতিটা ফাংশনে** সেটা call করো। তাহলে নতুন page/route বানানোর সময় নিরাপত্তা ভুলে যাওয়ার সুযোগ কমে।

#### Real-life Analogy

প্রতিটা ঘরের দরজায় আলাদা প্রহরী রাখার বদলে — **ভল্টের দরজায়** প্রহরী রাখা। কেউ যেকোনো পথে এলেও ভল্টে ঢুকতে গেলে যাচাই হবে।

#### Example

```ts
// lib/dal.ts
import { cookies } from "next/headers";
import { cache } from "react";
import { verifySessionToken } from "@/lib/session";

// React cache: একই request-এ বারবার call করলেও একবারই যাচাই হবে
export const verifySession = cache(async () => {
  const token = (await cookies()).get("session")?.value;
  if (!token) return null;

  try {
    const payload = await verifySessionToken(token);
    return { userId: payload.userId, role: payload.role };
  } catch {
    return null;   // invalid/expired token
  }
});

// এখানে auth + ownership একসাথে
export async function getMyInvoices() {
  const session = await verifySession();
  if (!session) throw new Error("Unauthorized");

  return prisma.invoice.findMany({
    where: { userId: session.userId },     // ownership filter
    select: { id: true, amount: true, status: true },
  });
}
```

---

## 6 & 7. Protected routes ও protected server operations

```tsx
// app/dashboard/page.tsx
import { redirect } from "next/navigation";
import { verifySession } from "@/lib/dal";

export default async function DashboardPage() {
  const session = await verifySession();
  if (!session) redirect("/login");

  return <h1>স্বাগতম</h1>;
}
```

**কিন্তু শুধু page-এ check করা যথেষ্ট নয়!** নিরাপত্তার স্তরগুলো:

```text
Layer 1: proxy.ts      → শুধু দ্রুত redirect (UX), নিরাপত্তার শেষ কথা নয়
Layer 2: page / layout → UI-তে কী দেখাব
Layer 3: Server Function / Route Handler → প্রতিটায় নিজে check (এগুলো public endpoint)
Layer 4: Data Access Layer → data-র সবচেয়ে কাছে, শেষ ভরসা  ← ✅ সবচেয়ে গুরুত্বপূর্ণ
```

Official নির্দেশনার মূল কথা: **নিরাপত্তা যাচাই যতটা সম্ভব data source-এর কাছে করো।**

> `layout.tsx`-এ check করে নিশ্চিন্ত হওয়া যাবে না — layout প্রতিটা navigation-এ আবার চলে না, তাই এটাকে auth gate ধরা ভুল।

---

## 8. Role-based authorization

```tsx
// app/admin/page.tsx
import { verifySession } from "@/lib/dal";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const session = await verifySession();
  if (!session) redirect("/login");
  if (session.role !== "admin") redirect("/");   // অথবা forbidden()

  return <h1>Admin Panel</h1>;
}
```

```ts
// Server Function-এও একই check — বাদ দিলে endpoint খোলা থেকে যায়
"use server";
export async function deleteUser(id: string) {
  const session = await verifySession();
  if (session?.role !== "admin") throw new Error("Forbidden");
  await prisma.user.delete({ where: { id } });
}
```

### `unauthorized()` ও `forbidden()` (experimental)

Next.js-এ `notFound()`-এর মতোই দুটো ফাংশন আছে — 401 আর 403 page দেখানোর জন্য। এগুলো এখনো **experimental**, তাই flag লাগে:

```ts
// next.config.ts
const nextConfig = { experimental: { authInterrupts: true } };
```

```tsx
import { forbidden, unauthorized } from "next/navigation";
import { verifySession } from "@/lib/dal";

export default async function AdminPage() {
  const session = await verifySession();
  if (!session) unauthorized();                // app/unauthorized.tsx দেখাবে
  if (session.role !== "admin") forbidden();   // app/forbidden.tsx দেখাবে
  return <h1>Admin</h1>;
}
```

Experimental মানে API বদলাতে পারে — production-এ ব্যবহারের আগে ভেবে নাও। সাধারণ `redirect()` দিয়েও কাজ চলে।

---

## 11. কেন button লুকানো = authorization নয়

#### Definition

UI-তে delete button না দেখানো শুধু একটা **সৌজন্য**, নিরাপত্তা নয়। Attacker তোমার UI ব্যবহারই করবে না — সে সরাসরি Server Function বা API endpoint-এ request পাঠাবে (curl/Postman দিয়ে)।

#### Real-life Analogy

দরজার সাইনবোর্ড খুলে ফেলা মানে দরজা **তালাবদ্ধ** হয়ে যাওয়া নয়। সাইন না দেখেও যে কেউ দরজা ঠেলে ঢুকতে পারে।

#### ভুল বনাম ঠিক

```tsx
// ❌ ভুল — শুধু UI-তে লুকানো
{user.role === "admin" && <DeleteButton id={post.id} />}
// কিন্তু deleteTodo() এ কোনো check নেই → যে কেউ call করতে পারবে
```

```ts
// ✅ ঠিক — endpoint-এ check
"use server";
export async function deletePost(id: string) {
  const session = await verifySession();
  if (!session) throw new Error("Unauthorized");

  const post = await prisma.post.findUnique({ where: { id } });
  if (!post) throw new Error("Not found");
  if (post.authorId !== session.userId && session.role !== "admin") {
    throw new Error("Forbidden");
  }

  await prisma.post.delete({ where: { id } });
}
```

UI-তে লুকানো + server-এ check — **দুটোই** করো। প্রথমটা UX, দ্বিতীয়টা নিরাপত্তা।

---

## 12, 13. Server-side authorization ও security considerations

- প্রতিটা Server Function ও Route Handler = **public endpoint**। ধরে নাও সেখানে যে কেউ যেকোনো input পাঠাতে পারে।
- **Ownership check** কখনো বাদ দিয়ো না: `where: { id, userId: session.userId }`।
- Client থেকে আসা `userId`/`role` **কখনো** বিশ্বাস করো না — সবসময় session থেকে নাও।
- Password: `bcrypt` বা `argon2` দিয়ে hash। কখনো নিজে crypto আবিষ্কার করো না।
- Session token-এ expiry দাও, আর secret `.env`-এ (Phase 17)।
- Rate limit করো login endpoint-এ (brute force ঠেকাতে)।
- Sensitive field কখনো select করো না (`passwordHash`), আর Client Component-এ props হিসেবে পাঠাবে না — props browser-এ দেখা যায়!

---

## 14. Proxy আর authentication-related routing check

`proxy.ts`-এ cookie আছে কি নেই — এই **হালকা** check করে দ্রুত redirect করা যায় (UX ভালো হয়, প্রতিটা page-এ load হওয়ার আগেই ফেরত পাঠানো যায়)। কিন্তু:

⚠️ এটা **শেষ নিরাপত্তা সীমানা নয়**। ২০২৫ সালে একটা critical vulnerability (`x-middleware-subrequest` header দিয়ে middleware bypass) ঠিক এই কারণেই বিপজ্জনক ছিল — অনেকে middleware-কেই একমাত্র gate ধরে নিয়েছিল। তাই Next.js টিম middleware-এর নাম বদলে `proxy` রেখেছে, যাতে বোঝা যায় এটা **network-level routing tool**, security boundary নয়।

**নিয়ম:** proxy-তে optimistic check (cookie আছে?), আর আসল যাচাই page/Server Function/DAL-এ।

---

## Auth library বনাম framework concept

এই দুটো আলাদা করে ভাবা জরুরি:

| Framework concept (Next.js নিজে যা দেয়) | Library-specific (বদলাতে পারে) |
|---|---|
| `cookies()` দিয়ে session cookie পড়া/লেখা | `auth()` helper-এর নাম |
| Server Function-এ check করা | provider config (Google, GitHub) |
| `redirect()` / `forbidden()` | adapter (Prisma adapter ইত্যাদি) |
| DAL pattern | token refresh-এর নিজস্ব নিয়ম |

জনপ্রিয় option: **Auth.js (NextAuth)**, **Better Auth**, **Clerk**, **Supabase Auth**, **Lucia-style নিজের session**।

> **পরামর্শ:** শেখার সময় একবার নিজে হাতে session cookie + bcrypt + JWT দিয়ে login বানাও — তাহলে বুঝবে library ভেতরে কী করে। কিন্তু **production-এ library ব্যবহার করো** (email verification, password reset, OAuth, token rotation — এগুলো নিজে ঠিকঠাক করা কঠিন ও ঝুঁকিপূর্ণ)।

## Phase 11 — Practice Task

1. `lib/dal.ts` বানাও `verifySession()` সহ (`cache()` দিয়ে wrap করে)।
2. Login form + Server Function (Zod validation, bcrypt compare, cookie set)।
3. `/dashboard` protect করো, `/login` এ redirect।
4. একটা `/admin` page বানাও যা শুধু `role === "admin"` দেখতে পারে।
5. এখন একটা "attack" করো: browser DevTools-এর Network tab থেকে তোমার Server Function-এর request copy করে (বা একটা Route Handler বানিয়ে) session cookie ছাড়া call করো — তোমার check ধরতে পারছে কি না দেখো।

## What I should be able to explain

1. Authentication আর authorization-এর পার্থক্য উদাহরণ দিয়ে।
2. নিরাপত্তা যাচাই data source-এর কাছে রাখতে বলা হয় কেন?
3. UI-তে button লুকানো কেন authorization নয়?
4. `proxy.ts`-কে একমাত্র auth gate বানানো কেন বিপজ্জনক?
5. Ownership check না করলে কী ধরনের bug হয়?

## Real Project Connection

প্রতিটা SaaS-এর ভিত্তি। Real team-এ auth code-এ PR review সবচেয়ে কঠোর হয়, আর পেশাদার codebase-এ প্রায় সবসময় একটা DAL layer থাকে যাতে কেউ ভুলেও filter ছাড়া query না লেখে।

## Common Interview Questions

1. Session-based আর token-based auth-এর তুলনা করো।
2. App Router-এ protected route কীভাবে বানাও এবং কোন স্তরে check করো?
3. Server Action কেন public endpoint হিসেবে ভাবতে হয়?
4. Password কীভাবে সংরক্ষণ করবে এবং কেন?
5. RBAC (role-based access control) কীভাবে বাস্তবায়ন করবে?

---

# Phase 12 — Proxy (আগে যার নাম ছিল Middleware)

## Terminology change — `middleware.ts` → `proxy.ts`

```text
Next.js ≤ 15:  middleware.ts   →  export function middleware(request)
Next.js 16+ :  proxy.ts        →  export default function proxy(request)
```

`middleware.ts` এখনো কাজ করে কিন্তু **deprecated** — ভবিষ্যতে সরে যাবে।

#### কেন নাম বদলাল?

1. **"Middleware" শব্দটা বিভ্রান্তিকর** — অনেকে Express.js-এর middleware ভেবে সেখানে app-level logic (auth, logging, DB call) লিখে ফেলত। কিন্তু এটা Express middleware নয়।
2. এটা আসলে তোমার app-এর **সামনে বসা একটা network boundary** — অর্থাৎ ঠিক একটা **proxy**-র মতো আচরণ। নতুন নাম সেই সত্যটা স্পষ্ট করে।
3. Next.js টিম চায় তুমি এটা **যতটা সম্ভব কম** ব্যবহার করো — বাকি কাজের জন্য ভালো API (Server Function, DAL) আছে।
4. আগের middleware default-এ **Edge runtime**-এ চলত; নতুন `proxy.ts` চলে **Node.js runtime**-এ, যা আচরণকে অনুমানযোগ্য করে।

Migration codemod:

```bash
npx @next/codemod@latest middleware-to-proxy .
```

---

## 1 & 2. Proxy কী এবং কখন চলে

#### Definition

`proxy.ts` (project root-এ, `app/`-এর ভেতরে নয়) এমন code যা **প্রতিটা matching request-এ, route render হওয়ার আগে** চলে। সে request দেখে redirect, rewrite, header যোগ, বা সরাসরি response দিতে পারে।

```text
Request
  ↓
proxy.ts      ← এখানে
  ↓
Routing → page.tsx / route.ts render
  ↓
Response
```

#### Real-life Analogy

Proxy = অফিস building-এর **gate-এর নিরাপত্তারক্ষী**। সে দ্রুত দেখে: "ID band আছে? না থাকলে reception-এ পাঠাও।" কিন্তু সে জানে না তুমি ভেতরে কোন ফাইল দেখার অনুমতি পাবে — সেটা ঠিক করে ওই ঘরের দরজা (DAL)।

---

## 3 → 6. Proxy কী করতে পারে

```ts
// proxy.ts  (project root)
import { NextRequest, NextResponse } from "next/server";

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasSession = request.cookies.has("session");

  // 1) Redirect — login না থাকলে
  if (pathname.startsWith("/dashboard") && !hasSession) {
    const url = new URL("/login", request.url);
    url.searchParams.set("next", pathname);     // পরে ফিরিয়ে আনার জন্য
    return NextResponse.redirect(url);
  }

  // 2) Rewrite — URL বদলাবে না, কিন্তু ভেতরে অন্য route চলবে
  if (pathname === "/promo") {
    return NextResponse.rewrite(new URL("/campaigns/summer-2026", request.url));
  }

  // 3) Request/response header পরিবর্তন
  const response = NextResponse.next();
  response.headers.set("x-pathname", pathname);
  return response;
}

// 7) Matcher — কোন path-এ চলবে
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
  ],
};
```

**Redirect vs Rewrite:**

| | Redirect | Rewrite |
|---|---|---|
| Browser-এর URL | বদলায় | **বদলায় না** |
| User জানতে পারে | হ্যাঁ | না |
| ব্যবহার | login-এ পাঠানো, পুরোনো URL | A/B test, multi-tenant, proxy to another path |

---

## 7. Matcher

`matcher` না দিলে proxy **প্রতিটা** request-এ চলবে (static file, image সহ) — যা অপচয়। তাই নির্দিষ্ট করে দাও:

```ts
export const config = {
  matcher: [
    // সব path, কিন্তু _next, api, static file বাদ
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|svg)$).*)",
  ],
};
```

---

## 8. Authentication-related check

```ts
// ✅ ঠিক — optimistic, হালকা check
const hasSession = request.cookies.has("session");
if (!hasSession) return NextResponse.redirect(new URL("/login", request.url));
```

```ts
// ⚠️ এখানেই থেমে থাকলে ভুল
// proxy-তে redirect করলাম মানেই page/action নিরাপদ নয় —
// page, Server Function আর DAL-এ আবার verify করতে হবে।
```

---

## 9. Proxy-তে যা করা উচিত নয়

- ❌ **একমাত্র authorization gate বানানো** (Phase 11-এ কারণ দেখেছ)
- ❌ Database query করা (ধীর, আর প্রতিটা request-এ চলে)
- ❌ ভারী computation বা বড় library import করা
- ❌ Business logic লেখা
- ❌ Response body তৈরি করা (সেটা Route Handler-এর কাজ)
- ❌ Global variable বা shared module state-এর উপর ভরসা করা (proxy আলাদা জায়গায় deploy হতে পারে)
- ❌ প্রতিটা request-এ log পাঠানো (cost + latency)

**এক লাইনে:** proxy = দ্রুত, stateless, শুধু routing সিদ্ধান্ত।

## Phase 12 — Practice Task

1. `proxy.ts` বানাও যা `/dashboard/*`-এ session cookie না থাকলে `/login?next=...`-এ পাঠায়।
2. `/promo` কে একটা আসল campaign page-এ rewrite করো এবং লক্ষ্য করো address bar বদলায় না।
3. `matcher` ছাড়া একবার চালিয়ে terminal log দেখো কতগুলো request-এ proxy চলছে, তারপর matcher দিয়ে তুলনা করো।
4. **গুরুত্বপূর্ণ:** এখন `/dashboard`-এর page থেকে session check তুলে দাও আর দেখো proxy একা যথেষ্ট মনে হচ্ছে — তারপর আবার check ফিরিয়ে দাও, কারণ Server Function-এ proxy চলে না।

## What I should be able to explain

1. `middleware` থেকে `proxy` নাম বদলানোর কারণ কী?
2. Proxy কখন চলে — routing-এর আগে না পরে?
3. Redirect আর rewrite-এর পার্থক্য কী?
4. Proxy-কে security boundary ধরা কেন ভুল?
5. `matcher` না দিলে কী সমস্যা হয়?

## Real Project Connection

Real project-এ proxy সাধারণত ৩টা কাজেই ব্যবহৃত হয়: auth redirect (optimistic), i18n/locale routing, আর multi-tenant subdomain rewrite। এর বাইরে কিছু লিখতে গেলে সাধারণত ভুল জায়গায় লিখছ।

## Common Interview Questions

1. Proxy/Middleware কোন runtime-এ চলে এবং তার সীমাবদ্ধতা কী?
2. Proxy দিয়ে auth করলে কোন ঝুঁকি থাকে?
3. Rewrite দিয়ে multi-tenant app কীভাবে বানাবে?
4. `matcher` regex কীভাবে কাজ করে?
5. Proxy-তে DB call করা কেন খারাপ?

---

# Phase 13 — Images

## 1 & 2. `next/image` — কেন `<img>` নয়

#### Definition

`next/image`-এর `<Image>` component একটা optimizing wrapper। সে নিজে থেকে করে:

- **Format conversion** — browser support করলে WebP/AVIF পাঠায় (JPEG-এর চেয়ে অনেক ছোট)
- **Resizing** — device-এর আকার অনুযায়ী ছোট version পাঠায় (mobile-এ 4000px ছবি নয়)
- **Lazy loading** — viewport-এ আসার আগে load করে না
- **Layout shift প্রতিরোধ** — width/height জানা থাকায় জায়গা আগেই বুকিং হয় (CLS ভালো থাকে)
- **Caching** — optimized version cache করে

#### Real-life Analogy

`<img>` = কুরিয়ারে আসল আসবাব পাঠানো, size যা-ই হোক।
`<Image>` = গ্রাহকের ঘরের মাপ জেনে ঠিক মাপের জিনিস, ভাঁজ করা প্যাকেটে পাঠানো।

---

## 3 → 6. Width/height, responsive, local ও remote image

```tsx
import Image from "next/image";
import profile from "@/public/profile.jpg"; // local — import করলে size auto

// ১) Local image (সবচেয়ে সহজ ও নিরাপদ)
<Image src={profile} alt="আমার ছবি" placeholder="blur" />

// ২) public folder থেকে path দিয়ে — width/height বাধ্যতামূলক
<Image src="/logo.png" alt="Logo" width={120} height={40} />

// ৩) Remote image — next.config-এ hostname whitelist লাগবে
<Image
  src="https://images.unsplash.com/photo-123"
  alt="Banner"
  width={1200}
  height={600}
/>

// ৪) Responsive / container-fill
<div className="relative h-64 w-full">
  <Image
    src="/hero.jpg"
    alt="Hero"
    fill
    sizes="(max-width: 768px) 100vw, 50vw"
    className="object-cover"
    priority            // above-the-fold হলে দাও
  />
</div>
```

```ts
// next.config.ts — remote image অনুমোদন
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "res.cloudinary.com", pathname: "/my-cloud/**" },
    ],
  },
};
```

**`sizes` কী?** Browser-কে বলে দেয় ছবিটা আসলে screen-এর কত অংশ জুড়ে থাকবে, যাতে সে ঠিক আকারের version বাছে। `fill` ব্যবহার করলে `sizes` দেওয়া প্রায় বাধ্যতামূলক, নাহলে সে অকারণে বড় ছবি নামায়।

---

## 7 & 8. Image configuration ও optimization

| Prop | কাজ |
|---|---|
| `priority` | LCP image-এর জন্য — lazy load বন্ধ, আগে load |
| `placeholder="blur"` | load হওয়ার আগে ঝাপসা preview (local image-এ auto) |
| `quality` | 1–100, default 75 |
| `fill` | parent container ভরে দেবে (parent-এ `position: relative` লাগবে) |
| `unoptimized` | optimization বন্ধ (SVG বা বিশেষ ক্ষেত্রে) |

> Next.js 16-এ `next/image`-এর কিছু **default বদলেছে** (breaking change)। পুরোনো project upgrade করলে ছবির আচরণ একবার চোখে দেখে যাচাই করে নাও।

## 9. Common mistakes

- ❌ `alt` না দেওয়া বা `alt="image"` লেখা → accessibility ও SEO নষ্ট। সাজসজ্জার ছবি হলে `alt=""` দাও।
- ❌ সব ছবিতে `priority` দেওয়া → তাহলে priority-র অর্থই থাকে না, উল্টো ক্ষতি। শুধু hero/LCP image-এ।
- ❌ `fill` দিয়ে parent-এ `relative` না দেওয়া।
- ❌ Remote image whitelist না করে error দেখে হতাশ হওয়া।
- ❌ `width`/`height` অনুপাত ভুল দেওয়া → ছবি চেপে যায়।
- ❌ 5MB-এর আসল ছবি upload করে ভাবা "Next.js তো optimize করবে" — source ছবি আগে যুক্তিসঙ্গত আকারে রাখো।

## Practice

`/gallery` page বানাও: ৬টা ছবি grid-এ, প্রথমটায় `priority`, সবগুলোয় `alt`, একটা remote image সহ। Network tab-এ দেখো কোন format-এ (webp/avif) আসছে, আর mobile view-এ ছোট version আসছে কি না।

---

# Phase 14 — Fonts

## 1 → 4. `next/font` এবং কেন font optimization জরুরি

#### Definition

`next/font` build time-এ font file তোমার নিজের deployment-এ নিয়ে আসে (self-host করে), আর CSS-এ `size-adjust` সহ ঠিকভাবে বসায়। ফলাফল:

- Google Fonts-এর server-এ কোনো request যায় না → **privacy ভালো, latency কম**
- **কোনো layout shift নেই** (font বদলানোর সময় লেখা লাফায় না)
- শুধু দরকারি subset ও weight download হয়

#### Real-life Analogy

আগে: প্রতিবার অতিথি এলে পাশের দোকান থেকে চেয়ার ভাড়া করা (external request)।
এখন: চেয়ারগুলো নিজের ঘরেই রাখা, ঠিক মাপে কেটে রাখা।

#### Example — Google font

```tsx
// app/layout.tsx
import { Inter, Hind_Siliguri } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

// বাংলা লেখার জন্য
const hind = Hind_Siliguri({
  subsets: ["bengali"],
  weight: ["400", "600"],
  display: "swap",
  variable: "--font-bangla",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bn" className={`${inter.variable} ${hind.variable}`}>
      <body className="font-[family-name:var(--font-bangla)]">{children}</body>
    </html>
  );
}
```

#### Local font

```tsx
import localFont from "next/font/local";

const myFont = localFont({
  src: [
    { path: "./fonts/MyFont-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/MyFont-Bold.woff2", weight: "700", style: "normal" },
  ],
  display: "swap",
  variable: "--font-my",
});
```

## Common mistakes

- ❌ `<link href="fonts.googleapis.com">` দিয়ে font আনা — তাহলে `next/font`-এর কোনো সুবিধা পাচ্ছ না।
- ❌ অনেক weight/style load করা (400, 500, 600, 700, italic…) → প্রতিটা আলাদা file, bundle ভারী। ২-৩টাই যথেষ্ট।
- ❌ বাংলা লেখায় `subsets: ["latin"]` দিয়ে বাংলা font চাওয়া → `"bengali"` subset লাগবে।
- ❌ Component-এর ভেতরে font initialize করা — module scope-এ (file-এর top-level) করতে হবে।

## Practice

তোমার project-এ একটা বাংলা font (`Hind_Siliguri` বা `Noto_Sans_Bengali`) আর একটা ইংরেজি font যোগ করো। Network tab-এ দেখো font file তোমার নিজের domain থেকে আসছে কি না।

---

# Phase 15 — Metadata & SEO

## 1 → 6. Static ও dynamic metadata

#### Definition

Metadata হলো HTML `<head>`-এর সেই তথ্য যা মানুষ দেখে না কিন্তু search engine, social media আর browser ব্যবহার করে: title, description, Open Graph image, canonical URL ইত্যাদি। Next.js-এ তুমি `<head>` হাতে লেখো না — একটা `metadata` object export করো বা `generateMetadata` function লেখো।

#### Real-life Analogy

Metadata = বইয়ের **প্রচ্ছদ ও পেছনের কভার লেখা**। ভেতরের লেখা যত ভালোই হোক, প্রচ্ছদ দেখে মানুষ বইটা হাতে নেবে কি না ঠিক করে।

#### Static metadata

```tsx
// app/about/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "আমাদের সম্পর্কে | My Shop",
  description: "আমরা কে, কী করি — সংক্ষেপে।",
  alternates: { canonical: "/about" },
};
```

#### Template — root layout-এ

```tsx
// app/layout.tsx
export const metadata: Metadata = {
  metadataBase: new URL("https://myshop.com"), // relative URL resolve করতে দরকার
  title: {
    default: "My Shop — অনলাইন কেনাকাটা",
    template: "%s | My Shop",     // ভেতরের page-এর title এখানে বসবে
  },
  description: "সাশ্রয়ী দামে পণ্য।",
  openGraph: {
    type: "website",
    locale: "bn_BD",
    siteName: "My Shop",
  },
  twitter: { card: "summary_large_image" },
};
```

#### Dynamic metadata — `generateMetadata`

```tsx
// app/products/[id]/page.tsx
import type { Metadata } from "next";
import { getProduct } from "@/lib/products";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    return { title: "পণ্য পাওয়া যায়নি" };
  }

  return {
    title: product.name,                    // template-এর %s এ বসবে
    description: product.shortDescription,
    alternates: { canonical: `/products/${id}` },
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      images: [{ url: product.imageUrl, width: 1200, height: 630 }],
    },
  };
}
```

**ব্যাখ্যা:** `generateMetadata` আর `page` একই data চাইলে ভয় নেই — একই request-এ একই `fetch`/cached function দুবার call হলে Next.js/React সেটা **dedupe** করে, তাই দুইবার DB hit হয় না (`React.cache()` দিয়ে wrap করা helper হলে নিশ্চিত)।

---

## 7 & 8. Open Graph এবং social metadata

Facebook, WhatsApp, LinkedIn, Twitter — সবাই `og:` tag পড়ে link preview বানায়। OG image-এর মাপ **1200×630** (অনুপাত ~1.91:1)।

Dynamic OG image বানানো যায় code দিয়েই:

```tsx
// app/products/[id]/opengraph-image.tsx
import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);

  return new ImageResponse(
    (
      <div style={{ display: "flex", fontSize: 64, background: "#fff", width: "100%", height: "100%", alignItems: "center", justifyContent: "center" }}>
        {product?.name ?? "My Shop"}
      </div>
    ),
    size
  );
}
```

---

## 9. Favicon ও icons

`app/` folder-এ শুধু file রাখলেই হয়ে যায় — কোনো config লাগে না:

```text
app/
├── favicon.ico
├── icon.png              (বা icon.svg)
├── apple-icon.png
└── opengraph-image.png
```

---

## 10 & 11. Sitemap ও robots

```ts
// app/sitemap.ts
import type { MetadataRoute } from "next";
import { getAllProducts } from "@/lib/products";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getAllProducts();

  return [
    { url: "https://myshop.com", lastModified: new Date(), priority: 1 },
    { url: "https://myshop.com/about", priority: 0.5 },
    ...products.map((p) => ({
      url: `https://myshop.com/products/${p.id}`,
      lastModified: p.updatedAt,
      priority: 0.8,
    })),
  ];
}
```

```ts
// app/robots.ts
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/admin", "/api"] }],
    sitemap: "https://myshop.com/sitemap.xml",
  };
}
```

---

## 12 & 13. SEO basics ও dynamic route SEO

- প্রতিটা page-এ **একটাই `<h1>`**, আর heading গুলো ক্রমানুসারে (h1 → h2 → h3)
- Semantic HTML (`main`, `nav`, `article`, `footer`)
- Content **HTML-এ** থাকা উচিত (Server Component এখানে বড় সুবিধা — client-only content bot ঠিকমতো নাও পড়তে পারে)
- প্রতিটা page-এ **আলাদা** title ও description (duplicate খুব ক্ষতিকর)
- `canonical` URL দাও, বিশেষত filter/pagination থাকলে
- না পাওয়া resource-এ `notFound()` → আসল 404 status
- Image-এ `alt`, link-এ বোধগম্য text ("এখানে ক্লিক করুন" নয়)
- Structured data (JSON-LD) দিলে rich result-এর সুযোগ:

```tsx
export default async function ProductPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    offers: { "@type": "Offer", price: product.price, priceCurrency: "BDT" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {/* ... */}
    </>
  );
}
```

## Common mistakes

- ❌ `metadataBase` না দিয়ে relative OG image path ব্যবহার → preview ভাঙে।
- ❌ সব page-এ একই title/description।
- ❌ Client Component-এ `metadata` export করা → কাজ করবে না (শুধু Server Component/layout/page-এ)।
- ❌ `generateMetadata`-তে data fetch করে আবার page-এ আলাদা query লেখা (dedupe না হলে double call)।
- ❌ `notFound()` ছাড়া "পাওয়া যায়নি" দেখানো → Google 200 OK ভেবে index করে।

## Practice

Product page-এ `generateMetadata` বসাও, `app/sitemap.ts` আর `app/robots.ts` বানাও। তারপর একটা link WhatsApp-এ নিজেকে পাঠিয়ে (বা Facebook Sharing Debugger-এ দিয়ে) preview দেখো।

---

# Phase 16 — Database

## Architecture — সবার আগে এটা বোঝো

```text
Browser (Client Component)
   │  ❌ কখনোই সরাসরি database-এ নয়
   ↓
Next.js Server  (Server Component / Server Function / Route Handler)
   ↓
Data Access Layer  (lib/*.ts — auth check + ownership filter + query)
   ↓
ORM / Query builder (Prisma, Drizzle)
   ↓
Database (PostgreSQL, MySQL, SQLite, MongoDB)
```

## 1. Database কেন শুধু server-side code থেকে

#### Definition

Database-এ পৌঁছাতে লাগে **connection string** — যার ভেতরে username, password আর host থাকে। সেটা browser-এ পাঠানো মানে পুরো database সবার হাতে তুলে দেওয়া। তাছাড়া DB driver গুলো TCP connection ব্যবহার করে, যা browser-এ চলেই না।

#### Real-life Analogy

Database = ব্যাংকের **ভল্ট**। গ্রাহক সরাসরি ভল্টে ঢোকে না — সে **কাউন্টারে** (server) গিয়ে অনুরোধ করে, কর্মী পরিচয় যাচাই করে (DAL) তারপর ভল্ট থেকে এনে দেয়।

---

## 2, 3, 4. Connection, query, Data Access Layer

```ts
// lib/prisma.ts — dev-এ hot reload-এ বারবার connection না বানানোর pattern
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
```

**কেন এই অদ্ভুত pattern?** Development-এ প্রতিবার file save করলে module আবার load হয়। প্রতিবার `new PrismaClient()` করলে কয়েক মিনিটেই database-এর connection limit শেষ হয়ে যাবে।

```ts
// lib/dal/products.ts — Data Access Layer
import { prisma } from "@/lib/prisma";
import { verifySession } from "@/lib/dal";

// public data — auth লাগে না
export async function getPublishedProducts() {
  return prisma.product.findMany({
    where: { published: true },
    select: { id: true, name: true, price: true, imageUrl: true },
  });
}

// private data — auth + ownership
export async function getMyOrders() {
  const session = await verifySession();
  if (!session) throw new Error("Unauthorized");

  return prisma.order.findMany({
    where: { userId: session.userId },   // ← ownership filter
    select: { id: true, total: true, status: true, createdAt: true },
  });
}
```

**DAL কেন?** একটাই জায়গায় auth + filter + `select` থাকে, তাই ২০টা page-এ ২০ বার ভুল করার সুযোগ থাকে না। এটাই পেশাদার codebase-এর আদর্শ।

---

## 5. CRUD

```ts
// CREATE
await prisma.product.create({ data: { name, price } });
// READ
await prisma.product.findMany({ where: { published: true }, take: 20 });
await prisma.product.findUnique({ where: { id } });
// UPDATE
await prisma.product.update({ where: { id }, data: { price } });
// DELETE
await prisma.product.delete({ where: { id } });
// নিরাপদ delete (ownership সহ)
await prisma.product.deleteMany({ where: { id, ownerId: session.userId } });
```

---

## 6 & 7. ORM ধারণা এবং Prisma

#### Definition

ORM (Object-Relational Mapping) SQL-এর বদলে JavaScript object দিয়ে database-এর সাথে কথা বলতে দেয়, আর TypeScript type নিজে থেকে তৈরি করে দেয়।

| | ORM (Prisma/Drizzle) | সরাসরি SQL |
|---|---|---|
| Type safety | ✅ auto | নিজে লিখতে হয় |
| শেখা | সহজ | SQL জানতে হয় |
| জটিল query | কখনো কষ্টকর | পূর্ণ নিয়ন্ত্রণ |
| Migration | built-in | নিজে সামলাতে হয় |

```prisma
// prisma/schema.prisma
model Product {
  id        String   @id @default(cuid())
  name      String
  price     Int
  published Boolean  @default(false)
  ownerId   String
  owner     User     @relation(fields: [ownerId], references: [id])
  createdAt DateTime @default(now())

  @@index([published, createdAt])
}
```

```bash
npx prisma migrate dev --name init   # schema → database + client generate
npx prisma studio                    # data দেখার GUI
```

> ORM থাকলেও **SQL শেখা বন্ধ করো না** — index, join, query plan বোঝা ছাড়া performance ঠিক করা যায় না।

---

## 8. Environment variables

```bash
# .env.local
DATABASE_URL="postgresql://user:password@localhost:5432/mydb"
```

বিস্তারিত Phase 17-এ।

---

## 9 & 10. Database security এবং Client Component থেকে দূরে রাখা

- ✅ প্রতিটা private query-তে ownership filter
- ✅ `select` দিয়ে শুধু দরকারি field (password hash, email কখনো অকারণে নয়)
- ✅ Input validate (Zod) — `params`/`formData` সরাসরি query-তে নয়
- ✅ ORM বা parameterized query ব্যবহার → SQL injection ঠেকে
- ✅ Connection pooling (serverless-এ Prisma Accelerate/PgBouncer/Neon pooler)
- ❌ `DATABASE_URL` কখনো `NEXT_PUBLIC_` prefix দিয়ে নয়!
- ❌ Client Component-এ DB helper import করা — build error পাবে, আর না পেলে আরও খারাপ (leak)

## Common mistakes

- ❌ প্রতি request-এ নতুন `PrismaClient()`।
- ❌ Client Component-এ ORM import।
- ❌ ownership filter ভুলে যাওয়া — সবচেয়ে বিপজ্জনক bug।
- ❌ `findMany()` কোনো `take` ছাড়া → ১০ লক্ষ row টেনে আনা।
- ❌ N+1 query: list-এর প্রতিটা item-এর জন্য আলাদা query। `include`/`select` দিয়ে একবারে আনো।

## Practice

SQLite দিয়ে Prisma setup করো (সবচেয়ে সহজ), `Product` model বানাও, `lib/dal/products.ts` লিখে `/products` page-এ list দেখাও, আর Server Function দিয়ে create করো। `npx prisma studio` দিয়ে data যাচাই করো।

---

# Phase 17 — Environment Variables

## 1 → 6. `.env`, `.env.local`, এবং `NEXT_PUBLIC_`

#### Definition

Environment variable হলো code-এর বাইরে রাখা configuration — যা environment-এ (local, staging, production) আলাদা হয়, আর প্রায়ই **secret**।

**সবচেয়ে গুরুত্বপূর্ণ নিয়ম:**

```text
NEXT_PUBLIC_ prefix নেই   →  শুধু server-এ পাওয়া যাবে  ✅ secret রাখা নিরাপদ
NEXT_PUBLIC_ prefix আছে   →  build-এ JS bundle-এ ঢুকে যাবে  ⚠️ পুরো দুনিয়া দেখতে পাবে
```

#### Real-life Analogy

`NEXT_PUBLIC_` = দোকানের সাইনবোর্ডে লেখা (সবাই পড়বে — ঠিকানা, ফোন নম্বর)।
সাধারণ env var = ক্যাশবাক্সের চাবি, শুধু মালিকের পকেটে।

একবার `NEXT_PUBLIC_` দিয়ে কোনো secret publish করে ফেললে সেটা **ফাঁস হয়ে গেছে** — variable মুছলেও পুরোনো bundle-এ থেকে যায়। তখন একমাত্র সমাধান: key **rotate** করা।

#### File গুলোর ভূমিকা

| File | কাজ | git-এ যাবে? |
|---|---|---|
| `.env` | সব environment-এর default | ✅ (secret ছাড়া) |
| `.env.local` | তোমার machine-এর মান, secret সহ | ❌ **কখনো নয়** |
| `.env.development` | `next dev` এর সময় | ✅ |
| `.env.production` | `next build/start` এর সময় | ✅ |
| `.env.example` | কোন কোন key লাগবে তার তালিকা (মান ছাড়া) | ✅ |

`.gitignore`-এ `create-next-app` নিজেই `.env*.local` যোগ করে রাখে — সেটা মুছে ফেলো না।

#### Example

```bash
# .env.local  (git-এ নয়)
DATABASE_URL="postgresql://user:pass@localhost:5432/mydb"
STRIPE_SECRET_KEY="sk_live_xxx"
SESSION_SECRET="একটা-লম্বা-random-string"

# client-এ দরকার এমন নিরীহ জিনিস
NEXT_PUBLIC_SITE_URL="https://myshop.com"
NEXT_PUBLIC_POSTHOG_KEY="phc_public_key"
```

```ts
// ✅ Server-only (Server Component, Server Function, Route Handler)
const key = process.env.STRIPE_SECRET_KEY;

// ✅ Client-এও চলবে
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

// ❌ Client Component-এ এটা undefined
"use client";
const key = process.env.STRIPE_SECRET_KEY; // undefined!
```

```bash
# .env.example  (git-এ থাকবে — নতুন dev কী কী লাগবে বুঝবে)
DATABASE_URL=
STRIPE_SECRET_KEY=
SESSION_SECRET=
NEXT_PUBLIC_SITE_URL=
```

### Startup-এ validate করা (পেশাদার pattern)

```ts
// lib/env.ts
import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  SESSION_SECRET: z.string().min(32),
  NEXT_PUBLIC_SITE_URL: z.string().url(),
});

export const env = envSchema.parse(process.env);
```

এতে ভুল/অনুপস্থিত env থাকলে **deploy-এর সময়ই** ধরা পড়ে, production-এ 3টা রাতে নয়।

## 9. Security mistakes

- ❌ secret-এ `NEXT_PUBLIC_` লাগানো (সবচেয়ে বড় ভুল)
- ❌ `.env.local` git-এ commit করা
- ❌ Client Component-এ secret ব্যবহার করে "কাজ করছে না কেন" ভেবে `NEXT_PUBLIC_` বসিয়ে দেওয়া — এটাই ফাঁদ! সমাধান হলো কাজটা server-এ সরানো
- ❌ Production-এ hosting platform-এ env var না বসিয়ে deploy করা → build বা runtime fail
- ❌ একই secret সব environment-এ ব্যবহার করা
- ❌ `.env` বদলে dev server restart না করা (Next.js অনেক সময় নিজে ধরে, কিন্তু নিশ্চিত হতে restart করো)

## Practice

`.env.local`-এ একটা fake API key রাখো আর একটা `NEXT_PUBLIC_` variable। দুটোকেই একটা Client Component-এ `console.log` করো, তারপর browser-এ দেখো কোনটা দেখা যাচ্ছে। এরপর build করে `.next/static/chunks`-এ `grep` করে দেখো `NEXT_PUBLIC_` মানটা সত্যিই bundle-এ আছে কি না — এই একটা পরীক্ষা তোমাকে চিরকাল মনে রাখাবে।

---

# Phase 18 — Error Handling

## 1 & 2. Expected errors vs unexpected exceptions

#### Definition

| | Expected error | Unexpected exception |
|---|---|---|
| উদাহরণ | ভুল password, খালি field, পণ্য নেই | DB down, null pointer bug, network fail |
| এগুলো আসলে | normal application flow | সত্যিকারের গোলযোগ |
| কী করব | **return** করো, UI-তে দেখাও | **throw** হতে দাও → boundary ধরবে + log |
| user-কে | নির্দিষ্ট, সহায়ক message | সাধারণ "সমস্যা হয়েছে" + retry |

#### Real-life Analogy

Expected error = ATM বলছে "ব্যালেন্স যথেষ্ট নয়" — যন্ত্র ঠিকই আছে, তোমার অনুরোধটাই সম্ভব নয়।
Unexpected exception = ATM-এ ধোঁয়া বেরোচ্ছে — technician ডাকতে হবে, আর user-কে শুধু "এই মেশিনটা কাজ করছে না" বলা উচিত।

---

## 3, 4, 5. `error.tsx`, `notFound()`, `not-found.tsx`

```tsx
// app/dashboard/error.tsx — segment-level boundary
"use client";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // এখানে monitoring service-এ পাঠাও (Sentry ইত্যাদি)
    console.error(error);
  }, [error]);

  return (
    <div role="alert">
      <h2>দুঃখিত, কিছু একটা ভুল হয়েছে</h2>
      <p>আমরা বিষয়টি জানতে পেরেছি। আবার চেষ্টা করতে পারেন।</p>
      <button onClick={() => reset()}>আবার চেষ্টা করুন</button>
    </div>
  );
}
```

```tsx
// app/global-error.tsx — root layout ভেঙে গেলে
"use client";

export default function GlobalError({ reset }: { reset: () => void }) {
  return (
    <html lang="bn">
      <body>
        <h2>অ্যাপ্লিকেশন লোড করা যাচ্ছে না</h2>
        <button onClick={() => reset()}>রিলোড</button>
      </body>
    </html>
  );
}
```

`global-error.tsx`-এ নিজের `<html>` ও `<body>` দিতে হয়, কারণ root layout-ই তো ভেঙেছে।

> **Production-এ error message:** Next.js নিজেই server-side error-এর আসল message লুকিয়ে ফেলে (শুধু একটা `digest` পাঠায়) যাতে internal তথ্য ফাঁস না হয়। তাই `error.message` user-কে দেখানোর ভরসা করো না — server log-এ `digest` দিয়ে মিলিয়ে দেখো।

---

## 6 & 7. Form errors ও API errors

```ts
// Form: return করো (Phase 8-এর pattern)
if (!parsed.success) {
  return { errors: parsed.error.flatten().fieldErrors };
}
```

```ts
// API: status code + consistent shape
return NextResponse.json({ error: "Validation failed" }, { status: 422 });
```

```tsx
// Data fetch: throw করলে error.tsx ধরবে
const res = await fetch(url);
if (!res.ok) throw new Error(`Upstream ${res.status}`);
```

---

## 8 & 9. Server errors ও user-friendly error UI

ভালো error UI-এর তিনটা গুণ:
1. **কী হয়েছে** — সরল ভাষায়, technical jargon ছাড়া
2. **এখন কী করব** — retry button, হোমে ফেরার link, support-এর ঠিকানা
3. **তুমি একা নও** — কাজ হারায়নি এমন আশ্বাস (সম্ভব হলে form data রাখো)

❌ "Error: ECONNREFUSED 127.0.0.1:5432"
✅ "এই মুহূর্তে data আনা যাচ্ছে না। কিছুক্ষণ পর আবার চেষ্টা করুন।"

---

## 10. Logging basics

```ts
// ✅ structured log — খোঁজা সহজ
console.error("order.create.failed", {
  userId: session.userId,
  orderId,
  message: err instanceof Error ? err.message : "unknown",
});
```

- Log-এ **কখনো** password, token, full card number, বা পুরো request body রাখবে না
- Production-এ একটা monitoring tool লাগাও (Sentry, Axiom, Better Stack) — `console.log` deploy-এর পর খোঁজা কষ্টকর
- প্রতিটা error-এ একটা identifier (request id / digest) রাখো, যাতে user-এর অভিযোগ log-এর সাথে মেলানো যায়

## Common mistakes

- ❌ Expected error `throw` করা → user crash page দেখে।
- ❌ সব `try/catch`-এ `catch {}` লিখে চুপ করে ফেলা → bug অদৃশ্য হয়ে যায়।
- ❌ `try` block-এর ভেতরে `redirect()`/`notFound()` — catch সেটা গিলে ফেলবে।
- ❌ `error.tsx` না থাকা → পুরো app-এর crash screen।
- ❌ Technical error text user-কে দেখানো।

## Practice

তোমার project-এ: (১) DAL-এ একটা ইচ্ছাকৃত `throw` বসিয়ে `error.tsx` যাচাই করো, (২) `notFound()`-এর path যাচাই করো, (৩) form-এ Zod error UI যাচাই করো। তিনটা path আলাদা আলাদা কাজ করছে নিশ্চিত করো।

---

# Phase 19 — Performance

## 1. Performance কেন জরুরি

ধীর site মানে user চলে যায়, conversion কমে, আর Google-এর ranking-এ Core Web Vitals সরাসরি প্রভাব ফেলে। মোবাইল আর ধীর network-এ (বাংলাদেশে যা সাধারণ) পার্থক্যটা আরও বড়।

## 2 → 13. Checklist আকারে

| # | কাজ | কীভাবে |
|---|---|---|
| 2 | **Image optimization** | `next/image`, সঠিক `sizes`, hero-তে `priority` |
| 3 | **Font optimization** | `next/font`, কম weight, `display: "swap"` |
| 4 | **Server Components** | interactivity ছাড়া সব server-এ রাখো → কম JS |
| 5 | **Client JS কমানো** | `"use client"` boundary যত নিচে সম্ভব |
| 6 | **Code splitting** | route-ভিত্তিক split automatic; বড় component-এ manual |
| 7 | **Lazy loading** | `next/dynamic` দিয়ে ভারী client component |
| 8 | **Streaming** | ধীর অংশে `<Suspense>` + `loading.tsx` |
| 9 | **Caching** | `use cache`/`revalidate` ঠিকভাবে (Phase 6) |
| 10 | **Database performance** | index, `select`, `take`, N+1 এড়ানো |
| 11 | **API performance** | `Promise.all`, অপ্রয়োজনীয় hop বাদ |
| 12 | **Bundle size** | analyzer দিয়ে মেপে বড় dependency বাদ |
| 13 | **Core Web Vitals** | LCP, CLS, INP মাপা |

### Lazy load উদাহরণ

```tsx
import dynamic from "next/dynamic";

// ভারী chart library শুধু দরকার হলে load হবে
const Chart = dynamic(() => import("./Chart"), {
  loading: () => <div className="h-64 animate-pulse bg-gray-100" />,
  ssr: false,   // শুধু browser-এ চলবে এমন library হলে
});
```

### Bundle analyze

```bash
npm install -D @next/bundle-analyzer
```

```ts
// next.config.ts
import withBundleAnalyzer from "@next/bundle-analyzer";
export default withBundleAnalyzer({ enabled: process.env.ANALYZE === "true" })({ /* config */ });
```

```bash
ANALYZE=true npm run build
```

### Core Web Vitals — তিনটা সংখ্যা

| Metric | কী মাপে | ভালো | Next.js-এ কী সাহায্য করে |
|---|---|---|---|
| **LCP** | সবচেয়ে বড় content কত দ্রুত দেখা যায় | < 2.5s | static rendering, `priority` image, streaming |
| **CLS** | layout কতটা লাফায় | < 0.1 | `next/image`-এর width/height, `next/font` |
| **INP** | click-এর পর কত দ্রুত সাড়া | < 200ms | কম client JS, কম hydration |

## 14. Performance debugging — ক্রম

```text
1. মাপো (Lighthouse, Chrome DevTools, PageSpeed Insights) — অনুমান করো না
2. build output দেখো: কোন route dynamic হয়ে গেছে অকারণে? (○ বনাম ƒ)
3. Network tab: কত JS? কোন request ধীর?
4. ধীর data call খুঁজে waterfall ভাঙো (Promise.all / Suspense)
5. DB query-তে index আছে? N+1 আছে?
6. Bundle analyzer: বড় client-side dependency কোনটা?
7. আবার মাপো — সত্যিই উন্নতি হয়েছে কি?
```

## Common mistakes

- ❌ মাপার আগেই optimize করা।
- ❌ সব ছবিতে `priority`, সব কিছুতে `dynamic(ssr: false)`।
- ❌ "Server Component ব্যবহার করছি, তাই fast" — ধীর DB query থাকলে server-ও ধীর।
- ❌ Development mode-এর speed দিয়ে বিচার করা। সবসময় production build মাপো।

## Practice

তোমার project-এ Lighthouse চালাও (mobile mode, production build)। তিনটা সমস্যা খুঁজে বের করো, ঠিক করো, আবার চালাও। আগে-পরের score লিখে রাখো।

---

# Phase 20 — Accessibility

## কেন

Accessibility (a11y) মানে সবাই — যারা screen reader ব্যবহার করেন, যারা mouse ব্যবহার করতে পারেন না, যাদের রঙ চেনায় সমস্যা — সবাই তোমার site ব্যবহার করতে পারবেন। এটা শুধু "ভালো কাজ" নয়; অনেক দেশে আইনি বাধ্যবাধকতাও, আর একই জিনিস SEO-তেও সাহায্য করে।

## 1 → 8. ব্যবহারিক নিয়ম

**Semantic HTML** — `div` দিয়ে সব বানানোর বদলে:

```tsx
<header><nav>...</nav></header>
<main>
  <h1>একটাই h1</h1>
  <article>...</article>
</main>
<footer>...</footer>
```

**Alt text**

```tsx
<Image src="/chart.png" alt="২০২৬ সালের মাসিক বিক্রয়ের গ্রাফ, জুনে সর্বোচ্চ" />
<Image src="/decor.svg" alt="" />   {/* নিছক সাজসজ্জা */}
```

**Buttons vs clickable divs**

```tsx
// ❌ keyboard-এ পৌঁছানো যায় না, screen reader বোঝে না
<div onClick={handleDelete}>মুছুন</div>

// ✅
<button type="button" onClick={handleDelete}>মুছুন</button>
```

`<button>` free-তে দেয়: Tab দিয়ে focus, Enter/Space দিয়ে activate, screen reader-এ "button" ঘোষণা।

**Labels ও accessible form**

```tsx
<label htmlFor="email">ইমেইল</label>
<input
  id="email"
  name="email"
  type="email"
  required
  aria-invalid={!!errors?.email}
  aria-describedby={errors?.email ? "email-error" : undefined}
/>
{errors?.email && <p id="email-error" role="alert">{errors.email[0]}</p>}
```

**Keyboard navigation** — শুধু Tab, Shift+Tab, Enter, Escape দিয়ে তোমার পুরো site ব্যবহার করে দেখো। কোথাও আটকে গেলে (modal থেকে বেরোতে না পারা) সেটা bug।

**Focus management** — focus ring কখনো `outline: none` দিয়ে মুছে ফেলবে না; দরকার হলে সুন্দর করো (`focus-visible:ring-2`)। Modal খুললে focus ভেতরে নাও, বন্ধ করলে যেখান থেকে এসেছিল সেখানে ফেরাও।

**Next.js-এ বিশেষ দিক:**
- `<html lang="bn">` — screen reader-এর উচ্চারণ ঠিক হয়
- `<Link>` real `<a>` render করে → keyboard ও screen reader-এ ঠিকঠাক
- `error.tsx`/validation message-এ `role="alert"` দাও যাতে screen reader পড়ে শোনায়
- `loading.tsx` skeleton-এ `aria-busy` বা visually-hidden "লোড হচ্ছে" text
- Color contrast ন্যূনতম 4.5:1 (Tailwind-এর হালকা gray text প্রায়ই fail করে)

## Common mistakes

- ❌ Icon-only button-এ কোনো label না দেওয়া → `aria-label="মেনু খুলুন"` দাও।
- ❌ Heading skip করা (h1 → h4)।
- ❌ শুধু রঙ দিয়ে তথ্য দেওয়া ("লাল মানে ভুল") — সাথে icon বা লেখা দাও।
- ❌ Placeholder-কে label হিসেবে ব্যবহার (টাইপ শুরু করলেই উধাও)।

## Practice

একটা page শুধু keyboard দিয়ে চালাও। তারপর Lighthouse-এর Accessibility score চালাও আর প্রতিটা issue ঠিক করো। Windows-এ NVDA বা Mac-এ VoiceOver দিয়ে একবার শুনে দেখো তোমার form কেমন শোনায়।

---

# Phase 21 — Security

> এই phase-টা **রক্ষণাত্মক development** নিয়ে — কীভাবে নিজের app-কে রক্ষা করবে।

## এক লাইনের মূলনীতি

> **Client থেকে আসা কোনো কিছুই কখনো বিশ্বাস করো না।**

Form data, URL param, query string, cookie, header, JSON body — সব **user-নিয়ন্ত্রিত**। এমনকি তোমার নিজের UI থেকে আসা request-ও নয়, কারণ attacker তোমার UI ছাড়াই request পাঠাতে পারে।

## 1 & 2. Authentication ও Authorization

Phase 11 দেখো। সংক্ষেপে: প্রতিটা Server Function ও Route Handler-এ session check + ownership check; যাচাই data-র যত কাছে সম্ভব।

## 3. Input validation

```ts
"use server";
import { z } from "zod";

const Schema = z.object({
  email: z.string().email().max(255),
  age: z.coerce.number().int().min(13).max(120),
  bio: z.string().max(500).optional(),
});

export async function updateProfile(formData: FormData) {
  const parsed = Schema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { errors: parsed.error.flatten().fieldErrors };
  // এখন parsed.data নিরাপদ ও typed
}
```

**Allow-list mentality:** কী **অনুমোদিত** সেটা বলো, কী নিষিদ্ধ সেটা খোঁজার চেষ্টা নয়।

## 4 & 5. Environment variables ও secrets

Phase 17। মনে রাখো: `NEXT_PUBLIC_` = public forever। Secret ফাঁস হলে **rotate** করো।

## 6. XSS (Cross-Site Scripting)

#### কী

Attacker-এর দেওয়া text যদি HTML/JS হিসেবে চলে যায়, তবে সে অন্য user-এর browser-এ code চালাতে পারে (cookie চুরি, ভুয়া form)।

#### React-এ default নিরাপদ

```tsx
<p>{userComment}</p>   {/* ✅ React নিজে escape করে */}
```

#### বিপদ কোথায়

```tsx
// ❌ সরাসরি HTML বসানো
<div dangerouslySetInnerHTML={{ __html: userComment }} />
```

দরকার হলে (যেমন CMS থেকে আসা rich text) **server-এ sanitize** করো:

```ts
import DOMPurify from "isomorphic-dompurify";
const safe = DOMPurify.sanitize(rawHtml);
```

আরও যা খেয়াল রাখতে হবে:
- user-এর দেওয়া URL `href`-এ বসানোর আগে যাচাই করো (`javascript:` scheme ব্লক করো)
- `next/script`-এ user input থেকে src নিয়ো না

## 7. SQL injection

```ts
// ❌ ভয়ানক — string concatenation
await db.query(`SELECT * FROM users WHERE email = '${email}'`);

// ✅ ORM (Prisma নিজেই parameterize করে)
await prisma.user.findUnique({ where: { email } });

// ✅ Raw SQL লাগলে parameterized
await prisma.$queryRaw`SELECT * FROM users WHERE email = ${email}`;
```

## 8. CSRF considerations

#### কী

অন্য একটা site তোমার logged-in user-এর browser দিয়ে তোমার app-এ অনিচ্ছাকৃত request পাঠায় (কারণ cookie নিজে থেকেই চলে যায়)।

#### কী করব

- `sameSite: "lax"` বা `"strict"` cookie — বড় অংশ এতেই ঠেকে
- Next.js Server Function-এ built-in protection আছে (Origin/Host যাচাই), কিন্তু নিজের custom Route Handler-এ যেখানে cookie দিয়ে mutation হয়, সেখানে নিজে ভাবতে হবে
- State-বদলানো কাজ কখনো `GET`-এ নয় (GET হবে idempotent)

## 9. Secure cookies

`httpOnly` + `secure` + `sameSite` + `maxAge` + সীমিত `path` (Phase 10)।

## 10 & 11. Client-side vs server-side validation

```text
Client-side validation  →  ভালো UX (দ্রুত feedback), নিরাপত্তা শূন্য
Server-side validation  →  আসল নিরাপত্তা, বাধ্যতামূলক
```

দুটোই রাখো, কিন্তু কখনো প্রথমটার উপর নিরাপত্তার ভার দিয়ো না।

## 12. Rate limiting ধারণা

Login, signup, password reset, OTP, search, আর যেকোনো ব্যয়বহুল endpoint-এ সীমা বেঁধে দাও (যেমন "প্রতি IP-তে মিনিটে ৫ বার")। না হলে brute force আর অপব্যবহার হবে, bill-ও বাড়বে। Upstash Ratelimit-এর মতো tool বা hosting platform-এর WAF ব্যবহার করা যায়।

## 13. আরও কিছু practical নিয়ম

- Dependency আপডেট রাখো (`npm audit`)। Next.js-এর security release গুলো (2025 ও 2026-এ কয়েকটা critical ছিল) সময়মতো নাও — patch version upgrade সবচেয়ে সহজ নিরাপত্তা কাজ।
- File upload: type, size, extension যাচাই; সরাসরি `public/`-এ লিখবে না; দরকার হলে external storage (S3) + signed URL।
- Error message-এ internal তথ্য নয়।
- Client Component-এ props হিসেবে শুধু দরকারি field পাঠাও — props browser-এ পড়া যায়, তাই পুরো user object পাঠানো মানে email/hash leak।
- Security header (`next.config.ts`-এর `headers()` দিয়ে CSP, `X-Frame-Options` ইত্যাদি)।
- Log-এ PII নয়।

## Common mistakes

- ❌ "শেখার project, নিরাপত্তা পরে দেখব" — অভ্যাসটাই থেকে যায়।
- ❌ UI-তে লুকিয়ে authorization করা।
- ❌ `params`/`searchParams` থেকে আসা মান সরাসরি query-তে।
- ❌ Client থেকে আসা `userId` বিশ্বাস করা।

## Practice

তোমার Todo বা blog project-এ একটা "security review" লিখো — প্রতিটা Server Function আর Route Handler-এর পাশে লিখো: auth check ✅/❌, ownership check ✅/❌, validation ✅/❌। যেখানে ❌, সেটা ঠিক করো।

## What I should be able to explain (Phase 18–21)

1. Expected আর unexpected error আলাদা করে সামলানোর কারণ কী?
2. Core Web Vitals-এর তিনটা metric কী মাপে?
3. `dangerouslySetInnerHTML` কেন বিপজ্জনক এবং কখন নিরাপদে ব্যবহার করা যায়?
4. Client-side validation থাকা সত্ত্বেও server-side validation কেন লাগে?
5. `<div onClick>` এর বদলে `<button>` কেন?

## Common Interview Questions (Phase 18–21)

1. XSS আর CSRF-এর পার্থক্য এবং প্রতিরোধ কী?
2. Next.js-এ bundle size কীভাবে কমাবে?
3. SQL injection কীভাবে ঠেকাও?
4. Accessible form-এর ন্যূনতম শর্ত কী কী?
5. Production-এ error monitoring কীভাবে সাজাবে?

---

# Phase 22 — TypeScript with Next.js

## 1 → 4. Page props, params, searchParams

```tsx
// app/products/[id]/page.tsx
type PageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function ProductPage({ params, searchParams }: PageProps) {
  const { id } = await params;
  const { tab } = await searchParams;
  return <h1>{id} / {tab ?? "overview"}</h1>;
}
```

Catch-all route হলে:

```tsx
type Props = { params: Promise<{ slug: string[] }> };          // [...slug]
type OptProps = { params: Promise<{ slug?: string[] }> };      // [[...slug]]
```

Layout:

```tsx
type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ id: string }>;   // dynamic segment-এর ভেতরের layout হলে
};
```

> Next.js নিজে `.next/types`-এ route-এর type generate করে। `npm run build` চালালে ভুল page signature ধরা পড়ে — তাই build-টা একধরনের type check-ও।

## 5. API response types

```ts
// types/index.ts
export type Product = {
  id: string;
  name: string;
  price: number;
  tags: string[];
  createdAt: string;    // JSON-এ Date string হয়ে আসে — খেয়াল রাখো
};

export type ApiResponse<T> =
  | { data: T; error?: never }
  | { data?: never; error: string };
```

```ts
// external API-র data কখনো "বিশ্বাস" করো না — runtime-এ যাচাই করো
import { z } from "zod";

const ProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number(),
});

export async function getProduct(id: string) {
  const res = await fetch(`https://api.example.com/products/${id}`);
  if (!res.ok) throw new Error("fetch failed");
  return ProductSchema.parse(await res.json());   // type + runtime দুটোই নিশ্চিত
}
```

**গুরুত্বপূর্ণ ধারণা:** `as Product` লিখে দিলে TypeScript চুপ করে, কিন্তু data আসলে ভুল হতে পারে — TypeScript **compile time**-এ কাজ করে, runtime-এ নয়। বাইরের data-তে Zod-এর মতো validator ব্যবহার করো।

## 6. Form data types

```ts
"use server";
import { z } from "zod";

const Schema = z.object({ title: z.string().min(1) });

export type FormState = {
  errors?: { title?: string[] };
  message?: string;
};

export async function createTodo(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const parsed = Schema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { errors: parsed.error.flatten().fieldErrors };
  // ...
  return { message: "সফল" };
}
```

## 7 & 8. Server Function ও Component types

```tsx
// children সহ component
type CardProps = {
  title: string;
  children: React.ReactNode;
  className?: string;
};

export function Card({ title, children, className }: CardProps) { /* ... */ }

// native element-এর সব prop উত্তরাধিকার
type ButtonProps = React.ComponentProps<"button"> & {
  variant?: "primary" | "ghost";
};

export function Button({ variant = "primary", ...rest }: ButtonProps) {
  return <button data-variant={variant} {...rest} />;
}
```

## 9. Interface vs type alias

| | `interface` | `type` |
|---|---|---|
| Object shape | ✅ | ✅ |
| Union (`A \| B`) | ❌ | ✅ |
| Extend | `extends` | `&` |
| একই নামে declaration merge | ✅ হয় | ❌ হয় না |

**ব্যবহারিক পরামর্শ:** একটা project-এ একটাই রীতি রাখো। বেশিরভাগ React/Next.js codebase-এ `type` ব্যবহার হয় (union আর `ComponentProps` এর জন্য বেশি নমনীয়), আর public library API-তে `interface`।

## 10. Generics — কোথায় সত্যিই কাজে লাগে

```ts
// একটা fetch helper সব type-এর জন্য
export async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json() as Promise<T>;
}

const products = await fetchJson<Product[]>("/api/products");
```

```tsx
// reusable list component
type ListProps<T> = {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  keyOf: (item: T) => string;
};

export function List<T>({ items, renderItem, keyOf }: ListProps<T>) {
  return <ul>{items.map((i) => <li key={keyOf(i)}>{renderItem(i)}</li>)}</ul>;
}
```

> Generic শুরুতেই বেশি ব্যবহার করতে যেয়ো না। যখন **একই logic একাধিক type-এ** দরকার হবে, তখনই।

## Common mistakes

- ❌ `any` দিয়ে সমস্যা ঢাকা। না জানলে `unknown` লিখে তারপর narrow করো।
- ❌ `params` কে non-Promise type দেওয়া (Next.js 15+ এ ভুল)।
- ❌ `as` দিয়ে জোর করে type মেলানো।
- ❌ `Date` object Client Component-এ পাঠিয়ে serialization সমস্যা — ISO string পাঠাও, client-এ format করো।
- ❌ Prisma-র generate করা type হাতে আবার লেখা — `Prisma.ProductGetPayload` বা `Awaited<ReturnType<typeof getProducts>>` ব্যবহার করো।

## Practice

তোমার project-এর সব `any` খুঁজে বের করে সরাও। একটা `types/index.ts` বানাও, আর একটা external API call-এ Zod validation যোগ করো।

---

# Phase 23 — Testing

## 1. Testing কেন

Test মানে "আমি একই জিনিস ১০০ বার হাতে পরীক্ষা করতে চাই না"। বিশেষ করে refactor করার সময় test-ই বলে দেয় তুমি কিছু ভেঙেছ কি না।

## 2 → 6. স্তরগুলো

```text
        /\        E2E (কম, ধীর, সবচেয়ে বাস্তব)
       /  \       — Playwright
      /----\      Integration (মাঝারি)
     /      \     — component + data একসাথে
    /--------\    Unit (অনেক, দ্রুত, সংকীর্ণ)
                  — pure function, validation, helper
```

| ধরন | কী test করে | Tool |
|---|---|---|
| **Unit** | একটা function/helper | Vitest / Jest |
| **Component** | একটা UI component-এর আচরণ | Vitest + React Testing Library |
| **Integration** | কয়েকটা অংশ একসাথে (form + action) | Vitest / Playwright component |
| **E2E** | আসল browser-এ পুরো flow | **Playwright** (Next.js-এ সবচেয়ে প্রচলিত) |
| **API** | Route Handler | Vitest + fetch, বা Playwright API request |

> **গুরুত্বপূর্ণ:** `async` Server Component unit test করা এখনো আনাড়ি — এগুলোর জন্য **E2E** ব্যবহার করাই বাস্তবসম্মত। তাই Next.js-এ pattern হলো: **logic** (DAL, validation, helper) unit test করো, আর **page/flow** E2E test করো।

## 7. Basic setup

```bash
# Unit + component
npm install -D vitest @vitejs/plugin-react @testing-library/react @testing-library/jest-dom jsdom

# E2E
npm init playwright@latest
```

```ts
// lib/format.test.ts — unit
import { describe, it, expect } from "vitest";
import { formatBDT } from "./format";

describe("formatBDT", () => {
  it("টাকা চিহ্ন সহ format করে", () => {
    expect(formatBDT(1500)).toBe("৳1,500");
  });

  it("০ সামলায়", () => {
    expect(formatBDT(0)).toBe("৳0");
  });
});
```

```tsx
// components/Counter.test.tsx — component
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Counter from "./Counter";

it("click করলে গণনা বাড়ে", async () => {
  render(<Counter />);
  await userEvent.click(screen.getByRole("button"));
  expect(screen.getByRole("button")).toHaveTextContent("1");
});
```

```ts
// e2e/todo.spec.ts — E2E
import { test, expect } from "@playwright/test";

test("নতুন todo যোগ করা যায়", async ({ page }) => {
  await page.goto("/todos");
  await page.getByLabel("কাজের নাম").fill("বাজার করা");
  await page.getByRole("button", { name: "যোগ করুন" }).click();
  await expect(page.getByText("বাজার করা")).toBeVisible();
});
```

## 8. কী test করা উচিত

**অবশ্যই:**
- Business logic ও calculation (দাম, discount, tax)
- Validation schema (valid + invalid দুটোই)
- Authorization (অন্যের data-তে হাত দিতে পারে না — এটা test করা খুব দামি)
- Critical user flow: signup → login → mutation → logout
- আগে ঘটে যাওয়া bug (regression test)

**করার দরকার নেই:**
- Framework নিজে কী করে (Next.js-এর routing)
- CSS class-এর নাম
- Third-party library-র ভেতরের আচরণ
- Trivial getter/setter

**পরামর্শ:** ১০০% coverage লক্ষ্য বানাও না। ৫টা ভালো E2E test + validation ও authorization-এর unit test → শুরুর জন্য যথেষ্ট, আর এটাই সবচেয়ে বেশি আত্মবিশ্বাস দেয়।

## Common mistakes

- ❌ Implementation detail test করা (state variable-এর নাম) → refactor-এ test ভাঙে অকারণে। **User যা দেখে/করে** সেটা test করো (`getByRole`, `getByLabel`)।
- ❌ E2E test আসল production database-এ চালানো।
- ❌ Test-এ `setTimeout` দিয়ে অপেক্ষা করা → Playwright/RTL-এর auto-wait ব্যবহার করো।
- ❌ Test না লিখে "পরে লিখব" — অন্তত auth flow-এর একটা test আজই।

## Practice

তোমার Zod schema-র জন্য ৩টা unit test (valid, খালি, খুব বড় input) আর login→dashboard-এর একটা Playwright test লেখো।

---

# Phase 24 — Deployment

## 1 → 4. Development, build, start

```bash
npm run dev      # development
npm run build    # production bundle তৈরি → .next/
npm start        # ওই build চালানো
```

Build output পড়তে শেখো:

```text
Route (app)                     Size     First Load JS
┌ ○ /                           1.2 kB         92 kB
├ ○ /about                      0.8 kB         89 kB
├ ƒ /dashboard                  2.1 kB         96 kB
└ ● /products/[id]              1.5 kB         93 kB

○  (Static)   prerendered
●  (SSG)      generateStaticParams দিয়ে prerendered
ƒ  (Dynamic)  প্রতি request-এ server-এ render
```

**First Load JS** যত কম তত ভালো। ইচ্ছে করে একটা page-এ `"use client"` বসিয়ে এই সংখ্যাটা বাড়তে দেখো — শিক্ষাটা কাজে দেবে।

## 5. Deployment concepts

| ধরন | মানে |
|---|---|
| **Serverless / managed** | তোমার code function হিসেবে চলে, scaling platform সামলায় (Vercel, Netlify) |
| **Node server** | তোমার নিজের server-এ `npm start` চলে (VPS, Docker, Render, Railway, Fly.io) |
| **Static export** | পুরো site static HTML (`output: "export"`) — কিন্তু তখন Server Function, dynamic rendering, image optimization পাবে না |

Next.js-এর সবচেয়ে সহজ পথ **Vercel** (একই কোম্পানি বানিয়েছে), কিন্তু Docker/Node দিয়ে যেকোনো জায়গায় self-host করা যায়:

```ts
// next.config.ts — Docker-এর জন্য ছোট image
const nextConfig = { output: "standalone" };
```

## 6. Production-এ environment variables

- Hosting platform-এর dashboard-এ সব env var বসাও (`.env.local` deploy হয় না)
- Preview আর production-এর জন্য **আলাদা** value (আলাদা database!)
- `NEXT_PUBLIC_` variable build time-এ bake হয় → বদলালে **নতুন build** লাগবে
- Secret বদলালে redeploy

## 7. Build errors — সাধারণ কারণ

| Error | কারণ ও সমাধান |
|---|---|
| Type error | `dev`-এ উপেক্ষিত ছিল; local-এ `npm run build` চালিয়ে আগেই ধরো |
| `window is not defined` | Server-এ browser API — `"use client"` বা `typeof window !== "undefined"` guard, বা `dynamic(..., { ssr: false })` |
| Missing env var | build-এর সময় env লাগে এমন code — validate করো, hosting-এ বসাও |
| Dynamic server usage / prerender error | static হওয়ার কথা এমন page-এ `cookies()`/`headers()` পড়া — `<Suspense>` দিয়ে আলাদা করো বা route dynamic করো |
| Module not found | case-sensitivity! `Button.tsx` বনাম `button.tsx` — Linux-এ (deploy server) matter করে, macOS/Windows-এ নয় |

## 8. Production checklist

```text
Code
□ npm run build local-এ pass করে
□ কোনো console.log বাকি নেই (sensitive data সহ)
□ TypeScript error নেই, lint pass

Security
□ সব Server Function/Route Handler-এ auth + ownership check
□ কোনো secret-এ NEXT_PUBLIC_ নেই
□ .env.local git-এ নেই
□ session cookie: httpOnly + secure + sameSite
□ dependency update / npm audit

Data
□ Production database আলাদা, backup চালু
□ Migration চালানো হয়েছে
□ Connection pooling ঠিক আছে (serverless-এ)

UX
□ প্রতিটা route-এ loading.tsx ও error.tsx
□ 404 page আছে
□ Mobile-এ দেখা হয়েছে

SEO
□ প্রতিটা page-এ আলাদা metadata + metadataBase
□ sitemap.ts, robots.ts
□ OG image কাজ করছে

Performance
□ Lighthouse (mobile, production build) দেখা হয়েছে
□ ছবি next/image দিয়ে
□ বড় route-গুলো অকারণে dynamic নয়

Ops
□ Monitoring / error tracking চালু
□ Uptime check
□ Rollback-এর পথ জানা আছে
```

## 9, 10, 11. Platform, domain, HTTPS

- **Platform:** Vercel, Netlify, Cloudflare, Render, Railway, Fly.io, AWS, বা নিজের VPS + Docker + Nginx
- **Domain:** DNS-এ platform-এর দেওয়া record বসাও (A বা CNAME); propagate হতে কিছু সময় লাগে
- **HTTPS:** managed platform নিজেই certificate দেয়; self-host-এ Let's Encrypt (Certbot / Caddy)। HTTPS ছাড়া `secure` cookie কাজ করবে না, তাই production-এ HTTPS আলোচনার বিষয় নয়

## 12. Monitoring / logging basics

- **Error tracking:** Sentry (Next.js-এর জন্য ভালো integration)
- **Analytics/Web Vitals:** Vercel Analytics, Plausible, PostHog
- **Uptime:** Better Stack, UptimeRobot
- **Log:** platform-এর log stream, বা Axiom-এর মতো জায়গায় পাঠানো
- **Alert:** critical error হলে যাতে তুমি জানতে পারো — user-এর অভিযোগের আগে

## Practice

তোমার project একটা platform-এ deploy করো। তারপর: (১) env var ঠিকভাবে বসাও, (২) production URL-এ Lighthouse চালাও, (৩) ইচ্ছে করে একটা error ট্রিগার করে দেখো log-এ আসছে কি না, (৪) checklist-টা ধরে ধরে মিলিয়ে নাও।

## What I should be able to explain (Phase 22–24)

1. `params` কে `Promise` type দিতে হয় কেন?
2. TypeScript type আর Zod validation একসাথে কেন দরকার?
3. Unit, integration আর E2E test-এর ভূমিকা কীভাবে আলাদা?
4. Build output-এর `○`, `●`, `ƒ` চিহ্নগুলো কী বোঝায়?
5. `NEXT_PUBLIC_` variable বদলালে redeploy কেন লাগে?

---

# Phase 25 — Real Project Architecture

> **শুরুতেই সতর্কবার্তা:** নিচের structure একটা **উদাহরণ**, "একমাত্র সঠিক উপায়" নয়। ছোট project-এ এত folder বাড়তি; বড় team-এ এর চেয়ে ভিন্ন convention থাকতে পারে (feature-based, module-based, monorepo)। **নিয়ম একটাই: যে জিনিস একসাথে বদলায়, সেগুলো একসাথে রাখো, আর পুরো team একই রীতি মানো।**

## একটা বাস্তবসম্মত structure

```text
my-app/
├── app/
│   ├── layout.tsx                  ← root: html, font, provider
│   ├── globals.css
│   ├── not-found.tsx
│   ├── (marketing)/                ← public site, নিজের layout
│   │   ├── layout.tsx
│   │   ├── page.tsx                →  /
│   │   ├── about/page.tsx          →  /about
│   │   └── pricing/page.tsx
│   ├── (auth)/                     ← login/signup, minimal layout
│   │   ├── layout.tsx
│   │   ├── login/page.tsx
│   │   └── signup/page.tsx
│   ├── dashboard/
│   │   ├── layout.tsx              ← sidebar (এখানে auth UI gate)
│   │   ├── page.tsx
│   │   ├── loading.tsx
│   │   ├── error.tsx
│   │   ├── _components/            ← শুধু dashboard-এর component
│   │   └── settings/page.tsx
│   ├── products/
│   │   ├── page.tsx                ← list + search/filter/pagination
│   │   ├── loading.tsx
│   │   └── [id]/
│   │       ├── page.tsx
│   │       ├── not-found.tsx
│   │       └── opengraph-image.tsx
│   ├── api/
│   │   ├── webhooks/stripe/route.ts
│   │   └── health/route.ts
│   ├── sitemap.ts
│   └── robots.ts
│
├── components/                     ← পুরো app জুড়ে reusable, "dumb" UI
│   ├── ui/                         ← Button, Input, Card, Dialog
│   └── layout/                     ← Navbar, Footer
│
├── lib/                            ← server-side logic ও helper
│   ├── prisma.ts                   ← DB client (singleton)
│   ├── session.ts                  ← token sign/verify
│   ├── dal.ts                      ← verifySession()
│   ├── dal/                        ← data access per domain
│   │   ├── products.ts
│   │   └── orders.ts
│   ├── env.ts                      ← validated env
│   └── utils.ts                    ← pure helper (format, slugify)
│
├── actions/                        ← Server Functions ("use server")
│   ├── auth.ts
│   ├── products.ts
│   └── orders.ts
│
├── validations/                    ← Zod schema (client ও server দুজনেই ব্যবহার করে)
│   ├── auth.ts
│   └── product.ts
│
├── types/
│   └── index.ts
│
├── hooks/                          ← client-side custom hook
│   └── use-debounce.ts
│
├── prisma/
│   ├── schema.prisma
│   └── migrations/
│
├── e2e/                            ← Playwright test
├── public/
├── proxy.ts                        ← root-এ, app/ এর ভেতরে নয়
├── next.config.ts
├── .env.example
└── package.json
```

## কী কোথায় — এবং কেন

| জিনিস | কোথায় | কেন |
|---|---|---|
| **UI (route-এর page)** | `app/**/page.tsx` | routing-ই তার ঠিকানা |
| **শুধু এক route-এর component** | ওই route-এর পাশে `_components/` | colocation — একসাথে বদলায়, একসাথে থাকে |
| **Reusable component** | `components/` | একাধিক route ব্যবহার করে |
| **Server logic / data access** | `lib/dal/` | auth + ownership + query এক জায়গায় |
| **Mutation (form/button)** | `actions/` | `"use server"` file গুলো আলাদা করে চেনা যায় |
| **Database client** | `lib/prisma.ts` | singleton, একটাই জায়গা |
| **Validation** | `validations/` | একই schema client hint + server enforcement-এ |
| **Types** | `types/` (+ ORM-এর generated type) | duplicate definition এড়ানো |
| **Auth logic** | `lib/session.ts` + `lib/dal.ts` (+ `proxy.ts`-এ optimistic redirect) | একটাই source of truth |
| **Pure helper** | `lib/utils.ts` | unit test করা সহজ |

## প্রবাহটা দেখো — একটা feature end-to-end

```text
User form submit করল
      ↓
app/products/new/page.tsx        (UI, Server Component)
      ↓  <form action={createProduct}>
actions/products.ts              ("use server")
      ↓  1) verifySession()      → lib/dal.ts
      ↓  2) ProductSchema.parse  → validations/product.ts
      ↓  3) createProduct()      → lib/dal/products.ts
      ↓                             → lib/prisma.ts → Database
      ↓  4) revalidateTag("products") / updateTag
      ↓  5) redirect("/products")
নতুন data সহ page আবার render হলো
```

এই একটা diagram-ই Phase 4 থেকে 21 পর্যন্ত শেখা সব কিছু জোড়া লাগায়। নতুন feature লেখার সময় এই ৫টা ধাপ মনে রাখলেই architecture ঠিক থাকবে।

## Architecture নিয়ে কিছু নীতি

1. **Server-এর জিনিস server-এ** — `lib/` আর `actions/`-এর কিছু কখনো Client Component-এ import করবে না।
2. **Component "dumb", DAL "smart"** — component কেবল দেখায়; auth/filter/validation DAL ও action-এ।
3. **এক জায়গায় এক দায়িত্ব** — একই query তিন জায়গায় লিখো না।
4. **কাছাকাছি রাখো** — শুধু এক page-এর জিনিস ওই page-এর পাশে।
5. **Structure project-এর সাথে বাড়বে** — ৫ page-এর project-এ `actions/` folder না বানিয়ে `lib/actions.ts` একটা file-ই যথেষ্ট। অকালে abstraction বানানো নিজেই একটা সমস্যা।

## Practice

তোমার এখন পর্যন্ত বানানো সবচেয়ে বড় project-টাকে এই structure-এ refactor করো। প্রতিটা file সরানোর সময় নিজেকে জিজ্ঞেস করো: "এটা server না client? এটা কে কে ব্যবহার করে?"

---

# Phase 26 — Build Projects

> শেখা আসলে এখানেই হয়। প্রতিটা project আগেরটার উপর গড়ে উঠছে — ক্রম বদলাবে না।

## Project 1 — Personal Portfolio

**কী শিখব:** routing, layout, component, metadata, image, font
**কেন বানাব:** Next.js-এর ভিত্তিটা হাতে আসবে, আর একটা সত্যিকারের কাজে লাগা জিনিস তৈরি হবে (job application-এ দেবে)।

**Features**
- Home, About, Projects, Contact page
- Shared navbar + footer (root layout), active link highlight
- Project card grid, `next/image` সহ
- `next/font` দিয়ে typography
- প্রতিটা page-এ আলাদা metadata + OG image
- Dark mode (cookie দিয়ে, যাতে flash না হয়)
- Responsive

**Folder**
```text
app/
├── layout.tsx
├── page.tsx
├── about/page.tsx
├── projects/page.tsx
├── contact/page.tsx
└── _components/{Navbar,Footer,ProjectCard,ThemeToggle}.tsx
components/ui/
lib/projects.ts        ← আপাতত hardcoded array
```

**Concepts practiced:** Phase 1, 2, 3, 13, 14, 15 (+ Phase 10-এর cookie theme)

---

## Project 2 — Blog

**কী শিখব:** dynamic route, data fetching, loading, error, not-found, metadata
**কেন বানাব:** dynamic route আর SEO-র আসল অভ্যাস তৈরি হয়; content site-এর সব সমস্যা এখানেই আসে।

**Features**
- `/blog` list, `/blog/[slug]` detail
- Markdown/MDX বা একটা headless CMS/JSON থেকে content
- `generateStaticParams` দিয়ে সব post prerender
- `loading.tsx`, `error.tsx`, `not-found.tsx`
- `generateMetadata` দিয়ে প্রতি post-এর title/description/OG
- Tag দিয়ে filter, reading time
- `sitemap.ts` + `robots.ts`
- ISR / revalidation (Phase 6)

**Folder**
```text
app/blog/
├── page.tsx
├── loading.tsx
├── [slug]/
│   ├── page.tsx
│   ├── not-found.tsx
│   └── opengraph-image.tsx
lib/posts.ts
content/*.mdx
```

**Concepts practiced:** Phase 2, 3, 5, 6, 15

---

## Project 3 — Product Store (read-only)

**কী শিখব:** dynamic route, search, filter, sort, pagination, server fetching, image
**কেন বানাব:** URL-as-state pattern-এ দক্ষতা — real e-commerce/dashboard কাজের মূল দক্ষতা।

**Features**
- `/products?q=&category=&sort=&page=` — সবই server-এ পড়া ও filter করা
- Search box (debounced), category dropdown, sort select, pagination
- Product detail page (`notFound()` সহ)
- Suspense দিয়ে streaming: product info আগে, "related products" পরে
- Skeleton loading
- Remote image + `next/image` config

**Folder**
```text
app/products/
├── page.tsx                ← searchParams পড়ে
├── loading.tsx
├── _components/{SearchBox,CategoryFilter,SortSelect,Pagination,ProductGrid}.tsx
└── [id]/page.tsx
lib/dal/products.ts
hooks/use-debounce.ts
```

**Concepts practiced:** Phase 4, 5, 6, 7, 13, 19

---

## Project 4 — Dashboard (auth + CRUD)

**কী শিখব:** nested layout, authentication, authorization, form, Server Function, database
**কেন বানাব:** এখান থেকেই তুমি "সত্যিকারের app" বানাতে শিখছ — login, private data, mutation।

**Features**
- Login/signup (নিজে session cookie + bcrypt, অথবা Auth.js)
- `/dashboard` protected, nested layout (sidebar)
- Item CRUD — Server Function, Zod validation, pending state, error UI
- Ownership: প্রতিটা user শুধু নিজের data দেখবে/বদলাবে
- Role: `/dashboard/admin` শুধু admin-এর
- Prisma + SQLite/Postgres
- Mutation-এর পরে revalidate + redirect
- `proxy.ts` দিয়ে optimistic redirect

**Folder**
```text
app/
├── (auth)/login/page.tsx
├── dashboard/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── items/{page.tsx,new/page.tsx,[id]/edit/page.tsx}
│   └── admin/page.tsx
actions/{auth.ts,items.ts}
lib/{prisma.ts,session.ts,dal.ts}
lib/dal/items.ts
validations/{auth.ts,item.ts}
proxy.ts
```

**Concepts practiced:** Phase 2, 3, 8, 10, 11, 12, 16, 17, 18, 21, 22

---

## Project 5 — Full-stack Application (capstone)

সব একসাথে:

```text
React
+ Next.js (App Router)
+ TypeScript
+ Database (Prisma + Postgres)
+ Authentication + Authorization
+ API (Route Handler + webhook)
+ Validation (Zod)
+ Security (auth, ownership, rate limit, secure cookie)
+ SEO (metadata, sitemap, OG)
+ Performance (caching, streaming, image/font)
+ Testing (unit + E2E)
+ Deployment (production + monitoring)
```

**উদাহরণ ধারণা (একটা বেছে নাও):**
- **Multi-author blog platform** — লেখক নিজের post লিখবে, editor publish করবে, public side SEO-optimized
- **Job board** — company post দেবে, candidate apply করবে, search/filter সহ
- **Course platform** — enrollment, progress tracking, role (student/instructor)
- **Expense tracker (team)** — team, invite, role, report, chart

**যা অবশ্যই থাকা উচিত**
- অন্তত ৩টা role এবং real authorization (শুধু UI hiding নয়)
- একটা webhook endpoint (payment বা email provider)
- Search + filter + pagination (URL state)
- Streaming সহ একটা page (static shell + dynamic hole)
- অন্তত ৫টা E2E test (auth flow সহ)
- Deployed + monitored + `.env.example` + README

**এই project-টা শেষ করতে পারলে তুমি junior/mid-level Next.js role-এর জন্য প্রস্তুত।**

---

# Complete Next.js Learning Roadmap

```text
React Fundamentals
      ↓
Next.js Foundation  (project, structure, layout, page)
      ↓
App Router  →  Routing  →  Layouts  →  Special files
      ↓
Server Components  ←→  Client Components   ★ সবচেয়ে গুরুত্বপূর্ণ mental model
      ↓
Rendering  (static / dynamic / streaming)
      ↓
Data Fetching  →  Caching & Revalidation
      ↓
Search Params & URL state
      ↓
Forms  →  Server Functions  →  Validation
      ↓
Route Handlers  →  Cookies & Headers
      ↓
Authentication  →  Authorization  →  Data Access Layer
      ↓
Proxy  (আগের Middleware)
      ↓
Database  →  Environment Variables
      ↓
Error Handling
      ↓
Images  →  Fonts  →  Metadata & SEO
      ↓
Performance  →  Accessibility  →  Security
      ↓
TypeScript  →  Testing
      ↓
Deployment  →  Monitoring
      ↓
Real Project Architecture  →  Build Projects
```

## What to learn first (প্রথম ২–৩ সপ্তাহ)

সবচেয়ে বেশি রিটার্ন এই ছয়টায়:

1. **Routing + layout** (Phase 1, 2, 3) — এটা ছাড়া কিছুই করা যাবে না
2. **Server vs Client Components** (Phase 4) — ★ এখানে সময় দাও, বারবার পড়ো
3. **Data fetching** (Phase 6-এর প্রথম অংশ) — `async` Server Component
4. **`loading.tsx` / `error.tsx` / `notFound()`** (Phase 3, 18)
5. **Forms + Server Functions** (Phase 8) — mutation-এর মূল pattern
6. **searchParams** (Phase 7)

এই ছয়টা জানলেই তুমি বাস্তব app বানাতে পারবে।

## What can wait until later

- Caching-এর গভীরতা (`cacheLife`, `cacheTag`, Cache Components) — ধারণাটা জানো, গভীরে যাও পরে
- Parallel routes, intercepting routes, `default.tsx`
- `unauthorized()` / `forbidden()` (experimental)
- Advanced generics
- Custom `ImageResponse`, complex OG generation
- Internationalization (i18n)
- Monorepo, custom server, advanced Docker
- `proxy.ts`-এর advanced ব্যবহার

## What I should build

```text
Portfolio  →  Blog  →  Product Store  →  Dashboard  →  Full-stack app
(Phase 26-এর ক্রম মেনেই এগোও — প্রতিটা আগেরটার উপর দাঁড়ানো)
```

**একটা পরামর্শ:** tutorial দেখে ১০টা project copy করার চেয়ে নিজে হাতে ৩টা project ভুল করে করে বানানো অনেক বেশি শেখায়। আটকে গেলে official docs খোলো — YouTube নয়।

## When can I consider myself "Next.js-ready"

নিচের প্রশ্নগুলোর উত্তর যদি **নিজের ভাষায়, কোড দেখিয়ে** দিতে পারো:

```text
□ কোনো component-কে Server না Client রাখব — সিদ্ধান্তটা কীভাবে নিই, এবং কেন?
□ একটা route static নাকি dynamic হচ্ছে সেটা বুঝতে পারি এবং নিয়ন্ত্রণ করতে পারি?
□ Data fetch, caching আর revalidation নিজে থেকে সাজাতে পারি?
□ একটা form-এ validation + error + pending state + revalidate সবই ঠিকভাবে লিখতে পারি?
□ কেন UI-তে button লুকানো authorization নয় — এবং ঠিক জায়গায় check করি?
□ প্রতিটা Server Function-এ auth + ownership check আছে কি না নিজে ধরতে পারি?
□ একটা ধীর page-এর কারণ খুঁজে বের করে ঠিক করতে পারি (মেপে, অনুমান করে নয়)?
□ Metadata, sitemap, 404 status — SEO-র ভিত্তিটা ঠিকভাবে বসাতে পারি?
□ Environment variable-এর কোনটা public হয়ে যাবে সেটা নিশ্চিতভাবে বলতে পারি?
□ নিজের একটা app deploy করে production-এ চলতে দেখেছি এবং error monitor করতে পারি?
```

দশটার মধ্যে ৮টা ✅ হলে তুমি প্রস্তুত। আর কোনটায় ❌, সেই Phase-এ ফিরে যাও — এই guide-টা ঠিক সেই কাজেই বানানো।

---

# Documentation References

**প্রাথমিক উৎস (সবসময় এখানে যাচাই করো):**

| বিষয় | লিংক |
|---|---|
| Official Docs (home) | https://nextjs.org/docs |
| Official interactive course | https://nextjs.org/learn |
| Installation / Getting Started | https://nextjs.org/docs/app/getting-started/installation |
| Server & Client Components | https://nextjs.org/docs/app/getting-started/server-and-client-components |
| Caching | https://nextjs.org/docs/app/getting-started/caching |
| Revalidating | https://nextjs.org/docs/app/getting-started/revalidating |
| Caching (previous model) | https://nextjs.org/docs/app/guides/caching-without-cache-components |
| `use cache` directive | https://nextjs.org/docs/app/api-reference/directives/use-cache |
| `cacheLife` | https://nextjs.org/docs/app/api-reference/functions/cacheLife |
| `cacheTag` | https://nextjs.org/docs/app/api-reference/functions/cacheTag |
| `revalidateTag` | https://nextjs.org/docs/app/api-reference/functions/revalidateTag |
| `proxy.js` (আগের middleware) | https://nextjs.org/docs/app/api-reference/file-conventions/proxy |
| Middleware → Proxy rename | https://nextjs.org/docs/messages/middleware-to-proxy |
| `unauthorized()` | https://nextjs.org/docs/app/api-reference/functions/unauthorized |
| `forbidden()` | https://nextjs.org/docs/app/api-reference/functions/forbidden |
| Migrating to Cache Components | https://nextjs.org/docs/app/guides/migrating-to-cache-components |
| App Router Glossary | https://nextjs.org/docs/app/glossary |
| Next.js 16 release blog | https://nextjs.org/blog/next-16 |
| Blog (security release ইত্যাদি) | https://nextjs.org/blog |

**সহায়ক (framework-বহির্ভূত কিন্তু দরকারি):**

| বিষয় | লিংক |
|---|---|
| React docs | https://react.dev |
| TypeScript handbook | https://www.typescriptlang.org/docs/handbook/intro.html |
| Prisma | https://www.prisma.io/docs |
| Zod | https://zod.dev |
| Playwright | https://playwright.dev |
| MDN (Web standard, HTTP, cookie) | https://developer.mozilla.org |
| web.dev (Core Web Vitals) | https://web.dev/vitals |

**একটা কাজের টিপ:** Next.js-এর যেকোনো docs URL-এর শেষে `.md` যোগ করলে (বা `Accept: text/markdown` header দিলে) পুরো page markdown আকারে পাওয়া যায় — পড়া ও AI tool-এ paste করা দুটোতেই সুবিধা।

---

## ✅ Document শেষ

এই guide-এ **Phase 0 থেকে Phase 26** — সবগুলো সম্পূর্ণ করা হয়েছে, সাথে final roadmap ও reference।

**পরবর্তী পদক্ষেপ:** Phase 1 আর Phase 4 আবার পড়ো, তারপর Project 1 শুরু করো। পড়া থামিয়ে **code লেখা শুরু করা**ই এখন সবচেয়ে বড় কাজ।

> *Version note: Next.js 16.3.x (September 2026) অনুযায়ী লেখা। Next.js দ্রুত বদলায় — caching ও rendering-এর অংশগুলো ব্যবহারের আগে official docs-এ একবার মিলিয়ে নিয়ো।*
