import type { AlumnoModel, LoginModel, ProfesorModel, ProgramaModel } from "../interfaces/Models"

export interface FieldConfig {
    label: string
    name: string
    type: string
    maxlength?: number
    minlength?: number
    value?: any
}

export const getFieldsAlu = (preset:AlumnoModel):Array<FieldConfig> => ([
         {
             label:"Numero de control",
             name:"id",
             type:"text",
             maxlength: 8,
             minlength: 8,
             value: preset.id
         },
         {
             label:"Nombre(s)",
             name:"nombre",
             type:"text",
             value: preset.nombre
         },
         {
             label:"Apellidos",
             name:"apellidos",
             type:"text",
             value: preset.apellidos
         },
         {
             label:"Telefono",
             name:"telefono",
             type:"tel",
             maxlength: 10,
             value: preset.telefono
         },
         {
             label:"Calle y numero",
             name:"calle",
             type:"text",
             value: preset.calle
         },
         {
             label:"Colonia",
             name:"colonia",
             type:"text",
             value: preset.colonia
         },
         {
             label:"Correo",
             name:"correo",
             type:"email",
             value: preset.correo
         },
         {
            label:"Foto (sin accesorios como lentes o gorras) :",
            name:"foto",
            type:"file",
         }
     ])

export const getFieldsProf = (preset: ProfesorModel):Array<FieldConfig> => ([
         {
             label:"clave",
             name:"id",
             type:"text",
             maxlength: 10,
             minlength: 10,
             value: preset.id
         },
         {
             label:"Nombre(s)",
             name:"nombre",
             type:"text",
             value: preset.nombre
         },
         {
             label:"Apellidos",
             name:"apellidos",
             type:"text",
             value: preset.apellidos
         },
         {
             label:"Telefono",
             name:"telefono",
             type:"tel",
             maxlength: 10,
             value: preset.telefono
         },
         {
             label:"Correo",
             name:"correo",
             type:"email",
             value: preset.correo
         },
         {
             label:"Grado maximo",
             name:"grado",
             type:"text",
             value: preset.grado
         },
         {
             label:"Nombre del grado maximo",
             name:"nombre_grado",
             type:"text",
             value: preset.nombre_grado
         }
     ])

export const getFieldsProg = (preset: ProgramaModel):Array<FieldConfig> => ([
         {
             label:"Numero de programa",
             name:"id",
             type:"text",
             value: preset.id
         },
         {
             label:"Nombre",
             name:"nombre",
             type:"text",
             value: preset.nombre
         },
         {
             label:"Registro de CONAHCYT",
             name:"registro",
             type:"text",
             maxlength: 10,
             value: preset.registro
         }
     ])

export const getFieldsLog = (preset: LoginModel):Array<FieldConfig> =>  [
        {
            label:"Usuario",
            name:"user",
            type:"text",
            maxlength: 10,
            minlength: 0,
            value: preset.user
        },
        {
            label:"Contraseña",
            name:"password",
            type:"password",
            maxlength: 10,
            minlength: 0,
            value: preset.password
        }
    ]