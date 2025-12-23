import { useState } from "react"
import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { db } from "../firebase"
import { useAuth } from "../context/AuthContext"

export default function AddTask() {
  const [text, setText] = useState("")
  const { user } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!text.trim()) return

    await addDoc(collection(db, "tasks"), {
      text,
      done: false,
      uid: user.uid,
      createdAt: serverTimestamp(),
    })

    setText("")
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        className="input input-bordered w-full"
        placeholder="Nova tasca..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button className="btn btn-primary">Afegir</button>
    </form>
  )
}
