import { Link } from "react-router-dom";

interface Props {
  title: string;
  description: string;
  path: string;
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
}

export default function CalculatorCard({
  title,
  description,
  path,
  icon: Icon,
  iconBg,
  iconColor,
}: Props) {
  return (
    <Link to={path}>
      <div className="group bg-white border rounded-2xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
        <div
          className={`w-12 h-12 rounded-xl ${iconBg} flex items-center justify-center mb-4`}
        >
          <Icon size={24} className={iconColor} />
        </div>

        <h2 className="text-xl font-semibold mb-2 group-hover:text-blue-600">
          {title}
        </h2>

        <p className="text-gray-600 mb-4">{description}</p>

        <span className="text-blue-600 font-medium">Open Calculator →</span>
      </div>
    </Link>
  );
}
