import { useMutation } from '@tanstack/react-query'
import { useAuthStore } from '../../store/authStore'
import { queryClient } from '../../lib/queryClient'
import { createProgram, updateProgramA, deleteProgramA } from '../../services/programService'
import type { ProgramaModel } from '../../interfaces/Models'

export function useCreateProgram() {
    const { token } = useAuthStore()
    return useMutation({
        mutationFn: (program: ProgramaModel) => createProgram(program, token),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['programs'] }),
    })
}

export function useUpdateProgram() {
    const { token } = useAuthStore()
    return useMutation({
        mutationFn: (program: ProgramaModel) => updateProgramA(program, token),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['programs'] }),
    })
}

export function useDeleteProgram() {
    const { token } = useAuthStore()
    return useMutation({
        mutationFn: (id: string) => deleteProgramA(id, token),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['programs'] }),
    })
}
