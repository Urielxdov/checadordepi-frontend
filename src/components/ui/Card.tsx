interface PropsCard {
  title: string
  description: string
  button: React.ReactNode | null
  icon?: React.ReactNode
}

export default function Card ({ title, description, button, icon }: PropsCard) {
  return (
    <div className='flex flex-col rounded-lg border border-gray-100 bg-white shadow-custom-soft p-5 gap-3 hover:shadow-md hover:border-gray-200 transition-all'>
      {icon && (
        <div className='w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500'>
          {icon}
        </div>
      )}
      <div>
        <h3 className='font-semibold text-gray-800'>{title}</h3>
        <p className='text-sm text-gray-500 mt-0.5'>{description}</p>
      </div>
      {button && <div className='mt-auto'>{button}</div>}
    </div>
  )
}
