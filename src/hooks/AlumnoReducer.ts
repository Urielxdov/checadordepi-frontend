import { Alumno } from "../models/entityModels";

interface StateProps {
    alumnos: Array<Alumno>
    alumno?: Alumno
}

interface ActionProps {
    type: string
    alumno?: Alumno
    nocontrol?: string
}

export const initialState = ():StateProps => ({
    alumnos: [
        new Alumno({
            noControl: "22241102",
            nombre: "John",
            apellidos: "Doe",
            telefono: "1234567890",
            calle: "alguna calle #100",
            colonia: "Alguna colonia",
            correo: "jdoe@gmail.com"
        })
    ]
})

export function reduceAlumno(state:StateProps, action:ActionProps){
    switch(action.type){
        case 'read':
            return state
        case 'search':
            if(!action.nocontrol){ return state }
            const alumno = state.alumnos.find((a) => a.noControl == action.nocontrol);
            return {...state, alumno: alumno};
        case 'create':
            if(!action.alumno){ return state }
            return {...state, alumnos: [...state.alumnos, action.alumno]}
        case 'delete':
            if(!action.nocontrol){ return state }
            return {alumnos: state.alumnos.filter((a) => a.noControl != action.nocontrol)}
        case 'update':
            if(!action.alumno && !action.nocontrol){ return state }
            if(!action.alumno || !action.nocontrol){ return state }
            const nuevoAlumnos = state.alumnos.map((a) => {
                if(a.noControl == action.nocontrol){
                    return action.alumno as Alumno;
                }else{
                    return a;
                }
            });
            return {...state, alumnos: nuevoAlumnos}
        default:
            return state
    }
}