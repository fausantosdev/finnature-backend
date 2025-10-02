import { Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'

import { Crypt } from '@protocols/crypt'

@Injectable()
export class CryptService implements Crypt {
  async hash(text: string, salt: number): Promise<string> {
    return await bcrypt.hash(text, salt)
  }

  async compare(text: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(text, hash)
  }
}
