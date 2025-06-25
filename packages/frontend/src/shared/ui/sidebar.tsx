import { FaGraduationCap } from "react-icons/fa";
import { MdMail } from "react-icons/md";
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
    <aside
      className="fixed right-0 top-0 w-64 h-screen bg-white shadow-md p-4 flex flex-col text-right z-40 border-l border-border"
      dir="rtl"
    >
      <div className="flex items-center justify-end gap-2 mb-8">
        <div className="bg-primary text-white p-2 rounded-full flex items-center justify-center">
          <MdMail size={22} />
        </div>
        <h1 className="text-xl font-bold text-text-main">Interview Pro</h1>
      </div>
      <nav className="flex-1 flex flex-col gap-2 overflow-y-auto pr-1 custom-scrollbar">
        {navItems.map(({ label, href, isSectionTitle }) =>
          isSectionTitle ? (
            <div
              key={label}
              className="pl-4 pr-2 py-2 text-text-secondary text-xs font-semibold mt-4 mb-1 tracking-wide"
            >
              {label}
            </div>
          ) : (
            <NavLink
              key={label}
              to={href}
              className={({ isActive }) =>
                cn(
                  "block px-4 py-2 rounded-md text-sm font-medium transition",
                  isActive || currentPath === href
                    ? "bg-primary text-white shadow"
                    : "text-text-main hover:bg-primary/10"
                )
              }
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
