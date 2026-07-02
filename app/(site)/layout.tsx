import Header from "@/app/components/Header/page";
import Footer from "@/app/components/Footer/page";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}