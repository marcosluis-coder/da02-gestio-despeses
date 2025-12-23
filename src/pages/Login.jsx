import { useState } from "react"
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { auth } from "../firebase"
import { useNavigate } from "react-router-dom"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleEmailLogin = async (e) => {
    e.preventDefault()
    await signInWithEmailAndPassword(auth, email, password)
    navigate("/")
  }

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider()
    await signInWithPopup(auth, provider)
    navigate("/")
  }

  return (
    <form onSubmit={handleEmailLogin} className="p-4 max-w-sm mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Login</h1>

      <input
        className="input input-bordered w-full"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="input input-bordered w-full"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="btn btn-primary w-full">
        Entrar
      </button>

      {/* BOTÓ GOOGLE */}
      <button
        type="button"
        className="btn btn-outline w-full"
        onClick={handleGoogleLogin}
      >
        Entrar amb Google
      </button>
    </form>
  )
}
