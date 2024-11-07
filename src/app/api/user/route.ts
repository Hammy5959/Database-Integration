import { NextResponse, NextRequest } from "next/server";
import { db } from "@/db/indext";
import { userTable } from "@/db/schema/schema";
export const POST = async (req: NextRequest) => {
  try {
    let body = await req.json();
    const user = await db.insert(userTable).values(body).returning();
    console.log("Data Recived From Post Api", body);
    if (!body.email || body.password) {
      return NextResponse.json({ message: "Input Fields Required", user });
    } else {
      return NextResponse.json({ message: "Data OK" });
    }
  } catch (error) {
    console.log("error from Post Api", error);
  }
};
