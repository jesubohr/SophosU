import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { AuthProvider } from "@/context/AuthContext"

import App from "./App"
import { ProtectedRoute } from "@/components/ProtectedRoute"
import { NotFound } from "@/pages/NotFound"
import { Login } from "@/pages/Login"
import { Register } from "@/pages/Register"
import { Home } from "@/pages/Home"

import { ListStudents, AddStudent, EditStudent } from "@/pages/Students"

import "./index.css"

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={ new QueryClient() }>
        <AuthProvider>
          <Routes>
            <Route path="/" element={
              <ProtectedRoute>
                <App />
              </ProtectedRoute>
            }>
              <Route index element={ <Home /> } />
              <Route path="/students">
                <Route index element={ <ListStudents /> } />
                <Route path="add" element={ <AddStudent /> } />
                <Route path=":id/edit" element={ <EditStudent /> } />
              </Route>
            </Route>
            <Route path="*" element={ <NotFound /> } />
            <Route path="/login" element={ <Login /> } />
            <Route path="/register" element={ <Register /> } />
          </Routes>
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
)
