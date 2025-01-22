import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Expense } from "@prisma/client";

export async function GET() {
  try {
    const supabase = createRouteHandlerClient({
      cookies: cookies,
    });

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const expenses = await prisma.expense.findMany({
      where: {
        budget: {
          userId: session.user.id,
        },
        date: {
          gte: sevenDaysAgo,
        },
      },
      orderBy: {
        date: "asc",
      },
    });

    const dailyExpenses = new Map<string, number>();
    const labels: string[] = [];
    const data: number[] = [];

    // Initialize the last 7 days with 0
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split("T")[0];
      dailyExpenses.set(dateStr, 0);
    }

    // Sum expenses by date
    expenses.forEach((expense) => {
      const dateStr = new Date(expense.date).toISOString().split("T")[0];
      if (dailyExpenses.has(dateStr)) {
        dailyExpenses.set(
          dateStr,
          dailyExpenses.get(dateStr)! + expense.amount
        );
      }
    });

    // Convert to arrays for chart.js
    Array.from(dailyExpenses.entries())
      .sort((a, b) => a[0].localeCompare(b[0]))
      .forEach(([date, amount]) => {
        labels.push(new Date(date).toLocaleDateString());
        data.push(amount);
      });

    return NextResponse.json({
      labels,
      expenses: data,
    });
  } catch (error) {
    console.error("Error in /api/expenses/chart:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
