import { useEffect, useState } from "react"
import { collection, onSnapshot } from "firebase/firestore"
import { db } from "../firebase"

export default function ExpenseSummary({ project }) {
  const [summary, setSummary] = useState({})
  const [total, setTotal] = useState(0)

  useEffect(() => {
    if (!project?.id) return

    const ref = collection(db, "projects", project.id, "expenses")

    const unsub = onSnapshot(ref, (snapshot) => {
      const balances = {}
      let totalAmount = 0

      // Inicialitzar participants
      project.participants.forEach(p => {
        balances[p.name] = 0
      })

      snapshot.docs.forEach(doc => {
        const expense = doc.data()
        const part = expense.amount / expense.splitBetween.length

        totalAmount += expense.amount

        // Qui paga suma tot
        balances[expense.paidBy] += expense.amount

        // Qui participa resta la seva part
        expense.splitBetween.forEach(name => {
          balances[name] -= part
        })
      })

      setSummary(balances)
      setTotal(totalAmount)
    })

    return () => unsub()
  }, [project.id]) // 🔥 IMPORTANTÍSSIM

  return (
    <div className="border p-4 rounded space-y-3">
      <h3 className="text-lg font-bold">Resum del projecte</h3>

      <p className="font-semibold">
        Total despeses: {total.toFixed(2)} €
      </p>

      <ul className="space-y-1">
        {Object.entries(summary)
          .filter(([, value]) => value !== 0)
          .map(([name, value]) => (
            <li key={name} className="flex justify-between">
              <span>{name}</span>
              <span
                className={
                  value > 0
                    ? "text-green-600 font-semibold"
                    : "text-red-600 font-semibold"
                }
              >
                {value.toFixed(2)} €
              </span>
            </li>
          ))}
      </ul>
    </div>
  )
}