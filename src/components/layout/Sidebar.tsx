import { NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, Upload } from 'lucide-react';

interface SidebarLink {
  name: string;
  to: string;
  icon: JSX.Element;
}

interface SidebarProps {
  isMobileMenuOpen: boolean;
}

const Logo = () => (
  <div className="flex items-center py-5 pl-4">
    <div className="flex items-center justify-center w-8 h-8 mr-2 rounded-md bg-primary">
      <span className="text-sm font-bold text-white">M</span>
    </div>
    <span className="text-xl font-bold tracking-tight text-primary">MatDash</span>
  </div>
);

const SectionHeader = ({ title }: { title: string }) => (
  <h3 className="px-4 pt-5 pb-2 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
    {title}
  </h3>
);

const SidebarLinkItem = ({ link, isActive }: { link: SidebarLink; isActive: boolean }) => (
  <NavLink
    to={link.to}
    className={`flex items-center pl-4 pr-2 py-2.5 rounded-md text-sm font-medium mb-1 transition-colors mx-2 ${isActive
      ? 'bg-primary/10 text-primary dark:bg-primary/20'
      : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
      }`}
  >
    <span className="w-5 h-5 mr-3">{link.icon}</span>
    {link.name}
  </NavLink>
);

const Sidebar = ({ isMobileMenuOpen }: SidebarProps) => {
  const location = useLocation();
  const links: SidebarLink[] = [
    { name: 'Dashboard', to: '/dashboard', icon: <LayoutDashboard size={18} /> },
    { name: 'Upload', to: '/upload', icon: <Upload size={18} /> },
  ];

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 flex flex-col w-64 bg-white dark:bg-gray-800 border-r dark:border-gray-700 overflow-y-auto`}
    >
      <Logo />

      <div className="flex-1 py-4">
        <SectionHeader title="MENU" />

        {links.map((link) => (
          <SidebarLinkItem
            key={link.to}
            link={link}
            isActive={location.pathname === link.to}
          />
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;