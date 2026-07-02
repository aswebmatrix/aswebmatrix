import { NextResponse } from "next/server";

export async function GET() {

  return NextResponse.json({
    message: "Backend API working"
  });

}


export async function POST(request) {

  const data = await request.json();

  return NextResponse.json({
    success: true,
    receivedData: data
  });

}