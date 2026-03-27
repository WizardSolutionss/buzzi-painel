const BASE_URL = process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://buzzi-backend-production.up.railway.app"

async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            ...options?.headers,
        },
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({ message: "Erro desconhecido" }));
        throw new Error(error.message || `Erro ${response.status}: ${response.statusText}`);
    }

    if (response.status === 204) {
        return {} as T;
    }

    return response.json();
}

export const api = {
    get: <T>(endpoint: string) => request<T>(endpoint, { method: "GET" }),
    post: <T>(endpoint: string, data: unknown) => request<T>(endpoint, { method: "POST", body: JSON.stringify(data) }),
    patch: <T>(endpoint: string, data: unknown) => request<T>(endpoint, { method: "PATCH", body: JSON.stringify(data) }),
    delete: <T>(endpoint: string) => request<T>(endpoint, { method: "DELETE" }),
};