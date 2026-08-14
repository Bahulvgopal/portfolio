interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export async function api<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers ?? {}),
    },
    cache: "no-store",
  });

  const result: ApiResponse<T> = await res.json();

  if (!res.ok || !result.success) {
    throw new Error(result.message || "Request failed");
  }

  return result.data;
}