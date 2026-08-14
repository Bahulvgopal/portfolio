import { NextResponse } from "next/server";

export function success<T>(data: T, status = 200) {
  return NextResponse.json(
    {
      success: true,
      data,
    },
    { status }
  );
}

export function created<T>(data: T) {
  return NextResponse.json(
    {
      success: true,
      data,
    },
    { status: 201 }
  );
}

export function message(message: string, status = 200) {
  return NextResponse.json(
    {
      success: true,
      message,
    },
    { status }
  );
}