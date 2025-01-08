import { IsNotEmpty, Length } from 'class-validator'

export class CreateWalletDto {
  user_id: string

  @IsNotEmpty({
    message:
      'Please provide a detailed and clear description to easily identify your digital wallet.',
  })
  @Length(5, 100, {
    message: 'Your description must be between 5 and 50 characters.',
  })
  description: string
}
