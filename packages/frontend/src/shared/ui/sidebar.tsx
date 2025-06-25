import { FaGraduationCap } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { cn } from "../utils/cn";

export interface NavItem {
  label: string;
  href: string;
  isSectionTitle?: boolean;
}

interface SidebarProps {
  navItems: NavItem[];
  currentPath: string;
}

const Sidebar = ({ navItems, currentPath }: SidebarProps) => {
  return (
    <aside className="fixed right-0 top-0 w-64 h-screen bg-white shadow-md p-4 flex flex-col text-right" dir="rtl">
      <div className="flex items-center justify-end gap-2 mb-6">
        <div className="bg-primary text-white p-2 rounded-full">
          {/* <FaGraduationCap /> */}
        </div>
        <h1 className="text-xl font-bold text-text-main">Interview Pro</h1>
      </div>

      <nav className="flex flex-col gap-2">
        {navItems.map(({ label, href, isSectionTitle }) =>
          isSectionTitle ? (
            <div key={label} className="pl-4 pr-2 py-2 text-text-secondary text-sm font-semibold">
              {label}
            </div>
          ) : (
            <NavLink
              key={label}
              to={href}
              className={cn(
                "block px-4 py-2 rounded-md text-sm font-medium transition",
                currentPath === href
                  ? "bg-primary text-white"
                  : "text-text-main hover:bg-primary/10"
              )}
            >
              {label}
            </NavLink>
          )
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;
