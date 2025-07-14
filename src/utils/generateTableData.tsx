export interface RowData<T = any> {
  id: string
  raw: T
  cells: React.ReactNode[]
}

export function generateTableData<T> (
  data: T[],
  getId: (row: T) => string,
  onUpdate?: (rowData: T) => void,
  editable = true
): RowData<T>[] {
  return data.map(element => {
    const row: React.ReactNode[] = []

    Object.keys(element).forEach(key => {
      const value = element[key as keyof T]

      row.push(
        editable ? (
          <input
            key={key}
            name={key}
            defaultValue={String(value)}
            className='border border-gray-600 py-1 px-3 rounded-sm'
          />
        ) : (
          <p key={key}>{String(value)}</p>
        )
      )
    })

    if (onUpdate) {
      row.push(
        <button
          key='update'
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault()
            const tr = (e.target as HTMLElement).closest('tr')
            if (!tr) return

            const inputs = tr.querySelectorAll('input')
            const formData = new FormData()
            inputs.forEach(input => {
              const name = input.getAttribute('name')
              const value = (input as HTMLInputElement).value
              if (name) formData.append(name, value)
            })

            const updatedData = Object.fromEntries(
              formData.entries()
            ) as unknown as T
            onUpdate(updatedData)
          }}
          className='w-full bg-blue-600 text-white rounded-sm p-2 hover:cursor-pointer hover:bg-blue-700'
        >
          Actualizar
        </button>
      )
    }

    return {
      id: getId(element),
      raw: element,
      cells: row
    }
  })
}
