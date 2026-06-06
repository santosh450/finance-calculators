import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="border-b">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          CalcWise
        </Link>

        <div className="flex gap-6">
          <Link to="/">Home</Link>
          <Link to="/calculators">Calculators</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/about">About</Link>
        </div>
      </div>
    </nav>
  );
}
