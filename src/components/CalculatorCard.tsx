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
      <div className="group bg-white border rounded-2xl p-5 h-60 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all">
        <div
          className={`${iconBg} w-12 h-12 rounded-xl flex items-center justify-center mb-4`}
        >
          <Icon className={iconColor} size={24} />
        </div>

        <h2 className="text-lg font-semibold mb-2">{title}</h2>

        <p className="text-gray-600 text-sm mb-3">{description}</p>

        <span className="text-blue-600 text-sm font-medium">
          Open Calculator →
        </span>
      </div>
    </Link>
  );
}
