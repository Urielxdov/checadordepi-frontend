import { useQuery } from '@tanstack/react-query'
import { useAuthStore } from '../../store/authStore'
import { getActiveTeachers, getTeacherSelect } from '../../services/teacherService'

export function useTeachers(page: number) {
    const { token } = useAuthStore()
    return useQuery({
        queryKey: ['teachers', page],
        queryFn: () => getActiveTeachers(page, token),
        enabled: !!token,
    })
}

export function useTeachersSelect() {
    const { token } = useAuthStore()
    return useQuery({
        queryKey: ['teachers', 'select'],
        queryFn: () => getTeacherSelect(token),
        enabled: !!token,
        staleTime: 1000 * 60 * 10,
    })
}
