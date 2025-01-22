import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface RecentExpense {
  id: string;
  title: string;
  amount: number;
  category: string;
  date: Date;
}

export async function GET(): Promise<NextResponse<RecentExpense[]>> {
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

    const expenses: RecentExpense[] = await prisma.expense.findMany({
      where: {
        budget: {
          userId: session.user.id,
        },
      },
      select: {
        id: true,
        title: true,
        amount: true,
        category: true,
        date: true,
      },
      orderBy: {
        date: "desc",
      },
      take: 5,
    });

    return NextResponse.json(expenses);
  } catch (error) {
    console.error("[RECENT_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
