import UpdateForm from "../CrudActions/UpdateForm";
import { useStudents } from "../../hooks/custom/useStudents";
import HomeLayout from "../../components/ui/HomeLayout";
import ReturnButton from "../../components/interactives/buttons/ReturnButton";
import { type AlumnoModel } from "../../interfaces/Models";
import Modal from "../../components/ui/Modals";
import { useEffect, useState } from "react";
import { getFieldsAlu } from "../../utils/Fields";
import { useForm } from "../../hooks/reducers/FormReducer";
import { useAuth } from "../../hooks/custom/useAuth";
import { getTeacherSelect } from "../../services/teacherService";
import { getProgramSelect } from "../../services/programService";
import type { SelectItem } from "../../interfaces/httpModels";
import QueryInput from "../../components/interactives/inputs/QueryInput";
import CheckBox from "../../components/interactives/inputs/Checkbox";
import debounce from "../../utils/Debounce";

function UpdateAlu(){
    //hook de jwt
    const jwt = useAuth();

    //estado de modal
    const [openSuccess, setOpenSuccess] = useState<boolean>(false);
    const [openFail, setOpenFail] = useState<boolean>(false);

    //estado de check
    const [check, setCheck] = useState<boolean>(false);

    //estados de items del select
    const [itemsPf, setItemsPf] = useState<SelectItem[]>([]);
    const [itemsPr, setItemsPr] = useState<SelectItem[]>([]);

    //contexto de alumno
    const context = useStudents();

    //hook de formulario
    const { state, handleChange, setValue, resetForm } = useForm("Alumno");

    //menejo de update
    const update = debounce(() => {
        //obtener el alumno del hook de form
        context.updateStudent(state.data as AlumnoModel, jwt.token).then(updated => {
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
        getTeacherSelect(jwt.token).then((items:Array<SelectItem>) => setItemsPf([{key: "default", fullName: "-- seleccione un profesor --"} as SelectItem,...items])).catch(e => console.log(e));
        getProgramSelect(jwt.token).then((items:Array<SelectItem>) => setItemsPr([{key: "default", fullName: "-- seleccione un programa --"} as SelectItem,...items])).catch(e => console.log(e));
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
                fields={check ? getFieldsAlu(state.data as AlumnoModel).slice(1): getFieldsAlu(state.data as AlumnoModel).slice(1,7)}
                itemsPf={itemsPf}
                itemsPr={itemsPr}
                selectPf={(state.data as AlumnoModel).profesor}
                selectPr={(state.data as AlumnoModel).programa}
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
