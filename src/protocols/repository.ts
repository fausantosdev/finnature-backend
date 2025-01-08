export abstract class Repository {
  abstract create(data: object): Promise<object>
  abstract read(where: object): Promise<object[]>
  abstract findOne(where: object): Promise<object | null>
  abstract update(where: object, data: object): Promise<object>
  abstract delete(where: object): Promise<object | null>
}
