import { useMutation } from '@tanstack/react-query'
import { useAuthStore } from '../../store/authStore'
import { queryClient } from '../../lib/queryClient'
import { createTeacher, updateTeacherA, deleteTeacherA } from '../../services/teacherService'
import type { ProfesorModel } from '../../interfaces/Models'

export function useCreateTeacher() {
    const { token } = useAuthStore()
    return useMutation({
        mutationFn: (teacher: ProfesorModel) => createTeacher(teacher, token),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['teachers'] }),
    })
}

export function useUpdateTeacher() {
    const { token } = useAuthStore()
    return useMutation({
        mutationFn: (teacher: ProfesorModel) => updateTeacherA(teacher, token),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['teachers'] }),
    })
}

export function useDeleteTeacher() {
    const { token } = useAuthStore()
    return useMutation({
        mutationFn: (id: string) => deleteTeacherA(id, token),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['teachers'] }),
    })
}
