const Allowed = {
  Uppers: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  Lowers: "abcdefghijklmnopqrstuvwxyz",
  Numbers: "0123456789",
  Symbols: "&/\\^=?!@#$%*+.,:;|",
  Brackets: "()[]{}<>",
  Dashes: "-_"
}
const getRandomCharFromString = (str: string) =>
  str.charAt(Math.floor(Math.random() * str.length))

// Password will be at least 10 characters, and have at least one upper, one lower, one number and one symbol
export function generatePassword(length = 16) {
  let password = ""
  const included = Object.values(Allowed)

  // Add a random character from each included type
  included.forEach((chars) => {
    password += getRandomCharFromString(chars)
  })

  // Fill the rest with random characters
  for (let i = password.length; i < length; i++) {
    password += getRandomCharFromString(included.join(""))
  }
  return password
}

export function isValidEmail(email: string) {
  const emailRegex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/
  return emailRegex.test(email.toLowerCase())
}

export function isSecurePassword(password: string) {
  const passwordRegex =
    /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){12,32}$/
  return passwordRegex.test(password)
}
