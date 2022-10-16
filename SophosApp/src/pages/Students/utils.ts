import type { InputField } from "@/types/RecordComponents"
export const INPUT_FIELDS: InputField[] = [
  {
    name: "code",
    label: "Code",
    type: "text",
    maxLength: 9,
    required: true,
  },
  {
    name: "fullname",
    label: "Fullname",
    type: "text",
    required: true,
  },
  {
    name: "birthdate",
    label: "Birthdate",
    type: "date",
    required: true,
  },
  {
    name: "cellphone",
    label: "Cellphone",
    type: "text",
    maxLength: 10,
    required: true,
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    required: true,
  },
  {
    name: "faculty",
    label: "Faculty",
    type: "text",
    required: true,
  },
  {
    name: "enrolled_credits",
    label: "Enrolled Credits",
    type: "number",
    min: 0,
    max: 21,
    required: true,
  },
  {
    name: "current_semester",
    label: "Current Semester",
    type: "number",
    min: 1,
    max: 10,
    required: true,
  }
]

export const StudentsExample = [{
  "id": 1,
  "fullname": "Erhart Osgorby",
  "faculty": "Accounting",
  "enrolled_credits": 15
}, {
  "id": 2,
  "fullname": "Ora Stronach",
  "faculty": "Support",
  "enrolled_credits": 8
}, {
  "id": 3,
  "fullname": "Saudra Giriardelli",
  "faculty": "Marketing",
  "enrolled_credits": 19
}, {
  "id": 4,
  "fullname": "Lyn Spacey",
  "faculty": "Engineering",
  "enrolled_credits": 20
}, {
  "id": 5,
  "fullname": "Karyn Mc Gaughey",
  "faculty": "Accounting",
  "enrolled_credits": 21
}, {
  "id": 6,
  "fullname": "Ciel Bardnam",
  "faculty": "Marketing",
  "enrolled_credits": 12
}, {
  "id": 7,
  "fullname": "Aurore Dolder",
  "faculty": "Engineering",
  "enrolled_credits": 21
}, {
  "id": 8,
  "fullname": "Constantine Hamman",
  "faculty": "Training",
  "enrolled_credits": 3
}, {
  "id": 9,
  "fullname": "Barby Duligall",
  "faculty": "Marketing",
  "enrolled_credits": 10
}, {
  "id": 10,
  "fullname": "Job Capey",
  "faculty": "Marketing",
  "enrolled_credits": 7
}, {
  "id": 11,
  "fullname": "Gertrude McNee",
  "faculty": "Engineering",
  "enrolled_credits": 16
}, {
  "id": 12,
  "fullname": "Hildy Hambers",
  "faculty": "Sales",
  "enrolled_credits": 6
}, {
  "id": 13,
  "fullname": "Lowell Lushey",
  "faculty": "Human Resources",
  "enrolled_credits": 14
}, {
  "id": 14,
  "fullname": "Kalvin Eldrid",
  "faculty": "Services",
  "enrolled_credits": 6
}, {
  "id": 15,
  "fullname": "Gustaf Eddisforth",
  "faculty": "Training",
  "enrolled_credits": 7
}, {
  "id": 16,
  "fullname": "Tedd Rodder",
  "faculty": "Research and Development",
  "enrolled_credits": 12
}, {
  "id": 17,
  "fullname": "Griffin Catto",
  "faculty": "Research and Development",
  "enrolled_credits": 7
}, {
  "id": 18,
  "fullname": "Crystal Tomasik",
  "faculty": "Accounting",
  "enrolled_credits": 11
}, {
  "id": 19,
  "fullname": "Yettie Piggen",
  "faculty": "Human Resources",
  "enrolled_credits": 6
}, {
  "id": 20,
  "fullname": "Albrecht Gircke",
  "faculty": "Marketing",
  "enrolled_credits": 10
}]
