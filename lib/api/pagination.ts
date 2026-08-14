export interface PaginationParams {
  page?: number;
  limit?: number;
}

export function getPagination({
  page = 1,
  limit = 10,
}: PaginationParams) {
  const currentPage = Math.max(1, Number(page));
  const perPage = Math.max(1, Math.min(100, Number(limit)));

  return {
    page: currentPage,
    limit: perPage,
    skip: (currentPage - 1) * perPage,
  };
}