export const ALUMNOFIELDS = [
         {
             label:"Numero de control",
             name:"id",
             type:"text",
             maxlength: 8,
             minlength: 8,
         },
         {
             label:"Nombre(s)",
             name:"nombre",
             type:"text",

         },
         {
             label:"Apellidos",
             name:"apellidos",
             type:"text",
            
         },
         {
             label:"Telefono",
             name:"telefono",
             type:"tel",
             maxlength: 10,
        
         },
         {
             label:"Calle y numero",
             name:"calle",
             type:"text",
         },
         {
             label:"Colonia",
             name:"colonia",
             type:"text",
    
         },
         {
             label:"Correo",
             name:"correo",
             type:"email",

         },
         {
            label:"Estatus:",
            name:"status",
            type:"text"
         }
     ]

export const PROFESORFIELDS = [
         {
             label:"clave",
             name:"id",
             type:"text",
             maxlength: 10,
             minlength: 10,
         },
         {
             label:"Nombre(s)",
             name:"nombre",
             type:"text",

         },
         {
             label:"Apellidos",
             name:"apellidos",
             type:"text",
            
         },
         {
             label:"Telefono",
             name:"telefono",
             type:"tel",
             maxlength: 10,
        
         },
         {
             label:"Correo",
             name:"correo",
             type:"email",

         },
         {
             label:"Grado maximo",
             name:"grado",
             type:"text",
         },
         {
             label:"Nombre del grado maximo",
             name:"nombre_grado",
             type:"text",
    
         },
         {
            label:"Estatus:",
            name:"status",
            type:"text"
         }
     ]

export const PROGRAMAFIELDS = [
         {
             label:"Numero de programa",
             name:"id",
             type:"number",
         },
         {
             label:"Nombre",
             name:"nombre",
             type:"text",

         },
         {
             label:"Registro de CONAHCYT",
             name:"registro",
             type:"text",
             maxlength: 10,
        
         },
         {
            label:"Estatus:",
            name:"status",
            type:"text"
         }
     ]

export const LOGINFIELDS = [
        {
            label:"Usuario",
            name:"user",
            type:"text",
            maxlength: 10,
            minlength: 0,
        },
        {
            label:"Contraseña",
            name:"password",
            type:"password",
            maxlength: 10,
            minlength: 0,
        }
    ]