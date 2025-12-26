import { useAuth } from "../context/AuthContext"
import { signOut } from "firebase/auth"
import { auth } from "../firebase"
import { useNavigate } from "react-router-dom"
import AddProject from "../components/AddProject"
import ProjectList from "../components/ProjectList"

export default function Projects() {
  const { user } = useAuth()
  const navigate = useNavigate()

  if (!user) {
    return <p className="p-4">Carregant usuari...</p>
  }

  const handleLogout = async () => {
    await signOut(auth)
    navigate("/login")
  }

  return (
    <div className="p-4 max-w-md mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Els meus projectes</h1>

      <p className="text-sm">Usuari: {user.email}</p>

      {/* Crear projecte */}
      <AddProject />

      {/* Llista de projectes */}
      <ProjectList />

      <button className="btn btn-error w-full" onClick={handleLogout}>
        Tancar sessió
      </button>
    </div>
  )
}
