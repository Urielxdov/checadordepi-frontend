import React, { useReducer } from "react";
import { Alumno } from "../../models/entityModels";
import { StudentsContext } from "../context/StudentContext";

type PropsHook = {
    children: React.ReactNode
}

const initialState: Alumno[] = [new Alumno({
                                    id:'22241102',
                                    nombre: 'jhon',
                                    apellidos:'doe',
                                    telefono:'4773332222',
                                    calle:'alguna calle #100',
                                    colonia: 'alguna colonia',
                                    correo: 'jdoe@gmail.com',
                                    status: 'activo'
                                  })]

export type StudentActions = 
    | { type: "CREATE_STUDENT"; payload: Alumno}
    | { type: "UPDATE_STUDENT"; payload: Alumno}
    | { type: "DELETE_STUDENT"; payload: string}

const reducer = (state: Alumno[], action: StudentActions) => {
    switch(action.type) {
        case 'CREATE_STUDENT':
            return [...state, action.payload]
        case 'DELETE_STUDENT':
            return state.filter(student => student.id !== action.payload)
        case 'UPDATE_STUDENT':
            return state.map(student => student.id === action.payload.id ? action.payload : student)
        default:
            return state;
    }
}

export function StudentProvider({ children }: PropsHook) {
  const [state, dispatch] = useReducer(reducer, initialState)

  const addStudent = (student: Alumno) => 
    dispatch({
      type: "CREATE_STUDENT",
      payload: student,
    })

  const deleteStudent = (numberControl: string) =>
    dispatch({
      type: "DELETE_STUDENT",
      payload: numberControl,
    })

  const updateStudent = (student: Alumno) =>
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