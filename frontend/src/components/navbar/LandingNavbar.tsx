import { Package, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

function LandingNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <nav className="bg-[#160f55] shadow sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-white">
          <div className="flex justify-between items-center ">
            {/* Logo */}
            <div className="flex items-center gap-2 ">
              <span className="bg-[#0c5aa6] text-white p-2 rounded-lg">
                <Package className="w-8 h-8 text-primary font-bold" />
              </span>
              <span className="text-xl font-bold">
                <Link to="/">FastLink</Link>
              </span>
            </div>

            {/* Hamburger Button (Mobile) */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg hover:bg-white/10 transition cursor-pointer"
                aria-label="Toggle menu"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>

            {/* Navigation Links (Desktop) */}
            <div className="hidden md:flex items-center space-x-6">
              <Link to="/" className=" hover:text-blue-500">
                Home
              </Link>
              <Link to="/about" className="hover:text-blue-500">
                About
              </Link>
              <Link
                to="/track-parcel"
                // state={{ scrollTo: 'project-section' }}
                className="hover:text-blue-500"
              >
                Track a Parcel
              </Link>

              <Link to="/contact" className="hover:text-blue-500">
                Contact
              </Link>

              <button className="px-6 py-2 bg-white text-black cursor-pointer rounded-lg border hover:opacity-90 transition-opacity">
                <Link to="/admin">Admin Login</Link>
              </button>
            </div>
          </div>
        </div>
        {/* Mobile Menu */}
        {/* Overlay */}
        {isOpen && (
          <div
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-20 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
          />
        )}

        {/* Mobile Sidebar */}
        <div
          className={`md:hidden fixed top-0 left-0 z-30 h-full w-72 bg-[#160f55] text-white shadow-2xl transform transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-5 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="bg-[#0c5aa6] p-2 rounded-lg">
                <Package className="w-5 h-5" />
              </span>

              <span className="text-lg font-bold">FastLink</span>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-lg hover:bg-white/10 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Links */}
          <div className="flex flex-col px-4 py-6 space-y-2">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="px-4 py-3 rounded-xl hover:bg-white/10 transition-all duration-200 font-medium"
            >
              Home
            </Link>

            <Link
              to="/about"
              onClick={() => setIsOpen(false)}
              className="px-4 py-3 rounded-xl hover:bg-white/10 transition-all duration-200 font-medium"
            >
              About
            </Link>

            <Link
              to="/track-parcel"
              onClick={() => setIsOpen(false)}
              className="px-4 py-3 rounded-xl hover:bg-white/10 transition-all duration-200 font-medium"
            >
              Track a Parcel
            </Link>

            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className="px-4 py-3 rounded-xl hover:bg-white/10 transition-all duration-200 font-medium"
            >
              Contact
            </Link>

            {/* Divider */}
            <div className="border-t border-white/10 my-2" />

            {/* Admin Button */}
            <Link
              to="/admin"
              onClick={() => setIsOpen(false)}
              className="bg-white text-[#160f55] font-semibold text-center py-3 rounded-xl hover:opacity-90 transition"
            >
              Admin Login
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}

export default LandingNavbar;
