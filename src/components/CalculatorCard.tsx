import { Link } from "react-router-dom";

interface Props {
  title: string;
  description: string;
  path: string;
}

export default function CalculatorCard({ title, description, path }: Props) {
  return (
    <Link
      to={path}
      style={{
        textDecoration: "none",
        color: "inherit",
      }}
    >
      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: "12px",
          padding: "20px",
          cursor: "pointer",
        }}
      >
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </Link>
  );
}
