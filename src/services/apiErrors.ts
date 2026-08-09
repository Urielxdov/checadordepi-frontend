import type { OperationResponse } from "../interfaces/httpModels";

type ApiFields = Record<string, unknown>;

export class ApiRequestError extends Error {
    fields: Record<string, string>;
    status: number;

    constructor(message: string, fields: Record<string, string> = {}, status = 0) {
        super(message);
        this.name = "ApiRequestError";
        this.fields = fields;
        this.status = status;
    }
}

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
    const fields = formatFields(getApiFields(payload));
    return fields ? `${message}\n${fields}` : message;
}

export async function apiError(response: Response, fallback: string): Promise<Error> {
    try {
        const payload = await response.json() as Partial<OperationResponse<unknown>>;
        return new ApiRequestError(formatApiMessage(payload, fallback), getApiFields(payload), response.status);
    } catch {
        return new ApiRequestError(`${fallback} (${response.status})`, {}, response.status);
    }
}

export function errorMessage(error: unknown, fallback: string): string {
    return error instanceof Error && error.message ? error.message : fallback;
}

export function getErrorFields(error: unknown): Record<string, string> {
    return error instanceof ApiRequestError ? error.fields : {};
}

function getApiFields(payload: Partial<OperationResponse<unknown>> | null | undefined): Record<string, string> {
    const source = payload?.fields ?? payload?.data;
    if (!source || typeof source !== "object" || Array.isArray(source)) return {};

    return Object.fromEntries(
        Object.entries(source as ApiFields)
            .filter(([, value]) => value !== null && value !== undefined)
            .map(([field, value]) => [field, String(value)])
    );
}
