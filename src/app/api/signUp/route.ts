import { NextResponse, NextRequest } from "next/server";
import { db } from "@/db/indext";
import { userTable } from "@/db/schema/schema";
export const POST = async (req: NextRequest) => {
  try {
    let body = await req.json();
    const user = await db.insert(userTable).values(body).returning();
    return NextResponse.json({ message: "User Added Successfully" });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Email Alredy Exist" },
      { status: 400 }
    );
  }
};
