"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

const STATUS_COLORS = {
  new:     { bg: "#FEF3C7", text: "#92400E", label: "New" },
  read:    { bg: "#DBEAFE", text: "#1E40AF", label: "Read" },
  replied: { bg: "#D1FAE5", text: "#065F46", label: "Replied" },
};

export default function Dashboard() {
  const [contacts, setContacts] = useState([]);
  const [blogs,    setBlogs]    = useState([]);
  const [loading,  setLoading]  = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/contact").then(r => r.json()),
      fetch("/api/blogs?admin=true&limit=5").then(r => r.json()),
    ]).then(([cData, bData]) => {
      setContacts(cData.contacts || []);
      setBlogs(bData.blogs || []);
      setLoading(false);
    });
  }, []);

  async function updateStatus(id, status) {
    await fetch("/api/contacts", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    setContacts(prev => prev.map(c => c._id === id ? { ...c, status } : c));
  }

  if (loading) return <div style={s.loading}>Loading dashboard...</div>;

  const newCount       = contacts.filter(c => c.status === "new").length;
  const publishedBlogs = blogs.filter(b => b.status === "published").length;

  return (
    <div>
      <h1 style={s.pageTitle}>Dashboard</h1>
      <p style={s.pageSub}>Welcome back! Here's what's happening.</p>

      {/* Stats cards */}
      <div style={s.statsGrid}>
        {[
          { label: "Total Contacts",    value: contacts.length, color: "#00C49A" },
          { label: "New / Unread",       value: newCount,        color: "#F59E0B" },
          { label: "Total Blog Posts",  value: blogs.length,    color: "#6366F1" },
          { label: "Published Posts",   value: publishedBlogs,  color: "#10B981" },
        ].map(stat => (
          <div key={stat.label} style={s.statCard}>
            <span style={{ ...s.statNum, color: stat.color }}>{stat.value}</span>
            <span style={s.statLabel}>{stat.label}</span>
          </div>
        ))}
      </div>

      {/* Contacts Table */}
      <div style={s.section}>
        <div style={s.sectionHeader}>
          <h2 style={s.sectionTitle}>Contact Enquiries</h2>
          <span style={s.badge}>{contacts.length} total</span>
        </div>

        {contacts.length === 0 ? (
          <p style={s.empty}>No contacts yet.</p>
        ) : (
          <div style={s.tableWrap}>
            <table style={s.table}>
              <thead>
                <tr>
                  {["Name","Email","Phone","Subject","Message","Status","Date","Action"].map(h => (
                    <th key={h} style={s.th}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {contacts.map(c => (
                  <tr key={c._id} style={s.tr}>
                    <td style={s.td}><strong>{c.name}</strong></td>
                    <td style={s.td}><a href={`mailto:${c.email}`} style={s.link}>{c.email}</a></td>
                    <td style={s.td}>{c.phone || "—"}</td>
                    <td style={s.td}>{c.subject || "—"}</td>
                    <td style={{ ...s.td, maxWidth: "200px" }}>
                      <span title={c.message} style={s.truncate}>{c.message}</span>
                    </td>
                    <td style={s.td}>
                      <span style={{ ...s.statusBadge, background: STATUS_COLORS[c.status]?.bg, color: STATUS_COLORS[c.status]?.text }}>
                        {STATUS_COLORS[c.status]?.label}
                      </span>
                    </td>
                    <td style={s.td}>{new Date(c.createdAt).toLocaleDateString("en-IN")}</td>
                    <td style={s.td}>
                      <select
                        value={c.status}
                        onChange={e => updateStatus(c._id, e.target.value)}
                        style={s.select}
                      >
                        <option value="new">New</option>
                        <option value="read">Read</option>
                        <option value="replied">Replied</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Recent blogs */}
      <div style={s.section}>
        <div style={s.sectionHeader}>
          <h2 style={s.sectionTitle}>Recent Blog Posts</h2>
          <Link href="/admin/dashboard/blogs" style={s.viewAll}>View All →</Link>
        </div>
        {blogs.length === 0 ? (
          <p style={s.empty}>No blog posts yet. <Link href="/admin/dashboard/blogs/new" style={s.link}>Create one →</Link></p>
        ) : (
          <div style={s.blogList}>
            {blogs.map(b => (
              <div key={b._id} style={s.blogRow}>
                <div>
                  <p style={s.blogTitle}>{b.title}</p>
                  <p style={s.blogMeta}>/{b.slug} · {b.category} · {b.readingTime} min read</p>
                </div>
                <div style={s.blogActions}>
                  <span style={{ ...s.statusBadge, background: b.status === "published" ? "#D1FAE5" : "#F3F4F6", color: b.status === "published" ? "#065F46" : "#374151" }}>
                    {b.status}
                  </span>
                  <Link href={`/admin/dashboard/blogs/${b._id}`} style={s.editBtn}>Edit</Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const s = {
  loading:       { padding: "40px", color: "#6B7A99", fontFamily: "'Inter',sans-serif" },
  pageTitle:     { fontSize: "1.8rem", fontWeight: "800", color: "#0B1628", marginBottom: "4px" },
  pageSub:       { color: "#6B7A99", fontSize: "0.95rem", marginBottom: "32px" },
  statsGrid:     { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "16px", marginBottom: "32px" },
  statCard:      { background: "#fff", border: "1.5px solid #E2E8F0", borderRadius: "16px", padding: "24px 20px", display: "flex", flexDirection: "column", gap: "4px" },
  statNum:       { fontSize: "2.2rem", fontWeight: "900", lineHeight: 1 },
  statLabel:     { fontSize: "0.8rem", fontWeight: "600", color: "#6B7A99", textTransform: "uppercase", letterSpacing: "0.06em" },
  section:       { background: "#fff", border: "1.5px solid #E2E8F0", borderRadius: "16px", padding: "24px", marginBottom: "24px" },
  sectionHeader: { display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" },
  sectionTitle:  { fontSize: "1.1rem", fontWeight: "800", color: "#0B1628", margin: 0 },
  badge:         { background: "#F3F4F6", color: "#374151", fontSize: "0.75rem", fontWeight: "700", padding: "3px 10px", borderRadius: "100px" },
  empty:         { color: "#6B7A99", fontSize: "0.9rem" },
  tableWrap:     { overflowX: "auto" },
  table:         { width: "100%", borderCollapse: "collapse", fontSize: "0.88rem" },
  th:            { textAlign: "left", padding: "10px 12px", background: "#F7F8FC", color: "#6B7A99", fontSize: "0.75rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.06em", whiteSpace: "nowrap" },
  tr:            { borderBottom: "1px solid #F3F4F6" },
  td:            { padding: "12px 12px", color: "#0B1628", verticalAlign: "top" },
  truncate:      { display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "180px", cursor: "help" },
  link:          { color: "#00C49A", textDecoration: "none", fontWeight: "600" },
  statusBadge:   { display: "inline-block", padding: "3px 10px", borderRadius: "100px", fontSize: "0.75rem", fontWeight: "700" },
  select:        { padding: "4px 8px", border: "1px solid #E2E8F0", borderRadius: "8px", fontSize: "0.82rem", background: "#fff", cursor: "pointer" },
  viewAll:       { marginLeft: "auto", fontSize: "0.88rem", fontWeight: "700", color: "#00C49A", textDecoration: "none" },
  blogList:      { display: "flex", flexDirection: "column", gap: "12px" },
  blogRow:       { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 16px", background: "#F7F8FC", borderRadius: "12px" },
  blogTitle:     { fontWeight: "700", color: "#0B1628", fontSize: "0.95rem", margin: "0 0 4px" },
  blogMeta:      { fontSize: "0.78rem", color: "#6B7A99", margin: 0 },
  blogActions:   { display: "flex", alignItems: "center", gap: "10px" },
  editBtn:       { padding: "6px 14px", background: "#0B1628", color: "#fff", borderRadius: "8px", fontSize: "0.8rem", fontWeight: "700", textDecoration: "none" },
};