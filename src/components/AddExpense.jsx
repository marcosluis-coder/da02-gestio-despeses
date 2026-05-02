import { useState } from "react"
import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { db } from "../firebase"

export default function AddExpense({ project }) {
  const [concept, setConcept] = useState("")
  const [amount, setAmount] = useState("")
  const [paidBy, setPaidBy] = useState(project.participants[0]?.name)
  const [splitBetween, setSplitBetween] = useState(
    project.participants.map(p => p.name)
  )

  const toggleParticipant = (name) => {
    setSplitBetween(prev =>
      prev.includes(name)
        ? prev.filter(p => p !== name)
        : [...prev, name]
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
  if (!concept.trim() || amount <= 0 || splitBetween.length === 0) return

    await addDoc(
      collection(db, "projects", project.id, "expenses"),
      {
        concept,
        amount: Number(amount),
        paidBy,
        splitBetween,
        createdAt: serverTimestamp()
      }
    )

    setConcept("")
    setAmount("")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 border p-3 rounded">
      <h3 className="font-bold">Afegir despesa</h3>

      <input
        className="input input-bordered w-full"
        placeholder="Concepte"
        value={concept}
        onChange={(e) => setConcept(e.target.value)}
      />

      <input
        className="input input-bordered w-full"
        type="number"
        placeholder="Quantia"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <select
        className="select select-bordered w-full"
        value={paidBy}
        onChange={(e) => setPaidBy(e.target.value)}
      >
        {project.participants.map(p => (
          <option key={p.id} value={p.name}>
            {p.name}
          </option>
        ))}
      </select>

      <div>
        <p className="font-semibold">Dividir entre:</p>
        {project.participants.map(p => (
          <label key={p.id} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={splitBetween.includes(p.name)}
              onChange={() => toggleParticipant(p.name)}
            />
            {p.name}
          </label>
        ))}
      </div>

      <button className="btn btn-primary w-full">
        Afegir
      </button>
    </form>
  )
}

