import type { FieldConfig } from "./Fields";

export type FieldErrors = Record<string, string>;

const backendFieldMap: Record<string, string> = {
    numero_control: "id",
    clave_profesor: "id",
    clave_programa: "id",
    nombre_alumno: "nombre",
    nombre_profesor: "nombre",
    nombre_programa: "nombre",
    apellido_alumno: "apellidos",
    apellido_profesor: "apellidos",
    telefono_alumno: "telefono",
    telefono_profesor: "telefono",
    correo_alumno: "correo",
    correo_profesor: "correo",
    calle_alumno: "calle",
    colonia_alumno: "colonia",
    grado_maximo: "grado",
    nombre_grado_maximo: "nombre_grado",
    registro_conahcyt: "registro"
};

export function validateCreateForm(fields: FieldConfig[], values: Record<string, unknown>, module: string): FieldErrors {
    const errors: FieldErrors = {};

    fields.forEach((field) => {
        const error = validateField(field, values[field.name]);
        if (error) errors[field.name] = error;
    });

    if (module === "Alumno") {
        if (!isSelected(values.profesor)) errors.profesor = "Selecciona un profesor.";
        if (!isSelected(values.programa)) errors.programa = "Selecciona un programa de estudios.";
    }

    return errors;
}

export function validateCreateField(fields: FieldConfig[], module: string, field: string, value: unknown): string {
    const fieldConfig = fields.find((current) => current.name === field);
    if (fieldConfig) return validateField(fieldConfig, value);

    if (module === "Alumno" && (field === "profesor" || field === "programa")) {
        return isSelected(value)
            ? ""
            : field === "profesor"
                ? "Selecciona un profesor."
                : "Selecciona un programa de estudios.";
    }

    return "";
}

export function mapBackendFieldErrors(fields: Record<string, string>): FieldErrors {
    return Object.fromEntries(
        Object.entries(fields).map(([field, message]) => [backendFieldMap[field] ?? field, message])
    );
}

export function removeFieldError(errors: FieldErrors, field: string): FieldErrors {
    if (!errors[field]) return errors;

    const next = { ...errors };
    delete next[field];
    return next;
}

export function setFieldError(errors: FieldErrors, field: string, message: string): FieldErrors {
    if (!message) return removeFieldError(errors, field);
    return { ...errors, [field]: message };
}

function validateField(field: FieldConfig, value: unknown): string {
    const label = field.label.replace(/\s*:\s*$/, "");

    if (field.type === "file") {
        return value instanceof File ? "" : `${label} es obligatorio.`;
    }

    const text = String(value ?? "").trim();
    if (!text) return `${label} es obligatorio.`;

    if (field.minlength && text.length < field.minlength) {
        return `${label} debe tener al menos ${field.minlength} caracteres.`;
    }

    if (field.maxlength && text.length > field.maxlength) {
        return `${label} no debe superar ${field.maxlength} caracteres.`;
    }

    if (field.name === "telefono" && !/^\d{10,12}$/.test(text)) {
        return "El telefono debe contener solo numeros y tener entre 10 y 12 digitos.";
    }

    if (field.name === "correo" && !/^[a-zA-Z0-9._%+-]+@leon\.tecnm\.mx$/.test(text)) {
        return "El correo debe ser institucional y terminar en @leon.tecnm.mx.";
    }

    return "";
}

function isSelected(value: unknown): boolean {
    return typeof value === "string" && value.trim() !== "" && value !== "default";
}
