"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

const EMPTY_BLOG = {
  title: "", slug: "", excerpt: "", content: "",
  coverImage: "", category: "General", tags: "",
  author: "A.S Web Matrix", status: "draft",
  // SEO
  metaTitle: "", metaDescription: "", metaKeywords: "", canonicalUrl: "",
  // GEO / AEO
  geoTargetCity: "", geoTargetRegion: "", aeoSummary: "",
  // OG
  ogTitle: "", ogDescription: "", ogImage: "",
  // FAQs
  faqs: [],
};

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").trim();
}

// ── Toolbar button component
function TBtn({ label, title, onClick }) {
  return (
    <button type="button" title={title} onClick={onClick} style={ts.tBtn}>{label}</button>
  );
}

export default function BlogEditor({ existingBlog = null }) {
  const router  = useRouter();
  const editorRef = useRef(null);

  const [form,    setForm]    = useState(existingBlog || EMPTY_BLOG);
  const [faqs,    setFaqs]    = useState(existingBlog?.faqs || []);
  const [saving,  setSaving]  = useState(false);
  const [error,   setError]   = useState("");
  const [success, setSuccess] = useState("");
  const [tab,     setTab]     = useState("content"); // content | seo | geo | faqs | og

  const isEdit = !!existingBlog;

  // Auto-slug from title (only if creating new)
  function handleTitleChange(e) {
    const title = e.target.value;
    setForm(f => ({
      ...f,
      title,
      slug:             !isEdit ? slugify(title) : f.slug,
      metaTitle:        f.metaTitle  || title,
      ogTitle:          f.ogTitle    || title,
    }));
  }

  function handleExcerptChange(e) {
    const excerpt = e.target.value;
    setForm(f => ({
      ...f,
      excerpt,
      metaDescription: f.metaDescription || excerpt,
      ogDescription:   f.ogDescription   || excerpt,
    }));
  }

  // ── Rich text toolbar commands
  function exec(cmd, value = null) {
    editorRef.current?.focus();
    document.execCommand(cmd, false, value);
  }

  function insertHTML(html) {
    editorRef.current?.focus();
    document.execCommand("insertHTML", false, html);
  }

  function syncContent() {
    setForm(f => ({ ...f, content: editorRef.current?.innerHTML || "" }));
  }

  // FAQ helpers
  function addFAQ()           { setFaqs(p => [...p, { question: "", answer: "" }]); }
  function removeFAQ(i)       { setFaqs(p => p.filter((_, idx) => idx !== i)); }
  function updateFAQ(i, k, v) { setFaqs(p => p.map((f, idx) => idx === i ? { ...f, [k]: v } : f)); }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true); setError(""); setSuccess("");
    syncContent();

    const payload = {
      ...form,
      content: editorRef.current?.innerHTML || form.content,
      tags: typeof form.tags === "string"
        ? form.tags.split(",").map(t => t.trim()).filter(Boolean)
        : form.tags,
      faqs,
    };

    try {
      const url    = isEdit ? `/api/blogs/${existingBlog._id}` : "/api/blogs";
      const method = isEdit ? "PUT" : "POST";
      const res    = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error); setSaving(false); return; }

      setSuccess(isEdit ? "Post updated successfully!" : "Post created successfully!");
      if (!isEdit) router.push("/admin/dashboard/blogs");
    } catch {
      setError("Something went wrong.");
    }
    setSaving(false);
  }

  const tabs = ["content", "seo", "geo", "faqs", "og"];

  return (
    <form onSubmit={handleSubmit} style={s.form}>
      {/* Top bar */}
      <div style={s.topBar}>
        <div>
          <h1 style={s.pageTitle}>{isEdit ? "Edit Post" : "New Blog Post"}</h1>
          {isEdit && <p style={s.slugDisplay}>/{form.slug}</p>}
        </div>
        <div style={s.topActions}>
          <select style={s.statusSelect} value={form.status}
            onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
          <button type="submit" style={saving ? s.btnDisabled : s.saveBtn} disabled={saving}>
            {saving ? "Saving..." : isEdit ? "Update Post" : "Publish Post"}
          </button>
        </div>
      </div>

      {error   && <div style={s.errorBox}>{error}</div>}
      {success && <div style={s.successBox}>{success}</div>}

      {/* Title + basic fields */}
      <div style={s.card}>
        <Field label="Post Title *">
          <input style={s.input} value={form.title} onChange={handleTitleChange} placeholder="Write your blog title here..." required />
        </Field>
        <div style={s.twoCol}>
          <Field label="Slug (URL)">
            <input style={s.input} value={form.slug}
              onChange={e => setForm(f => ({ ...f, slug: slugify(e.target.value) }))}
              placeholder="auto-generated-from-title" />
            <span style={s.hint}>URL: /blog/{form.slug || "your-slug"}</span>
          </Field>
          <Field label="Category">
            <select style={s.input} value={form.category}
              onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
              {["General","SEO","Web Development","Digital Marketing","Healthcare","Education","Technology","Local SEO","GEO & AEO"].map(c => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </Field>
        </div>
        <Field label="Excerpt / Short Description">
          <textarea style={{ ...s.input, height: "70px", resize: "vertical" }}
            value={form.excerpt} onChange={handleExcerptChange}
            placeholder="A short summary shown on blog listing page..." />
        </Field>
        <div style={s.twoCol}>
          <Field label="Author">
            <input style={s.input} value={form.author}
              onChange={e => setForm(f => ({ ...f, author: e.target.value }))} />
          </Field>
          <Field label="Tags (comma separated)">
            <input style={s.input} value={typeof form.tags === "string" ? form.tags : form.tags?.join(", ")}
              onChange={e => setForm(f => ({ ...f, tags: e.target.value }))}
              placeholder="SEO, Next.js, Faridabad" />
          </Field>
        </div>
        <Field label="Cover Image URL">
          <input style={s.input} value={form.coverImage}
            onChange={e => setForm(f => ({ ...f, coverImage: e.target.value }))}
            placeholder="https://..." />
        </Field>
      </div>

      {/* Tabs */}
      <div style={s.tabBar}>
        {tabs.map(t => (
          <button key={t} type="button" onClick={() => setTab(t)}
            style={tab === t ? s.tabActive : s.tab}>
            {{ content:"✍️ Content", seo:"🔍 SEO", geo:"📍 GEO/AEO", faqs:"❓ FAQs", og:"📤 Open Graph" }[t]}
          </button>
        ))}
      </div>

      {/* ── CONTENT TAB ── */}
      {tab === "content" && (
        <div style={s.card}>
          <label style={s.label}>Blog Content *</label>

          {/* Toolbar */}
          <div style={ts.toolbar}>
            <TBtn label="B"      title="Bold"          onClick={() => exec("bold")} />
            <TBtn label="I"      title="Italic"        onClick={() => exec("italic")} />
            <TBtn label="U"      title="Underline"     onClick={() => exec("underline")} />
            <TBtn label="S"      title="Strikethrough" onClick={() => exec("strikeThrough")} />
            <span style={ts.sep} />
            <TBtn label="H1"     title="Heading 1"     onClick={() => exec("formatBlock", "h1")} />
            <TBtn label="H2"     title="Heading 2"     onClick={() => exec("formatBlock", "h2")} />
            <TBtn label="H3"     title="Heading 3"     onClick={() => exec("formatBlock", "h3")} />
            <TBtn label="P"      title="Paragraph"     onClick={() => exec("formatBlock", "p")} />
            <span style={ts.sep} />
            <TBtn label="UL"     title="Bullet List"   onClick={() => exec("insertUnorderedList")} />
            <TBtn label="OL"     title="Numbered List" onClick={() => exec("insertOrderedList")} />
            <TBtn label="&lt;/&gt;" title="Code block"  onClick={() => insertHTML('<pre style="background:#f4f4f4;padding:12px;border-radius:8px;overflow:auto"><code>code here</code></pre>')} />
            <span style={ts.sep} />
            <TBtn label="🔗"     title="Insert Link"   onClick={() => {
              const url = prompt("Enter URL:");
              if (url) exec("createLink", url);
            }} />
            <TBtn label="🖼"     title="Insert Image"  onClick={() => {
              const url = prompt("Enter image URL:");
              if (url) insertHTML(`<img src="${url}" alt="" style="max-width:100%;height:auto;border-radius:8px;" />`);
            }} />
            <TBtn label="—"      title="Horizontal Rule" onClick={() => insertHTML("<hr/>")} />
            <span style={ts.sep} />
            <TBtn label="↩"      title="Undo"          onClick={() => exec("undo")} />
            <TBtn label="↪"      title="Redo"          onClick={() => exec("redo")} />
          </div>

          {/* Editor */}
          <div
            ref={editorRef}
            contentEditable
            suppressContentEditableWarning
            onInput={syncContent}
            style={ts.editor}
            dangerouslySetInnerHTML={existingBlog ? { __html: form.content } : undefined}
          />
          <span style={s.hint}>
            Word count: ~{(form.content.replace(/<[^>]+>/g,"").split(/\s+/).filter(Boolean).length)} words
          </span>
        </div>
      )}

      {/* ── SEO TAB ── */}
      {tab === "seo" && (
        <div style={s.card}>
          <h2 style={s.cardTitle}>SEO Settings</h2>
          <Field label="Meta Title" hint={`${form.metaTitle?.length || 0}/60 chars (ideal: 50–60)`}>
            <input style={{ ...s.input, borderColor: form.metaTitle?.length > 60 ? "#EF4444" : undefined }}
              value={form.metaTitle}
              onChange={e => setForm(f => ({ ...f, metaTitle: e.target.value }))}
              placeholder="SEO title for Google..." />
          </Field>
          <Field label="Meta Description" hint={`${form.metaDescription?.length || 0}/160 chars (ideal: 140–160)`}>
            <textarea style={{ ...s.input, height: "80px", borderColor: form.metaDescription?.length > 160 ? "#EF4444" : undefined }}
              value={form.metaDescription}
              onChange={e => setForm(f => ({ ...f, metaDescription: e.target.value }))}
              placeholder="Short description for Google search results..." />
          </Field>
          <Field label="Meta Keywords (comma separated)">
            <input style={s.input} value={form.metaKeywords}
              onChange={e => setForm(f => ({ ...f, metaKeywords: e.target.value }))}
              placeholder="SEO Company Faridabad, Website Development Haryana, ..." />
          </Field>
          <Field label="Canonical URL (optional)">
            <input style={s.input} value={form.canonicalUrl}
              onChange={e => setForm(f => ({ ...f, canonicalUrl: e.target.value }))}
              placeholder="https://www.aswebmatrix.com/blog/..." />
          </Field>

          {/* SERP Preview */}
          <div style={s.serpPreview}>
            <p style={s.serpLabel}>Google Preview</p>
            <p style={s.serpUrl}>{process.env.NEXT_PUBLIC_SITE_URL || "https://www.aswebmatrix.com"}/blog/{form.slug}</p>
            <p style={s.serpTitle}>{form.metaTitle || form.title || "Your Post Title"}</p>
            <p style={s.serpDesc}>{form.metaDescription || form.excerpt || "Your meta description will appear here in Google search results."}</p>
          </div>
        </div>
      )}

      {/* ── GEO / AEO TAB ── */}
      {tab === "geo" && (
        <div style={s.card}>
          <h2 style={s.cardTitle}>GEO & AEO Settings</h2>
          <p style={s.cardDesc}>Help search engines and AI assistants understand your geographic target and provide direct answers.</p>

          <div style={s.infoBox}>
            <strong>GEO (Geographic Targeting):</strong> Tell search engines which city/region this content targets, improving local rankings.
          </div>
          <div style={s.twoCol}>
            <Field label="Target City">
              <input style={s.input} value={form.geoTargetCity}
                onChange={e => setForm(f => ({ ...f, geoTargetCity: e.target.value }))}
                placeholder="Faridabad, Delhi, Noida..." />
            </Field>
            <Field label="Target Region / State">
              <input style={s.input} value={form.geoTargetRegion}
                onChange={e => setForm(f => ({ ...f, geoTargetRegion: e.target.value }))}
                placeholder="Haryana, Delhi NCR, India..." />
            </Field>
          </div>

          <div style={{ ...s.infoBox, background: "#EEF2FF", borderColor: "#C7D2FE" }}>
            <strong>AEO (Answer Engine Optimization):</strong> Write a direct, concise answer (2–3 sentences) that AI tools like ChatGPT, Perplexity, and Google SGE can use as a featured snippet or AI answer.
          </div>
          <Field label="AEO Direct Answer Summary" hint="Write as if directly answering the main question. 2–4 sentences max.">
            <textarea style={{ ...s.input, height: "100px", resize: "vertical" }}
              value={form.aeoSummary}
              onChange={e => setForm(f => ({ ...f, aeoSummary: e.target.value }))}
              placeholder="A.S Web Matrix is a website development company in Faridabad, Haryana that specializes in building websites for educational institutions and healthcare organizations. They use MERN Stack and WordPress and deliver websites within 1 week..." />
          </Field>
        </div>
      )}

      {/* ── FAQs TAB ── */}
      {tab === "faqs" && (
        <div style={s.card}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <div>
              <h2 style={s.cardTitle}>FAQs</h2>
              <p style={s.cardDesc}>FAQs improve SEO with FAQ Schema and help with AEO / voice search.</p>
            </div>
            <button type="button" onClick={addFAQ} style={s.addFaqBtn}>+ Add FAQ</button>
          </div>

          {faqs.length === 0 ? (
            <div style={s.emptyFaq}>
              <p>No FAQs added yet.</p>
              <button type="button" onClick={addFAQ} style={s.addFaqBtn}>+ Add First FAQ</button>
            </div>
          ) : (
            faqs.map((faq, i) => (
              <div key={i} style={s.faqItem}>
                <div style={s.faqHeader}>
                  <span style={s.faqNum}>Q{i + 1}</span>
                  <button type="button" onClick={() => removeFAQ(i)} style={s.removeBtn}>✕ Remove</button>
                </div>
                <Field label="Question">
                  <input style={s.input} value={faq.question}
                    onChange={e => updateFAQ(i, "question", e.target.value)}
                    placeholder="What services does A.S Web Matrix offer?" />
                </Field>
                <Field label="Answer">
                  <textarea style={{ ...s.input, height: "80px", resize: "vertical" }}
                    value={faq.answer}
                    onChange={e => updateFAQ(i, "answer", e.target.value)}
                    placeholder="A.S Web Matrix offers website development, SEO, digital marketing..." />
                </Field>
              </div>
            ))
          )}

          {faqs.length > 0 && (
            <div style={s.faqSchemaPreview}>
              <p style={s.serpLabel}>FAQ Schema Preview (auto-generated)</p>
              <pre style={s.codeBlock}>{JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": faqs.filter(f => f.question).map(f => ({
                  "@type": "Question",
                  "name": f.question,
                  "acceptedAnswer": { "@type": "Answer", "text": f.answer }
                }))
              }, null, 2)}</pre>
            </div>
          )}
        </div>
      )}

      {/* ── OPEN GRAPH TAB ── */}
      {tab === "og" && (
        <div style={s.card}>
          <h2 style={s.cardTitle}>Open Graph (Social Media)</h2>
          <p style={s.cardDesc}>Controls how your post appears when shared on WhatsApp, Facebook, LinkedIn, Twitter.</p>
          <Field label="OG Title">
            <input style={s.input} value={form.ogTitle}
              onChange={e => setForm(f => ({ ...f, ogTitle: e.target.value }))}
              placeholder="Title for social sharing..." />
          </Field>
          <Field label="OG Description">
            <textarea style={{ ...s.input, height: "80px" }}
              value={form.ogDescription}
              onChange={e => setForm(f => ({ ...f, ogDescription: e.target.value }))}
              placeholder="Description for social sharing..." />
          </Field>
          <Field label="OG Image URL">
            <input style={s.input} value={form.ogImage}
              onChange={e => setForm(f => ({ ...f, ogImage: e.target.value }))}
              placeholder="https://... (1200x630px recommended)" />
          </Field>

          {/* OG Preview card */}
          <div style={s.ogPreview}>
            <p style={s.serpLabel}>WhatsApp / Facebook Preview</p>
            <div style={s.ogCard}>
              {(form.ogImage || form.coverImage) && (
                <img src={form.ogImage || form.coverImage} alt="OG Preview"
                  style={s.ogImg} onError={e => e.target.style.display = "none"} />
              )}
              <div style={s.ogCardBody}>
                <p style={s.ogUrl}>{process.env.NEXT_PUBLIC_SITE_URL || "aswebmatrix.com"}</p>
                <p style={s.ogTitle2}>{form.ogTitle || form.title || "Your Post Title"}</p>
                <p style={s.ogDesc}>{form.ogDescription || form.excerpt || "Your post description..."}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom save */}
      <div style={s.bottomBar}>
        {error   && <span style={{ color: "#DC2626", fontSize: "0.9rem" }}>{error}</span>}
        {success && <span style={{ color: "#059669", fontSize: "0.9rem" }}>{success}</span>}
        <div style={s.topActions}>
          <select style={s.statusSelect} value={form.status}
            onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
          <button type="submit" style={saving ? s.btnDisabled : s.saveBtn} disabled={saving}>
            {saving ? "Saving..." : isEdit ? "Update Post" : "Publish Post"}
          </button>
        </div>
      </div>
    </form>
  );
}

// Helper component
function Field({ label, hint, children }) {
  return (
    <div style={{ marginBottom: "18px" }}>
      <label style={s.label}>{label}</label>
      {children}
      {hint && <span style={s.hint}>{hint}</span>}
    </div>
  );
}

// Styles
const s = {
  form:          { fontFamily: "'Inter', sans-serif", maxWidth: "900px" },
  topBar:        { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px" },
  pageTitle:     { fontSize: "1.8rem", fontWeight: "800", color: "#0B1628", margin: "0 0 4px" },
  slugDisplay:   { fontSize: "0.82rem", color: "#6B7A99", fontFamily: "monospace" },
  topActions:    { display: "flex", gap: "10px", alignItems: "center" },
  statusSelect:  { padding: "10px 14px", border: "1.5px solid #E2E8F0", borderRadius: "10px", fontSize: "0.88rem", fontWeight: "600", background: "#fff", cursor: "pointer", fontFamily: "inherit" },
  saveBtn:       { padding: "10px 24px", background: "#00C49A", color: "#fff", border: "none", borderRadius: "10px", fontSize: "0.9rem", fontWeight: "700", cursor: "pointer", fontFamily: "inherit", letterSpacing: "0.02em" },
  btnDisabled:   { padding: "10px 24px", background: "#a0d9cb", color: "#fff", border: "none", borderRadius: "10px", fontSize: "0.9rem", fontWeight: "700", cursor: "not-allowed", fontFamily: "inherit" },
  errorBox:      { background: "#FEE2E2", color: "#DC2626", padding: "12px 16px", borderRadius: "10px", fontSize: "0.9rem", marginBottom: "16px", border: "1px solid #FECACA" },
  successBox:    { background: "#D1FAE5", color: "#065F46", padding: "12px 16px", borderRadius: "10px", fontSize: "0.9rem", marginBottom: "16px", border: "1px solid #A7F3D0" },
  card:          { background: "#fff", border: "1.5px solid #E2E8F0", borderRadius: "16px", padding: "28px 28px", marginBottom: "20px" },
  cardTitle:     { fontSize: "1.1rem", fontWeight: "800", color: "#0B1628", margin: "0 0 4px" },
  cardDesc:      { fontSize: "0.88rem", color: "#6B7A99", margin: "0 0 20px" },
  twoCol:        { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" },
  label:         { display: "block", fontSize: "0.78rem", fontWeight: "700", color: "#374151", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.06em" },
  input:         { width: "100%", padding: "10px 14px", border: "1.5px solid #E2E8F0", borderRadius: "10px", fontSize: "0.95rem", fontFamily: "inherit", outline: "none", color: "#0B1628", background: "#FAFAFA", boxSizing: "border-box", transition: "border 0.2s" },
  hint:          { display: "block", fontSize: "0.75rem", color: "#9CA3AF", marginTop: "4px" },
  tabBar:        { display: "flex", gap: "6px", marginBottom: "16px", flexWrap: "wrap" },
  tab:           { padding: "8px 18px", background: "#fff", border: "1.5px solid #E2E8F0", borderRadius: "100px", fontSize: "0.82rem", fontWeight: "600", cursor: "pointer", color: "#6B7A99", fontFamily: "inherit" },
  tabActive:     { padding: "8px 18px", background: "#0B1628", border: "1.5px solid #0B1628", borderRadius: "100px", fontSize: "0.82rem", fontWeight: "700", cursor: "pointer", color: "#fff", fontFamily: "inherit" },
  infoBox:       { background: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: "10px", padding: "12px 16px", fontSize: "0.88rem", color: "#166534", marginBottom: "20px", lineHeight: 1.6 },
  serpPreview:   { background: "#F7F8FC", border: "1.5px solid #E2E8F0", borderRadius: "12px", padding: "20px", marginTop: "24px" },
  serpLabel:     { fontSize: "0.72rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.1em", color: "#9CA3AF", marginBottom: "10px" },
  serpUrl:       { fontSize: "0.82rem", color: "#16a34a", marginBottom: "4px" },
  serpTitle:     { fontSize: "1.05rem", color: "#1a0dab", fontWeight: "600", marginBottom: "4px" },
  serpDesc:      { fontSize: "0.88rem", color: "#545454", lineHeight: 1.5 },
  faqItem:       { background: "#F7F8FC", border: "1.5px solid #E2E8F0", borderRadius: "12px", padding: "20px", marginBottom: "14px" },
  faqHeader:     { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" },
  faqNum:        { fontSize: "0.8rem", fontWeight: "800", color: "#00C49A", background: "#E6F9F4", padding: "3px 10px", borderRadius: "100px" },
  removeBtn:     { fontSize: "0.78rem", color: "#DC2626", background: "#FEE2E2", border: "none", borderRadius: "8px", padding: "4px 10px", cursor: "pointer", fontFamily: "inherit", fontWeight: "600" },
  addFaqBtn:     { padding: "8px 18px", background: "#0B1628", color: "#fff", border: "none", borderRadius: "10px", fontSize: "0.85rem", fontWeight: "700", cursor: "pointer", fontFamily: "inherit" },
  emptyFaq:      { textAlign: "center", padding: "32px", color: "#6B7A99", display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" },
  faqSchemaPreview: { marginTop: "24px" },
  codeBlock:     { background: "#1E293B", color: "#7DD3FC", padding: "16px", borderRadius: "10px", fontSize: "0.78rem", overflow: "auto", maxHeight: "300px", lineHeight: 1.6 },
  ogPreview:     { marginTop: "24px" },
  ogCard:        { border: "1px solid #E2E8F0", borderRadius: "12px", overflow: "hidden", maxWidth: "500px" },
  ogImg:         { width: "100%", height: "220px", objectFit: "cover", display: "block" },
  ogCardBody:    { padding: "14px 16px", background: "#F7F8FC" },
  ogUrl:         { fontSize: "0.72rem", color: "#6B7A99", textTransform: "uppercase", letterSpacing: "0.06em", margin: "0 0 4px" },
  ogTitle2:      { fontWeight: "700", color: "#0B1628", margin: "0 0 4px", fontSize: "0.95rem" },
  ogDesc:        { fontSize: "0.85rem", color: "#6B7A99", margin: 0, lineHeight: 1.5 },
  bottomBar:     { display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "16px", padding: "20px 0" },
};

// Toolbar styles
const ts = {
  toolbar:  { display: "flex", flexWrap: "wrap", gap: "4px", padding: "10px 12px", background: "#F7F8FC", border: "1.5px solid #E2E8F0", borderRadius: "10px 10px 0 0", marginBottom: 0 },
  tBtn:     { padding: "5px 10px", background: "#fff", border: "1px solid #E2E8F0", borderRadius: "6px", fontSize: "0.85rem", fontWeight: "700", cursor: "pointer", color: "#0B1628", fontFamily: "inherit", minWidth: "32px" },
  sep:      { width: "1px", background: "#E2E8F0", margin: "2px 4px", alignSelf: "stretch" },
  editor:   {
    minHeight: "400px", padding: "20px", border: "1.5px solid #E2E8F0",
    borderTop: "none", borderRadius: "0 0 10px 10px",
    outline: "none", fontSize: "1rem", lineHeight: 1.8,
    color: "#0B1628", fontFamily: "'Inter', sans-serif",
    background: "#fff",
  },
};