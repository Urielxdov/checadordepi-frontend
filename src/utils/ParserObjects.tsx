import type React from "react";

export function parseObjectToRow<T extends Record<string, any>>(obj: T, editable:boolean=false): React.ReactNode[] {
    return Object.entries(obj).map(([key, value]) => (
        <p contentEditable={editable} key={key}>
            {typeof value === "object" && value !== null
                ? value instanceof File
                    ? value.name
                    : JSON.stringify(value)
                : value?.toString() ?? '-'
            }
        </p>
    ))
}