import profile from "@/assets/profile.svg";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div className="w-full bg-neutral-100 p-8 flex flex-col">
      <h1 className="text-3xl font-semibold text-neutral-900">Dashboard</h1>
      <div className="w-full h-full flex place-content-center place-items-center">
        <div className="flex flex-col gap-8 place-content-center place-items-center">
          <img src={profile} alt="profile" className="max-w-96" />
          <h1 className="font-bold text-3xl">
            Hello there 👋 It looks like you're new here
          </h1>
          <Link to="/profile">
            <Button className="w-48 place-content-center">
              Create a profile
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
