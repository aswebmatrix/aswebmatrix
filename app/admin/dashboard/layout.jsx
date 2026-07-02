"use client";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

const navItems = [
  { href: "/admin/dashboard",               label: "📊 Dashboard",   exact: true },
  { href: "/admin/dashboard/blogs",         label: "📝 Blog Posts" },
  { href: "/admin/dashboard/blogs/new",     label: "➕ New Post" },
  { href: "/admin/dashboard/cities",        label: "🏙 City Pages" },
  { href: "/admin/dashboard/cities/new",    label: "➕ New City" },
];

export default function AdminLayout({ children }) {
  const router   = useRouter();
  const pathname = usePathname();

  async function logout() {
    await fetch("/api/auth", { method: "DELETE" });
    router.push("/admin/login");
  }

  return (
    <div style={s.wrap}>
      <aside style={s.sidebar}>
        <div style={s.brand}>
          <span style={s.brandText}>A.S Admin</span>
          <span style={s.brandSub}>Web Matrix</span>
        </div>
        <nav style={s.nav}>
          <p style={s.navSection}>MAIN</p>
          {navItems.slice(0,3).map(item => {
            const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
            return (
              <Link key={item.href} href={item.href} style={active ? s.navLinkActive : s.navLink}>
                {item.label}
              </Link>
            );
          })}
          <p style={s.navSection}>CITY PAGES (SEO)</p>
          {navItems.slice(3).map(item => {
            const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
            return (
              <Link key={item.href} href={item.href} style={active ? s.navLinkActive : s.navLink}>
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div style={s.sidebarBottom}>
          <Link href="/" target="_blank" style={s.navLink}>🌐 View Website</Link>
          <button onClick={logout} style={s.logoutBtn}>🚪 Logout</button>
        </div>
      </aside>
      <main style={s.main}>{children}</main>
    </div>
  );
}

const s = {
  wrap:           { display: "flex", minHeight: "100vh", fontFamily: "'Inter',sans-serif", background: "#F7F8FC" },
  sidebar:        { width: "240px", background: "#0B1628", display: "flex", flexDirection: "column", position: "fixed", top: 0, left: 0, height: "100vh", zIndex: 100 },
  brand:          { padding: "24px 20px 16px", borderBottom: "1px solid rgba(255,255,255,0.08)" },
  brandText:      { display: "block", fontSize: "1.1rem", fontWeight: "900", color: "#fff" },
  brandSub:       { display: "block", fontSize: "0.7rem", fontWeight: "600", color: "#00C49A", textTransform: "uppercase", letterSpacing: "0.1em" },
  nav:            { flex: 1, padding: "12px", display: "flex", flexDirection: "column", gap: "2px", overflowY: "auto" },
  navSection:     { fontSize: "0.62rem", fontWeight: "700", color: "rgba(255,255,255,0.25)", textTransform: "uppercase", letterSpacing: "0.12em", padding: "12px 10px 4px", margin: 0 },
  navLink:        { display: "block", padding: "9px 12px", borderRadius: "8px", color: "rgba(255,255,255,0.55)", fontSize: "0.85rem", fontWeight: "600", textDecoration: "none" },
  navLinkActive:  { display: "block", padding: "9px 12px", borderRadius: "8px", color: "#fff", fontSize: "0.85rem", fontWeight: "700", textDecoration: "none", background: "rgba(0,196,154,0.15)", borderLeft: "3px solid #00C49A" },
  sidebarBottom:  { padding: "12px", borderTop: "1px solid rgba(255,255,255,0.08)", display: "flex", flexDirection: "column", gap: "2px" },
  logoutBtn:      { padding: "9px 12px", borderRadius: "8px", color: "rgba(255,100,100,0.8)", fontSize: "0.85rem", fontWeight: "600", background: "none", border: "none", cursor: "pointer", textAlign: "left", fontFamily: "inherit" },
  main:           { marginLeft: "240px", flex: 1, padding: "32px", minHeight: "100vh" },
};