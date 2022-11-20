import type { InputField, Option } from "@/types/RecordComponents"

export const STUDENT_INPUTS: InputField[] = [
  {
    name: "code",
    label: "Code",
    type: "text",
    maxLength: 9,
    placeholder: "123456789"
  },
  {
    name: "fullname",
    label: "Fullname",
    type: "text",
    placeholder: "John Doe"
  },
  {
    name: "birthdate",
    label: "Birthdate",
    type: "date",
    placeholder: "20/03/2000"
  },
  {
    name: "cellphone",
    label: "Cellphone",
    type: "text",
    maxLength: 10,
    placeholder: "3001234567"
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "johndoe@sophosu.com"
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "********"
  },
  {
    name: "faculty_id",
    label: "Faculty",
    type: "select",
    placeholder: "Ingeniería en Sophos"
  },
  {
    name: "enrolled_credits",
    label: "Enrolled Credits",
    type: "number",
    min: 0,
    max: 21,
    placeholder: "15"
  },
  {
    name: "current_semester",
    label: "Current Semester",
    type: "number",
    min: 1,
    max: 10,
    placeholder: "5"
  }
]

export const TEACHER_INPUTS: InputField[] = [
  {
    name: "code",
    label: "Code",
    type: "text",
    placeholder: "123456789"
  },
  {
    name: "fullname",
    label: "Fullname",
    type: "text",
    placeholder: "John Doe"
  },
  {
    name: "birthdate",
    label: "Birthdate",
    type: "date",
    placeholder: "15/03/1970"
  },
  {
    name: "cellphone",
    label: "Cellphone",
    type: "text",
    placeholder: "3001234567"
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "johndoe@sophosu.com"
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "********"
  },
  {
    name: "faculty_id",
    label: "Faculty",
    type: "select",
    placeholder: "Ingeniería en Sophos"
  },
  {
    name: "academic_title",
    label: "Academic Title",
    type: "text",
    placeholder: "Maestría"
  },
  {
    name: "years_experience",
    label: "Years Experience",
    type: "number",
    min: 1,
    max: 60,
    placeholder: "5"
  }
]

export const COURSE_INPUTS: InputField[] = [
  {
    name: "code",
    label: "Code",
    type: "text",
    placeholder: "123456789"
  },
  {
    name: "name",
    label: "Name",
    type: "text",
    placeholder: "Cálculo II"
  },
  {
    name: "precourse_id",
    label: "Precourse",
    type: "select",
    placeholder: "Cálculo I"
  },
  {
    name: "faculty_id",
    label: "Faculty",
    type: "select-2",
    placeholder: "Ingeniería en Sophos"
  },
  {
    name: "required_credits",
    label: "Required Credits",
    type: "number",
    min: 3,
    max: 5,
    placeholder: "4"
  },
  {
    name: "enrolled_students",
    label: "Enrolled Students",
    type: "number",
    min: 1,
    max: 40,
    placeholder: "20"
  },
  {
    name: "max_students",
    label: "Max Students",
    type: "number",
    min: 10,
    max: 40,
    placeholder: "30"
  }
]

export const fitKey = <T>(name: string) => {
  return name.slice(0, -3) as keyof T
}

export function formatDate (date: string) {
  if (date.includes("-")) return date
  const [day, month, year] = date.split("/")
  return [year, month, day].join("-")
}

export function getOptions(item: any): Option {
  return {
    label: item.name,
    value: item.id
  }
}
