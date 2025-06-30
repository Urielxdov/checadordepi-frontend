// import { useReducer } from "react";
// import { reduceAlumno, initialState } from "../../hooks/reducers/AlumnoReducer";
// import { ALUMNOHEADERS } from "../../utils/Headers";
// import Delete from "../CrudActions/Delete";

// function DeleteAlu(){
//     //hook de alumno
//     const [state, distpatch] = useReducer(reduceAlumno, initialState());

//     //configuracion de modal
//     const modalConf = {
//         title: "alumno eliminado",
//         message: "El alumno ha sido eliminado con exito",
//         type: "success"
//     }

//     //componente de delete
//     return (
//         <Delete
//             title="Modulo alumno"
//             module="alumno"
//             modalConf={modalConf}
//             headers={ALUMNOHEADERS}
//             entity={state.alumno}
//             onDelete={() => {
//                     distpatch({type: "delete", nocontrol: state.alumno?.noControl});
//                 }}
//             onSearch={(s:string) => {
//                     distpatch({type: "search", nocontrol: s});
//                 }}
//         />
//     );
// }

// export default DeleteAlu;