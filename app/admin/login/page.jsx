"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const [form, setForm]     = useState({ username: "", password: "" });
  const [error, setError]   = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error); setLoading(false); return; }
      router.push("/admin/dashboard");
    } catch {
      setError("Something went wrong. Try again.");
      setLoading(false);
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.logo}>
          <span style={styles.logoText}>A.S</span>
          <span style={styles.logoSub}>Web Matrix Admin</span>
        </div>
        <h1 style={styles.heading}>Welcome Back</h1>
        <p style={styles.sub}>Login to manage your website</p>

        {error && <div style={styles.errorBox}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <label style={styles.label}>Username</label>
          <input
            style={styles.input}
            type="text"
            placeholder="admin"
            value={form.username}
            onChange={e => setForm({ ...form, username: e.target.value })}
            required
          />

          <label style={styles.label}>Password</label>
          <input
            style={styles.input}
            type="password"
            placeholder="••••••••"
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            required
          />

          <button style={loading ? styles.btnDisabled : styles.btn} type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login →"}
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  page:       { minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#0B1628", fontFamily: "'Inter', sans-serif" },
  card:       { background: "#fff", borderRadius: "24px", padding: "48px 40px", width: "100%", maxWidth: "420px", boxShadow: "0 40px 80px rgba(0,0,0,0.4)" },
  logo:       { display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "32px" },
  logoText:   { fontSize: "2.5rem", fontWeight: "900", color: "#0B1628" },
  logoSub:    { fontSize: "0.75rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.15em", color: "#00C49A", marginTop: "2px" },
  heading:    { fontSize: "1.6rem", fontWeight: "800", color: "#0B1628", marginBottom: "6px" },
  sub:        { fontSize: "0.9rem", color: "#6B7A99", marginBottom: "28px" },
  label:      { display: "block", fontSize: "0.8rem", fontWeight: "700", color: "#0B1628", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.06em" },
  input:      { width: "100%", padding: "12px 16px", border: "1.5px solid #E2E8F0", borderRadius: "10px", fontSize: "1rem", marginBottom: "20px", outline: "none", color: "#0B1628", fontFamily: "inherit", boxSizing: "border-box" },
  btn:        { width: "100%", padding: "14px", background: "#00C49A", color: "#fff", border: "none", borderRadius: "10px", fontSize: "1rem", fontWeight: "700", cursor: "pointer", letterSpacing: "0.04em", marginTop: "4px" },
  btnDisabled:{ width: "100%", padding: "14px", background: "#a0d9cb", color: "#fff", border: "none", borderRadius: "10px", fontSize: "1rem", fontWeight: "700", cursor: "not-allowed", letterSpacing: "0.04em", marginTop: "4px" },
  errorBox:   { background: "#FEE2E2", color: "#DC2626", padding: "12px 16px", borderRadius: "10px", fontSize: "0.9rem", marginBottom: "20px", border: "1px solid #FECACA" },
};