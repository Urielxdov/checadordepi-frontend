import type { AlumnoConfig, ProfesorConfig, ProgramaConfig } from "./ModelsInterfaces"

export interface DeleteParameters {
    module: string
    headers: Array<string>
    entity: AlumnoConfig | ProfesorConfig | ProgramaConfig | undefined
    onSearch: (s: string) => void | ((s: number) => void)
    onDelete: () => void
}



export interface UpdateParameters {
    module: string,
    entity: AlumnoConfig | ProfesorConfig | ProgramaConfig | undefined
    headers: Array<string>,
    onSearch: (s: string) => void | ((s: number) => void)
    onUpdate: (data: Array<string>) => void
}