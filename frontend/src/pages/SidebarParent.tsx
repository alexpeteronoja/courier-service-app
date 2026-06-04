import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/sidebar";

function SidebarParent() {
  return (
    <>
      <Sidebar />

      <Outlet />
    </>
  );
}

export default SidebarParent;
