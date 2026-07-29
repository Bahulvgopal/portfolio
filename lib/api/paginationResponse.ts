import { NextResponse } from "next/server";

interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
}

export function paginated<T>(
  data: T[],
  meta: PaginationMeta
) {
  return NextResponse.json({
    success: true,
    data,
    pagination: {
      ...meta,
      totalPages: Math.ceil(meta.total / meta.limit),
    },
  });
}