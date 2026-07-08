import styles from "./webdevelopment.module.css";
import Image from "next/image";

export const metadata = {
  title:
    "Why Your Business Needs a Website | Types of Websites, SEO, AEO & GEO Guide",
  description:
    "Learn why a website is essential for every business, the different types of websites (HTML/CSS/JS, WordPress, Next.js+CMS, MERN Stack), when to use each, and how SEO, AEO, and GEO make your site discoverable by search engines, voice assistants, and AI chat tools.",
};

const WHY_WEBSITE_REASONS = [
  {
    t: "Available 24/7",
    d: "A physical shop closes, but a website never does. Customers can check your services, pricing, and contact details at 2 a.m. and still convert.",
  },
  {
    t: "Builds Trust and Credibility",
    d: "A professional website makes a business look established and trustworthy. Without one, larger clients and partners often hesitate.",
  },
  {
    t: "Gets You Found on Google",
    d: "A business that doesn't appear in search results effectively doesn't exist for new customers. No website means no local SEO, no organic discovery.",
  },
  {
    t: "More Reach for Less Cost",
    d: "Once built, a website reaches thousands of potential customers at a fraction of the cost of print ads, billboards, or paid media alone.",
  },
  {
    t: "Generates Leads and Sales",
    d: "Contact forms, WhatsApp buttons, and online booking turn visitors into leads — a website works as a silent sales rep, around the clock.",
  },
  {
    t: "Strengthens Your Brand",
    d: "Consistent logo, colors, and tone across your website make your brand recognizable and memorable everywhere your customers find you.",
  },
];

const FAQ_ITEMS = [
  {
    q: "Do I really need a website if I already have social media?",
    a: "Yes. Social media accounts can be suspended, algorithms limit your reach, and you don't fully own that audience. A website is a permanent, fully-owned digital asset that works alongside social media, not instead of it.",
  },
  {
    q: "Which website type is cheapest to start with?",
    a: "A static HTML/CSS/JS website or a basic WordPress site is the most affordable starting point, ideal for portfolios, small local businesses, or simple landing pages.",
  },
  {
    q: "Is WordPress good enough for SEO?",
    a: "WordPress can rank well with the right plugins and clean themes, but it generally loads slower than Next.js, which can limit SEO and AEO performance at scale.",
  },
  {
    q: "Why is Next.js recommended for SEO, AEO, and GEO?",
    a: "Next.js renders pages on the server, producing fast, crawlable, well-structured HTML that search engines, voice assistants, and AI models can all read and cite easily.",
  },
  {
    q: "When should I choose the MERN Stack instead of Next.js?",
    a: "Choose MERN Stack when you need custom logins, dashboards, payments, or real-time features — essentially when you're building a full web application, not just a marketing website.",
  },
];

export default function Page() {
  return (
    <>
      {/* ---------- HERO ---------- */}
      <section className={styles.hero}>
        <div className={styles.heroText}>
          <p className={styles.eyebrow}>Web Development Guide · 2026</p>
          <h1>
            Your Website Is Your Business&apos;s
            <br />
            <span className={styles.heroAccent}>Digital Address</span>
          </h1>
          <p className={styles.heroSub}>
            Every customer searches online before they buy. A business
            without a website is a business that doesn&apos;t show up on
            the map. This guide breaks down why a website matters, the
            different types of websites AswebMatrix builds — HTML/CSS/JS,
            WordPress, Next.js with a CMS, and the MERN Stack — when to
            use each one, and why SEO, AEO, and GEO-friendly content is
            what actually gets you found today.
          </p>
          <div className={styles.heroCtas}>
            <a href="#types" className={styles.btnPrimary}>
              Explore Website Types
            </a>
            <a href="#optimization" className={styles.btnGhost}>
              SEO, AEO &amp; GEO Explained
            </a>
          </div>
        </div>

        <Image
          src="/images/aswebimage.webp"
          alt="3D web development illustration showing a modern website interface with HTML, CSS, JavaScript code panels, UI components, and development icons in green and black colors."
          width={600}
          height={400}
          className={styles.heroImage}
          priority
        />
      </section>

      {/* ---------- WHY WEBSITE ---------- */}
      <section id="why" className={styles.section}>
        <h2 className={styles.sectionTitle}>Why Is a Website Important?</h2>
        <p className={styles.sectionLead}>
          A website isn&apos;t just an &quot;online business card&quot; — it&apos;s
          your storefront that&apos;s open 24/7, working for you even while
          you sleep.
        </p>

        <div className={styles.grid4}>
          {WHY_WEBSITE_REASONS.map((item) => (
            <div key={item.t} className={styles.reasonCard}>
              <h3>{item.t}</h3>
              <p>{item.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- TYPES OF WEBSITES (signature ladder) ---------- */}
      <section id="types" className={styles.section}>
        <h2 className={styles.sectionTitle}>
          Types of Websites AswebMatrix Builds
        </h2>
        <p className={styles.sectionLead}>
          Every business has different needs — which means the right
          technology is different too. The ladder below is ordered by
          complexity: from a simple static page to a fully dynamic web
          application.
        </p>

        <div className={styles.ladder}>
          {/* STEP 01 */}
          <article className={styles.ladderStep}>
            <div className={styles.stepMeta}>
              <span className={styles.stepNum}>01</span>
              <span className={styles.stepLabel}>Simplest</span>
            </div>
            <div className={styles.stepBody}>
              <h3>HTML, CSS &amp; JavaScript (Static Website)</h3>
              <p>
                This is the foundation of the web. Every page is
                hand-coded, with no database or login system involved.
                Pages load instantly because nothing has to be
                calculated dynamically on the server.
              </p>
              <p className={styles.when}>
                <strong>When to use it:</strong> Portfolios, landing
                pages, small local businesses (salons, clinics, event
                pages) where content rarely changes.
              </p>
              <div className={styles.tagRow}>
                <span className={styles.tag}>Fastest load time</span>
                <span className={styles.tag}>Lowest cost</span>
                <span className={styles.tag}>Hard to update</span>
              </div>
            </div>
          </article>

          {/* STEP 02 */}
          <article className={styles.ladderStep}>
            <div className={styles.stepMeta}>
              <span className={styles.stepNum}>02</span>
              <span className={styles.stepLabel}>No-Code Friendly</span>
            </div>
            <div className={styles.stepBody}>
              <h3>WordPress (CMS Website)</h3>
              <p>
                WordPress is a Content Management System (CMS) that lets
                clients edit pages, blog posts, images, and products
                themselves — no coding required. Thousands of ready-made
                themes and plugins are available out of the box.
              </p>
              <p className={styles.when}>
                <strong>When to use it:</strong> Blogs, news sites, small
                e-commerce stores, or any client who wants to update
                content themselves on a regular basis.
              </p>
              <div className={styles.tagRow}>
                <span className={styles.tag}>Self-editable</span>
                <span className={styles.tag}>Huge plugin ecosystem</span>
                <span className={styles.tag}>More plugins = slower site</span>
              </div>
            </div>
          </article>

          {/* STEP 03 */}
          <article className={styles.ladderStep}>
            <div className={styles.stepMeta}>
              <span className={styles.stepNum}>03</span>
              <span className={styles.stepLabel}>Fast + SEO-First</span>
            </div>
            <div className={styles.stepBody}>
              <h3>Next.js + CMS (Headless CMS Website)</h3>
              <p>
                Next.js is a React framework that uses Server-Side
                Rendering (SSR) and Static Generation to make pages load
                extremely fast. Paired with a headless CMS (like Sanity,
                Strapi, or Contentful), clients still get an easy content
                editor — without sacrificing speed.
              </p>
              <p className={styles.when}>
                <strong>When to use it:</strong> When you need speed,
                search ranking, and easy content updates at the same time
                — ideal for corporate sites, media sites, and brand
                websites that want to rank on top of Google.
              </p>
              <div className={styles.tagRow}>
                <span className={styles.tag}>Best SEO performance</span>
                <span className={styles.tag}>Very fast</span>
                <span className={styles.tag}>Slightly higher dev cost</span>
              </div>
            </div>
          </article>

          {/* STEP 04 */}
          <article className={styles.ladderStep}>
            <div className={styles.stepMeta}>
              <span className={styles.stepNum}>04</span>
              <span className={styles.stepLabel}>Fully Custom</span>
            </div>
            <div className={styles.stepBody}>
              <h3>MERN Stack (MongoDB, Express, React, Node.js)</h3>
              <p>
                With MERN, the entire application is built from scratch —
                frontend (React), backend (Node.js + Express), and
                database (MongoDB) are all custom-designed around your
                exact requirements. No templates, full control.
              </p>
              <p className={styles.when}>
                <strong>When to use it:</strong> When your website needs
                login systems, user dashboards, payment gateways, or
                real-time features (chat, booking, order tracking) —
                think SaaS products, large e-commerce platforms, or full
                web apps.
              </p>
              <div className={styles.tagRow}>
                <span className={styles.tag}>Fully custom</span>
                <span className={styles.tag}>Scalable</span>
                <span className={styles.tag}>Longer dev timeline</span>
              </div>
            </div>
          </article>
        </div>
         <div className={styles.imageWrapper}>
        <Image
  src="/images/stair.webp"
  alt="Illustration showing the progression from HTML/CSS/JS to WordPress, Next.js + CMS, and MERN Stack with increasing complexity."
  width={600}
  height={400}
  priority
  style={{
    display: "block",
    margin: "2rem auto 0",
    width: "100%",
    maxWidth: "600px",
    height: "auto",
  }}
/>
      </div>
      </section>

      {/* ---------- COMPARISON TABLE ---------- */}
      <section id="compare" className={styles.section}>
        <h2 className={styles.sectionTitle}>Website Types Compared</h2>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Technology</th>
                <th>Speed</th>
                <th>Cost</th>
                <th>Self-Editable</th>
                <th>Best For</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>HTML/CSS/JS</td>
                <td>Very fast</td>
                <td>Low</td>
                <td>No</td>
                <td>Portfolios, landing pages</td>
              </tr>
              <tr>
                <td>WordPress</td>
                <td>Moderate</td>
                <td>Low–moderate</td>
                <td>Yes</td>
                <td>Blogs, small stores</td>
              </tr>
              <tr className={styles.highlightRow}>
                <td>Next.js + CMS</td>
                <td>Very fast</td>
                <td>Moderate</td>
                <td>Yes</td>
                <td>Brand &amp; corporate sites, SEO-focused sites</td>
              </tr>
              <tr>
                <td>MERN Stack</td>
                <td>Fast (optimized)</td>
                <td>Higher</td>
                <td>Via custom panel</td>
                <td>SaaS, web apps, large platforms</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ---------- SEO / AEO / GEO ---------- */}
      <section id="optimization" className={styles.section}>
        <h2 className={styles.sectionTitle}>
          SEO, AEO &amp; GEO: Why Optimized Content Matters
        </h2>
        <p className={styles.sectionLead}>
          Building a website isn&apos;t enough — it also needs to be
          found. That means writing and structuring content for three
          audiences at once: search engines, answer engines, and
          generative AI engines.
        </p>

        <div className={styles.grid3}>
          <div className={styles.infoCard}>
            <h3>SEO — Search Engine Optimization</h3>
            <p>
              SEO is the process that gets your website ranking on
              Google&apos;s first page. It includes:
            </p>
            <ul>
              <li>Proper keyword research and natural keyword usage</li>
              <li>Fast load times and mobile-friendly design</li>
              <li>
                Clear meta titles, meta descriptions, and heading
                structure (H1–H2–H3)
              </li>
              <li>Quality backlinks and local Google Business listings</li>
            </ul>
          </div>

          <div className={styles.infoCard}>
            <h3>AEO — Answer Engine Optimization</h3>
            <p>
              AEO focuses on getting your content picked as the direct
              answer — in Google&apos;s featured snippets, &quot;People
              Also Ask&quot; boxes, and voice assistants like Siri, Alexa,
              or Google Assistant. It includes:
            </p>
            <ul>
              <li>Writing content in a clear question-and-answer format</li>
              <li>Giving a direct, concise answer in the first sentence</li>
              <li>Using FAQ sections and structured headings</li>
              <li>
                Adding FAQ/QAPage schema markup so engines can extract
                answers
              </li>
            </ul>
          </div>

          <div className={styles.infoCard}>
            <h3>GEO — Generative Engine Optimization</h3>
            <p>
              People now ask ChatGPT, Perplexity, and Gemini for answers,
              not just Google. GEO means writing content so that AI tools
              choose your website as their source. It includes:
            </p>
            <ul>
              <li>Clear, fact-based, well-structured content</li>
              <li>Structured data (schema markup) so AI can parse context</li>
              <li>
                Original, credible information — never copy-pasted
                content
              </li>
              <li>
                Explicit statements of facts, data, and definitions AI can
                cite directly
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.calloutBox}>
          <p>
            <strong>Key takeaway:</strong> HTML/CSS/JS and WordPress
            sites can support basic SEO, but a Next.js + CMS website
            performs best across SEO, AEO, and GEO thanks to server-side
            rendering, clean semantic HTML, and easy structured-data
            integration — which is why AswebMatrix recommends Next.js
            for brand-focused clients who want long-term search
            visibility.
          </p>
        </div>

        <figure className={styles.imagePlaceholder}>
          <span className={styles.imageTag}>Image Prompt</span>
          <p>
            &quot;A three-way split illustration showing a Google search
            results page, a voice assistant speaker with a soundwave, and
            an AI chatbot interface with a citation link, all connected by
            glowing teal (#00c49a) arrows pointing to one website card,
            dark green (#0a1f1c) background, amber (#f4a261) highlight on
            the winning website card, flat vector style, no text in
            image&quot;
          </p>
        </figure>
      </section>

      {/* ---------- FAQ (AEO/GEO friendly Q&A block) ---------- */}
      <section id="faq" className={styles.section}>
        <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>

        <div className={styles.faqList}>
          {FAQ_ITEMS.map((item) => (
            <details key={item.q} className={styles.faqItem}>
              <summary className={styles.faqQuestion}>
                {item.q}
                <span className={styles.faqIcon} aria-hidden="true" />
              </summary>
              <p className={styles.faqAnswer}>{item.a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}