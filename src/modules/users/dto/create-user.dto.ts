import { IsEmail, IsNotEmpty, Length } from 'class-validator'

export class CreateUserDto {
  @IsNotEmpty({
    message: 'Name is required',
  })
  @Length(3, 100, {
    message: 'Name must be between 3 and 100 characters',
  })
  name: string

  @IsNotEmpty({
    message: 'Email is required',
  })
  @IsEmail(
    {},
    {
      message: 'Email must be a valid email',
    }
  )
  email: string

  @IsNotEmpty({
    message: 'Password is required',
  })
  @Length(6, 100, {
    message: 'Password must be between 6 and 100 characters',
  })
  password: string
}
