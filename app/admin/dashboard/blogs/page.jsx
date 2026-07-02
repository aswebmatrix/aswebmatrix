"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function BlogsAdmin() {
  const [blogs,   setBlogs]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [search,  setSearch]  = useState("");

  useEffect(() => {
    fetch("/api/blogs?admin=true&limit=100")
      .then(r => r.json())
      .then(d => { setBlogs(d.blogs || []); setLoading(false); });
  }, []);

  async function deletePost(id) {
    if (!confirm("Are you sure you want to delete this post?")) return;
    await fetch(`/api/blogs/${id}`, { method: "DELETE" });
    setBlogs(prev => prev.filter(b => b._id !== id));
  }

  const filtered = blogs.filter(b =>
    b.title.toLowerCase().includes(search.toLowerCase()) ||
    b.slug.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div style={s.loading}>Loading...</div>;

  return (
    <div>
      <div style={s.header}>
        <div>
          <h1 style={s.title}>Blog Posts</h1>
          <p style={s.sub}>{blogs.length} posts total</p>
        </div>
        <Link href="/admin/dashboard/blogs/new" style={s.newBtn}>+ New Post</Link>
      </div>

      <div style={s.searchWrap}>
        <input
          style={s.search}
          placeholder="Search by title or slug..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {filtered.length === 0 ? (
        <div style={s.empty}>
          No blog posts found. <Link href="/admin/dashboard/blogs/new" style={s.link}>Create your first post →</Link>
        </div>
      ) : (
        <div style={s.tableWrap}>
          <table style={s.table}>
            <thead>
              <tr>
                {["Title","Slug","Category","Status","Views","Date","Actions"].map(h => (
                  <th key={h} style={s.th}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(b => (
                <tr key={b._id} style={s.tr}>
                  <td style={s.td}>
                    <p style={s.blogTitle}>{b.title}</p>
                    <p style={s.blogMeta}>{b.readingTime} min read</p>
                  </td>
                  <td style={s.td}><code style={s.code}>/{b.slug}</code></td>
                  <td style={s.td}>{b.category}</td>
                  <td style={s.td}>
                    <span style={{ ...s.statusBadge, background: b.status === "published" ? "#D1FAE5" : "#F3F4F6", color: b.status === "published" ? "#065F46" : "#374151" }}>
                      {b.status}
                    </span>
                  </td>
                  <td style={s.td}>{b.views}</td>
                  <td style={s.td}>{new Date(b.createdAt).toLocaleDateString("en-IN")}</td>
                  <td style={s.td}>
                    <div style={s.actions}>
                      <Link href={`/admin/dashboard/blogs/${b._id}`} style={s.editBtn}>Edit</Link>
                      <a href={`/blog/${b.slug}`} target="_blank" style={s.viewBtn}>View</a>
                      <button onClick={() => deletePost(b._id)} style={s.deleteBtn}>Del</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

const s = {
  loading:     { padding: "40px", color: "#6B7A99", fontFamily: "'Inter',sans-serif" },
  header:      { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px" },
  title:       { fontSize: "1.8rem", fontWeight: "800", color: "#0B1628", marginBottom: "4px" },
  sub:         { color: "#6B7A99", fontSize: "0.9rem" },
  newBtn:      { padding: "12px 24px", background: "#00C49A", color: "#fff", borderRadius: "10px", fontWeight: "700", fontSize: "0.9rem", textDecoration: "none", letterSpacing: "0.02em" },
  searchWrap:  { marginBottom: "20px" },
  search:      { width: "100%", maxWidth: "400px", padding: "10px 16px", border: "1.5px solid #E2E8F0", borderRadius: "10px", fontSize: "0.95rem", outline: "none", fontFamily: "inherit" },
  empty:       { padding: "40px", textAlign: "center", color: "#6B7A99", background: "#fff", borderRadius: "16px", border: "1.5px solid #E2E8F0" },
  link:        { color: "#00C49A", fontWeight: "600", textDecoration: "none" },
  tableWrap:   { background: "#fff", border: "1.5px solid #E2E8F0", borderRadius: "16px", overflow: "hidden" },
  table:       { width: "100%", borderCollapse: "collapse", fontSize: "0.88rem" },
  th:          { textAlign: "left", padding: "12px 16px", background: "#F7F8FC", color: "#6B7A99", fontSize: "0.75rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.06em" },
  tr:          { borderBottom: "1px solid #F3F4F6" },
  td:          { padding: "14px 16px", color: "#0B1628", verticalAlign: "middle" },
  blogTitle:   { fontWeight: "700", margin: "0 0 2px", fontSize: "0.92rem" },
  blogMeta:    { fontSize: "0.75rem", color: "#6B7A99", margin: 0 },
  code:        { background: "#F3F4F6", padding: "2px 8px", borderRadius: "6px", fontSize: "0.82rem", color: "#374151", fontFamily: "monospace" },
  statusBadge: { display: "inline-block", padding: "3px 10px", borderRadius: "100px", fontSize: "0.75rem", fontWeight: "700" },
  actions:     { display: "flex", gap: "6px", alignItems: "center" },
  editBtn:     { padding: "5px 12px", background: "#0B1628", color: "#fff", borderRadius: "6px", fontSize: "0.78rem", fontWeight: "700", textDecoration: "none" },
  viewBtn:     { padding: "5px 12px", background: "#EFF6FF", color: "#1D4ED8", borderRadius: "6px", fontSize: "0.78rem", fontWeight: "700", textDecoration: "none" },
  deleteBtn:   { padding: "5px 12px", background: "#FEE2E2", color: "#DC2626", border: "none", borderRadius: "6px", fontSize: "0.78rem", fontWeight: "700", cursor: "pointer", fontFamily: "inherit" },
};