export default function mask(pattern: string, text: string): string {
  const patterns = pattern.split("")
  let characters = text.replace(/\W/g, '').replace(/\s/g, '').split("")

  let maskedCharacters = []

  let indexOffset = 0

  patterns.forEach((pattern, i) => {
    if (i - indexOffset >= characters.length) {
      return
    }

    const character = characters[i - indexOffset] == null ? "" : characters[i - indexOffset]

    switch (pattern) {
      case "*":
        maskedCharacters.push(character)
        break
      case '9': {
        if (character.match(/^[0-9]/)) {
          maskedCharacters.push(character)
        }
        break
      }
      case "a":
        if (character.match(/^[a-zA-Z]/)) {
          maskedCharacters.push(character)
        }
        break
      default:
        if (character !== pattern) {
          indexOffset++
        }
        maskedCharacters.push(pattern)
        break
    }
  })

  maskedCharacters = maskedCharacters.slice(0, patterns.length)

  return maskedCharacters.join('')
}