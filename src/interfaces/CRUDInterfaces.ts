import { type FieldConfig } from "./componentConfig"
import type { SelectItem } from "./httpConfig"
import type { BaseModel } from "./ModelsInterfaces"

export interface IndexParameters {
    headers: Array<string>,
    data: Array<any>
}

export interface DeleteParameters {
    module: string
    headers: Array<string>
    entity: BaseModel | undefined
    all: BaseModel[]
    onSearch: (s:string) => void
    onDelete: (id:string) => void
}

export interface CreateParameters {
    module: string
    fields: Array<FieldConfig>
    itemsPf?: Array<SelectItem>
    itemsPr?: Array<SelectItem>
    selectPf?: string,
    selectPr?: string,
    onChange: (key: string, value: any) => void
    onSubmit: () => void
}

export interface UpdateParameters {
    module: string,
    entity: BaseModel | undefined
    all: BaseModel[]
    headers: Array<string>
    onSearch: (s:string) => void
    onUpdate: (updated: BaseModel) => void
}