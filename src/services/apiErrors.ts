import type { OperationResponse } from "../interfaces/httpModels";

type ApiFields = Record<string, unknown>;

function formatFields(fields?: ApiFields | Object): string {
    if (!fields || typeof fields !== "object") return "";

    const entries = Object.entries(fields as ApiFields);
    if (entries.length === 0) return "";

    return entries
        .map(([field, message]) => `${field}: ${String(message)}`)
        .join("\n");
}

export function formatApiMessage(payload: Partial<OperationResponse<unknown>> | null | undefined, fallback: string): string {
    const message = payload?.message?.trim() || fallback;
    const fields = formatFields(payload?.fields);
    return fields ? `${message}\n${fields}` : message;
}

export async function apiError(response: Response, fallback: string): Promise<Error> {
    try {
        const payload = await response.json() as Partial<OperationResponse<unknown>>;
        return new Error(formatApiMessage(payload, fallback));
    } catch {
        return new Error(`${fallback} (${response.status})`);
    }
}

export function errorMessage(error: unknown, fallback: string): string {
    return error instanceof Error && error.message ? error.message : fallback;
}
