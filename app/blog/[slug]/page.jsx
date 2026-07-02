import connectDB from "@/lib/mongodb";
import Blog from "@/models/Blog";
import { notFound } from "next/navigation";
import Link from "next/link";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  await connectDB();
  const blog = await Blog.findOne({ slug }).lean();
  if (!blog) return { title: "Post Not Found" };

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.aswebmatrix.com";

  return {
    title:       blog.metaTitle       || blog.title,
    description: blog.metaDescription || blog.excerpt,
    keywords:    blog.metaKeywords,
    alternates:  { canonical: blog.canonicalUrl || `${siteUrl}/blog/${blog.slug}` },
    openGraph: {
      title:       blog.ogTitle       || blog.metaTitle || blog.title,
      description: blog.ogDescription || blog.metaDescription || blog.excerpt,
      images:      blog.ogImage ? [blog.ogImage] : blog.coverImage ? [blog.coverImage] : [],
      type:        "article",
      url:         `${siteUrl}/blog/${blog.slug}`,
    },
    twitter: {
      card:        "summary_large_image",
      title:       blog.ogTitle || blog.title,
      description: blog.ogDescription || blog.excerpt,
      images:      blog.ogImage ? [blog.ogImage] : [],
    },
  };
}

export const revalidate = 60;

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  await connectDB();

  const blog = await Blog.findOneAndUpdate(
    { slug },
    { $inc: { views: 1 } },
    { new: true }
  ).lean();

  if (!blog) notFound();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.aswebmatrix.com";

  const articleSchema = {
    "@context": "https://schema.org",
    "@type":    "BlogPosting",
    headline:   blog.title,
    description: blog.metaDescription || blog.excerpt,
    image:      blog.coverImage || blog.ogImage || "",
    author:     { "@type": "Organization", name: blog.author || "A.S Web Matrix", url: siteUrl },
    publisher:  { "@type": "Organization", name: "A.S Web Matrix", url: siteUrl, logo: { "@type": "ImageObject", url: `${siteUrl}/logo.png` } },
    datePublished: blog.createdAt,
    dateModified:  blog.updatedAt,
    mainEntityOfPage: { "@type": "WebPage", "@id": `${siteUrl}/blog/${blog.slug}` },
    ...(blog.geoTargetCity && {
      contentLocation: { "@type": "Place", name: `${blog.geoTargetCity}, ${blog.geoTargetRegion}` }
    }),
  };

  const faqSchema = blog.faqs?.length > 0 ? {
    "@context": "https://schema.org",
    "@type":    "FAQPage",
    mainEntity: blog.faqs.map(f => ({
      "@type": "Question",
      name:    f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  } : null;

  return (
    <div style={s.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}

      {/* Breadcrumb */}
      <div style={s.breadcrumb}>
        <div style={s.container}>
          <Link href="/" style={s.crumbLink}>Home</Link>
          <span style={s.crumbSep}>/</span>
          <Link href="/blog" style={s.crumbLink}>Blog</Link>
          <span style={s.crumbSep}>/</span>
          <span style={s.crumbCurrent}>{blog.title}</span>
        </div>
      </div>

      <div style={s.container}>
        <div style={s.layout}>

          {/* Main Article */}
          <article style={s.article}>
            <header style={s.header}>
              <div style={s.headerMeta}>
                <span style={s.category}>{blog.category}</span>
                {blog.geoTargetCity && (
                  <span style={s.geo}>📍 {blog.geoTargetCity}{blog.geoTargetRegion ? `, ${blog.geoTargetRegion}` : ""}</span>
                )}
              </div>
              <h1 style={s.title}>{blog.title}</h1>
              {blog.excerpt && <p style={s.excerpt}>{blog.excerpt}</p>}
              <div style={s.postMeta}>
                <span>By <strong>{blog.author}</strong></span>
                <span style={s.dot}>·</span>
                <span>{new Date(blog.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</span>
                <span style={s.dot}>·</span>
                <span>{blog.readingTime} min read</span>
                <span style={s.dot}>·</span>
                <span>{blog.views} views</span>
              </div>
              {blog.tags?.length > 0 && (
                <div style={s.tags}>
                  {blog.tags.map(t => <span key={t} style={s.tag}>{t}</span>)}
                </div>
              )}
            </header>

            {blog.coverImage && (
              <div style={s.coverWrap}>
                <img src={blog.coverImage} alt={blog.title} style={s.cover} />
              </div>
            )}

            {blog.aeoSummary && (
              <div style={s.aeoBox}>
                <p style={s.aeoLabel}>📌 Quick Answer</p>
                <p style={s.aeoText}>{blog.aeoSummary}</p>
              </div>
            )}

            <div
              style={s.content}
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />

            {blog.faqs?.length > 0 && (
              <div style={s.faqSection}>
                <h2 style={s.faqHeading}>Frequently Asked Questions</h2>
                <div style={s.faqList}>
                  {blog.faqs.map((faq, i) => (
                    <details key={i} style={s.faqItem}>
                      <summary style={s.faqQ}>{faq.question}</summary>
                      <p style={s.faqA}>{faq.answer}</p>
                    </details>
                  ))}
                </div>
              </div>
            )}

            <div style={s.articleFooter}>
              <div style={s.tags}>
                {blog.tags?.map(t => <span key={t} style={s.tag}>{t}</span>)}
              </div>
              <Link href="/blog" style={s.backLink}>← Back to Blog</Link>
            </div>
          </article>

          {/* Sidebar */}
          <aside style={s.sidebar}>
            <div style={s.sideCard}>
              <h3 style={s.sideTitle}>About A.S Web Matrix</h3>
              <p style={s.sideTxt}>
                Faridabad-based digital agency specializing in website development,
                technical SEO, GEO & AEO for education, healthcare & businesses.
              </p>
              <Link href="/contact" style={s.sideBtn}>Get a Free Quote →</Link>
            </div>

            <div style={s.sideCard}>
              <h3 style={s.sideTitle}>Our Services</h3>
              {["Website Development","Technical SEO","GEO & AEO","Local SEO","MERN Stack","WordPress"].map(sv => (
                <div key={sv} style={s.sideService}>✓ {sv}</div>
              ))}
            </div>

            {blog.geoTargetCity && (
              <div style={s.sideCard}>
                <h3 style={s.sideTitle}>📍 Serving</h3>
                <p style={s.sideTxt}>{blog.geoTargetCity}{blog.geoTargetRegion ? `, ${blog.geoTargetRegion}` : ""}</p>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}

const s = {
  page:         { fontFamily: "'Inter','Segoe UI',sans-serif", background: "#fff", color: "#0B1628" },
  container:    { maxWidth: "1200px", margin: "0 auto", padding: "0 32px" },
  breadcrumb:   { background: "#F7F8FC", borderBottom: "1px solid #E2E8F0", padding: "12px 0" },
  crumbLink:    { color: "#6B7A99", fontSize: "0.82rem", textDecoration: "none", fontWeight: "600" },
  crumbSep:     { color: "#D1D5DB", margin: "0 8px", fontSize: "0.82rem" },
  crumbCurrent: { color: "#0B1628", fontSize: "0.82rem", fontWeight: "700" },
  layout:       { display: "grid", gridTemplateColumns: "1fr 320px", gap: "60px", padding: "60px 0 80px" },
  article:      {},
  header:       { marginBottom: "32px" },
  headerMeta:   { display: "flex", gap: "10px", alignItems: "center", marginBottom: "16px" },
  category:     { fontSize: "0.72rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.08em", color: "#00C49A", background: "#E6F9F4", padding: "4px 12px", borderRadius: "100px" },
  geo:          { fontSize: "0.78rem", color: "#6B7A99", fontWeight: "600" },
  title:        { fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: "900", lineHeight: 1.15, letterSpacing: "-0.02em", marginBottom: "14px" },
  excerpt:      { fontSize: "1.1rem", color: "#4A5568", lineHeight: 1.7, marginBottom: "16px", fontStyle: "italic" },
  postMeta:     { display: "flex", gap: "8px", fontSize: "0.82rem", color: "#6B7A99", flexWrap: "wrap", marginBottom: "14px" },
  dot:          { color: "#D1D5DB" },
  tags:         { display: "flex", gap: "6px", flexWrap: "wrap" },
  tag:          { fontSize: "0.72rem", fontWeight: "600", color: "#374151", background: "#F3F4F6", padding: "3px 10px", borderRadius: "100px" },
  coverWrap:    { marginBottom: "32px", borderRadius: "16px", overflow: "hidden" },
  cover:        { width: "100%", height: "auto", display: "block" },
  aeoBox:       { background: "#F0FDF4", border: "1.5px solid #86EFAC", borderRadius: "14px", padding: "20px 24px", marginBottom: "36px" },
  aeoLabel:     { fontSize: "0.78rem", fontWeight: "800", textTransform: "uppercase", letterSpacing: "0.08em", color: "#166534", marginBottom: "8px" },
  aeoText:      { fontSize: "1rem", color: "#166534", lineHeight: 1.7, margin: 0 },
  content:      { fontSize: "1.05rem", lineHeight: 1.85, color: "#374151" },
  faqSection:   { marginTop: "48px", paddingTop: "40px", borderTop: "2px solid #F3F4F6" },
  faqHeading:   { fontSize: "1.5rem", fontWeight: "800", color: "#0B1628", marginBottom: "20px" },
  faqList:      { display: "flex", flexDirection: "column", gap: "10px" },
  faqItem:      { border: "1.5px solid #E2E8F0", borderRadius: "12px", overflow: "hidden" },
  faqQ:         { padding: "16px 20px", fontWeight: "700", fontSize: "0.98rem", color: "#0B1628", cursor: "pointer", listStyle: "none" },
  faqA:         { padding: "0 20px 16px", color: "#4A5568", fontSize: "0.95rem", lineHeight: 1.7, margin: 0 },
  articleFooter:{ marginTop: "48px", paddingTop: "24px", borderTop: "1px solid #F3F4F6", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" },
  backLink:     { fontSize: "0.88rem", fontWeight: "700", color: "#00C49A", textDecoration: "none" },
  sidebar:      { display: "flex", flexDirection: "column", gap: "20px" },
  sideCard:     { background: "#F7F8FC", border: "1.5px solid #E2E8F0", borderRadius: "16px", padding: "24px" },
  sideTitle:    { fontSize: "0.9rem", fontWeight: "800", color: "#0B1628", marginBottom: "12px" },
  sideTxt:      { fontSize: "0.88rem", color: "#6B7A99", lineHeight: 1.7, margin: "0 0 14px" },
  sideBtn:      { display: "inline-block", padding: "10px 18px", background: "#00C49A", color: "#fff", borderRadius: "10px", fontSize: "0.82rem", fontWeight: "700", textDecoration: "none" },
  sideService:  { fontSize: "0.85rem", color: "#374151", fontWeight: "600", padding: "5px 0", borderBottom: "1px solid #F3F4F6" },
};