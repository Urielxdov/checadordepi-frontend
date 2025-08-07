import UpdateForm from "../CrudActions/UpdateForm";
import { useStudents } from "../../hooks/custom/useStudents";
import HomeLayout from "../Layouts/HomeLayout";
import ReturnButton from "../../componets/utils/buttons/ReturnButton";
import { type AlumnoConfig } from "../../interfaces/ModelsInterfaces";
import Modal from "../../componets/ui/Modals";
import { useEffect, useState } from "react";
import { getFieldsAlu } from "../../utils/Fields";
import { useForm } from "../../hooks/reducers/FormReducer";
import { getTeacherSelect } from "../../services/teacherService";
import { getProgramSelect } from "../../services/programService";
import type { SelectItem } from "../../interfaces/httpConfig";
import QueryInput from "../../componets/utils/Inputs/QueryInput";
import CheckBox from "../../componets/utils/Inputs/Checkbox";
import debounce from "../../utils/Debounce";

function UpdateAlu(){
    //estado de modal
    const [openSuccess, setOpenSuccess] = useState<boolean>(false);
    const [openFail, setOpenFail] = useState<boolean>(false);

    //estado de check
    const [check, setCheck] = useState<boolean>(false);

    //estados de items del select
    const [itemsPf, setItemsPf] = useState<SelectItem[]>([] as Array<SelectItem>);
    const [itemsPr, setItemsPr] = useState<SelectItem[]>([] as Array<SelectItem>);

    //contexto de alumno
    const context = useStudents();

    //hook de formulario
    const { state, handleChange, setValue, resetForm } = useForm("Alumno");

    //menejo de update
    const update = debounce(() => {
        //obtener el alumno del hook de form
        context.updateStudent(state.data as AlumnoConfig).then(updated => {
            if(updated){
                setOpenSuccess(true);
            }else{
                setOpenFail(true);
            }
            resetForm();
        }).catch(e => console.log(e));
    },500)

    //obtener los items del select
    useEffect(() => {
        getTeacherSelect().then((items:Array<SelectItem>) => setItemsPf([{key: "default", fullName: "-- seleccione un profesor --"} as SelectItem,...items])).catch(e => console.log(e));
        getProgramSelect().then((items:Array<SelectItem>) => setItemsPr([{key: "default", fullName: "-- seleccione un programa --"} as SelectItem,...items])).catch(e => console.log(e));
    },[]);

    //poner el preset
    useEffect(() => {
        if(context.state.student){
            setValue(context.state.student);
        }
    },[context.state.student])

    if(!context.state.student){
        return (
            <>
            <HomeLayout title="Modulo Alumno">
                <QueryInput action={context.searchStudent} placeholder="buscar alumno"/>
                sin registro
                <ReturnButton path="/alumno/"/>
            </HomeLayout>
            </>
        );
    }


    //si existe una busqueda
    return (
        <>
        <HomeLayout title="Modulo Alumno">
            <QueryInput action={context.searchStudent} placeholder="buscar alumno"/>
            <UpdateForm
                module="Alumno"
                fields={check ? getFieldsAlu(state.data as AlumnoConfig).slice(1): getFieldsAlu(state.data as AlumnoConfig).slice(1,7)}
                itemsPf={itemsPf}
                itemsPr={itemsPr}
                selectPf={(state.data as AlumnoConfig).profesor}
                selectPr={(state.data as AlumnoConfig).programa}
                onSubmit={update}
                onChange={handleChange}
            />
            <CheckBox text="actualizar foto" onChange={setCheck}/>
            <ReturnButton path="/alumno/"/>
        </HomeLayout>
        <Modal
            title="Alumno actualizado"
            message="los datos del alumnos se han actualizado"
            type="success"
            isOpen={openSuccess}
            onClose={() => setOpenSuccess(false)}
        />
        <Modal
            title="Error al actualizar"
            message="el alumno no ha sido actualizado"
            type="failure"
            isOpen={openFail}
            onClose={() => setOpenFail(false)}
        />
        </>
    );
}

export default UpdateAlu
