export abstract class Crypt {
  abstract hash(text: string, salt: number): Promise<string>
  abstract compare(text: string, hash: string): Promise<boolean>
  abstract random(): string
}
