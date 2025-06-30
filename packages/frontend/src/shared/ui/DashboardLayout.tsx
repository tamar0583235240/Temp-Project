import { Outlet, useLocation, useNavigate } from "react-router-dom";
import SidebarNavigation from "./sidebar";
import { Button } from "./button";
import HomeButton from "../components/HomeButton";
import { useState } from "react";
import { ExitButton } from "../../features/auth/components/ExitButton";
import UserMenu from "../components/UserMenu";
import { Grid } from "./grid";

const DashboardLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === "/home";

  return (
    <div className="flex h-screen">
      <div className="fixed top-4 left-4 flex items-center gap-2 z-50">
        <HomeButton />
        <UserMenu />
      </div>
      <main className="flex-1 p-4 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
