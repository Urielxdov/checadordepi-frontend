import React, { createContext, useReducer } from "react";
import { Alumno } from "../../models/entityModels";

// version Uriel
type PropsHook = {
    children: React.ReactNode
}

type Student = {
    numberControl: string,
    nombre: string,
    apellido: string,
    direccion: string | null,
    telefono: string,
    correo: string,
    estado: string,
    foto: File | null
}

type StudentContextType = {
    state: Student[]
    dispatch: React.Dispatch<StudentActions>
    addStudent: (student: Student) => void
    updateStudent: (student: Student) => void
    deleteStudent: (numberControl: string) => void
}

export const StudentsContext = createContext<StudentContextType | undefined>(undefined)

const initialState: Student[] = []

type StudentActions = 
    | { type: "CREATE_STUDENT"; payload: Student}
    | { type: "UPDATE_STUDENT"; payload: Student}
    | { type: "DELETE_STUDENT"; payload: string}

const reducer = (state: Student[], action: StudentActions) => {
    switch(action.type) {
        case 'CREATE_STUDENT':
            return [...state, action.payload]
        case 'DELETE_STUDENT':
            return state.filter(student => student.numberControl !== action.payload)
        case 'UPDATE_STUDENT':
            return state.map(student => student.numberControl === action.payload.numberControl ? action.payload : student)
    }
}

export function StudentProvider({ children }: PropsHook) {
  const [state, dispatch] = useReducer(reducer, initialState)

  const addStudent = (student: Student) =>
    dispatch({
      type: "CREATE_STUDENT",
      payload: student,
    })

  const deleteStudent = (numberControl: string) =>
    dispatch({
      type: "DELETE_STUDENT",
      payload: numberControl,
    })

  const updateStudent = (student: Student) =>
    dispatch({
      type: "UPDATE_STUDENT",
      payload: student,
    })

  return (
    <StudentsContext.Provider
      value={{
        state,
        dispatch,
        addStudent,
        updateStudent,
        deleteStudent,
      }}
    >
      {children}
    </StudentsContext.Provider>
  )
}

// version cadena
interface StateProps {
    alumnos: Array<Alumno>
    alumno?: Alumno
}

interface ActionProps {
    type: string
    alumno?: Alumno
    nocontrol?: string
}

// export const initialState = ():StateProps => ({
//     alumnos: [
//         new Alumno({
//             noControl: "22241102",
//             nombre: "John",
//             apellidos: "Doe",
//             telefono: "1234567890",
//             calle: "alguna calle #100",
//             colonia: "Alguna colonia",
//             correo: "jdoe@gmail.com",
//             status:"Activo"
//         })
//     ]
})

export function reduceAlumno(state:StateProps, action:ActionProps){
    switch(action.type){
        case 'read':
            return state
        case 'search':
            if(!action.nocontrol){ return state }
            const alumno = state.alumnos.find((a) => a.noControl == action.nocontrol);
            return {...state, alumno: alumno};
        case 'create':
            if(!action.alumno){ return state }
            return {...state, alumnos: [...state.alumnos, action.alumno]}
        case 'delete':
            if(!action.nocontrol){ return state }
            return {alumnos: state.alumnos.filter((a) => a.noControl != action.nocontrol)}
        case 'update':
            if(!action.alumno && !action.nocontrol){ return state }
            if(!action.alumno || !action.nocontrol){ return state }
            const nuevoAlumnos = state.alumnos.map((a) => {
                if(a.noControl == action.nocontrol){
                    return action.alumno as Alumno;
                }else{
                    return a;
                }
            });
            return {...state, alumnos: nuevoAlumnos}
        default:
            return state
    }
}