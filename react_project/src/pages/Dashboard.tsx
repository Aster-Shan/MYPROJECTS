import { Outlet } from "react-router";

export default function Dashboard() {
  return (
    <>
    <div className="bg-amber-200">Dashboard</div>
    <Outlet/>
    </>
  );
}
