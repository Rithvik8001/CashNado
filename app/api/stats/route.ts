import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import type { Budget, Expense } from "@prisma/client/edge";

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

    const budgets = await prisma.budget.findMany({
      where: {
        userId: session.user.id,
      },
    });

    const expenses = await prisma.expense.findMany({
      where: {
        budget: {
          userId: session.user.id,
        },
      },
    });

    const totalBudget = budgets.reduce(
      (acc: number, budget: Budget) => acc + (budget?.amount ?? 0),
      0
    );
    const totalExpenses = expenses.reduce(
      (acc: number, expense: Expense) => acc + (expense?.amount ?? 0),
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
