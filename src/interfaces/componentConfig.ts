export interface FieldProps {
    label: string
    name: string
    type: string
    maxlength?: number
    minlength?: number
    value: any
    catch: (value:any) => void
}

export interface ModalConfig {
    title: string
    message: string
    type: string
}