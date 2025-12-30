import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { doc, getDoc } from "firebase/firestore"
import { db } from "../firebase"
import AddExpense from "../components/AddExpense"
import ExpenseList from "../components/ExpenseList"
import ExpenseSummary from "../components/ExpenseSummary"


export default function ProjectDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProject = async () => {
      const ref = doc(db, "projects", id)
      const snap = await getDoc(ref)

      if (!snap.exists()) {
        navigate("/")
        return
      }

      setProject({ id: snap.id, ...snap.data() })
      setLoading(false)
    }

    fetchProject()
  }, [id, navigate])

  if (loading) return <p className="p-4">Carregant projecte...</p>

  return (
    <div className="p-4 max-w-md mx-auto space-y-4">
      <button className="btn btn-sm" onClick={() => navigate("/")}>
        ← Tornar
      </button>

      <h1 className="text-2xl font-bold">{project.title}</h1>

      <p className="text-sm font-semibold">Participants:</p>
      <AddExpense project={project} />
      <ExpenseList projectId={project.id} />
      <ExpenseSummary project={project} />
      <ul className="list-disc ml-5">
        {project.participants.map(p => (
          <li key={p.id}>{p.name}</li>
        ))}
      </ul>

      <p className="italic text-gray-500">
        Encara no hi ha despeses en aquest projecte
      </p>
    </div>
  )
}
