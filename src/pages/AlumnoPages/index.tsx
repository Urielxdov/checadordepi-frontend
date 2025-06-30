// import { useReducer } from "react";
// import { reduceAlumno, initialState } from "../../hooks/reducers/AlumnoReducer";
// import { Alumno } from "../../models/entityModels";
// import { ALUMNOHEADERS } from "../../utils/Headers";
// import Index from "../CrudActions/Index";

// function IndexAlu(){
//     //hook de alumnos
//     const [state, dispatch] = useReducer(reduceAlumno, initialState());

//     return (
//         <Index
//             title="Listado de alumnos"
//             headers={ALUMNOHEADERS}
//             data={state.alumnos.map((a:Alumno) => a.toArray())}
//         />
//     );
// }

// export default IndexAlu;