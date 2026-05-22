import { NextResponse } from "next/server";

export const GET = () =>
  NextResponse.json({
    status: "ok",
    service: "web",
    version: "0.1.0",
  });
