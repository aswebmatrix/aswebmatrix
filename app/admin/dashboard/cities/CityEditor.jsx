"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const EMPTY = {
  name: "", slug: "", region: "", country: "India", countryCode: "IN",
  population: "", businesses: "", nearbyAreas: "", marketDesc: "", localKeyword: "",
  status: "active",
  metaTitle: "", metaDescription: "", metaKeywords: "",
  geoLat: "", geoLng: "", aeoSummary: "",
  heroHeading: "", heroDesc: "", introContent: "",
  services: [], faqs: [],
};

const DEFAULT_SERVICES = [
  { icon: "fa-magnifying-glass", title: "SEO Services", shortDesc: "", longDesc: "", benefits: ["","",""], results: "" },
  { icon: "fa-laptop-code",      title: "Website Development", shortDesc: "", longDesc: "", benefits: ["","",""], results: "" },
  { icon: "fa-chart-line",       title: "Digital Marketing", shortDesc: "", longDesc: "", benefits: ["","",""], results: "" },
  { icon: "fa-location-dot",     title: "Local SEO", shortDesc: "", longDesc: "", benefits: ["","",""], results: "" },
  { icon: "fa-robot",            title: "GEO & AEO Optimization", shortDesc: "", longDesc: "", benefits: ["","",""], results: "" },
  { icon: "fa-cart-shopping",    title: "E-Commerce Development", shortDesc: "", longDesc: "", benefits: ["","",""], results: "" },
];

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").trim();
}

export default function CityEditor({ existingCity = null }) {
  const router  = useRouter();
  const isEdit  = !!existingCity;

  const [form,    setForm]    = useState(existingCity || EMPTY);
  const [services,setServices]= useState(existingCity?.services?.length ? existingCity.services : DEFAULT_SERVICES);
  const [faqs,    setFaqs]    = useState(existingCity?.faqs || []);
  const [tab,     setTab]     = useState("basic");
  const [saving,  setSaving]  = useState(false);
  const [error,   setError]   = useState("");
  const [success, setSuccess] = useState("");

  function handleNameChange(e) {
    const name = e.target.value;
    setForm(f => ({
      ...f, name,
      slug:            !isEdit ? slugify(name) : f.slug,
      metaTitle:       f.metaTitle  || `Best SEO & Web Development Company in ${name} | A.S Web Matrix`,
      metaDescription: f.metaDescription || `A.S Web Matrix offers expert SEO, website development and digital marketing in ${name}. Get a free consultation today.`,
      heroHeading:     f.heroHeading || `Best SEO & Web Development in ${name}`,
      localKeyword:    f.localKeyword || `${name} businesses`,
    }));
  }

  // Services helpers
  function updateService(i, key, val) {
    setServices(prev => prev.map((s, idx) => idx === i ? { ...s, [key]: val } : s));
  }
  function updateServiceBenefit(si, bi, val) {
    setServices(prev => prev.map((s, idx) => {
      if (idx !== si) return s;
      const benefits = [...(s.benefits || [])];
      benefits[bi] = val;
      return { ...s, benefits };
    }));
  }
  function addService() {
    setServices(prev => [...prev, { icon: "fa-star", title: "", shortDesc: "", longDesc: "", benefits: ["","",""], results: "" }]);
  }
  function removeService(i) { setServices(prev => prev.filter((_, idx) => idx !== i)); }

  // FAQ helpers
  function addFAQ()           { setFaqs(p => [...p, { question: "", answer: "" }]); }
  function removeFAQ(i)       { setFaqs(p => p.filter((_, idx) => idx !== i)); }
  function updateFAQ(i, k, v) { setFaqs(p => p.map((f, idx) => idx === i ? { ...f, [k]: v } : f)); }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true); setError(""); setSuccess("");

    const payload = {
      ...form,
      nearbyAreas: typeof form.nearbyAreas === "string"
        ? form.nearbyAreas.split(",").map(a => a.trim()).filter(Boolean)
        : form.nearbyAreas,
      services,
      faqs,
    };

    try {
      const url    = isEdit ? `/api/cities/${existingCity._id}` : "/api/cities";
      const method = isEdit ? "PUT" : "POST";
      const res    = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error); setSaving(false); return; }
      setSuccess(isEdit ? "City updated!" : "City created!");
      if (!isEdit) router.push(`/admin/dashboard/cities/${data.city._id}`);
    } catch {
      setError("Something went wrong.");
    }
    setSaving(false);
  }

  const tabs = ["basic","seo","content","services","faqs"];

  return (
    <form onSubmit={handleSubmit} style={s.form}>
      {/* Top bar */}
      <div style={s.topBar}>
        <div>
          <h1 style={s.pageTitle}>{isEdit ? `Edit — ${form.name}` : "New City Page"}</h1>
          {isEdit && <p style={s.slugLine}>/services/{form.slug}</p>}
        </div>
        <div style={s.topActions}>
          {isEdit && (
            <a href={`/services/${form.slug}`} target="_blank" style={s.previewBtn}>
              👁 Live Preview
            </a>
          )}
          <select style={s.statusSelect} value={form.status}
            onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <button type="submit" style={saving ? s.btnDisabled : s.saveBtn} disabled={saving}>
            {saving ? "Saving..." : isEdit ? "Update City" : "Create City Page"}
          </button>
        </div>
      </div>

      {error   && <div style={s.errorBox}>{error}</div>}
      {success && <div style={s.successBox}>{success}</div>}

      {/* Tabs */}
      <div style={s.tabBar}>
        {tabs.map(t => (
          <button key={t} type="button" onClick={() => setTab(t)}
            style={tab === t ? s.tabActive : s.tab}>
            {{ basic:"🏙 Basic Info", seo:"🔍 SEO", content:"✍️ Content", services:"⚙️ Services", faqs:"❓ FAQs" }[t]}
          </button>
        ))}
      </div>

      {/* ── BASIC INFO ── */}
      {tab === "basic" && (
        <div style={s.card}>
          <h2 style={s.cardTitle}>Basic City Information</h2>
          <div style={s.twoCol}>
            <Field label="City Name *">
              <input style={s.input} value={form.name} onChange={handleNameChange} placeholder="Delhi" required />
            </Field>
            <Field label="Slug (URL)">
              <input style={s.input} value={form.slug}
                onChange={e => setForm(f => ({ ...f, slug: slugify(e.target.value) }))}
                placeholder="delhi" />
              <span style={s.hint}>/services/{form.slug || "delhi"}</span>
            </Field>
          </div>
          <div style={s.twoCol}>
            <Field label="Region / State">
              <input style={s.input} value={form.region}
                onChange={e => setForm(f => ({ ...f, region: e.target.value }))}
                placeholder="Delhi NCR" />
            </Field>
            <Field label="Country">
              <input style={s.input} value={form.country}
                onChange={e => setForm(f => ({ ...f, country: e.target.value }))}
                placeholder="India" />
            </Field>
          </div>
          <div style={s.twoCol}>
            <Field label="Population">
              <input style={s.input} value={form.population}
                onChange={e => setForm(f => ({ ...f, population: e.target.value }))}
                placeholder="32 million" />
            </Field>
            <Field label="No. of Businesses">
              <input style={s.input} value={form.businesses}
                onChange={e => setForm(f => ({ ...f, businesses: e.target.value }))}
                placeholder="500,000+" />
            </Field>
          </div>
          <Field label="Nearby Areas (comma separated)">
            <input style={s.input}
              value={typeof form.nearbyAreas === "string" ? form.nearbyAreas : form.nearbyAreas?.join(", ")}
              onChange={e => setForm(f => ({ ...f, nearbyAreas: e.target.value }))}
              placeholder="Connaught Place, Dwarka, Rohini, Janakpuri" />
          </Field>
          <Field label="Market Description (1 line)">
            <input style={s.input} value={form.marketDesc}
              onChange={e => setForm(f => ({ ...f, marketDesc: e.target.value }))}
              placeholder="India's capital and largest business hub" />
          </Field>
          <Field label="Local Keyword">
            <input style={s.input} value={form.localKeyword}
              onChange={e => setForm(f => ({ ...f, localKeyword: e.target.value }))}
              placeholder="Delhi NCR businesses" />
          </Field>
          <div style={s.twoCol}>
            <Field label="Latitude (for schema)">
              <input style={s.input} type="number" step="any" value={form.geoLat}
                onChange={e => setForm(f => ({ ...f, geoLat: e.target.value }))}
                placeholder="28.6139" />
            </Field>
            <Field label="Longitude (for schema)">
              <input style={s.input} type="number" step="any" value={form.geoLng}
                onChange={e => setForm(f => ({ ...f, geoLng: e.target.value }))}
                placeholder="77.2090" />
            </Field>
          </div>
        </div>
      )}

      {/* ── SEO ── */}
      {tab === "seo" && (
        <div style={s.card}>
          <h2 style={s.cardTitle}>SEO Settings</h2>
          <Field label="Meta Title" hint={`${form.metaTitle?.length || 0}/60 chars`}>
            <input style={s.input} value={form.metaTitle}
              onChange={e => setForm(f => ({ ...f, metaTitle: e.target.value }))}
              placeholder="Best SEO Company in Delhi | A.S Web Matrix" />
          </Field>
          <Field label="Meta Description" hint={`${form.metaDescription?.length || 0}/160 chars`}>
            <textarea style={{ ...s.input, height: "80px" }} value={form.metaDescription}
              onChange={e => setForm(f => ({ ...f, metaDescription: e.target.value }))}
              placeholder="Expert SEO, website development & digital marketing in Delhi..." />
          </Field>
          <Field label="Meta Keywords">
            <input style={s.input} value={form.metaKeywords}
              onChange={e => setForm(f => ({ ...f, metaKeywords: e.target.value }))}
              placeholder="SEO company Delhi, website development Delhi, digital marketing Delhi" />
          </Field>
          <Field label="AEO Summary (for ChatGPT / AI search engines)" hint="2-3 direct sentences. AI tools use this as featured answer.">
            <textarea style={{ ...s.input, height: "100px" }} value={form.aeoSummary}
              onChange={e => setForm(f => ({ ...f, aeoSummary: e.target.value }))}
              placeholder="A.S Web Matrix is a professional SEO and website development company serving Delhi businesses. They offer technical SEO, local SEO, MERN Stack development and digital marketing at affordable rates. Contact: +91-9718401731" />
          </Field>

          {/* SERP Preview */}
          <div style={s.serpBox}>
            <p style={s.serpLabel}>Google Preview</p>
            <p style={s.serpUrl}>aswebmatrix.com/services/{form.slug}</p>
            <p style={s.serpTitle}>{form.metaTitle || "Your Meta Title"}</p>
            <p style={s.serpDesc}>{form.metaDescription || "Your meta description..."}</p>
          </div>
        </div>
      )}

      {/* ── CONTENT ── */}
      {tab === "content" && (
        <div style={s.card}>
          <h2 style={s.cardTitle}>Page Content</h2>
          <Field label="Hero Heading">
            <input style={s.input} value={form.heroHeading}
              onChange={e => setForm(f => ({ ...f, heroHeading: e.target.value }))}
              placeholder="Best SEO & Web Development in Delhi" />
          </Field>
          <Field label="Hero Description">
            <textarea style={{ ...s.input, height: "80px" }} value={form.heroDesc}
              onChange={e => setForm(f => ({ ...f, heroDesc: e.target.value }))}
              placeholder="A.S Web Matrix helps Delhi businesses grow with expert SEO..." />
          </Field>
          <Field label="Main Introduction Content (800-1000 words)" hint="This is the main SEO content shown on the page. Write city-specific content.">
            <textarea style={{ ...s.input, height: "400px", resize: "vertical", lineHeight: "1.7" }}
              value={form.introContent}
              onChange={e => setForm(f => ({ ...f, introContent: e.target.value }))}
              placeholder={`Write 800-1000 words about your services in ${form.name || "this city"}.\n\nInclude:\n- Why businesses in ${form.name || "this city"} need SEO\n- Your website development services\n- Local SEO benefits\n- GEO & AEO optimization\n- Digital marketing services\n- Why choose A.S Web Matrix`} />
            <span style={s.hint}>
              Word count: ~{form.introContent?.split(/\s+/).filter(Boolean).length || 0} words
            </span>
          </Field>
        </div>
      )}

      {/* ── SERVICES ── */}
      {tab === "services" && (
        <div style={s.card}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <div>
              <h2 style={s.cardTitle}>Services for {form.name || "this city"}</h2>
              <p style={{ fontSize: "0.85rem", color: "#6B7A99", margin: 0 }}>Edit each service card shown on the city page</p>
            </div>
            <button type="button" onClick={addService} style={s.addBtn}>+ Add Service</button>
          </div>

          {services.map((service, i) => (
            <div key={i} style={s.serviceBlock}>
              <div style={s.serviceBlockHeader}>
                <span style={s.serviceNum}>Service {i + 1}</span>
                <button type="button" onClick={() => removeService(i)} style={s.removeBtn}>✕ Remove</button>
              </div>
              <div style={s.twoCol}>
                <Field label="Title">
                  <input style={s.input} value={service.title}
                    onChange={e => updateService(i, "title", e.target.value)}
                    placeholder="SEO Services" />
                </Field>
                <Field label="Icon (Font Awesome class)">
                  <input style={s.input} value={service.icon}
                    onChange={e => updateService(i, "icon", e.target.value)}
                    placeholder="fa-magnifying-glass" />
                </Field>
              </div>
              <Field label="Short Description">
                <input style={s.input} value={service.shortDesc}
                  onChange={e => updateService(i, "shortDesc", e.target.value)}
                  placeholder={`Rank #1 on Google with proven SEO in ${form.name || "your city"}`} />
              </Field>
              <Field label="Result / Achievement">
                <input style={s.input} value={service.results}
                  onChange={e => updateService(i, "results", e.target.value)}
                  placeholder="300% increase in organic traffic" />
              </Field>
              <label style={s.label}>Benefits (4 points)</label>
              {[0,1,2,3].map(bi => (
                <input key={bi} style={{ ...s.input, marginBottom: "8px" }}
                  value={service.benefits?.[bi] || ""}
                  onChange={e => updateServiceBenefit(i, bi, e.target.value)}
                  placeholder={`Benefit ${bi + 1}`} />
              ))}
            </div>
          ))}
        </div>
      )}

      {/* ── FAQs ── */}
      {tab === "faqs" && (
        <div style={s.card}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <div>
              <h2 style={s.cardTitle}>FAQs for {form.name || "this city"}</h2>
              <p style={{ fontSize: "0.85rem", color: "#6B7A99", margin: 0 }}>Auto-generates FAQ schema for Google rich results</p>
            </div>
            <button type="button" onClick={addFAQ} style={s.addBtn}>+ Add FAQ</button>
          </div>

          {faqs.length === 0 ? (
            <div style={s.emptyFaq}>
              <p>No FAQs yet.</p>
              <button type="button" onClick={addFAQ} style={s.addBtn}>+ Add First FAQ</button>
            </div>
          ) : (
            faqs.map((faq, i) => (
              <div key={i} style={s.serviceBlock}>
                <div style={s.serviceBlockHeader}>
                  <span style={s.serviceNum}>FAQ {i + 1}</span>
                  <button type="button" onClick={() => removeFAQ(i)} style={s.removeBtn}>✕ Remove</button>
                </div>
                <Field label="Question">
                  <input style={s.input} value={faq.question}
                    onChange={e => updateFAQ(i, "question", e.target.value)}
                    placeholder={`What SEO services does A.S Web Matrix offer in ${form.name || "this city"}?`} />
                </Field>
                <Field label="Answer">
                  <textarea style={{ ...s.input, height: "80px" }} value={faq.answer}
                    onChange={e => updateFAQ(i, "answer", e.target.value)}
                    placeholder="A.S Web Matrix offers comprehensive SEO services including..." />
                </Field>
              </div>
            ))
          )}
        </div>
      )}

      {/* Bottom bar */}
      <div style={s.bottomBar}>
        {error   && <span style={{ color: "#DC2626", fontSize: "0.88rem" }}>{error}</span>}
        {success && <span style={{ color: "#059669", fontSize: "0.88rem" }}>{success}</span>}
        <button type="submit" style={saving ? s.btnDisabled : s.saveBtn} disabled={saving}>
          {saving ? "Saving..." : isEdit ? "Update City" : "Create City Page"}
        </button>
      </div>
    </form>
  );
}

function Field({ label, hint, children }) {
  return (
    <div style={{ marginBottom: "18px" }}>
      <label style={s.label}>{label}</label>
      {children}
      {hint && <span style={s.hint}>{hint}</span>}
    </div>
  );
}

const s = {
  form:              { fontFamily: "'Inter',sans-serif", maxWidth: "900px" },
  topBar:            { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px" },
  pageTitle:         { fontSize: "1.8rem", fontWeight: "800", color: "#0B1628", margin: "0 0 4px" },
  slugLine:          { fontSize: "0.82rem", color: "#6B7A99", fontFamily: "monospace" },
  topActions:        { display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" },
  previewBtn:        { padding: "10px 18px", background: "#EFF6FF", color: "#1D4ED8", borderRadius: "10px", fontSize: "0.85rem", fontWeight: "700", textDecoration: "none" },
  statusSelect:      { padding: "10px 14px", border: "1.5px solid #E2E8F0", borderRadius: "10px", fontSize: "0.88rem", fontWeight: "600", background: "#fff", cursor: "pointer", fontFamily: "inherit" },
  saveBtn:           { padding: "10px 24px", background: "#00C49A", color: "#fff", border: "none", borderRadius: "10px", fontSize: "0.9rem", fontWeight: "700", cursor: "pointer", fontFamily: "inherit" },
  btnDisabled:       { padding: "10px 24px", background: "#a0d9cb", color: "#fff", border: "none", borderRadius: "10px", fontSize: "0.9rem", fontWeight: "700", cursor: "not-allowed", fontFamily: "inherit" },
  errorBox:          { background: "#FEE2E2", color: "#DC2626", padding: "12px 16px", borderRadius: "10px", fontSize: "0.9rem", marginBottom: "16px", border: "1px solid #FECACA" },
  successBox:        { background: "#D1FAE5", color: "#065F46", padding: "12px 16px", borderRadius: "10px", fontSize: "0.9rem", marginBottom: "16px", border: "1px solid #A7F3D0" },
  tabBar:            { display: "flex", gap: "6px", marginBottom: "16px", flexWrap: "wrap" },
  tab:               { padding: "8px 18px", background: "#fff", border: "1.5px solid #E2E8F0", borderRadius: "100px", fontSize: "0.82rem", fontWeight: "600", cursor: "pointer", color: "#6B7A99", fontFamily: "inherit" },
  tabActive:         { padding: "8px 18px", background: "#0B1628", border: "1.5px solid #0B1628", borderRadius: "100px", fontSize: "0.82rem", fontWeight: "700", cursor: "pointer", color: "#fff", fontFamily: "inherit" },
  card:              { background: "#fff", border: "1.5px solid #E2E8F0", borderRadius: "16px", padding: "28px", marginBottom: "20px" },
  cardTitle:         { fontSize: "1.1rem", fontWeight: "800", color: "#0B1628", margin: "0 0 20px" },
  twoCol:            { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" },
  label:             { display: "block", fontSize: "0.78rem", fontWeight: "700", color: "#374151", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.06em" },
  input:             { width: "100%", padding: "10px 14px", border: "1.5px solid #E2E8F0", borderRadius: "10px", fontSize: "0.95rem", fontFamily: "inherit", outline: "none", color: "#0B1628", background: "#FAFAFA", boxSizing: "border-box" },
  hint:              { display: "block", fontSize: "0.75rem", color: "#9CA3AF", marginTop: "4px" },
  serpBox:           { background: "#F7F8FC", border: "1.5px solid #E2E8F0", borderRadius: "12px", padding: "20px", marginTop: "24px" },
  serpLabel:         { fontSize: "0.72rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.1em", color: "#9CA3AF", marginBottom: "10px" },
  serpUrl:           { fontSize: "0.82rem", color: "#16a34a", marginBottom: "4px" },
  serpTitle:         { fontSize: "1.05rem", color: "#1a0dab", fontWeight: "600", marginBottom: "4px" },
  serpDesc:          { fontSize: "0.88rem", color: "#545454", lineHeight: 1.5 },
  serviceBlock:      { background: "#F7F8FC", border: "1.5px solid #E2E8F0", borderRadius: "12px", padding: "20px", marginBottom: "14px" },
  serviceBlockHeader:{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" },
  serviceNum:        { fontSize: "0.8rem", fontWeight: "800", color: "#00C49A", background: "#E6F9F4", padding: "3px 10px", borderRadius: "100px" },
  removeBtn:         { fontSize: "0.78rem", color: "#DC2626", background: "#FEE2E2", border: "none", borderRadius: "8px", padding: "4px 10px", cursor: "pointer", fontFamily: "inherit", fontWeight: "600" },
  addBtn:            { padding: "8px 18px", background: "#0B1628", color: "#fff", border: "none", borderRadius: "10px", fontSize: "0.85rem", fontWeight: "700", cursor: "pointer", fontFamily: "inherit" },
  emptyFaq:          { textAlign: "center", padding: "32px", color: "#6B7A99", display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" },
  bottomBar:         { display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "16px", padding: "20px 0" },
};