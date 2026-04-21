import { NextResponse } from "next/server";
export const runtime = "nodejs";

export async function POST() {
  const res = NextResponse.json({ status: "success" });
  res.cookies.set({
    name: "auth_session",
    value: "",
    path: "/",
    maxAge: 0,
  });
  return res;
}
