import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "1rem 2rem",
        borderBottom: "1px solid #ddd",
      }}
    >
      <Link to="/">
        <strong>CalcWise</strong>
      </Link>

      <div
        style={{
          display: "flex",
          gap: "20px",
        }}
      >
        <Link to="/">Home</Link>
        <Link to="/calculators">Calculators</Link>
        <Link to="/blog">Blog</Link>
        <Link to="/about">About</Link>
      </div>
    </nav>
  );
}
