"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/supabase";
import { useRouter } from "next/navigation";
import { useUser } from "@/lib/store/user";
import OverviewStats from "@/components/dashboard/Overview/OverviewStats";
import RecentTransactionsList from "@/components/dashboard/Overview/RecentTransactionsList";
import SpendingChart from "@/components/dashboard/Overview/SpendingChart";

interface DashboardData {
  stats: {
    totalBudget: number;
    totalExpenses: number;
    remainingBudget: number;
  };
  chartData: {
    labels: string[];
    expenses: number[];
  };
  transactions: Array<{
    id: string;
    title: string;
    amount: number;
    date: string;
    category: string;
  }>;
}

const Dashboard = () => {
  const router = useRouter();
  const supabase = createClient();
  const setUser = useUser((state) => state.setUser);
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    stats: {
      totalBudget: 0,
      totalExpenses: 0,
      remainingBudget: 0,
    },
    chartData: {
      labels: [],
      expenses: [],
    },
    transactions: [],
  });

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        router.push("/sign-in");
      } else {
        setUser(session.user);
        await checkBudgets(session.user.id);
      }
    };

    const checkBudgets = async (userId: string) => {
      try {
        const { data: budgets } = await supabase
          .from("budgets")
          .select("id")
          .eq("userId", userId);

        if (!budgets || budgets.length === 0) {
          router.push("/dashboard/budgets");
          return;
        }

        await fetchDashboardData();
      } catch (error) {
        console.error("Error checking budgets:", error);
        router.push("/dashboard/budgets");
      }
    };

    const fetchDashboardData = async () => {
      try {
        const [statsRes, chartRes, transactionsRes] = await Promise.all([
          fetch("/api/stats"),
          fetch("/api/expenses/chart"),
          fetch("/api/expenses/recent"),
        ]);

        const [stats, chartData, transactions] = await Promise.all([
          statsRes.json(),
          chartRes.json(),
          transactionsRes.json(),
        ]);

        setDashboardData({
          stats,
          chartData,
          transactions,
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    checkUser();
  }, [router, supabase, setUser]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">
            Track your spending and manage your budget
          </p>
        </div>

        <OverviewStats stats={dashboardData.stats} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SpendingChart chartData={dashboardData.chartData} />
          <RecentTransactionsList transactions={dashboardData.transactions} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
