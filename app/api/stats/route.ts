import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface Budget {
  amount: number;
}

interface Expense {
  amount: number;
}

interface StatsData {
  totalBudget: number;
  totalExpenses: number;
  remainingBudget: number;
}

export async function GET(): Promise<NextResponse<StatsData>> {
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

    const budgets: Budget[] = await prisma.budget.findMany({
      where: {
        userId: session.user.id,
      },
      select: {
        amount: true,
      },
    });

    const expenses: Expense[] = await prisma.expense.findMany({
      where: {
        budget: {
          userId: session.user.id,
        },
      },
      select: {
        amount: true,
      },
    });

    const totalBudget = budgets.reduce(
      (acc: number, budget: Budget) => acc + budget.amount,
      0
    );
    const totalExpenses = expenses.reduce(
      (acc: number, expense: Expense) => acc + expense.amount,
      0
    );

    return NextResponse.json({
      totalBudget,
      totalExpenses,
      remainingBudget: totalBudget - totalExpenses,
    });
  } catch (error) {
    console.error("[STATS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
