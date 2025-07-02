// components/Breadcrumb.js
import Link from "next/link";

const Breadcrumb = ({ items }) => {
  return (
    <nav className="bg-gray-50 py-3 px-4">
      <div className="container mx-auto max-w-6xl">
        <ol className="flex items-center space-x-2 text-sm text-gray-600">
          <li>
            <Link href="/" className="hover:text-emerald-600 transition-colors">
              Home
            </Link>
          </li>
          {items.map((item, index) => (
            <li key={index} className="flex items-center space-x-2">
              <span className="text-gray-400">/</span>
              {item.href ? (
                <Link
                  href={item.href}
                  className="hover:text-emerald-600 transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-gray-800 font-medium">{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumb;
