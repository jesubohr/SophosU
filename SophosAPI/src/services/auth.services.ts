import { DB } from "../database"

// Database
export async function getUserByEmail (email: string) {
  return await DB.adminUser.findUnique({
    where: { email }
  })
}

export async function createUser (email: string, password: string) {
  return await DB.adminUser.create({
    data: { email, password }
  })
}
