import { Outlet } from "react-router-dom";
import SidebarNavigation from "./sidebar";

const DashboardLayout = () => {
  return (
    <div className="flex h-screen">
      {/* כפתור התנתקות וכפתור חזרה לדף הבית */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
