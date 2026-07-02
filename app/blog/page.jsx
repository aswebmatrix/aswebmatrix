import Link from "next/link";
import connectDB from "@/lib/mongodb";
import Blog from "@/models/Blog";

export const metadata = {
  title: "Blog | A.S Web Matrix - SEO, Web Development & Digital Marketing",
  description: "Read expert articles on SEO, website development, digital marketing, GEO, AEO and more from A.S Web Matrix — Faridabad's leading web agency.",
};

export const revalidate = 60;

export default async function BlogPage() {
  await connectDB();
  const blogs = await Blog.find({ status: "published" })
    .sort({ createdAt: -1 })
    .select("title slug excerpt category tags coverImage author readingTime createdAt")
    .lean();

  return (
    <div style={s.page}>
      {/* Hero */}
      <section style={s.hero}>
        <div style={s.container}>
          <span style={s.eyebrow}>Our Blog</span>
          <h1 style={s.heroHeading}>Insights on SEO, Web Dev<br />&amp; Digital Growth</h1>
          <p style={s.heroSub}>
            Expert articles on website development, technical SEO, GEO, AEO and digital marketing
            from the A.S Web Matrix team in Faridabad.
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section style={s.section}>
        <div style={s.container}>
          {blogs.length === 0 ? (
            <div style={s.empty}>
              <h2>No posts yet. Check back soon!</h2>
            </div>
          ) : (
            <div style={s.grid}>
              {blogs.map((blog) => (
                <Link key={blog._id} href={`/blog/${blog.slug}`} style={s.card}>
                  {blog.coverImage && (
                    <div style={s.imgWrap}>
                      <img src={blog.coverImage} alt={blog.title} style={s.img} />
                    </div>
                  )}
                  <div style={s.cardBody}>
                    <div style={s.cardMeta}>
                      <span style={s.category}>{blog.category}</span>
                      <span style={s.readTime}>{blog.readingTime} min read</span>
                    </div>
                    <h2 style={s.cardTitle}>{blog.title}</h2>
                    <p style={s.cardExcerpt}>{blog.excerpt}</p>
                    <div style={s.cardFooter}>
                      <span style={s.author}>By {blog.author}</span>
                      <span style={s.date}>
                        {new Date(blog.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                      </span>
                    </div>
                    <span style={s.readMore}>Read Article →</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

const s = {
  page:        { fontFamily: "'Inter','Segoe UI',sans-serif", background: "#fff" },
  container:   { maxWidth: "1200px", margin: "0 auto", padding: "0 32px" },
  hero:        { background: "#0B1628", padding: "120px 0 80px", textAlign: "center" },
  eyebrow:     { display: "inline-block", fontSize: "0.75rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.12em", color: "#00C49A", border: "1.5px solid #00C49A", padding: "5px 14px", borderRadius: "100px", marginBottom: "20px" },
  heroHeading: { fontSize: "clamp(2rem,5vw,3.5rem)", fontWeight: "900", color: "#fff", lineHeight: 1.1, letterSpacing: "-0.03em", margin: "0 0 16px" },
  heroSub:     { fontSize: "1.05rem", color: "rgba(255,255,255,0.6)", maxWidth: "600px", margin: "0 auto", lineHeight: 1.75 },
  section:     { padding: "80px 0" },
  empty:       { textAlign: "center", padding: "80px", color: "#6B7A99" },
  grid:        { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "28px" },
  card:        { display: "flex", flexDirection: "column", background: "#fff", border: "1.5px solid #E2E8F0", borderRadius: "20px", overflow: "hidden", textDecoration: "none", color: "inherit", transition: "all 0.3s" },
  imgWrap:     { height: "200px", overflow: "hidden", background: "#F7F8FC" },
  img:         { width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s" },
  cardBody:    { padding: "24px", flex: 1, display: "flex", flexDirection: "column" },
  cardMeta:    { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" },
  category:    { fontSize: "0.72rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.08em", color: "#00C49A", background: "#E6F9F4", padding: "3px 10px", borderRadius: "100px" },
  readTime:    { fontSize: "0.75rem", color: "#9CA3AF", fontWeight: "600" },
  cardTitle:   { fontSize: "1.1rem", fontWeight: "800", color: "#0B1628", lineHeight: 1.3, margin: "0 0 10px" },
  cardExcerpt: { fontSize: "0.9rem", color: "#6B7A99", lineHeight: 1.7, flex: 1, margin: "0 0 16px" },
  cardFooter:  { display: "flex", justifyContent: "space-between", fontSize: "0.78rem", color: "#9CA3AF", marginBottom: "14px" },
  author:      { fontWeight: "600" },
  date:        {},
  readMore:    { fontSize: "0.85rem", fontWeight: "700", color: "#00C49A", letterSpacing: "0.02em" },
};