import React, { useReducer } from "react";
import { StudentsContext } from "../context/StudentContext";
import { type StudentStateProps } from "../../interfaces/componentConfig";
import { type StudentActions } from "../../interfaces/componentConfig";
import type { AlumnoConfig } from "../../interfaces/ModelsInterfaces";

type PropsHook = {
    children: React.ReactNode
}

const initialState = () => ({ students: [{
                                    id:'22241102',
                                    nombre: 'jhon',
                                    apellidos:'doe',
                                    telefono:'4773332222',
                                    calle:'alguna calle #100',
                                    colonia: 'alguna colonia',
                                    correo: 'jdoe@gmail.com',
                                    status: 'activo'
                                  }]
                            })

const reducer = (state: StudentStateProps, action: StudentActions) => {
    switch(action.type) {
        case 'CREATE_STUDENT':
            return {students: [...state.students, action.payload]}
        case 'DELETE_STUDENT':
            return {students: state.students.filter(student => student.id !== action.payload)}
        case 'UPDATE_STUDENT':
            return {students: state.students.map(student => student.id === action.payload.id ? action.payload : student)}
        case 'SEARCH_STUDENT':
            return {...state, student: state.students.find(student => student.id === action.payload)}
    }
}

export function StudentProvider({ children }: PropsHook) {
  const [state, dispatch] = useReducer(reducer, initialState())

  const addStudent = (student: AlumnoConfig) => 
    dispatch({
      type: "CREATE_STUDENT",
      payload: student,
    })

  const deleteStudent = (numberControl: string) =>
    dispatch({
      type: "DELETE_STUDENT",
      payload: numberControl,
    })

  const updateStudent = (student: AlumnoConfig) =>
    dispatch({
      type: "UPDATE_STUDENT",
      payload: student,
    })

  const searchStudent = (numberControl: string) => {
    dispatch({
      type: "SEARCH_STUDENT",
      payload: numberControl
    });
  }

  return (
    <StudentsContext.Provider
      value={{
        state,
        dispatch,
        addStudent,
        updateStudent,
        deleteStudent,
        searchStudent
      }}
    >
      {children}
    </StudentsContext.Provider>
  )
}