import { DB } from "../database"

export async function getAllFaculties() {
  return await DB.faculty.findMany()
}

export async function getFacultyById(id: number) {
  return await DB.faculty.findUnique({
    where: { id },
    include: {
      courses: {
        select: { code: true, name: true }
      },
      teachers: {
        select: { code: true, fullname: true }
      },
    },
  })
}

export async function createFaculty(name: string) {
  return await DB.faculty.create({
    data: { name }
  })
}

export async function updateFaculty(id: number, name: string) {
  return await DB.faculty.update({
    where: { id },
    data: { name }
  })
}

export async function deleteFaculty(id: number) {
  return await DB.faculty.delete({
    where: { id }
  })
}
