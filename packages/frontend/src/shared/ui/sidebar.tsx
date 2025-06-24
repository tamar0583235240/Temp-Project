import * as FaIcons from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { cn } from "../utils/cn";
import { useLocation } from "react-router-dom";

const FaGraduationCap = FaIcons.FaGraduationCap as unknown as React.FC;

interface NavItem {
  label: string;
  href: string;
  isSectionTitle?: boolean;
}

const navItems: NavItem[] = [
  { label: "בית", href: "/home" },
  { label: "סימולציה", href: "/simulation" },
  { label: "דשבורד", href: "/dashboard" },
  { label: "הקלטות שלי", href: "/my-recordings" },
  { label: "הקלטות ששיתפו", href: "/shared-recordings" },
  { label: "מאגר מידע", href: "/knowledge-base" },
  { label: "ניהול", href: "", isSectionTitle: true },
  { label: "ניהול שאלות", href: "/manage-questions" },
  { label: "ניהול משתמשים", href: "/manage-users" },
  { label: "ניהול מאגר", href: "/manage-knowledge" },
];

const SidebarNavigation = () => {
  const location = useLocation();

  return (
    <aside
      className="fixed right-0 top-0 w-64 h-screen bg-white shadow-md p-4 flex flex-col text-right"
      dir="rtl"
    >
      {/* Header */}
      <div className="flex items-center justify-start gap-2 mb-6">
        <div className="bg-primary text-white p-2 rounded-md">
          <FaGraduationCap />
        </div>
        <h1 className="text-xl font-bold text-text-main">Interview Pro</h1>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-2">
        {navItems.map(({ label, href, isSectionTitle }) =>
          isSectionTitle ? (
            <div
              key={label}
              className="pl-4 pr-2 py-2 text-text-secondary text-sm font-semibold"
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
                  isActive || location.pathname === href
                    ? "bg-primary text-white"
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

export default SidebarNavigation;
