import React, { type ReactNode } from 'react'

interface FormProps {
  children: ReactNode
  onSubmit?: (data: FormData) => void
  id: string
}

export default function Form ({ children, onSubmit, id }: FormProps) {
  //manejo de envio
  const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
    //para no recargar la pagina
    e.preventDefault();

    //obtener el formulario
    const form = document.getElementById(id) as HTMLFormElement | null;

    //obtener datos
    if(form){
      const data = new FormData(form);
      onSubmit && onSubmit(data);
      form.reset();
    }
  }

  //componente
  return (
    <form
      onSubmit={handleForm}
      id={id}
      className='flex flex-col gap-4 shadow-lg p-6 rounded-md'
    >
      {children}
    </form>
  )
}
