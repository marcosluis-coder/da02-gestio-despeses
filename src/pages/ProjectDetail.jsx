import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { doc, onSnapshot } from "firebase/firestore"
import { db } from "../firebase"
import AddExpense from "../components/AddExpense"
import ExpenseList from "../components/ExpenseList"
import ExpenseSummary from "../components/ExpenseSummary"
import Participants from "../components/Participants"



export default function ProjectDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
  const ref = doc(db, "projects", id)

  const unsub = onSnapshot(ref, (snap) => {
    if (!snap.exists()) {
      navigate("/")
      return
    }

    setProject({ id: snap.id, ...snap.data() })
    setLoading(false)
  })

  return () => unsub()
}, [id, navigate])


  if (loading) return <p className="p-4">Carregant projecte...</p>

  return (
    <div className="p-4 max-w-md mx-auto space-y-4">
      <button className="btn btn-sm" onClick={() => navigate("/")}>
        ← Tornar
      </button>

      <h1 className="text-2xl font-bold">{project.title}</h1>

      <Participants project={project} />

      <AddExpense project={project} />
      <ExpenseList projectId={project.id} />
      <ExpenseSummary project={project} />


    </div>
  )
}
