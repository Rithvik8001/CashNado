import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { type Prisma } from "@prisma/client";

type ChartExpense = Pick<Prisma.ExpenseGetPayload<{}>, "id" | "amount"> & {
  date: Date;
};

export async function GET(): Promise<NextResponse> {
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

    const expenses = (await prisma.expense.findMany({
      select: {
        id: true,
        amount: true,
        date: true,
      },
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
    })) as ChartExpense[];

    const dailyExpenses = new Map<string, number>();
    const labels: string[] = [];
    const data: number[] = [];

    // Initialize the last 7 days with 0
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split("T")[0];
      dailyExpenses.set(dateStr, 0);
      labels.push(dateStr);
    }

    // Sum up expenses by date
    expenses.forEach((expense) => {
      const dateStr = expense.date.toISOString().split("T")[0];
      const currentAmount = dailyExpenses.get(dateStr) || 0;
      dailyExpenses.set(dateStr, currentAmount + expense.amount);
    });

    // Fill the data array in the same order as labels
    labels.forEach((label) => {
      data.push(dailyExpenses.get(label) || 0);
    });

    return NextResponse.json({
      labels,
      expenses: data,
    });
  } catch (error) {
    console.error("[CHART_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
