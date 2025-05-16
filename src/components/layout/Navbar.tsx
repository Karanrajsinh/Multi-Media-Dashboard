import { useState } from 'react';
import { Menu, User, Sun, Moon } from 'lucide-react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { logout } from '../../store/authSlice';
import { toggleTheme } from '../../store/themeSlice';

interface NavbarProps {
  toggleSidebar?: () => void;
}

const Navbar = ({ toggleSidebar }: NavbarProps) => {
  const dispatch = useAppDispatch();
  const { isDarkMode } = useAppSelector(state => state.theme);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  return (
    <header className="relative flex items-center px-4 py-3 transition-colors duration-200 bg-white border-b shadow-sm dark:bg-gray-800 dark:border-gray-700">
      {/* Left side */}
      <div className="flex items-center gap-3">
        {/* Mobile menu toggle */}
        <button
          onClick={toggleSidebar}
          className="p-2 transition-colors rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 lg:hidden"
          aria-label="Toggle sidebar"
        >
          <Menu size={20} className="text-gray-600 dark:text-gray-300" />
        </button>
      </div>

      {/* Center logo */}
      <div className="absolute flex items-center -translate-x-1/2 left-1/2">
        <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary">
          <span className="text-sm font-bold text-white">M</span>
        </div>
        <span className="ml-2 text-lg font-bold text-primary">MatDash</span>
      </div>

      {/* Right side */}
      <div className="flex items-center ml-auto space-x-4">
        <button
          onClick={handleToggleTheme}
          className="p-2 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          aria-label="Toggle theme"
        >
          {isDarkMode ? (
            <Sun size={20} className="text-gray-100" />
          ) : (
            <Moon size={20} className="text-gray-600" />
          )}
        </button>

        <div className="relative">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="p-0.5 rounded-full bg-gray-200 dark:bg-gray-700 hover:ring-2 hover:ring-primary/20 transition-all"
          >
            <User size={24} className="text-gray-600 dark:text-gray-300" />
          </button>

          {isProfileOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setIsProfileOpen(false)}
              />
              <div className="absolute right-0 z-50 w-48 py-2 mt-2 bg-white border rounded-md shadow-lg dark:bg-gray-800 dark:border-gray-700">
                <div className="px-4 py-2 border-b dark:border-gray-700">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Demo User</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">demo@example.com</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-sm text-left text-red-600 transition-colors dark:text-red-400 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                >
                  Logout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
