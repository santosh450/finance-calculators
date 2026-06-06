import { Link } from "react-router-dom";

interface CalculatorCardProps {
  title: string;
  description: string;
  path: string;
}

export default function CalculatorCard({
  title,
  description,
  path,
}: CalculatorCardProps) {
  return (
    <Link to={path}>
      <div className="border rounded-xl p-6 shadow-sm hover:shadow-lg transition duration-300 bg-white">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>

        <p className="text-gray-600">{description}</p>
      </div>
    </Link>
  );
}
