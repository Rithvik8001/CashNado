"use client";

import { FC } from "react";
import {
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  BanknotesIcon,
} from "@heroicons/react/24/outline";

interface Stats {
  totalBudget: number;
  totalExpenses: number;
  remainingBudget: number;
}

interface Props {
  stats: Stats;
}

const OverviewStats: FC<Props> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 shadow-sm border border-emerald-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-emerald-600">Total Budget</p>
            <p className="mt-2 text-3xl font-bold text-emerald-700">
              $
              {stats.totalBudget.toLocaleString("en-US", {
                minimumFractionDigits: 2,
              })}
            </p>
          </div>
          <div className="bg-emerald-100 p-3 rounded-xl">
            <BanknotesIcon className="w-8 h-8 text-emerald-600" />
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-rose-50 to-red-50 rounded-2xl p-6 shadow-sm border border-rose-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-rose-600">Total Expenses</p>
            <p className="mt-2 text-3xl font-bold text-rose-700">
              $
              {stats.totalExpenses.toLocaleString("en-US", {
                minimumFractionDigits: 2,
              })}
            </p>
          </div>
          <div className="bg-rose-100 p-3 rounded-xl">
            <ArrowTrendingDownIcon className="w-8 h-8 text-rose-600" />
          </div>
        </div>
      </div>

      <div
        className={`bg-gradient-to-br rounded-2xl p-6 shadow-sm border ${
          stats.remainingBudget >= 0
            ? "from-blue-50 to-indigo-50 border-blue-100"
            : "from-orange-50 to-red-50 border-orange-100"
        }`}
      >
        <div className="flex items-center justify-between">
          <div>
            <p
              className={`text-sm font-medium ${
                stats.remainingBudget >= 0 ? "text-blue-600" : "text-orange-600"
              }`}
            >
              Remaining Budget
            </p>
            <p
              className={`mt-2 text-3xl font-bold ${
                stats.remainingBudget >= 0 ? "text-blue-700" : "text-orange-700"
              }`}
            >
              $
              {Math.abs(stats.remainingBudget).toLocaleString("en-US", {
                minimumFractionDigits: 2,
              })}
            </p>
          </div>
          <div
            className={`p-3 rounded-xl ${
              stats.remainingBudget >= 0 ? "bg-blue-100" : "bg-orange-100"
            }`}
          >
            <ArrowTrendingUpIcon
              className={`w-8 h-8 ${
                stats.remainingBudget >= 0 ? "text-blue-600" : "text-orange-600"
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewStats;
