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
                className="text-white focus:outline-none cursor-pointer"
                aria-label="Toggle menu"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="white"
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

              <Link to="/features" className="hover:text-blue-500">
                Contact
              </Link>

              <button className="px-6 py-2 bg-white text-black cursor-pointer rounded-lg border hover:opacity-90 transition-opacity">
                <Link to="/admin">Admin Login</Link>
              </button>
            </div>
          </div>
        </div>
        {/* Mobile Menu */}
        {isOpen && (
          <div
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-10 bg-black opacity-50"
          ></div>
        )}

        <div
          className={`md:hidden fixed z-30 top-0 left-0 h-full bg-primary text-white w-64  px-4 pb-4 space-y-2 transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="flex justify-end px-5 pt-6 pb-1">
            <button
              onClick={() => setIsOpen(false)}
              className="flex justify-end mb-2 cursor-pointer "
            >
              <X />
            </button>
          </div>

          <Link to="/" className="block  hover:text-blue-500">
            Home
          </Link>
          <Link to="/about" className="block  hover:text-blue-500">
            About
          </Link>
          <Link
            to="/courses"
            state={{ scrollTo: "project-section" }}
            className="block  hover:text-blue-500"
          >
            Courses
          </Link>
          <Link to="/features" className="block  hover:text-blue-500">
            Features
          </Link>
        </div>
      </nav>
    </>
  );
}

export default LandingNavbar;
