import { Button } from "@/components/ui/button";
import { LayoutDashboard } from "lucide-react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="h-full w-64 border-r border-neutral-200 p-4">
      <Link to="/">
        <Button variant="ghost" className="w-full place-content-start">
          <LayoutDashboard size={24} />
          <span className="ml-2">Dashboard</span>
        </Button>
      </Link>
    </div>
  );
}

export default Sidebar;
