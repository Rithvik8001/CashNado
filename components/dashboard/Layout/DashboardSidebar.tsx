"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  WalletIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";

const navigation = [
  { name: "Overview", href: "/dashboard", icon: HomeIcon },
  { name: "Budgets", href: "/dashboard/budgets", icon: WalletIcon },
  { name: "Expenses", href: "/dashboard/expenses", icon: ChartBarIcon },
];

const DashboardSidebar = () => {
  const pathname = usePathname();

  return (
    <div className="flex h-16 border-b border-gray-100 bg-white">
      <nav className="flex-1 flex items-center justify-center px-4 space-x-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`
                flex items-center px-3 py-2 text-sm font-medium rounded-lg
                transition-all duration-200
                ${
                  isActive
                    ? "bg-indigo-50 text-indigo-600"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }
              `}
            >
              <item.icon
                className={`
                  h-5 w-5 flex-shrink-0
                  ${
                    isActive
                      ? "text-indigo-600"
                      : "text-gray-400 group-hover:text-gray-500"
                  }
                `}
                aria-hidden="true"
              />
              <span className="ml-2">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default DashboardSidebar;
