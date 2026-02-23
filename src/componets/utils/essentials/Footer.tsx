export default function Footer () {
  return (
    <footer className='relative mt-8 w-full bg-white border-t border-gray-200 w-'>
      <div className='flex justify-between items-center px-4 py-2 text-sm'>
        <p>
          © 2025. Todos los derechos reservados.{' '}
          <a href='#' className='text-blue-600 underline hover:text-blue-800'>
            Aviso de privacidad
          </a>
        </p>
        <p>Versión 1.0</p>
      </div>
    </footer>
  )
}
