import { Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="transition-colors duration-200 bg-white border-t dark:bg-gray-800 dark:border-gray-700">
      <div className="flex flex-col items-center justify-between px-4 py-3 sm:flex-row">
        <div className="flex flex-col items-center gap-4 mb-3 sm:flex-row sm:mb-0">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-6 h-6 rounded bg-primary">
              <span className="text-xs font-bold text-white">M</span>
            </div>
            <span className="font-semibold text-primary">MatDash</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Mail size={14} />
            <span>contact@matdash.com</span>
          </div>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          © {currentYear} MatDash. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;