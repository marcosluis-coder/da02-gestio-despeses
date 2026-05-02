import { useState } from "react"
import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { db } from "../firebase"
import { useAuth } from "../context/AuthContext"

export default function AddProject({ onCreated }) {
  const [title, setTitle] = useState("")
  const { user } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title.trim()) return

    await addDoc(collection(db, "projects"), {
      title,
      ownerUid: user.uid,
      participants: [
        {
          id: user.uid,
          name: user.email
        }
      ],
      participantIds: [user.uid],
      createdAt: serverTimestamp()
    })

    setTitle("")
    onCreated && onCreated()
  }

  

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        className="input input-bordered w-full"
        placeholder="Nom del projecte"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button className="btn btn-primary">Crear</button>
    </form>
  )
}
