"use client";

import { FC } from "react";
import { CalendarIcon, TagIcon } from "@heroicons/react/24/outline";

interface Transaction {
  id: string;
  title: string;
  amount: number;
  date: string;
  category: string;
}

interface RecentTransactionsProps {
  transactions: Transaction[];
}

const RecentTransactionsList: FC<RecentTransactionsProps> = ({
  transactions,
}) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">
        Recent Transactions
      </h2>
      <div className="space-y-4">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-4 border border-gray-100 transition-all duration-200 hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-start space-x-4">
                <div
                  className={`p-2 rounded-lg ${
                    transaction.amount > 0
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-rose-100 text-rose-700"
                  }`}
                >
                  <TagIcon className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    {transaction.title}
                  </p>
                  <div className="flex items-center mt-1 text-sm text-gray-500">
                    <CalendarIcon className="w-4 h-4 mr-1" />
                    {new Date(transaction.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                    <span className="mx-2">•</span>
                    <span className="capitalize">{transaction.category}</span>
                  </div>
                </div>
              </div>
              <p
                className={`text-lg font-semibold ${
                  transaction.amount > 0 ? "text-emerald-600" : "text-rose-600"
                }`}
              >
                {transaction.amount > 0 ? "+" : "-"}$
                {Math.abs(transaction.amount).toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentTransactionsList;
