import Link from "next/link";
import connectDB from "@/lib/mongodb";
import City from "@/models/City";

export const metadata = {
  title: "Our Services — SEO, Web Development & Digital Marketing",
  description: "Explore A.S Web Matrix's website development, SEO, and digital marketing services across India. Select your city for localized services.",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://www.aswebmatrix.com"}/services`,
  },
};

async function getCities() {
  try {
    await connectDB();
    const cities = await City.find({ status: "active" })
      .select("name slug region country")
      .sort({ name: 1 })
      .lean();
    return cities || [];
  } catch (err) {
    console.error("City fetch failed, falling back to static page:", err.message);
    return []; // DB fail ho to bhi page crash nahi hoga
  }
}

export default async function ServicesPage() {
  const cities = await getCities();

  const services = [
    { title: "SEO Services",           icon: "fa-magnifying-glass", desc: "Rank higher on Google with technical, local & content SEO." },
    { title: "Website Development",    icon: "fa-code",             desc: "Custom, fast, SEO-friendly websites built for conversions." },
    { title: "WordPress Development",  icon: "fa-wordpress",        desc: "Professional WordPress sites tailored to your business." },
    { title: "MERN Stack Development", icon: "fa-layer-group",      desc: "Scalable full-stack web applications." },
    { title: "Digital Marketing",      icon: "fa-bullhorn",         desc: "Data-driven campaigns that grow your revenue." },
    { title: "E-commerce Solutions",   icon: "fa-cart-shopping",    desc: "High-converting online stores built to scale." },
  ];

  return (
    <div style={s.page}>
      {/* ── HERO ── */}
      <section style={s.hero}>
        <div style={s.heroBg} aria-hidden="true" />
        <div style={s.container}>
          <span style={s.eyebrow}>🚀 Our Services</span>
          <h1 style={s.heroH1}>
            SEO, Web Development & <span style={s.heroAccent}>Digital Marketing</span>
          </h1>
          <p style={s.heroDesc}>
            A.S Web Matrix helps businesses across India grow with expert SEO,
            custom website development, and full-funnel digital marketing.
          </p>
          <div style={s.heroActions}>
            <Link href="/contact" style={s.btnPrimary}>Get Free Consultation →</Link>
            <a href="tel:+919718401731" style={s.btnGhost}>📞 +91-9718401731</a>
          </div>
        </div>
      </section>

      {/* ── SERVICES GRID ── */}
      <section style={s.servicesSection}>
        <div style={s.container}>
          <div style={s.sectionHeader}>
            <span style={s.sectionTag}>What We Do</span>
            <h2 style={s.sectionH2}>Complete Digital Solutions</h2>
          </div>
          <div style={s.servicesGrid}>
            {services.map((service) => (
              <div key={service.title} style={s.serviceCard}>
                <div style={s.serviceIconWrap}>
                  <i className={`fas ${service.icon}`} style={s.serviceIconStyle} />
                </div>
                <h3 style={s.serviceTitle}>{service.title}</h3>
                <p style={s.serviceDesc}>{service.desc}</p>
                <Link href="/contact" style={s.serviceBtn}>Get Started →</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CITIES (fetched from backend, fails gracefully) ── */}
      <section style={s.citiesSection}>
        <div style={s.container}>
          <div style={s.sectionHeader}>
            <span style={s.sectionTag}>Pan-India Presence</span>
            <h2 style={s.sectionH2}>Select Your City</h2>
            <p style={s.sectionSubtext}>
              See localized services, pricing, and case studies for your city.
            </p>
          </div>

          {cities.length > 0 ? (
            <div style={s.citiesGrid}>
              {cities
                .filter((c) => c && c.slug) // koi entry slug ke bina ho to skip
                .map((c) => (
                  <Link key={c.slug} href={`/services/${c.slug}`} style={s.cityCard}>
                    <span style={s.cityName}>{c.name}</span>
                    <span style={s.cityRegion}>{c.region || c.country || ""}</span>
                  </Link>
                ))}
            </div>
          ) : (
            <div style={s.emptyState}>
              <p style={s.emptyText}>
                We currently serve businesses Pan-India. Contact us to check availability in your city.
              </p>
              <Link href="/contact" style={s.btnPrimary}>Check My City →</Link>
            </div>
          )}
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={s.ctaSection}>
        <div style={s.container}>
          <div style={s.ctaInner}>
            <span style={s.sectionTagLight}>Ready to Grow?</span>
            <h2 style={s.ctaH2}>Start Your Digital Journey Today</h2>
            <p style={s.ctaDesc}>
              Join 35+ businesses that trust A.S Web Matrix for SEO, website development, and digital marketing.
            </p>
            <div style={s.ctaActions}>
              <Link href="/contact" style={s.btnPrimary}>Get Free Consultation →</Link>
              <a href="tel:+919718401731" style={s.btnGhostLight}>📞 Call Us Now</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

const s = {
  page:            { fontFamily: "'Inter','Segoe UI',sans-serif", background: "#fff", color: "#0B1628" },
  container:       { maxWidth: "1200px", margin: "0 auto", padding: "0 32px" },
  hero:            { background: "#0B1628", padding: "100px 0 80px", position: "relative", overflow: "hidden" },
  heroBg:          { position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(0,196,154,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(0,196,154,0.06) 1px,transparent 1px)", backgroundSize: "60px 60px" },
  eyebrow:         { display: "inline-block", fontSize: "0.78rem", fontWeight: "700", color: "#00C49A", background: "rgba(0,196,154,0.1)", border: "1px solid rgba(0,196,154,0.3)", padding: "6px 14px", borderRadius: "100px", marginBottom: "20px", position: "relative", zIndex: 2 },
  heroH1:          { fontSize: "clamp(2rem,4vw,3rem)", fontWeight: "900", color: "#fff", lineHeight: 1.15, letterSpacing: "-0.03em", marginBottom: "20px", position: "relative", zIndex: 2, maxWidth: "760px" },
  heroAccent:      { color: "#00C49A" },
  heroDesc:        { fontSize: "1rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.75, marginBottom: "28px", maxWidth: "580px", position: "relative", zIndex: 2 },
  heroActions:     { display: "flex", gap: "14px", flexWrap: "wrap", position: "relative", zIndex: 2 },
  btnPrimary:      { display: "inline-flex", alignItems: "center", padding: "14px 28px", background: "#00C49A", color: "#fff", borderRadius: "100px", fontWeight: "700", fontSize: "0.9rem", textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.04em" },
  btnGhost:        { display: "inline-flex", alignItems: "center", padding: "14px 28px", background: "transparent", color: "rgba(255,255,255,0.7)", borderRadius: "100px", fontWeight: "700", fontSize: "0.9rem", textDecoration: "none", border: "1.5px solid rgba(255,255,255,0.2)" },
  btnGhostLight:   { display: "inline-flex", alignItems: "center", padding: "14px 28px", background: "transparent", color: "rgba(255,255,255,0.8)", borderRadius: "100px", fontWeight: "700", fontSize: "0.9rem", textDecoration: "none", border: "1.5px solid rgba(255,255,255,0.3)" },
  servicesSection: { padding: "80px 0", background: "#fff" },
  sectionHeader:   { textAlign: "center", marginBottom: "48px" },
  sectionTag:      { display: "inline-block", fontSize: "0.72rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.12em", color: "#00C49A", border: "1.5px solid #00C49A", padding: "5px 14px", borderRadius: "100px", marginBottom: "16px" },
  sectionH2:       { fontSize: "clamp(1.8rem,3.5vw,2.5rem)", fontWeight: "800", color: "#0B1628", letterSpacing: "-0.02em", marginBottom: "12px" },
  sectionSubtext:  { fontSize: "0.95rem", color: "#6B7A99", maxWidth: "480px", margin: "0 auto" },
  servicesGrid:    { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "24px" },
  serviceCard:     { background: "#fff", border: "1.5px solid #E2E8F0", borderRadius: "20px", padding: "28px 24px", display: "flex", flexDirection: "column", gap: "12px" },
  serviceIconWrap: { width: "52px", height: "52px", background: "linear-gradient(135deg,#00C49A,#007259)", borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "center" },
  serviceIconStyle:{ fontSize: "1.3rem", color: "#fff" },
  serviceTitle:    { fontSize: "1rem", fontWeight: "800", color: "#0B1628", margin: 0 },
  serviceDesc:     { fontSize: "0.88rem", color: "#6B7A99", lineHeight: 1.65, margin: 0 },
  serviceBtn:      { display: "block", textAlign: "center", padding: "10px", background: "#0B1628", color: "#fff", borderRadius: "10px", fontWeight: "700", fontSize: "0.82rem", textDecoration: "none", marginTop: "auto" },
  citiesSection:   { padding: "80px 0", background: "#F7F8FC" },
  citiesGrid:      { display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: "12px" },
  cityCard:        { background: "#fff", border: "1.5px solid #E2E8F0", borderRadius: "12px", padding: "14px 12px", textAlign: "center", textDecoration: "none", display: "flex", flexDirection: "column", gap: "4px" },
  cityName:        { fontSize: "0.85rem", fontWeight: "700", color: "#0B1628" },
  cityRegion:      { fontSize: "0.68rem", color: "#9CA3AF", fontWeight: "600" },
  emptyState:      { textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" },
  emptyText:       { color: "#6B7A99", fontSize: "0.95rem", maxWidth: "480px" },
  ctaSection:      { padding: "100px 0", background: "linear-gradient(135deg,#007259,#0B1628 60%)", textAlign: "center" },
  ctaInner:        { maxWidth: "680px", margin: "0 auto", padding: "0 20px" },
  sectionTagLight: { display: "inline-block", fontSize: "0.72rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.12em", color: "rgba(255,255,255,0.8)", border: "1.5px solid rgba(255,255,255,0.3)", padding: "5px 14px", borderRadius: "100px", marginBottom: "20px" },
  ctaH2:           { fontSize: "clamp(1.8rem,4vw,3rem)", fontWeight: "900", color: "#fff", letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "16px" },
  ctaDesc:         { fontSize: "1rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.75, marginBottom: "36px" },
  ctaActions:      { display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap" },
};