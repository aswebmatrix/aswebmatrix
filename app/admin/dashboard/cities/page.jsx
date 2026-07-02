"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function CitiesAdmin() {
  const [cities,  setCities]  = useState([]);
  const [loading, setLoading] = useState(true);
  const [search,  setSearch]  = useState("");

  useEffect(() => {
    fetch("/api/cities?admin=true")
      .then(r => r.json())
      .then(d => { setCities(d.cities || []); setLoading(false); });
  }, []);

  async function deleteCity(id) {
    if (!confirm("Delete this city page?")) return;
    await fetch(`/api/cities/${id}`, { method: "DELETE" });
    setCities(prev => prev.filter(c => c._id !== id));
  }

  async function toggleStatus(city) {
    const newStatus = city.status === "active" ? "inactive" : "active";
    await fetch(`/api/cities/${city._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    setCities(prev => prev.map(c => c._id === city._id ? { ...c, status: newStatus } : c));
  }

  const filtered = cities.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.slug.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div style={s.loading}>Loading city pages...</div>;

  return (
    <div>
      <div style={s.header}>
        <div>
          <h1 style={s.title}>City Pages</h1>
          <p style={s.sub}>{cities.length} city pages total · Programmatic SEO</p>
        </div>
        <Link href="/admin/dashboard/cities/new" style={s.newBtn}>+ New City Page</Link>
      </div>

      <input
        style={s.search}
        placeholder="Search by city name or slug..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      {filtered.length === 0 ? (
        <div style={s.empty}>
          <p style={{ marginBottom: "16px" }}>No city pages yet.</p>
          <Link href="/admin/dashboard/cities/new" style={s.newBtn}>+ Create First City Page</Link>
        </div>
      ) : (
        <div style={s.tableWrap}>
          <table style={s.table}>
            <thead>
              <tr>
                {["City","Slug","Region","Country","Status","Views","Actions"].map(h => (
                  <th key={h} style={s.th}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(city => (
                <tr key={city._id} style={s.tr}>
                  <td style={s.td}><strong>{city.name}</strong></td>
                  <td style={s.td}><code style={s.code}>/services/{city.slug}</code></td>
                  <td style={s.td}>{city.region || "—"}</td>
                  <td style={s.td}>{city.country}</td>
                  <td style={s.td}>
                    <span style={{
                      ...s.statusBadge,
                      background: city.status === "active" ? "#D1FAE5" : "#F3F4F6",
                      color: city.status === "active" ? "#065F46" : "#374151",
                    }}>
                      {city.status}
                    </span>
                  </td>
                  <td style={s.td}>{city.views || 0}</td>
                  <td style={s.td}>
                    <div style={s.actions}>
                      <Link href={`/admin/dashboard/cities/${city._id}`} style={s.editBtn}>Edit</Link>
                      <a href={`/services/${city.slug}`} target="_blank" style={s.viewBtn}>View</a>
                      <button onClick={() => toggleStatus(city)} style={s.toggleBtn}>
                        {city.status === "active" ? "Disable" : "Enable"}
                      </button>
                      <button onClick={() => deleteCity(city._id)} style={s.deleteBtn}>Del</button>
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
  newBtn:      { padding: "12px 24px", background: "#00C49A", color: "#fff", borderRadius: "10px", fontWeight: "700", fontSize: "0.9rem", textDecoration: "none" },
  search:      { width: "100%", maxWidth: "400px", padding: "10px 16px", border: "1.5px solid #E2E8F0", borderRadius: "10px", fontSize: "0.95rem", outline: "none", fontFamily: "inherit", marginBottom: "20px", display: "block" },
  empty:       { padding: "48px", textAlign: "center", color: "#6B7A99", background: "#fff", borderRadius: "16px", border: "1.5px solid #E2E8F0" },
  tableWrap:   { background: "#fff", border: "1.5px solid #E2E8F0", borderRadius: "16px", overflow: "hidden" },
  table:       { width: "100%", borderCollapse: "collapse", fontSize: "0.88rem" },
  th:          { textAlign: "left", padding: "12px 16px", background: "#F7F8FC", color: "#6B7A99", fontSize: "0.75rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.06em", whiteSpace: "nowrap" },
  tr:          { borderBottom: "1px solid #F3F4F6" },
  td:          { padding: "14px 16px", color: "#0B1628", verticalAlign: "middle" },
  code:        { background: "#F3F4F6", padding: "2px 8px", borderRadius: "6px", fontSize: "0.8rem", fontFamily: "monospace" },
  statusBadge: { display: "inline-block", padding: "3px 10px", borderRadius: "100px", fontSize: "0.75rem", fontWeight: "700" },
  actions:     { display: "flex", gap: "6px", alignItems: "center", flexWrap: "wrap" },
  editBtn:     { padding: "5px 12px", background: "#0B1628", color: "#fff", borderRadius: "6px", fontSize: "0.78rem", fontWeight: "700", textDecoration: "none" },
  viewBtn:     { padding: "5px 12px", background: "#EFF6FF", color: "#1D4ED8", borderRadius: "6px", fontSize: "0.78rem", fontWeight: "700", textDecoration: "none" },
  toggleBtn:   { padding: "5px 12px", background: "#FEF3C7", color: "#92400E", border: "none", borderRadius: "6px", fontSize: "0.78rem", fontWeight: "700", cursor: "pointer", fontFamily: "inherit" },
  deleteBtn:   { padding: "5px 12px", background: "#FEE2E2", color: "#DC2626", border: "none", borderRadius: "6px", fontSize: "0.78rem", fontWeight: "700", cursor: "pointer", fontFamily: "inherit" },
};