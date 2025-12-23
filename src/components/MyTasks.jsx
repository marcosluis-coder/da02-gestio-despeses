import { useEffect, useState } from "react"
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore"
import { db } from "../firebase"
import { useAuth } from "../context/AuthContext"

export default function MyTasks() {
  const { user } = useAuth()
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const q = query(
      collection(db, "tasks"),
      where("uid", "==", user.uid),
      orderBy("createdAt", "desc")
    )

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      setTasks(data)
    })

    return () => unsubscribe()
  }, [user.uid])

  const toggleDone = async (id, done) => {
    await updateDoc(doc(db, "tasks", id), {
      done: !done,
    })
  }

  const deleteTask = async (id) => {
    await deleteDoc(doc(db, "tasks", id))
  }

  return (
    <ul className="space-y-2">
      {tasks.map((task) => (
        <li
          key={task.id}
          className="flex items-center justify-between p-2 border rounded"
        >
          <span
            onClick={() => toggleDone(task.id, task.done)}
            className={`cursor-pointer ${
              task.done ? "line-through opacity-50" : ""
            }`}
          >
            {task.text}
          </span>

          <button
            className="btn btn-xs btn-error"
            onClick={() => deleteTask(task.id)}
          >
            ❌
          </button>
        </li>
      ))}
    </ul>
  )
}
