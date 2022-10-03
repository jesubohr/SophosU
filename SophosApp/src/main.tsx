import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { AuthProvider } from "@/context/AuthContext"

import App from "./App"
import { NotFound } from "@/pages/NotFound"

import "./index.css"

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={ new QueryClient() }>
        <AuthProvider>
          <Routes>
            <Route path="/" element={ <App /> }>
            </Route>
            <Route path="*" element={ <NotFound /> } />
          </Routes>
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
)
