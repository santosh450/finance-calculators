import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? "text-blue-600 font-semibold" : "hover:text-blue-600 transition";

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          CalcWise
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>

          <NavLink to="/calculators" className={navLinkClass}>
            Calculators
          </NavLink>

          <NavLink to="/blog" className={navLinkClass}>
            Blog
          </NavLink>

          <NavLink to="/about" className={navLinkClass}>
            About
          </NavLink>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t bg-white">
          <div className="flex flex-col p-4 space-y-4">
            <NavLink
              to="/"
              className={navLinkClass}
              onClick={() => setIsOpen(false)}
            >
              Home
            </NavLink>

            <NavLink
              to="/calculators"
              className={navLinkClass}
              onClick={() => setIsOpen(false)}
            >
              Calculators
            </NavLink>

            <NavLink
              to="/blog"
              className={navLinkClass}
              onClick={() => setIsOpen(false)}
            >
              Blog
            </NavLink>

            <NavLink
              to="/about"
              className={navLinkClass}
              onClick={() => setIsOpen(false)}
            >
              About
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
}
