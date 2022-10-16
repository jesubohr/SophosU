export function fuzzySearch (needle: string, haystack: string) {
  let hlen = haystack.length
  let nlen = needle.length

  if (nlen > hlen) return false
  if (nlen === hlen) return needle === haystack

  outer: for (let i = 0, j = 0; i < nlen; i++) {
    let nch = needle.charCodeAt(i)
    while (j < hlen) {
      if (haystack.charCodeAt(j++) === nch) {
        continue outer
      }
    }
    return false
  }
  return true
}
