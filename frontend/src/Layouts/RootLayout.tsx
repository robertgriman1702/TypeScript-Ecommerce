import { Outlet, useLocation } from "react-router-dom";
import { FeatureGrid } from "../components/Home/FeatureGrid";
import { Header } from "../components/shared/Header";
import { Navbar } from "../components/shared/navbar";
import { WhatsButton } from "../components/shared/WhatsButton";
import { Footer } from "../components/shared/Footer";
import { Banner } from "../components/Home/Banner";
import { Newsletter } from "../components/Home/Newsletter";

export const RootLayout = () => {
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  return (
    <div className="flex flex-col min-h-screen font-montserrat overflow-x-hidden w-full">
      <Header />
      <Navbar />

      {isHome && <Banner />}
      {isHome && <FeatureGrid />}

      <main className="container my-8 flex-1 px-5 lg:px-12">
        <Outlet />
      </main>

      {isHome && <Newsletter />}

      <WhatsButton />
      <Footer />
    </div>
  );
}