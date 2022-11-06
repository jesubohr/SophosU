export function exclude<Record, Key extends keyof Record>(
  record: Record, ...keys: Key[]):Omit<Record, Key> {
  const newRecord = { ...record }
  for (let key of keys) {
    delete newRecord[key]
  }
  return newRecord
}

