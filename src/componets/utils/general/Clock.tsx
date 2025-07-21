import { useState, useEffect } from 'react'

export default function Clock () {
  const [time, setTime] = useState<string>('')

  useEffect(() => {
    const update = () => {
      const now = new Date()
      const formatted = now.toLocaleTimeString('es-MX', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
      setTime(formatted)
    }

    update() // inicial
    const interval = setInterval(update, 1000)

    return () => clearInterval(interval)
  }, [])

  return <p className='text-4xl font-mono'>{time}</p>
}
