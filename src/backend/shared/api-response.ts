import { NextResponse } from "next/server";

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  meta?: {
    total?: number;
    timestamp: string;
  };
}

export function successResponse<T>(data: T, total?: number, status: number = 200) {
  return NextResponse.json(
    {
      success: true,
      data,
      meta: {
        total: total ?? (Array.isArray(data) ? data.length : 1),
        timestamp: new Date().toISOString(),
      },
    },
    { status }
  );
}

export function errorResponse(message: string, status: number = 400) {
  return NextResponse.json(
    {
      success: false,
      error: message,
      meta: {
        timestamp: new Date().toISOString(),
      },
    },
    { status }
  );
}
