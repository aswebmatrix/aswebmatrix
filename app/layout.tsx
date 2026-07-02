import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import "aos/dist/aos.css";
import Header from "@/app/components/Header/page";
import Footer from "@/app/components/Footer/page";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Script from "next/script";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.aswebmatrix.com'),
  title: {
    default: "A.S Web Matrix - Best Website Development & Digital Marketing Company in India",
    template: "%s | A.S Web Matrix - Top Digital Agency India"
  },
  description: "A.S Web Matrix is India's leading digital agency providing SEO Services, Website Development, WordPress Development, MERN Stack Development, Digital Marketing, E-commerce Solutions, Mobile App Development, PPC Services, Social Media Marketing & Content Writing. Serving Delhi NCR, Mumbai, Bangalore & International clients.",
  keywords: "SEO Company India, Website Development Company, WordPress Development India, MERN Stack Development, Digital Marketing Agency, E-commerce Development, Mobile App Development, PPC Services India, Social Media Marketing, Content Writing Services, Best SEO Company Delhi, Web Development Mumbai, WordPress Expert Bangalore, Digital Marketing Noida, E-commerce Solutions Gurugram, App Development Faridabad",
  
  openGraph: {
    title: "A.S Web Matrix - Complete Digital Solutions Agency",
    description: "Expert SEO, Web Development, WordPress, MERN Stack, Digital Marketing & More. Serving India & International clients.",
    type: "website",
    url: "https://www.aswebmatrix.com",
    siteName: "A.S Web Matrix",
    images: [
      {
        url: "https://www.aswebmatrix.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "A.S Web Matrix - Digital Agency India",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "A.S Web Matrix - Best Digital Agency India",
    description: "SEO • Web Development • WordPress • MERN Stack • Digital Marketing • Mobile Apps • PPC • SMM",
    images: ["https://www.aswebmatrix.com/twitter-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" 
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
        
        <link rel="canonical" href="https://www.aswebmatrix.com" />
        <meta name="geo.region" content="IN" />
        <meta name="geo.placename" content="Faridabad, Delhi NCR" />
      </head>
      <body className={`${poppins.variable} antialiased`}>
        <Header />
        {children}
        <Footer />
        
        {/* ============================================ */}
        {/* SCHEMA SCRIPTS - For SEO */}
        {/* ============================================ */}
        
        {/* Main Organization Schema */}
        <Script
          id="schema-organization"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "A.S Web Matrix",
              "url": "https://www.aswebmatrix.com",
              "logo": "https://www.aswebmatrix.com/logo.png",
              "sameAs": [
                "https://www.facebook.com/aswebmatrix",
                "https://www.instagram.com/aswebmatrix",
                "https://www.linkedin.com/company/aswebmatrix",
                "https://twitter.com/aswebmatrix"
              ],
              "contactPoint": [
                {
                  "@type": "ContactPoint",
                  "telephone": "+91-9876543210",
                  "contactType": "customer service",
                  "areaServed": ["IN", "US", "GB", "CA", "AU", "AE"],
                  "availableLanguage": ["English", "Hindi"]
                }
              ],
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Faridabad",
                "addressRegion": "Haryana",
                "addressCountry": "IN"
              }
            })
          }}
        />

        {/* Service List Schema */}
        <Script
          id="schema-services"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              "itemListElement": [
                {
                  "@type": "Service",
                  "position": 1,
                  "name": "SEO Services",
                  "description": "Professional SEO services to rank your website on Google first page",
                  "provider": { "@type": "Organization", "name": "A.S Web Matrix" },
                  "areaServed": ["India", "USA", "UK", "Canada", "Australia", "UAE"]
                },
                {
                  "@type": "Service",
                  "position": 2,
                  "name": "Website Development",
                  "description": "Custom website development using latest technologies",
                  "provider": { "@type": "Organization", "name": "A.S Web Matrix" }
                },
                {
                  "@type": "Service",
                  "position": 3,
                  "name": "WordPress Development",
                  "description": "Professional WordPress website development and customization",
                  "provider": { "@type": "Organization", "name": "A.S Web Matrix" }
                },
                {
                  "@type": "Service",
                  "position": 4,
                  "name": "MERN Stack Development",
                  "description": "Full-stack web development using MongoDB, Express.js, React, Node.js",
                  "provider": { "@type": "Organization", "name": "A.S Web Matrix" }
                },
                {
                  "@type": "Service",
                  "position": 5,
                  "name": "Digital Marketing",
                  "description": "Complete digital marketing solutions for business growth",
                  "provider": { "@type": "Organization", "name": "A.S Web Matrix" }
                },
                {
                  "@type": "Service",
                  "position": 6,
                  "name": "E-commerce Development",
                  "description": "Custom e-commerce website development",
                  "provider": { "@type": "Organization", "name": "A.S Web Matrix" }
                },
                {
                  "@type": "Service",
                  "position": 7,
                  "name": "Mobile App Development",
                  "description": "iOS and Android app development services",
                  "provider": { "@type": "Organization", "name": "A.S Web Matrix" }
                },
                {
                  "@type": "Service",
                  "position": 8,
                  "name": "PPC Services",
                  "description": "Pay-per-click advertising campaigns",
                  "provider": { "@type": "Organization", "name": "A.S Web Matrix" }
                },
                {
                  "@type": "Service",
                  "position": 9,
                  "name": "Social Media Marketing",
                  "description": "Social media management and marketing",
                  "provider": { "@type": "Organization", "name": "A.S Web Matrix" }
                },
                {
                  "@type": "Service",
                  "position": 10,
                  "name": "Content Writing",
                  "description": "Professional content writing services",
                  "provider": { "@type": "Organization", "name": "A.S Web Matrix" }
                }
              ]
            })
          }}
        />
      </body>
    </html>
  );
}