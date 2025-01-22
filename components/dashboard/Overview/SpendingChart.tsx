"use client";

import { FC } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ChartData {
  labels: string[];
  expenses: number[];
}

interface Props {
  chartData: ChartData;
}

const SpendingChart: FC<Props> = ({ chartData }) => {
  const data = {
    labels: chartData.labels,
    datasets: [
      {
        label: "Daily Spending",
        data: chartData.expenses,
        borderColor: "rgb(99, 102, 241)",
        backgroundColor: "rgba(99, 102, 241, 0.1)",
        tension: 0.4,
        fill: true,
        pointStyle: "circle",
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: "rgb(99, 102, 241)",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgb(255, 255, 255)",
        titleColor: "rgb(17, 24, 39)",
        bodyColor: "rgb(17, 24, 39)",
        bodyFont: {
          size: 14,
        },
        padding: 12,
        borderColor: "rgb(229, 231, 235)",
        borderWidth: 1,
        displayColors: false,
        callbacks: {
          label: function (context) {
            return `$${context.parsed.y.toLocaleString("en-US", {
              minimumFractionDigits: 2,
            })}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 12,
          },
          color: "rgb(107, 114, 128)",
        },
      },
      y: {
        beginAtZero: true,
        border: {
          display: false,
        },
        grid: {
          color: "rgb(243, 244, 246)",
        },
        ticks: {
          font: {
            size: 12,
          },
          color: "rgb(107, 114, 128)",
          callback: function (value: any) {
            return `$${value.toLocaleString("en-US", {
              minimumFractionDigits: 2,
            })}`;
          },
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Spending Trend</h2>
        <div className="text-sm text-gray-500">Last 7 Days</div>
      </div>
      <div className="h-[300px]">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default SpendingChart;
