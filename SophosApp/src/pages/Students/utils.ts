import type { InputField } from "@/types/RecordComponents"
export const INPUT_FIELDS: InputField[] = [
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

export const StudentsExample = [{
  "id": 1,
  "code": "587-85-2277",
  "fullname": "Elke Cholmondeley",
  "birthdate": "12/05/2003",
  "cellphone": "827-606-6409",
  "email": "echolmondeley0@simplemachines.org",
  "faculty": "Product Management",
  "enrolled_credits": 4,
  "current_semester": 8
}, {
  "id": 2,
  "code": "491-41-5223",
  "fullname": "Nevil Whitcombe",
  "birthdate": "30/03/1959",
  "cellphone": "322-833-7128",
  "email": "nwhitcombe1@nsw.gov.au",
  "faculty": "Support",
  "enrolled_credits": 4,
  "current_semester": 5
}, {
  "id": 3,
  "code": "344-20-8645",
  "fullname": "Marquita Callaway",
  "birthdate": "16/12/1996",
  "cellphone": "839-877-4681",
  "email": "mcallaway2@soundcloud.com",
  "faculty": "Training",
  "enrolled_credits": 3,
  "current_semester": 9
}, {
  "id": 4,
  "code": "627-48-3967",
  "fullname": "Rudy Worsell",
  "birthdate": "24/07/1969",
  "cellphone": "671-117-8261",
  "email": "rworsell3@virginia.edu",
  "faculty": "Product Management",
  "enrolled_credits": 5,
  "current_semester": 8
}, {
  "id": 5,
  "code": "373-19-0756",
  "fullname": "Cori Kelson",
  "birthdate": "02/11/2011",
  "cellphone": "227-777-9069",
  "email": "ckelson4@gov.uk",
  "faculty": "Business Development",
  "enrolled_credits": 3,
  "current_semester": 7
}, {
  "id": 6,
  "code": "197-08-6635",
  "fullname": "Sybila Fawdrie",
  "birthdate": "03/08/1988",
  "cellphone": "451-644-7839",
  "email": "sfawdrie5@illinois.edu",
  "faculty": "Engineering",
  "enrolled_credits": 4,
  "current_semester": 9
}, {
  "id": 7,
  "code": "485-77-6894",
  "fullname": "Homere Nuzzi",
  "birthdate": "21/07/1987",
  "cellphone": "796-789-2668",
  "email": "hnuzzi6@shop-pro.jp",
  "faculty": "Research and Development",
  "enrolled_credits": 3,
  "current_semester": 3
}, {
  "id": 8,
  "code": "559-73-6388",
  "fullname": "Arielle Walkowski",
  "birthdate": "19/04/1972",
  "cellphone": "176-974-7945",
  "email": "awalkowski7@illinois.edu",
  "faculty": "Sales",
  "enrolled_credits": 3,
  "current_semester": 8
}, {
  "id": 9,
  "code": "822-77-9267",
  "fullname": "Skell Eggleton",
  "birthdate": "10/09/2018",
  "cellphone": "191-144-7942",
  "email": "seggleton8@ed.gov",
  "faculty": "Business Development",
  "enrolled_credits": 5,
  "current_semester": 10
}, {
  "id": 10,
  "code": "553-98-1158",
  "fullname": "Teodora MacIntosh",
  "birthdate": "07/01/1968",
  "cellphone": "678-632-3075",
  "email": "tmacintosh9@blogs.com",
  "faculty": "Legal",
  "enrolled_credits": 5,
  "current_semester": 2
}, {
  "id": 11,
  "code": "169-83-5458",
  "fullname": "Modesta Duligall",
  "birthdate": "20/12/2005",
  "cellphone": "937-326-9216",
  "email": "mduligalla@si.edu",
  "faculty": "Human Resources",
  "enrolled_credits": 4,
  "current_semester": 5
}, {
  "id": 12,
  "code": "765-33-7577",
  "fullname": "Huntley Gwilt",
  "birthdate": "30/05/2016",
  "cellphone": "244-766-7814",
  "email": "hgwiltb@va.gov",
  "faculty": "Human Resources",
  "enrolled_credits": 4,
  "current_semester": 1
}, {
  "id": 13,
  "code": "261-11-5487",
  "fullname": "Lorianne Topley",
  "birthdate": "24/07/1962",
  "cellphone": "382-750-1812",
  "email": "ltopleyc@netlog.com",
  "faculty": "Support",
  "enrolled_credits": 3,
  "current_semester": 7
}, {
  "id": 14,
  "code": "543-31-9658",
  "fullname": "Fremont Brehaut",
  "birthdate": "12/11/1986",
  "cellphone": "835-577-6500",
  "email": "fbrehautd@ifeng.com",
  "faculty": "Research and Development",
  "enrolled_credits": 5,
  "current_semester": 8
}, {
  "id": 15,
  "code": "272-58-8463",
  "fullname": "Masha Le Leu",
  "birthdate": "28/02/1982",
  "cellphone": "115-179-8008",
  "email": "mlee@wired.com",
  "faculty": "Human Resources",
  "enrolled_credits": 4,
  "current_semester": 9
}, {
  "id": 16,
  "code": "593-82-9255",
  "fullname": "Mordecai Aronovitz",
  "birthdate": "24/03/2007",
  "cellphone": "460-981-9509",
  "email": "maronovitzf@oracle.com",
  "faculty": "Support",
  "enrolled_credits": 5,
  "current_semester": 4
}, {
  "id": 17,
  "code": "359-44-4209",
  "fullname": "Mile Phillip",
  "birthdate": "14/01/1998",
  "cellphone": "310-665-3335",
  "email": "mphillipg@nhs.uk",
  "faculty": "Engineering",
  "enrolled_credits": 3,
  "current_semester": 7
}, {
  "id": 18,
  "code": "206-44-7790",
  "fullname": "Cornelia Bisley",
  "birthdate": "16/09/1975",
  "cellphone": "263-736-6608",
  "email": "cbisleyh@topsy.com",
  "faculty": "Engineering",
  "enrolled_credits": 4,
  "current_semester": 4
}, {
  "id": 19,
  "code": "347-61-8529",
  "fullname": "Frederico Calbaithe",
  "birthdate": "22/06/2010",
  "cellphone": "648-330-9168",
  "email": "fcalbaithei@yellowbook.com",
  "faculty": "Accounting",
  "enrolled_credits": 4,
  "current_semester": 7
}, {
  "id": 20,
  "code": "713-18-5027",
  "fullname": "Freeman Chevin",
  "birthdate": "14/01/1954",
  "cellphone": "697-571-9873",
  "email": "fchevinj@tinyurl.com",
  "faculty": "Research and Development",
  "enrolled_credits": 4,
  "current_semester": 9
}]
