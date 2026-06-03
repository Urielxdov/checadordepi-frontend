import { useMutation } from '@tanstack/react-query'
import { useAuthStore } from '../../store/authStore'
import { queryClient } from '../../lib/queryClient'
import { createStudent, updateStudentA, deleteStudentA } from '../../services/studentsService'
import type { AlumnoModel } from '../../interfaces/Models'

export function useCreateStudent() {
    const { token } = useAuthStore()
    return useMutation({
        mutationFn: ({ student, foto }: { student: AlumnoModel; foto: File }) =>
            createStudent(student, foto, token),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['students'] }),
    })
}

export function useUpdateStudent() {
    const { token } = useAuthStore()
    return useMutation({
        mutationFn: ({ student, foto }: { student: AlumnoModel; foto?: File }) =>
            updateStudentA(student, foto, token),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['students'] }),
    })
}

export function useDeleteStudent() {
    const { token } = useAuthStore()
    return useMutation({
        mutationFn: (id: string) => deleteStudentA(id, token),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['students'] }),
    })
}
