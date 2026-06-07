import { Link } from "react-router-dom";

interface Props {
  title: string;
  description: string;
  path: string;
}

export default function CalculatorCard({ title, description, path }: Props) {
  return (
    <div className="border rounded-xl p-6 shadow-sm hover:shadow-md transition">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>

      <p className="text-gray-600 mb-4">{description}</p>

      <Link to={path} className="text-blue-600 font-medium">
        Open Calculator →
      </Link>
    </div>
  );
}
