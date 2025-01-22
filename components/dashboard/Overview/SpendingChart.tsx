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
  chartData: {
    labels: string[];
    expenses: number[];
  };
}

export default function SpendingChart({
  className,
  chartData,
}: SpendingChartProps) {
  const [lineChartData, setLineChartData] = useState<ChartData<"line">>({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    setLineChartData({
      labels: chartData.labels,
      datasets: [
        {
          label: "Daily Spending",
          data: chartData.expenses,
          borderColor: "rgb(75, 192, 192)",
          backgroundColor: "rgba(75, 192, 192, 0.5)",
          tension: 0.4,
        },
      ],
    });
  }, [chartData]);

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

  return (
    <Card className={className}>
      <div className="h-[350px] p-6">
        <Line options={options} data={lineChartData} />
      </div>
    </Card>
  );
}
