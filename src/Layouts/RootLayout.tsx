import { Outlet, useLocation } from "react-router-dom";
import { Header } from "../components/shared/header";
import { Navbar } from "../components/shared/navbar";
import { WhatsButton } from "../components/shared/WhatsButton";
import { Footer } from "../components/shared/footer";
import { Banner } from "../components/Home/Banner";
import { Newsletter } from "../components/Home/Newsletter";

export const RootLayout = () => {
  const {pathname }= useLocation();

  return (
    <div className="flex flex-col min-h-screen font-montserrat">
      <Header />
      <Navbar />

      { pathname === '/' && <Banner /> }

      <main className="container my-8 flex-1 px-5 lg:px-12">
        <Outlet />
      </main>

      { pathname === '/' && <Newsletter /> }

      <WhatsButton />
      <Footer />
    </div>
  );
}