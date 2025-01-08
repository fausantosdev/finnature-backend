import * as bcrypt from 'bcrypt'

const hash = async (text: string, salt: number): Promise<string> => {
  return await bcrypt.hash(text, salt)
}

const compare = async (text: string, hash: string): Promise<boolean> => {
  return await bcrypt.compare(text, hash)
}

export { hash, compare }
