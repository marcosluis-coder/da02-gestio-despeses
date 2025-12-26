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

export default function ProjectList() {
  const { user } = useAuth()
  const [projects, setProjects] = useState([])

  useEffect(() => {
    const q = query(
      collection(db, "projects"),
      where("ownerUid", "==", user.uid),
      orderBy("createdAt", "desc")
    )

    const unsub = onSnapshot(q, (snap) => {
      setProjects(
        snap.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      )
    })

    return () => unsub()
  }, [user.uid])

  const deleteProject = async (id) => {
    await deleteDoc(doc(db, "projects", id))
  }

  return (
    <ul className="space-y-2">
      {projects.map(p => (
        <li
          key={p.id}
          className="flex justify-between items-center p-2 border rounded"
        >
          <span>{p.title}</span>

          <button
            className="btn btn-xs btn-error"
            onClick={() => deleteProject(p.id)}
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
