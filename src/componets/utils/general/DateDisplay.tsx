import { useEffect, useState } from 'react'

export default function DateDisplay () {
  const [currentDate, setCurrentDate] = useState<string>('')

  useEffect(() => {
    const update = () => {
      const now = new Date()
      const formatted = now.toLocaleDateString('es-MX', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      })

      setCurrentDate(formatted)
    }

    update()
    const interval = setInterval(update, 60 * 1000)

    return () => clearInterval(interval)
  }, [])

  return <div className='text-4xl font-mono'>{currentDate}</div>
}
