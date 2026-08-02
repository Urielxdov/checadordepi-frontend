import { ATTENDANCEURL } from "../utils/APIurls";
import { formatApiMessage } from "./apiErrors";

export type AttendanceStatus = "success" | "duplicate" | "not_found" | "error";

interface AttendancePayload {
    controlNumber?: string
    name?: string
    lastName?: string
    type?: "ENTRY" | "EXIT"
    score?: number
}

export interface AttendanceResult {
    status: AttendanceStatus
    message: string
    student?: AttendancePayload
}

export async function checkAttendance(img: Blob): Promise<AttendanceResult> {
    const data = new FormData();
    data.append("file", img, 'face.jpg');

    try {
        const response = await fetch(ATTENDANCEURL, {
            method: 'POST',
            mode: 'cors',
            body: data
        });

        let message = "";
        let student: AttendancePayload | undefined;
        try {
            const payload = await response.json();
            message = formatApiMessage(payload, "");
            student = payload?.data;
        } catch {
            message = "";
        }

        if (response.status === 201) {
            const studentName = [student?.name, student?.lastName].filter(Boolean).join(" ");
            const action = student?.type === "EXIT" ? "Salida registrada" : "Asistencia registrada";
            const successMessage = student?.controlNumber
                ? `${action} para el alumno ${studentName || "sin nombre"} con numero de control ${student.controlNumber}.`
                : message || "Entrada registrada con exito. Puede ingresar al plantel.";
            return { status: "success", message: successMessage, student };
        }
        if (response.status === 409) {
            return { status: "duplicate", message: message || "Tu asistencia de hoy ya fue marcada anteriormente." };
        }
        if (response.status === 404) {
            return { status: "not_found", message: message || "No se pudo identificar al alumno. Intentalo de nuevo." };
        }
        return { status: "error", message: message || "No se pudo registrar la asistencia. Intentalo de nuevo." };
    } catch {
        return { status: "error", message: "No se pudo conectar con el servicio de asistencia." };
    }
}
