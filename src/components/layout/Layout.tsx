import { useEffect, useState, useCallback } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { checkAuth } from '../../store/authSlice';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';

const Layout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Check authentication
  useEffect(() => {
    dispatch(checkAuth());
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [dispatch, isAuthenticated, navigate]);

  // Close menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Handle mobile menu toggle
  const handleMobileMenuToggle = useCallback((e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="relative flex min-h-screen transition-colors duration-200 bg-gray-50 dark:bg-gray-900">
      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-900/50 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <Sidebar isMobileMenuOpen={isMobileMenuOpen} />

      <div className="flex flex-col flex-1 lg:ml-64">
        <Navbar toggleSidebar={handleMobileMenuToggle} />
        <main className="flex-1 p-4 overflow-auto md:p-6">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;