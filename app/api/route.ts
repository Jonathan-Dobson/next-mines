import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/nextAuth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);
  console.log(session)
  return NextResponse.json({ id: 123 });
  // if (session) {
  //   return NextResponse.redirect("/dashboard");
  // }
  // return NextResponse.redirect("/auth/signin");
}