import bcrypt from 'bcrypt'
const bcryptPassword = async (
  password: string,
  saltRound: string
): Promise<string> => {
  return await bcrypt.hash(password, Number(saltRound))
}

export const BcryptHelper = {
  bcryptPassword,
}
