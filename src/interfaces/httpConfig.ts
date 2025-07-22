import type { BaseModel } from "./ModelsInterfaces";

export interface PagedData<T extends BaseModel>{
    data: T[]
    page: number
    total: number
}