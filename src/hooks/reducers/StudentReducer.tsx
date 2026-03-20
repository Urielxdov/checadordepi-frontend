import React, { useReducer, useEffect } from "react";
import { StudentsContext } from "../context/StudentContext";
import { type StudentStateProps } from "../../interfaces/componentConfig";
import { type StudentActions } from "../../interfaces/componentConfig";
import type { AlumnoConfig } from "../../interfaces/ModelsInterfaces";
import { getActiveStudents, createStudent, deleteStudentA, updateStudentA } from "../../services/studentsService";

type PropsHook = {
  children: React.ReactNode
}

const initialState = () => ({
    students: [] as Array<AlumnoConfig>,
    current_page: 0,
    total: 0,
})

const reducer = (state: StudentStateProps, action: StudentActions) => {
    switch(action.type) {
        case 'GET_STUDENTS':
            return {students: action.payload.data, current_page: action.payload.page, total: action.payload.total}
        case 'CREATE_STUDENT':
            return {students: [...state.students, action.payload], current_page: state.current_page, total: state.total}
        case 'DELETE_STUDENT':
            return {students: state.students.filter(student => student.id !== action.payload), current_page: state.current_page, total: state.total}
        case 'UPDATE_STUDENT':
            return {students: state.students.map(student => student.id === action.payload.id ? action.payload : student), current_page: state.current_page, total: state.total}
        case 'SEARCH_STUDENT':
            return {...state, student: state.students.find(student => student.id === action.payload)}
    }
}

export function StudentProvider ({ children }: PropsHook) {
  const [state, dispatch] = useReducer(reducer, initialState())

  const getStudents = async (page: number, tk:string):Promise<void> => {
      try{
        //pedir al api
        const students = await getActiveStudents(page, tk);
        //guardar en reducer
        dispatch({ type:"GET_STUDENTS", payload: students });
      }catch(error){
        //mensaje de error
        console.error(error);
      }
  }

  const addStudent = async (student: AlumnoConfig, tk:string):Promise<boolean> => {
      try{
        //pedir al api
        const result = await createStudent(student, student.foto as File, tk);
        //verificar exito
        if(!result.success){ return result.success }
        //guardar en reducer
        dispatch({ type: 'CREATE_STUDENT', payload: result.data as AlumnoConfig });
        //retorno de exito
        return result.success;
      }catch(error){
        //mensaje de error y caso de fracaso
        console.error(error);
        return false;
      }
  }

  const deleteStudent = async (numberControl: string, tk:string):Promise<boolean> => {
      try{
        //peticion al api
        const result = await deleteStudentA(numberControl, tk);
        //verificar exito
        if(!result.success){ return result.success }
        //modificar reducer
        dispatch({type: 'DELETE_STUDENT', payload: numberControl});
        //retornar exito
        return result.success;
      }catch(error){
        //mensaje de error y caso de fracaso
        console.error(error);
        return false;
      }
  }

  const updateStudent = async (updated: AlumnoConfig, tk:string) => {
      try{
        //peticion al api
        const result = await updateStudentA(updated, updated.foto as File, tk);
        //verificar exito
        if(!result.success){ return result.success }
        //guardar en reducer
        dispatch({type: "UPDATE_STUDENT", payload: result.data as AlumnoConfig});
        //retorno de exito
        return result.success;
      }catch(error){
        //mensjae de error y caso de fracaso
        console.error(error);
        return false;
      }
  }

  const searchStudent = (numberControl: string) => {
    dispatch({
      type: 'SEARCH_STUDENT',
      payload: numberControl
    })
  }

  useEffect(() => {
    const backup = localStorage.getItem("access-token");
    if(backup){
      const jwt = JSON.parse(backup);
      getStudents(state.current_page, jwt.token);
    }
  },[]);

  return (
    <StudentsContext.Provider
      value={{
        state,
        getStudents,
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
