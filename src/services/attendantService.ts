import { ATTENDANCEURL } from "../utils/APIurls";

export type AttendanceResult = "success" | "duplicate" | "error";

export async function checkAttendance(img: Blob): Promise<AttendanceResult> {
    const data = new FormData();
    data.append("file", img, 'face.jpg');

    try {
        const response = await fetch(ATTENDANCEURL, {
            method: 'POST',
            mode: 'cors',
            body: data
        });

        if (response.status === 201) return "success";
        if (response.status === 409) return "duplicate";
        return "error";
    } catch {
        return "error";
    }
}
