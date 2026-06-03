import { useQuery } from '@tanstack/react-query'
import { useAuthStore } from '../../store/authStore'
import { getActivePrograms, getProgramSelect } from '../../services/programService'

export function usePrograms(page: number) {
    const { token } = useAuthStore()
    return useQuery({
        queryKey: ['programs', page],
        queryFn: () => getActivePrograms(page, token),
        enabled: !!token,
    })
}

export function useProgramsSelect() {
    const { token } = useAuthStore()
    return useQuery({
        queryKey: ['programs', 'select'],
        queryFn: () => getProgramSelect(token),
        enabled: !!token,
        staleTime: 1000 * 60 * 10,
    })
}
