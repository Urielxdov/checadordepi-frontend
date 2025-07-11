import { type FieldProps } from "./componentConfig"
import type { AlumnoConfig, ProfesorConfig, ProgramaConfig } from "./ModelsInterfaces"

export interface IndexParameters {
    headers: Array<string>,
    data: Array<any>
}

export interface DeleteParameters {
    module: string
    headers: Array<string>
    entity: AlumnoConfig | ProfesorConfig | ProgramaConfig | undefined
    onSearch: (s:string) => void | ((s: number) => void)
    onDelete: () => void
}

export interface CreateParameters {
    module: string
    fields: Array<FieldProps>
    onSubmit: (data: FormData) => void
}

export interface UpdateParameters {
    module: string,
    entity: AlumnoConfig | ProfesorConfig | ProgramaConfig | undefined
    headers: Array<string>,
    onSearch: (s:string) => void | ((s: number) => void)
    onUpdate: (data: Array<string>) => void
}