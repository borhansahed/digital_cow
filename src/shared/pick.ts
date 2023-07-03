const pick = <T extends Record<string, unknown>, K extends keyof T>(
  obj: T,
  Keys: K[]
): Partial<T> => {
  const finalObj: Partial<T> = {}

  Keys.forEach(key => {
    if (obj && Object.hasOwnProperty.call(obj, key)) {
      finalObj[key] = obj[key]
    }
  })

  return finalObj
}

export default pick
