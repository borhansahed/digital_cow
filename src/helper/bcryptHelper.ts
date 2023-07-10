import bcrypt from 'bcrypt'
const bcryptPassword = async (
  password: string,
  saltRound: string
): Promise<string> => {
  return await bcrypt.hash(password, Number(saltRound))
}

const comparePassword = async (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(givenPassword, savedPassword)
}

export const BcryptHelper = {
  bcryptPassword,
  comparePassword,
}
