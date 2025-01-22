"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  type ChartData,
  type ChartOptions,
  type TooltipItem,
  type ScriptableContext,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface SpendingChartProps {
  className?: string;
}

interface ChartResponse {
  labels: string[];
  expenses: number[];
}

export default function SpendingChart({ className }: SpendingChartProps) {
  const [chartData, setChartData] = useState<ChartData<"line">>({
    labels: [],
    datasets: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await fetch("/api/expenses/chart");
        if (!response.ok) {
          throw new Error("Failed to fetch chart data");
        }
        const data: ChartResponse = await response.json();

        setChartData({
          labels: data.labels,
          datasets: [
            {
              label: "Daily Spending",
              data: data.expenses,
              borderColor: "rgb(75, 192, 192)",
              backgroundColor: "rgba(75, 192, 192, 0.5)",
              tension: 0.4,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching chart data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchChartData();
  }, []);

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: "rgb(156 163 175)",
          font: {
            size: 12,
          },
        },
      },
      title: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgb(31 41 55)",
        titleFont: {
          size: 13,
        },
        bodyFont: {
          size: 12,
        },
        padding: 10,
        cornerRadius: 4,
        displayColors: false,
        callbacks: {
          label: function (context: TooltipItem<"line">) {
            if (typeof context.raw === "number") {
              return `$${context.raw.toFixed(2)}`;
            }
            return "";
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgb(31 41 55 / 0.1)",
        },
        ticks: {
          color: "rgb(156 163 175)",
          callback: function (value: number | string) {
            const numValue =
              typeof value === "string" ? parseFloat(value) : value;
            return `$${numValue.toFixed(2)}`;
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "rgb(156 163 175)",
          maxRotation: 45,
          minRotation: 45,
        },
      },
    },
  };

  if (isLoading) {
    return (
      <Card className={className}>
        <Skeleton className="h-[350px] w-full" />
      </Card>
    );
  }

  return (
    <Card className={className}>
      <div className="h-[350px] p-6">
        <Line options={options} data={chartData} />
      </div>
    </Card>
  );
}
