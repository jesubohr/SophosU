import type { InputField } from "@/types/RecordComponents"

export const STUDENT_INPUTS: InputField[] = [
  {
    name: "code",
    label: "Code",
    type: "text",
    maxLength: 9,
    required: true,
    placeholder: "123456789"
  },
  {
    name: "fullname",
    label: "Fullname",
    type: "text",
    required: true,
    placeholder: "John Doe"
  },
  {
    name: "birthdate",
    label: "Birthdate",
    type: "date",
    required: true,
    placeholder: "20/03/2000"
  },
  {
    name: "cellphone",
    label: "Cellphone",
    type: "text",
    maxLength: 10,
    required: true,
    placeholder: "3001234567"
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    required: true,
    placeholder: "johndoe@sophosu.com"
  },
  {
    name: "faculty",
    label: "Faculty",
    type: "text",
    required: true,
    placeholder: "Ingeniería de Sistemas"
  },
  {
    name: "enrolled_credits",
    label: "Enrolled Credits",
    type: "number",
    min: 0,
    max: 21,
    required: true,
    placeholder: "15"
  },
  {
    name: "current_semester",
    label: "Current Semester",
    type: "number",
    min: 1,
    max: 10,
    required: true,
    placeholder: "5"
  }
]

export const TEACHER_INPUTS: InputField[] = [
  {
    name: "code",
    label: "Code",
    type: "text",
    required: true,
    placeholder: "123456789"
  },
  {
    name: "fullname",
    label: "Fullname",
    type: "text",
    required: true,
    placeholder: "John Doe"
  },
  {
    name: "birthdate",
    label: "Birthdate",
    type: "date",
    required: true,
    placeholder: "15/03/1970"
  },
  {
    name: "cellphone",
    label: "Cellphone",
    type: "text",
    required: true,
    placeholder: "3001234567"
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    required: true,
    placeholder: "johndoe@sophosu.com"
  },
  {
    name: "faculty",
    label: "Faculty",
    type: "text",
    required: true,
    placeholder: "Ingeniería de Sistemas"
  },
  {
    name: "academic_title",
    label: "Academic Title",
    type: "text",
    required: true,
    placeholder: "Maestría"
  },
  {
    name: "years_experience",
    label: "Years Experience",
    type: "number",
    min: 1,
    max: 60,
    required: true,
    placeholder: "5"
  }
]

export const COURSE_INPUTS: InputField[] = [
  {
    name: "name",
    label: "Name",
    type: "text",
    required: true,
    placeholder: "Cálculo II"
  },
  {
    name: "precourse",
    label: "Precourse",
    type: "text",
    required: true,
    placeholder: "Cálculo I"
  },
  {
    name: "faculty",
    label: "Faculty",
    type: "text",
    required: true,
    placeholder: "Matemáticas"
  },
  {
    name: "required_credits",
    label: "Enrolled Credits",
    type: "number",
    min: 3,
    max: 5,
    required: true,
    placeholder: "4"
  },
  {
    name: "enrolled_students",
    label: "Enrolled Students",
    type: "number",
    min: 1,
    max: 40,
    required: true,
    placeholder: "20"
  },
  {
    name: "max_students",
    label: "Max Students",
    type: "number",
    min: 10,
    max: 40,
    required: true,
    placeholder: "30"
  }
]
