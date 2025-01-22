"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/supabase";
import { useRouter } from "next/navigation";
import { useUser } from "@/lib/store/user";
import { PlusIcon } from "@heroicons/react/24/outline";

interface Budget {
  id: string;
  name: string;
  amount: number;
  created_at: string;
}

const BudgetsPage = () => {
  const router = useRouter();
  const supabase = createClient();
  const setUser = useUser((state) => state.setUser);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [isAddingBudget, setIsAddingBudget] = useState(false);
  const [newBudget, setNewBudget] = useState({ name: "", amount: "" });

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        router.push("/sign-in");
      } else {
        setUser(session.user);
        await fetchBudgets(session.user.id);
      }
    };

    const fetchBudgets = async (userId: string) => {
      try {
        const { data: budgets } = await supabase
          .from("budgets")
          .select("*")
          .eq("userId", userId)
          .order("created_at", { ascending: false });

        setBudgets(budgets || []);
      } catch (error) {
        console.error("Error fetching budgets:", error);
      }
    };

    checkUser();
  }, [router, supabase, setUser]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) return;

      const { data, error } = await supabase.from("budgets").insert([
        {
          name: newBudget.name,
          amount: parseFloat(newBudget.amount),
          userId: session.user.id,
        },
      ]);

      if (error) throw error;

      router.push("/dashboard");
    } catch (error) {
      console.error("Error creating budget:", error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Budgets</h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage your budgets and track your spending limits
            </p>
          </div>
          <button
            onClick={() => setIsAddingBudget(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Add Budget
          </button>
        </div>

        {budgets.length === 0 && !isAddingBudget ? (
          <div className="text-center bg-white rounded-2xl p-12 shadow-sm border border-gray-100">
            <div className="bg-gray-50 rounded-lg inline-flex p-3 ring-4 ring-gray-50 ring-opacity-50 mb-4">
              <PlusIcon className="h-6 w-6 text-gray-400" />
            </div>
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No budgets
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Get started by creating a new budget
            </p>
            <div className="mt-6">
              <button
                onClick={() => setIsAddingBudget(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <PlusIcon className="h-5 w-5 mr-2" />
                Add Budget
              </button>
            </div>
          </div>
        ) : null}

        {isAddingBudget && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              Create New Budget
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Budget Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  value={newBudget.name}
                  onChange={(e) =>
                    setNewBudget({ ...newBudget, name: e.target.value })
                  }
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="e.g., Monthly Expenses"
                />
              </div>
              <div>
                <label
                  htmlFor="amount"
                  className="block text-sm font-medium text-gray-700"
                >
                  Amount ($)
                </label>
                <input
                  type="number"
                  name="amount"
                  id="amount"
                  required
                  min="0"
                  step="0.01"
                  value={newBudget.amount}
                  onChange={(e) =>
                    setNewBudget({ ...newBudget, amount: e.target.value })
                  }
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="0.00"
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsAddingBudget(false)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Create Budget
                </button>
              </div>
            </form>
          </div>
        )}

        {budgets.length > 0 && !isAddingBudget && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {budgets.map((budget) => (
              <div
                key={budget.id}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
              >
                <h3 className="text-lg font-medium text-gray-900">
                  {budget.name}
                </h3>
                <p className="mt-2 text-2xl font-semibold text-indigo-600">
                  $
                  {budget.amount.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                  })}
                </p>
                <p className="mt-2 text-sm text-gray-500">
                  Created on{" "}
                  {new Date(budget.created_at).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BudgetsPage;
