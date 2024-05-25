import { ReactNode } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function NavbarAndSidebar(props: { children: ReactNode }) {
  return (
    <div className="flex flex-col h-screen w-screen">
      <Navbar />
      <div className="flex h-full">
        <Sidebar />
        {props.children}
      </div>
    </div>
  );
}

export default NavbarAndSidebar;
