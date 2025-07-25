// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function fetcher<T = any>(url: string): Promise<T> {
    const res = await fetch(url);
    const json = await res.json();

    if (!res.ok || json.success === false) {
        throw new Error(json.error || 'Failed to fetch');
    }

    return json as T;
}
