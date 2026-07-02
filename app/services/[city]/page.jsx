import { notFound } from "next/navigation";
import Link from "next/link";
import connectDB from "@/lib/mongodb";
import City from "@/models/City";

export async function generateMetadata({ params }) {
  const { city } = await params;
  await connectDB();
  const data = await City.findOne({ slug: city, status: "active" }).lean();
  if (!data) return { title: "Not Found" };
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.aswebmatrix.com";
  return {
    title:       data.metaTitle || `Best SEO & Web Development in ${data.name} | A.S Web Matrix`,
    description: data.metaDescription,
    keywords:    data.metaKeywords,
    alternates:  { canonical: `${siteUrl}/services/${city}` },
    openGraph: {
      title:       data.metaTitle,
      description: data.metaDescription,
      type:        "website",
      url:         `${siteUrl}/services/${city}`,
    },
  };
}

export default async function CityServicePage({ params }) {
  const { city } = await params;
  await connectDB();

  const data = await City.findOneAndUpdate(
    { slug: city, status: "active" },
    { $inc: { views: 1 } },
    { new: true }
  ).lean();

  if (!data) notFound();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.aswebmatrix.com";

  // All other active cities for internal linking
  const otherCities = await City.find({ status: "active", slug: { $ne: city } })
    .select("name slug region country").lean();

  // Schemas
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "A.S Web Matrix",
    url: siteUrl,
    telephone: "+91-9718401731",
    email: "aswebmatrix@gmail.com",
    address: { "@type": "PostalAddress", streetAddress: "2578, Sec-23 A", addressLocality: "Faridabad", addressRegion: "Haryana", postalCode: "121005", addressCountry: "IN" },
    areaServed: { "@type": "City", name: data.name },
    ...(data.geoLat && { geo: { "@type": "GeoCoordinates", latitude: data.geoLat, longitude: data.geoLng } }),
  };

  const faqSchema = data.faqs?.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: data.faqs.map(f => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  } : null;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Services", item: `${siteUrl}/services` },
      { "@type": "ListItem", position: 3, name: `Services in ${data.name}`, item: `${siteUrl}/services/${city}` },
    ],
  };

  return (
    <div style={s.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* ── HERO ── */}
      <section style={s.hero}>
        <div style={s.heroBg} aria-hidden="true" />
        <div style={s.container}>
          <nav style={s.breadcrumb}>
            <Link href="/" style={s.crumbLink}>Home</Link>
            <span style={s.crumbSep}>/</span>
            <Link href="/services" style={s.crumbLink}>Services</Link>
            <span style={s.crumbSep}>/</span>
            <span style={s.crumbActive}>{data.name}</span>
          </nav>
          <div style={s.heroInner}>
            <div style={s.heroText}>
              <span style={s.eyebrow}>📍 {data.name}{data.region ? `, ${data.region}` : ""} · {data.country}</span>
              <h1 style={s.heroH1}>
                {data.heroHeading || `Best SEO & Web Development in `}
                {!data.heroHeading && <span style={s.heroAccent}>{data.name}</span>}
              </h1>
              <p style={s.heroDesc}>
                {data.heroDesc || `A.S Web Matrix helps ${data.localKeyword || `${data.name} businesses`} grow with expert SEO, website development, and digital marketing. Trusted by 35+ businesses across India.`}
              </p>
              <div style={s.heroBadges}>
                {["Technical SEO","Local SEO","MERN Stack","WordPress","GEO & AEO","Google Ads"].map(b => (
                  <span key={b} style={s.badge}>{b}</span>
                ))}
              </div>
              <div style={s.heroActions}>
                <Link href="/contact" style={s.btnPrimary}>Get Free Consultation →</Link>
                <a href="tel:+919718401731" style={s.btnGhost}>📞 +91-9718401731</a>
              </div>
            </div>
            <div style={s.heroStats}>
              {[
                { num: "35+",    label: "Businesses Served" },
                { num: "300%",   label: "Avg Traffic Growth" },
                { num: "1 Week", label: "Website Delivery" },
                { num: "24/7",   label: "Support" },
              ].map(stat => (
                <div key={stat.label} style={s.statBox}>
                  <span style={s.statNum}>{stat.num}</span>
                  <span style={s.statLabel}>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── INTRO CONTENT ── */}
      <section style={s.introSection}>
        <div style={s.container}>
          <div style={s.introGrid}>
            <div style={s.introMain}>
              <span style={s.sectionTag}>About Our Services in {data.name}</span>
              <h2 style={s.introH2}>Why {data.name} Businesses Choose A.S Web Matrix</h2>

              {data.introContent ? (
                <div style={s.introBody} dangerouslySetInnerHTML={{ __html: data.introContent.replace(/\n/g, "<br/>") }} />
              ) : (
                <>
                  <p style={s.introPara}>
                    {data.name} is {data.marketDesc || "a major business hub"} with over {data.businesses || "thousands of"} active businesses competing for digital visibility. A.S Web Matrix is a results-driven digital agency based in Faridabad, Haryana, helping businesses in {data.name}{data.nearbyAreas?.length ? `, including ${data.nearbyAreas.slice(0,3).join(", ")}` : ""}, grow with expert SEO, website development, and digital marketing.
                  </p>
                  <p style={s.introPara}>
                    Our team of web developers, SEO specialists, and digital marketing professionals builds tailored strategies that deliver measurable results — more traffic, more leads, and more revenue for your {data.name} business.
                  </p>
                </>
              )}

              {data.aeoSummary && (
                <div style={s.aeoBox}>
                  <p style={s.aeoLabel}>📌 Quick Answer</p>
                  <p style={s.aeoText}>{data.aeoSummary}</p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside style={s.introSidebar}>
              {data.nearbyAreas?.length > 0 && (
                <div style={s.sideCard}>
                  <h3 style={s.sideTitle}>📍 Areas We Serve</h3>
                  <div style={s.sideAreas}>
                    {data.nearbyAreas.map(area => <span key={area} style={s.areaTag}>{area}</span>)}
                  </div>
                </div>
              )}
              {(data.population || data.businesses) && (
                <div style={s.sideCard}>
                  <h3 style={s.sideTitle}>🎯 {data.name} Market</h3>
                  <div style={s.sideStats}>
                    {data.population && <div style={s.sideStat}><span style={s.sideStatNum}>{data.population}</span><span style={s.sideStatLabel}>Population</span></div>}
                    {data.businesses && <div style={s.sideStat}><span style={s.sideStatNum}>{data.businesses}</span><span style={s.sideStatLabel}>Businesses</span></div>}
                  </div>
                  {data.marketDesc && <p style={s.sideDesc}>{data.marketDesc}</p>}
                </div>
              )}
              <div style={s.sideCardCta}>
                <h3 style={s.sideCtaTitle}>Grow in {data.name}?</h3>
                <p style={s.sideCtaDesc}>Free SEO audit & consultation.</p>
                <Link href="/contact" style={s.sideCtaBtn}>Get Free Audit →</Link>
                <a href="tel:+919718401731" style={s.sideCtaPhone}>📞 +91-9718401731</a>
              </div>
              <div style={s.sideCard}>
                <h3 style={s.sideTitle}>⚡ Why Choose Us</h3>
                {["1-Week Delivery","No Hidden Charges","Direct Team Access","Monthly Reports","Pan-India Service"].map(item => (
                  <div key={item} style={s.sideItem}>✓ {item}</div>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      {data.services?.length > 0 && (
        <section style={s.servicesSection}>
          <div style={s.container}>
            <div style={s.sectionHeader}>
              <span style={s.sectionTag}>Our Services in {data.name}</span>
              <h2 style={s.sectionH2}>Digital Services for {data.name} Businesses</h2>
            </div>
            <div style={s.servicesGrid}>
              {data.services.map((service, i) => (
                <div key={i} style={s.serviceCard}>
                  <div style={s.serviceIconWrap}>
                    <i className={`fas ${service.icon || "fa-star"}`} style={s.serviceIconStyle} />
                  </div>
                  <h3 style={s.serviceTitle}>{service.title}</h3>
                  <p style={s.serviceDesc}>{service.shortDesc}</p>
                  {service.benefits?.filter(Boolean).length > 0 && (
                    <ul style={s.serviceBenefits}>
                      {service.benefits.filter(Boolean).slice(0,4).map((b, bi) => (
                        <li key={bi} style={s.serviceBenefit}><span style={s.check}>✓</span> {b}</li>
                      ))}
                    </ul>
                  )}
                  {service.results && <div style={s.serviceResult}>🏆 {service.results}</div>}
                  <Link href="/contact" style={s.serviceBtn}>Get Started →</Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── FAQs ── */}
      {data.faqs?.length > 0 && (
        <section style={s.faqSection}>
          <div style={s.container}>
            <div style={s.sectionHeader}>
              <span style={s.sectionTag}>FAQs</span>
              <h2 style={s.sectionH2}>Frequently Asked Questions — {data.name}</h2>
            </div>
            <div style={s.faqList}>
              {data.faqs.map((faq, i) => (
                <details key={i} style={s.faqItem}>
                  <summary style={s.faqQ}>{faq.question}</summary>
                  <p style={s.faqA}>{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── OTHER CITIES ── */}
      {otherCities.length > 0 && (
        <section style={s.citiesSection}>
          <div style={s.container}>
            <div style={s.sectionHeader}>
              <span style={s.sectionTag}>Pan-India & Global</span>
              <h2 style={s.sectionH2}>We Also Serve These Cities</h2>
            </div>
            <div style={s.citiesGrid}>
              {otherCities.slice(0,12).map(c => (
                <Link key={c.slug} href={`/services/${c.slug}`} style={s.cityCard}>
                  <span style={s.cityName}>{c.name}</span>
                  <span style={s.cityRegion}>{c.region || c.country}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section style={s.ctaSection}>
        <div style={s.container}>
          <div style={s.ctaInner}>
            <span style={s.sectionTagLight}>Ready to Grow?</span>
            <h2 style={s.ctaH2}>Start Your Digital Journey in {data.name} Today</h2>
            <p style={s.ctaDesc}>Join 35+ businesses that trust A.S Web Matrix for SEO, website development, and digital marketing.</p>
            <div style={s.ctaActions}>
              <Link href="/contact" style={s.btnPrimary}>Get Free Consultation →</Link>
              <a href="tel:+919718401731" style={s.btnGhostLight}>📞 Call Us Now</a>
            </div>
            <p style={s.ctaFooter}>📍 Based in Faridabad · Serving {data.name} & 20+ Cities · No Hidden Charges</p>
          </div>
        </div>
      </section>
    </div>
  );
}

const s = {
  page:           { fontFamily: "'Inter','Segoe UI',sans-serif", background: "#fff", color: "#0B1628" },
  container:      { maxWidth: "1200px", margin: "0 auto", padding: "0 32px" },
  hero:           { background: "#0B1628", padding: "100px 0 80px", position: "relative", overflow: "hidden" },
  heroBg:         { position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(0,196,154,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(0,196,154,0.06) 1px,transparent 1px)", backgroundSize: "60px 60px" },
  heroInner:      { position: "relative", zIndex: 2, display: "grid", gridTemplateColumns: "1fr 300px", gap: "60px", alignItems: "center" },
  heroText:       {},
  breadcrumb:     { display: "flex", alignItems: "center", gap: "6px", marginBottom: "28px", position: "relative", zIndex: 2 },
  crumbLink:      { color: "rgba(255,255,255,0.5)", fontSize: "0.82rem", textDecoration: "none", fontWeight: "600" },
  crumbSep:       { color: "rgba(255,255,255,0.25)", fontSize: "0.82rem" },
  crumbActive:    { color: "#00C49A", fontSize: "0.82rem", fontWeight: "700" },
  eyebrow:        { display: "inline-block", fontSize: "0.78rem", fontWeight: "700", color: "#00C49A", background: "rgba(0,196,154,0.1)", border: "1px solid rgba(0,196,154,0.3)", padding: "6px 14px", borderRadius: "100px", marginBottom: "20px" },
  heroH1:         { fontSize: "clamp(2rem,4vw,3rem)", fontWeight: "900", color: "#fff", lineHeight: 1.1, letterSpacing: "-0.03em", marginBottom: "20px" },
  heroAccent:     { color: "#00C49A" },
  heroDesc:       { fontSize: "1rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.75, marginBottom: "24px", maxWidth: "580px" },
  heroBadges:     { display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "28px" },
  badge:          { fontSize: "0.72rem", fontWeight: "700", color: "#00C49A", background: "rgba(0,196,154,0.1)", border: "1px solid rgba(0,196,154,0.25)", padding: "4px 12px", borderRadius: "100px" },
  heroActions:    { display: "flex", gap: "14px", flexWrap: "wrap" },
  heroStats:      { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "20px", padding: "8px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px" },
  statBox:        { padding: "20px 16px", textAlign: "center", borderRadius: "12px" },
  statNum:        { display: "block", fontSize: "1.8rem", fontWeight: "900", color: "#00C49A", letterSpacing: "-0.02em", lineHeight: 1, marginBottom: "4px" },
  statLabel:      { display: "block", fontSize: "0.7rem", fontWeight: "600", color: "rgba(255,255,255,0.45)", textTransform: "uppercase", letterSpacing: "0.08em" },
  btnPrimary:     { display: "inline-flex", alignItems: "center", padding: "14px 28px", background: "#00C49A", color: "#fff", borderRadius: "100px", fontWeight: "700", fontSize: "0.9rem", textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.04em" },
  btnGhost:       { display: "inline-flex", alignItems: "center", padding: "14px 28px", background: "transparent", color: "rgba(255,255,255,0.7)", borderRadius: "100px", fontWeight: "700", fontSize: "0.9rem", textDecoration: "none", border: "1.5px solid rgba(255,255,255,0.2)" },
  btnGhostLight:  { display: "inline-flex", alignItems: "center", padding: "14px 28px", background: "transparent", color: "rgba(255,255,255,0.8)", borderRadius: "100px", fontWeight: "700", fontSize: "0.9rem", textDecoration: "none", border: "1.5px solid rgba(255,255,255,0.3)" },
  introSection:   { padding: "80px 0" },
  introGrid:      { display: "grid", gridTemplateColumns: "1fr 300px", gap: "60px", alignItems: "start" },
  introMain:      {},
  sectionTag:     { display: "inline-block", fontSize: "0.72rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.12em", color: "#00C49A", border: "1.5px solid #00C49A", padding: "5px 14px", borderRadius: "100px", marginBottom: "16px" },
  introH2:        { fontSize: "clamp(1.8rem,3.5vw,2.5rem)", fontWeight: "800", color: "#0B1628", letterSpacing: "-0.02em", lineHeight: 1.15, marginBottom: "24px" },
  introBody:      { fontSize: "1rem", lineHeight: 1.85, color: "#4A5568" },
  introPara:      { fontSize: "1rem", lineHeight: 1.85, color: "#4A5568", marginBottom: "16px" },
  aeoBox:         { background: "#F0FDF4", border: "1.5px solid #86EFAC", borderRadius: "14px", padding: "20px 24px", marginTop: "24px" },
  aeoLabel:       { fontSize: "0.75rem", fontWeight: "800", textTransform: "uppercase", letterSpacing: "0.08em", color: "#166534", marginBottom: "8px" },
  aeoText:        { fontSize: "0.95rem", color: "#166534", lineHeight: 1.7, margin: 0 },
  introSidebar:   { display: "flex", flexDirection: "column", gap: "20px", position: "sticky", top: "100px" },
  sideCard:       { background: "#F7F8FC", border: "1.5px solid #E2E8F0", borderRadius: "16px", padding: "20px" },
  sideTitle:      { fontSize: "0.88rem", fontWeight: "800", color: "#0B1628", marginBottom: "12px" },
  sideAreas:      { display: "flex", flexWrap: "wrap", gap: "6px" },
  areaTag:        { fontSize: "0.72rem", fontWeight: "600", color: "#374151", background: "#fff", border: "1px solid #E2E8F0", padding: "3px 10px", borderRadius: "100px" },
  sideStats:      { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "12px" },
  sideStat:       { textAlign: "center", background: "#fff", borderRadius: "10px", padding: "12px 8px" },
  sideStatNum:    { display: "block", fontSize: "1.1rem", fontWeight: "900", color: "#00C49A", marginBottom: "2px" },
  sideStatLabel:  { display: "block", fontSize: "0.68rem", fontWeight: "600", color: "#6B7A99", textTransform: "uppercase" },
  sideDesc:       { fontSize: "0.82rem", color: "#6B7A99", lineHeight: 1.6, margin: 0 },
  sideCardCta:    { background: "#0B1628", borderRadius: "16px", padding: "24px", display: "flex", flexDirection: "column", gap: "10px" },
  sideCtaTitle:   { fontSize: "0.95rem", fontWeight: "800", color: "#fff", margin: 0 },
  sideCtaDesc:    { fontSize: "0.82rem", color: "rgba(255,255,255,0.6)", margin: 0 },
  sideCtaBtn:     { display: "block", textAlign: "center", padding: "11px", background: "#00C49A", color: "#fff", borderRadius: "10px", fontWeight: "700", fontSize: "0.85rem", textDecoration: "none" },
  sideCtaPhone:   { display: "block", textAlign: "center", fontSize: "0.82rem", color: "rgba(255,255,255,0.7)", textDecoration: "none", fontWeight: "600" },
  sideItem:       { fontSize: "0.85rem", color: "#374151", fontWeight: "600", padding: "5px 0", borderBottom: "1px solid #F3F4F6" },
  servicesSection:{ padding: "80px 0", background: "#F7F8FC" },
  sectionHeader:  { textAlign: "center", marginBottom: "48px" },
  sectionH2:      { fontSize: "clamp(1.8rem,3.5vw,2.5rem)", fontWeight: "800", color: "#0B1628", letterSpacing: "-0.02em", marginBottom: "12px" },
  servicesGrid:   { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "24px" },
  serviceCard:    { background: "#fff", border: "1.5px solid #E2E8F0", borderRadius: "20px", padding: "28px 24px", display: "flex", flexDirection: "column", gap: "12px" },
  serviceIconWrap:{ width: "52px", height: "52px", background: "linear-gradient(135deg,#00C49A,#007259)", borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "center" },
  serviceIconStyle:{ fontSize: "1.3rem", color: "#fff" },
  serviceTitle:   { fontSize: "1rem", fontWeight: "800", color: "#0B1628", margin: 0 },
  serviceDesc:    { fontSize: "0.88rem", color: "#6B7A99", lineHeight: 1.65, margin: 0 },
  serviceBenefits:{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "6px" },
  serviceBenefit: { fontSize: "0.82rem", color: "#374151", fontWeight: "600", display: "flex", gap: "6px" },
  check:          { color: "#00C49A", fontWeight: "800" },
  serviceResult:  { fontSize: "0.78rem", fontWeight: "700", color: "#007259", background: "#E6F9F4", padding: "6px 12px", borderRadius: "8px" },
  serviceBtn:     { display: "block", textAlign: "center", padding: "10px", background: "#0B1628", color: "#fff", borderRadius: "10px", fontWeight: "700", fontSize: "0.82rem", textDecoration: "none", marginTop: "auto" },
  faqSection:     { padding: "80px 0" },
  faqList:        { display: "flex", flexDirection: "column", gap: "12px", maxWidth: "800px", margin: "0 auto" },
  faqItem:        { border: "1.5px solid #E2E8F0", borderRadius: "14px", overflow: "hidden" },
  faqQ:           { padding: "18px 22px", fontWeight: "700", fontSize: "0.98rem", color: "#0B1628", cursor: "pointer", listStyle: "none" },
  faqA:           { padding: "0 22px 18px", fontSize: "0.92rem", color: "#4A5568", lineHeight: 1.75, margin: 0 },
  citiesSection:  { padding: "60px 0", background: "#F7F8FC" },
  citiesGrid:     { display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: "12px" },
  cityCard:       { background: "#fff", border: "1.5px solid #E2E8F0", borderRadius: "12px", padding: "14px 12px", textAlign: "center", textDecoration: "none", display: "flex", flexDirection: "column", gap: "4px" },
  cityName:       { fontSize: "0.85rem", fontWeight: "700", color: "#0B1628" },
  cityRegion:     { fontSize: "0.68rem", color: "#9CA3AF", fontWeight: "600" },
  ctaSection:     { padding: "100px 0", background: "linear-gradient(135deg,#007259,#0B1628 60%)", textAlign: "center", position: "relative", overflow: "hidden" },
  ctaInner:       { position: "relative", zIndex: 2, maxWidth: "680px", margin: "0 auto", padding: "0 20px" },
  sectionTagLight:{ display: "inline-block", fontSize: "0.72rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.12em", color: "rgba(255,255,255,0.8)", border: "1.5px solid rgba(255,255,255,0.3)", padding: "5px 14px", borderRadius: "100px", marginBottom: "20px" },
  ctaH2:          { fontSize: "clamp(1.8rem,4vw,3rem)", fontWeight: "900", color: "#fff", letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "16px" },
  ctaDesc:        { fontSize: "1rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.75, marginBottom: "36px" },
  ctaActions:     { display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap", marginBottom: "28px" },
  ctaFooter:      { fontSize: "0.82rem", color: "rgba(255,255,255,0.4)" },
};