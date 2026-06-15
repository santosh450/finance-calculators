import { Link } from "react-router-dom";

interface Props {
  title: string;
  icon: string;
  color: string;
  count: number;
}

export default function CategoryCard({ title, icon, color, count }: Props) {
  return (
    <Link
      to={`/calculators?category=${title}`}
      className="
        group
        border
        rounded-2xl
        p-6
        bg-white
        hover:shadow-lg
        hover:-translate-y-1
        transition-all
        duration-300
        text-center
      "
    >
      <div
        className={`${color} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4`}
      >
        {icon}
      </div>

      <h3 className="text-xl font-semibold group-hover:text-blue-600">
        {title}
      </h3>

      <p className="text-gray-500 mt-2">
        {count} Calculator{count > 1 ? "s" : ""}
      </p>
    </Link>
  );
}
