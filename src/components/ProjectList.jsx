import { useEffect, useState } from "react"
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  deleteDoc,
  doc
} from "firebase/firestore"
import { db } from "../firebase"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"

export default function ProjectList() {
  const { user } = useAuth()
  const [projects, setProjects] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
  if (!user) return

  const q = query(
    collection(db, "projects"),
    where("ownerUid", "==", user.uid),
    orderBy("createdAt", "desc")
  )

  const unsub = onSnapshot(q, (snapshot) => {
    setProjects(
      snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
    )
  })

  return () => unsub()
}, [user])


  const deleteProject = async (id) => {
    if (!confirm("Segur que vols eliminar aquest projecte?")) return
    await deleteDoc(doc(db, "projects", id))
  }

  return (
    <ul className="space-y-2">
      {projects.map(project => (
        <li
          key={project.id}
          className="p-3 border rounded flex justify-between items-center cursor-pointer hover:bg-gray-50"
          onClick={() => navigate(`/projects/${project.id}`)}
        >
          <span className="font-medium">{project.title}</span>

          <button
            className="btn btn-xs btn-error"
            onClick={(e) => {
              e.stopPropagation()
              deleteProject(project.id)
            }}
          >
            Eliminar
          </button>
        </li>
      ))}

      {projects.length === 0 && (
        <p className="italic text-gray-500">
          Encara no hi ha projectes
        </p>
      )}
    </ul>
  )
}
