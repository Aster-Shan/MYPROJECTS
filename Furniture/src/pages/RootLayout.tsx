import Footer from "@/components/layouts/Footer";
import Header from "@/components/layouts/Header";
import { Outlet } from "react-router-dom";
function RootLayout() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header></Header>

        <main className="flex-1">
          <Outlet></Outlet>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default RootLayout;
