import { useStudents } from "../../hooks/custom/useStudents";
import ReturnButton from "../../componets/utils/buttons/ReturnButton";
import Create from "../CrudActions/Create";
import HomeLayout from "../Layouts/HomeLayout";
import { getFieldsAlu } from "../../utils/Fields";
import type { AlumnoConfig } from "../../interfaces/ModelsInterfaces";
import { useForm } from "../../hooks/reducers/FormReducer";
import Modal from "../../componets/ui/Modals";
import { useEffect, useState } from "react";
import { getTeacherSelect } from "../../services/teacherService";
import { getProgramSelect } from "../../services/programService";
import type { SelectItem } from "../../interfaces/httpConfig";
import debounce from "../../utils/Debounce";
import PageBar from "../../componets/ui/pageBar";

function CreateAlu(){
   //estado para modal
   const [openSuccess, setOpenSuccess] = useState<boolean>(false);
   const [openFail, setOpenFail] = useState<boolean>(false);

   //estados de items del select
   const [itemsPf, setItemsPf] = useState<SelectItem[]>([] as Array<SelectItem>);
   const [itemsPr, setItemsPr] = useState<SelectItem[]>([] as Array<SelectItem>);

   //contexto de alumno
   const context = useStudents();

   //hook de formulario
   const { state, handleChange, resetForm } = useForm('Alumno');

   //funcion de manejo
   const onSubmit = debounce(() => {
      //obtener el modelo
      const alumno = state.data as AlumnoConfig
      //activo por defecto
      alumno.status = "Activo"
      //gurdado en el contexto
      context.addStudent(alumno).then(created => {
         if(created){
            setOpenSuccess(true);
         }else{
            setOpenFail(true);
         }
         resetForm();
      }).catch(e => console.log(e));
   },500)

   useEffect(() => {
      getTeacherSelect().then((items:Array<SelectItem>) => setItemsPf([{key: "default", fullName: "-- seleccione un profesor --"} as SelectItem,...items])).catch(e => console.log(e))
      getProgramSelect().then((items:Array<SelectItem>) => setItemsPr([{key: "default", name: "-- sleccione un programa --"} as SelectItem,...items])).catch(e => console.log(e))
   },[]);
     //retorno de vista
     return (
        <>
        <HomeLayout title="Modulo Alumno">
           <Create
                module="Alumno"
                fields={getFieldsAlu(state.data as AlumnoConfig)}
                itemsPf={itemsPf}
                itemsPr={itemsPr}
                onSubmit={onSubmit}
                onChange={handleChange}
            />
            <PageBar
                current={context.state.current_page}
                total={context.state.total}
                onChange={context.getStudents}
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
