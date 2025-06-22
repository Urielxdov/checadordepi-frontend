interface PropsCard {
  title: string
  description: string
  button: React.ReactNode | null
}

export default function Card ({ title, description, button }: PropsCard) {
  return (
    <div className='flex flex-col shadow-custom-soft text-left  rounded-sm p-4 gap-2'>
      <h3 className='font-bold'>{title}</h3>
      <p>{description}</p>
      {button && <div className='w-1/6'>{button}</div>}
    </div>
  )
}
