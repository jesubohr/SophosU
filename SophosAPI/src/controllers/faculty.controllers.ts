import type { Request, Response } from "express"
import * as FacultyServices from "../services/faculty.services"

export async function getAllFaculties (_: Request, res: Response) {
  try {
    const faculties = await FacultyServices.getAllFaculties()
    return res.json({ status: 'OK', data: faculties })
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' })
  }
}

export async function getFacultyById (req: Request, res: Response) {
  const { id } = req.params
  if(Number.isNaN(Number(id))) return res.status(400).json({ error: 'Invalid ID. It must be a number' })

  try {
    const faculty = await FacultyServices.getFacultyById(Number(id))
    return res.json({ status: 'OK', data: faculty })
  } catch (error) {
    return res.status(404).json({ error: 'Faculty not found' })
  }
}

export async function createFaculty (req: Request, res: Response) {
  const { name } = req.body
  if (!name) return res.status(400).json({ error: 'Missing faculty name' })
  
  try {
    const faculty = await FacultyServices.createFaculty(name)
    return res.status(201).json({ status: 'OK', data: faculty })
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' })
  }
}

export async function updateFaculty (req: Request, res: Response) {
  const { id } = req.params
  if(Number.isNaN(Number(id))) return res.status(400).json({ error: 'Invalid ID. It must be a number' })

  const { name } = req.body
  if (!name) return res.status(400).json({ error: 'Missing faculty name' })

  try {
    const faculty = await FacultyServices.updateFaculty(Number(id), name)
    return res.json({ status: 'OK', data: faculty })
  } catch (error) {
    return res.status(404).json({ error: 'Faculty not found' })
  }
}

export async function deleteFaculty (req: Request, res: Response) {
  const { id } = req.params
  if(Number.isNaN(Number(id))) return res.status(400).json({ error: 'Invalid ID. It must be a number' })
  
  try {
    const faculty = await FacultyServices.deleteFaculty(Number(id))
    return res.json({ status: 'OK', data: faculty })
  } catch (error) {
    return res.status(404).json({ error: 'Faculty not found' })
  }
}
