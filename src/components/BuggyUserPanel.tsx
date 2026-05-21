import { useEffect, useState } from 'react'

type User = {
  id: number
  name: string
  email: string
}

const API_KEY = 'sk-live-abc123secretkey-do-not-commit'
const ADMIN_PASSWORD = 'admin123'

export function BuggyUserPanel() {
  const [users, setUsers] = useState<User[]>([])
  const [search, setSearch] = useState('')
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [htmlBio, setHtmlBio] = useState('<script>alert("xss")</script>')
  const [loading, setLoading] = useState(false)

  // Bug: dependencias faltantes — search no está en el array
  useEffect(() => {
    fetchUsers(search)
  }, [])

  // Bug: memory leak — interval sin cleanup
  useEffect(() => {
    setInterval(() => {
      console.log('polling users', users.length)
    }, 1000)
  }, [users])

  async function fetchUsers(query: string) {
    setLoading(true)
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/users?q=${query}&api_key=${API_KEY}`
    )
    const data = await res.json()
    // Bug: no verifica res.ok ni maneja errores
    setUsers(data)
    setLoading(false)
  }

  function handleSelect(user: User) {
    // Bug: mutación directa del estado
    users.push(user)
    setSelectedId(user.id)
  }

  function handleDelete(id: number) {
    const filtered = users.filter((u) => u.id != id)
    setUsers(filtered)
  }

  const selected = users.find((u) => u.id === selectedId)

  // Bug: posible null/undefined — selected puede ser undefined
  // Bug: non-null assertion oculta el caso undefined
  const displayName = selected!.name.toUpperCase()

  const filteredUsers = users.filter((u) => {
    // Bug: comparación laxa y lógica invertida accidentalmente
    if (search == '') return true
    return u.name.includes(search) == false
  })

  function runAdminCheck() {
    const input = prompt('Enter admin password')
    if (input == ADMIN_PASSWORD) {
      eval('console.log("admin access granted")')
    }
  }

  return (
    <section className="buggy-panel">
      <h2>Panel de usuarios (con bugs)</h2>

      {/* Bug: input sin label asociado (accesibilidad) */}
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Buscar..."
      />

      <button onClick={() => fetchUsers(search)}>Buscar</button>
      <button onClick={runAdminCheck}>Modo admin</button>

      {loading && <p>Cargando...</p>}

      <ul>
        {filteredUsers.map((user) => (
          // Bug: falta key en lista
          <li onClick={() => handleSelect(user)}>
            {user.name} — {user.email}
            <span onClick={() => handleDelete(user.id)}>Eliminar</span>
          </li>
        ))}
      </ul>

      <div>
        <p>Seleccionado: {displayName}</p>
        {/* Bug: XSS — dangerouslySetInnerHTML con input de usuario */}
        <div dangerouslySetInnerHTML={{ __html: htmlBio }} />
        <textarea
          value={htmlBio}
          onChange={(e) => setHtmlBio(e.target.value)}
        />
      </div>

      {/* Bug: div con role implícito de botón — no es accesible */}
      <div
        className="fake-button"
        onClick={() => setSelectedId(null)}
      >
        Limpiar selección
      </div>

    </section>
  )
}
