import { db } from "@/db/indext";
import { userTable } from "@/db/schema/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const result = await db
      .select()
      .from(userTable)
      .where(eq(userTable.email, body.email));
    if (result.length > 0) {
      const user = result[0];
      const passwordMatch = user.password == body.password;
      if (passwordMatch) {
        return NextResponse.json(
          { message: "User Successfully Log in", user },
          { status: 200 }
        );
      } else {
        throw new Error("Invalid Email or Password");
      }
    } else {
      throw new Error("Invalid Email or Password");
    }
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
};
