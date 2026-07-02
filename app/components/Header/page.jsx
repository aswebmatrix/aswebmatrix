"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import './Header.css';
import logo from "../images/logo.png";

// ─────────────────────────────────────────────────────────────────────────────
// Pages listed here will ALWAYS show the solid/scrolled navbar (white bg),
// even before the user scrolls. Home page ('/')  is intentionally excluded
// because its hero is dark and the transparent navbar looks great there.
// Add or remove paths here whenever you add new pages.
// ─────────────────────────────────────────────────────────────────────────────
const ALWAYS_SOLID_NAVBAR = [
  '/about',
  '/services',
  '/portfolio',
  '/contact',
  '/faq',
  '/blog',
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled]     = useState(false);
  const pathname = usePathname();

  // Force solid navbar on every page except home
  const forceScrolled = ALWAYS_SOLID_NAVBAR.some(
    (path) => pathname === path || pathname.startsWith(path + '/')
  );

  // Combined: solid if user scrolled OR page requires it
  const isScrolled = scrolled || forceScrolled;

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu  = () => setIsMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu whenever the route changes
  useEffect(() => {
    closeMenu();
  }, [pathname]);

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <nav className="navbar">
          <div className="logo">
            <Link href="/">
              <Image
                src={logo}
                alt="AS Web Matrix"
                className="logo1"
                width={150}
                height={50}
                priority
              />
            </Link>
            <button
              className="menu-toggle"
              onClick={toggleMenu}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
            </button>
          </div>

          <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            <li>
              <Link href="/" className={pathname === '/' ? 'active' : ''} onClick={closeMenu}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className={pathname === '/about' ? 'active' : ''} onClick={closeMenu}>
                About
              </Link>
            </li>
            <li>
              <Link href="/services" className={pathname === '/services' ? 'active' : ''} onClick={closeMenu}>
                Services
              </Link>
            </li>
            <li>
              <Link href="/portfolio" className={pathname === '/portfolio' ? 'active' : ''} onClick={closeMenu}>
                Portfolio
              </Link>
            </li>
            <li>
              <Link href="/faq" className={pathname === '/faq' ? 'active' : ''} onClick={closeMenu}>
                FAQ
              </Link>
            </li>
            <li>
              <Link href="/contact" className={pathname === '/contact' ? 'active' : ''} onClick={closeMenu}>
                Contact
              </Link>
            </li>
            <li>
              <Link href="/blog" className={pathname === '/blog' ? 'active' : ''} onClick={closeMenu}>
                Blog
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;