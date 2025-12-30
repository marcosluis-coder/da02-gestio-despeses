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

export default function ExpenseList({ projectId }) {
  const [expenses, setExpenses] = useState([])

  useEffect(() => {
    const q = query(
      collection(db, "expenses"),
      where("projectId", "==", projectId),
      orderBy("createdAt", "desc")
    )

    const unsub = onSnapshot(q, (snapshot) => {
      setExpenses(
        snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
      )
    })

    return () => unsub()
  }, [projectId])

  const deleteExpense = async (id) => {
    if (!confirm("Eliminar aquesta despesa?")) return
    await deleteDoc(doc(db, "expenses", id))
  }

  return (
    <div className="space-y-2">
      <h3 className="font-bold">Despeses</h3>

      {expenses.map(e => (
        <div key={e.id} className="border p-2 rounded">
          <div className="flex justify-between">
            <span className="font-semibold">{e.concept}</span>
            <span>{e.amount} €</span>
          </div>

          <p className="text-sm">Pagat per: {e.paidBy}</p>
          <p className="text-sm">
            Dividit entre: {e.splitBetween.join(", ")}
          </p>

          <button
            className="btn btn-xs btn-error mt-2"
            onClick={() => deleteExpense(e.id)}
          >
            Eliminar
          </button>
        </div>
      ))}

      {expenses.length === 0 && (
        <p className="italic text-gray-500">
          Encara no hi ha despeses
        </p>
      )}
    </div>
  )
}
