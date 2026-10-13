const API_URL = process.env.NEXT_PUBLIC_API_URL

if (!API_URL) {
  throw new Error("A variável NEXT_PUBLIC_API_URL não foi configurada")
}

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  })

  const data = await response.json().catch(() => null)

  if (!response.ok) {
    throw new Error(
      data?.message ?? data?.error ?? "Ocorreu um erro na requisição",
    )
  }

  return data as T
}
