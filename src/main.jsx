import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import App from "./App"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Tasks from "./pages/Tasks"
import NotFound from "./pages/NotFound"
import "./index.css"
import { AuthProvider } from "./context/AuthContext"
import ProtectedRoute from "./components/ProtectedRoute"
import { Toaster } from "react-hot-toast"
import { FaTrash } from "react-icons/fa"



<Route
  path="/"
  element={
    <ProtectedRoute>
      <Tasks />
    </ProtectedRoute>
  }
/>

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
  <BrowserRouter>
    <AuthProvider>

      <Toaster position="top-right" />

      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Tasks />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

    </AuthProvider>
  </BrowserRouter>
</React.StrictMode>

)
