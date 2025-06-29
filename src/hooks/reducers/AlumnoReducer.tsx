import React, { useReducer } from "react";
import type { Student } from "../../models/Student";
import { StudentsContext } from "../context/StudentContext";

type PropsHook = {
    children: React.ReactNode
}

const initialState: Student[] = []

export type StudentActions = 
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