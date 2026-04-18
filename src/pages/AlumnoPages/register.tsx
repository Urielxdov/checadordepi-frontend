import { useStudents } from "../../hooks/custom/useStudents";
import ReturnButton from "../../components/utils/buttons/ReturnButton";
import Create from "../CrudActions/Create";
import HomeLayout from "../Layouts/HomeLayout";
import { getFieldsAlu } from "../../utils/Fields";
import type { AlumnoModel } from "../../interfaces/Models";
import { useForm } from "../../hooks/reducers/FormReducer";
import Modal from "../../components/ui/Modals";
import { useEffect, useState } from "react";
import { getTeacherSelect } from "../../services/teacherService";
import { getProgramSelect } from "../../services/programService";
import { useAuth } from "../../hooks/custom/useAuth";
import type { SelectItem } from "../../interfaces/httpModels";
import debounce from "../../utils/Debounce";

function CreateAlu(){
   //contexto de jwt
   const jwt = useAuth();

   //estado para modal
   const [openSuccess, setOpenSuccess] = useState<boolean>(false);
   const [openFail, setOpenFail] = useState<boolean>(false);

   //estados de items del select
   const [itemsPf, setItemsPf] = useState<SelectItem[]>([]);
   const [itemsPr, setItemsPr] = useState<SelectItem[]>([]);

   //contexto de alumno
   const context = useStudents();

   //hook de formulario
   const { state, handleChange, resetForm } = useForm('Alumno');

   //funcion de manejo
   const onSubmit = debounce(() => {
      //obtener el modelo
      const alumno = state.data as AlumnoModel
      //activo por defecto
      alumno.status = "Activo"
      //gurdado en el contexto
      context.addStudent(alumno, jwt.token).then(created => {
         if(created){
            setOpenSuccess(true);
         }else{
            setOpenFail(true);
         }
         resetForm();
      }).catch(e => console.log(e));
   },500)

   useEffect(() => {
      getTeacherSelect(jwt.token).then((items:Array<SelectItem>) => setItemsPf([{key: "default", fullName: "-- seleccione un profesor --"} as SelectItem,...items])).catch(e => console.log(e))
      getProgramSelect(jwt.token).then((items:Array<SelectItem>) => setItemsPr([{key: "default", name: "-- sleccione un programa --"} as SelectItem,...items])).catch(e => console.log(e))
   },[]);
     //retorno de vista
     return (
        <>
        <HomeLayout title="Modulo Alumno">
           <Create
                module="Alumno"
                fields={getFieldsAlu(state.data as AlumnoModel)}
                itemsPf={itemsPf}
                itemsPr={itemsPr}
                onSubmit={onSubmit}
                onChange={handleChange}
            />
            <ReturnButton path="/alumno/"/>
         </HomeLayout>
         <Modal
            title="Alumno creado"
            message="el alumno ha sido creado con exito"
            type="success"
            isOpen={openSuccess}
            onClose={() => setOpenSuccess(false)}
        />
        <Modal
            title="Error al crear"
            message="el alumno no ha sido creado"
            type="failure"
            isOpen={openFail}
            onClose={() => setOpenFail(false)}
        />
        </>
     );
}

export default CreateAlu
