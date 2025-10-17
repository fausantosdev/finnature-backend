export class User {
  id: string
  name: string
  date_of_birth: Date | string
  email: string
  password_hash: string
  role: string
  password_reset_token: string
  password_reset_expires: Date | string
  created_at: Date | string
  updated_at: Date | string
}
