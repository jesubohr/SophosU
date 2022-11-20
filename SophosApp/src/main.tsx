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

import {
  ListStudents,
  AddStudent,
  EditStudent,
  ViewStudent
} from "@/pages/Students"
import {
  ListTeachers,
  AddTeacher,
  EditTeacher,
  ViewTeacher
} from "@/pages/Teachers"
import { ListCourses, AddCourse, EditCourse, ViewCourse } from "@/pages/Courses"

import "./index.css"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={new QueryClient()}>
        <AuthProvider>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <App />
                </ProtectedRoute>
              }
            >
              <Route index element={<Home />} />
              <Route path="/students">
                <Route index element={<ListStudents />} />
                <Route path="add" element={<AddStudent />} />
                <Route path=":id" element={<ViewStudent />} />
                <Route path="edit/:id" element={<EditStudent />} />
              </Route>
              <Route path="/teachers">
                <Route index element={<ListTeachers />} />
                <Route path="add" element={<AddTeacher />} />
                <Route path=":id" element={<ViewTeacher />} />
                <Route path="edit/:id" element={<EditTeacher />} />
              </Route>
              <Route path="/courses">
                <Route index element={<ListCourses />} />
                <Route path="add" element={<AddCourse />} />
                <Route path=":id" element={<ViewCourse />} />
                <Route path="edit/:id" element={<EditCourse />} />
              </Route>
            </Route>
            <Route path="*" element={<NotFound />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
)
