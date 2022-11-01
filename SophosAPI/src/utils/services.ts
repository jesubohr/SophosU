export function exclude<Record, Key extends keyof Record>(
  record: Record, ...keys: Key[]):Omit<Record, Key> {
  for (let key of keys) {
    delete record[key]
  }
  return record
}

