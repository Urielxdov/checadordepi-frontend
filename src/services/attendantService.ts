import { ATTENDANCEURL } from "../utils/APIurls";

//metodo para mandar la foto al api
export async function checkAttendance(img: Blob):Promise<Boolean>{
    //form data
    const data = new FormData();
    data.append("file",img,'face.jpg');

    //peticion con fetch
    const response = await fetch(ATTENDANCEURL,{
        method: 'POST',
        mode: 'cors',
        body: data
    });

    //verificar respuesta
    if(!response.ok){
        return false;
    }

    //retornar verdadero
    return true;
}