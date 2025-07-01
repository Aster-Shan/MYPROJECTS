import Header from "@/components/layouts/Header";
import { Outlet } from "react-router-dom";
function RootLayout() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header></Header>
        <Outlet></Outlet>
      </div>
    </>
  );
}

export default RootLayout;
