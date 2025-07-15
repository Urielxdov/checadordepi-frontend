import React, { useReducer } from 'react'
import { StudentsContext } from '../context/StudentContext'
import { type StudentStateProps } from '../../interfaces/componentConfig'
import type { AlumnoConfig } from '../../interfaces/ModelsInterfaces'

export interface UpdateAlumno {
  oldId: string,
  data: AlumnoConfig
}

export type StudentActions =
  | { type: 'CREATE_STUDENT'; payload: AlumnoConfig }
  | { type: 'UPDATE_STUDENT'; payload: UpdateAlumno }
  | { type: 'DELETE_STUDENT'; payload: string }
  | { type: 'SEARCH_STUDENT'; payload: string }

type PropsHook = {
  children: React.ReactNode
}

const initialState = () => ({
  students: [
    {
      id: '22241102',
      nombre: 'jhon',
      apellidos: 'doe',
      telefono: '4773332222',
      calle: 'alguna calle #100',
      colonia: 'alguna colonia',
      correo: 'jdoe@gmail.com',
      status: 'activo'
    }
  ]
})

const reducer = (state: StudentStateProps, action: StudentActions) => {
  switch (action.type) {
    case 'CREATE_STUDENT':
      return { students: [...state.students, action.payload] }
    case 'DELETE_STUDENT':
      return {
        students: state.students.filter(
          student => student.id != action.payload
        )
      }
    case 'UPDATE_STUDENT':
      return {
        students: state.students.map(student =>
          student.id === action.payload.oldId ? action.payload.data : student
        )
      }
    case 'SEARCH_STUDENT':
      return {
        ...state,
        student: state.students.find(student => student.id === action.payload)
      }
  }
}

export function StudentProvider ({ children }: PropsHook) {
  const [state, dispatch] = useReducer(reducer, initialState())

  const addStudent = (formData: FormData) => {
    const student = formDataToAlumnoConfig(formData)
    dispatch({
      type: 'CREATE_STUDENT',
      payload: student
    })
  }

  const deleteStudent = (numberControl: string) =>
    dispatch({
      type: 'DELETE_STUDENT',
      payload: numberControl
    })

  const updateStudent = (formData: FormData) => {
    const student = formDataUpdateToAlumnoConfig(formData)
    dispatch({
      type: 'UPDATE_STUDENT',
      payload: student
    })
  }

  const searchStudent = (numberControl: string) => {
    dispatch({
      type: 'SEARCH_STUDENT',
      payload: numberControl
    })
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

function formDataToAlumnoConfig (data: FormData): AlumnoConfig {
  return {
    id: data.get('id') as string,
    nombre: data.get('nombre') as string,
    apellidos: data.get('apellidos') as string,
    telefono: data.get('telefono') as string,
    calle: data.get('calle') as string,
    colonia: data.get('colonia') as string,
    correo: data.get('correo') as string,
    status: data.get('status') ? data.get('status') as string : 'activo'
  }
}

function formDataUpdateToAlumnoConfig (data: FormData): UpdateAlumno {
  return {
    oldId: data.get('clave') as string,
    data: {
      id: data.get('id') as string,
      nombre: data.get('nombre') as string,
      apellidos: data.get('apellidos') as string,
      telefono: data.get('telefono') as string,
      calle: data.get('calle') as string,
      colonia: data.get('colonia') as string,
      correo: data.get('correo') as string,
      status: data.get('status') as string
    }
  }
}
