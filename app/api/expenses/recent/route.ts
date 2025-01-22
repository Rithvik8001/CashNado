import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

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

    const expenses = await prisma.expense.findMany({
      where: {
        budget: {
          userId: session.user.id,
        },
      },
      orderBy: {
        date: "desc",
      },
      take: 5,
    });

    return NextResponse.json(expenses);
  } catch (error) {
    console.error("Error in /api/expenses/recent:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
