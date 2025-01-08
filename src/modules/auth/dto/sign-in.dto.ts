import { IsEmail, IsNotEmpty, Length } from 'class-validator'

export class SignInDto {
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
