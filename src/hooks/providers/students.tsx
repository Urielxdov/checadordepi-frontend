import { useEffect } from "react";
import { StudentsContext } from "../context/StudentContext";
import type { AlumnoModel } from "../../interfaces/Models";
import { getActiveStudents, createStudent, deleteStudentA, updateStudentA } from "../../services/studentsService";
import { useEntities, type EntityStateProps } from "../reducers/entities";
import { useAuth } from "../context/AuthContext";

//propiedades del provider
interface StudentProviderProps {
  children: React.ReactNode
}

export default function StudentProvider ({ children }: StudentProviderProps) {
  //contexto de autenticacion
  const authctx = useAuth();

  //reducer generico
  const reducer = useEntities<AlumnoModel>();

  const getStudents = async (page: number, tk:string):Promise<void> => {
      try{
        //pedir al api
        const students = await getActiveStudents(page, tk);
        //guardar en reducer
        reducer.get_entities(students);
      }catch(error){
        //mensaje de error
        console.error(error);
      }
  }

  const addStudent = async (student: AlumnoModel, tk:string):Promise<boolean> => {
      try{
        //pedir al api
        const result = await createStudent(student, student.foto as File, tk);
        //verificar exito
        if(result.success){
          //guardar en reducer
          reducer.create_entity(student);
        }
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
        if(result.success){
          //modificar reducer
          reducer.delete_entity(numberControl);
        }
        //retornar exito
        return result.success;
      }catch(error){
        //mensaje de error y caso de fracaso
        console.error(error);
        return false;
      }
  }

  const updateStudent = async (updated: AlumnoModel, tk:string) => {
      try{
        //peticion al api
        const result = await updateStudentA(updated, updated.foto as File, tk);
        //verificar exito
        if(result.success){
          //guardar en reducer
          reducer.update_entity(updated);
        }
        //retorno de exito
        return result.success;
      }catch(error){
        //mensjae de error y caso de fracaso
        console.error(error);
        return false;
      }
  }

  const searchStudent = (numberControl: string) => {
    reducer.search_entity(numberControl);
  }

  useEffect(() => {
    //revisar token
    if(authctx.token){
      //pedir alumnos
      getStudents(reducer.state.current_page,authctx.token);
    }
  },[]);

  return (
    <StudentsContext.Provider
      value={{
        state: reducer.state as EntityStateProps<AlumnoModel>,
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
