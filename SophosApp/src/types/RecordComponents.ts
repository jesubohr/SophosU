export type InputField = {
  name: string
  label: string
  type: string
  min?: number
  max?: number
  maxLength?: number
  placeholder: string
  defaultValue?: string
}

export interface Option {
  label: string
  value: number
}
