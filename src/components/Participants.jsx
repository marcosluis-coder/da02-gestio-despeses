import { useState } from "react"
import { doc, updateDoc } from "firebase/firestore"
import { db } from "../firebase"

export default function Participants({ project }) {
  const [name, setName] = useState("")

  const addParticipant = async () => {
    if (!name.trim()) return

    const newParticipant = {
      id: Date.now().toString(),
      name: name.trim(),
    }

    const newParticipants = [...project.participants, newParticipant]

    const ref = doc(db, "projects", project.id)

    await updateDoc(ref, {
      participants: newParticipants,
      participantIds: newParticipants.map(p => p.id),
    })

    setName("")
  }

  const removeParticipant = async (id) => {
    if (project.participants.length === 1) return

    const newParticipants = project.participants.filter(p => p.id !== id)

    const ref = doc(db, "projects", project.id)

    await updateDoc(ref, {
      participants: newParticipants,
      participantIds: newParticipants.map(p => p.id),
    })
  }

  return (
    <div className="border p-3 rounded space-y-2">
      <h3 className="font-bold">Participants</h3>

      <ul className="space-y-1">
        {project.participants.map(p => (
          <li
            key={p.id}
            className="flex justify-between items-center"
          >
            <span>{p.name}</span>
            <button
              className="btn btn-xs btn-error"
              onClick={() => removeParticipant(p.id)}
            >
              ❌
            </button>
          </li>
        ))}
      </ul>

      <div className="flex gap-2">
        <input
          className="input input-bordered w-full"
          placeholder="Nom del participant"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          className="btn btn-primary"
          onClick={addParticipant}
        >
          Afegir
        </button>
      </div>

      <p className="text-xs text-gray-500">
        * No es pot eliminar l’últim participant
      </p>
    </div>
  )
}
