import { useQuery } from '@tanstack/react-query'
import { useAuthStore } from '../../store/authStore'
import { getActiveStudents, getStudent } from '../../services/studentsService'

export function useStudents(page: number) {
    const { token } = useAuthStore()
    return useQuery({
        queryKey: ['students', page],
        queryFn: () => getActiveStudents(page, token),
        enabled: !!token,
    })
}

export function useStudent(id: string) {
    const { token } = useAuthStore()
    return useQuery({
        queryKey: ['students', id],
        queryFn: () => getStudent(id, token),
        enabled: !!token && !!id,
    })
}
