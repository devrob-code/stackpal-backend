import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class LoginResponse {
  @Expose()
  id: number;

  @Expose()
  email: string;

  @Expose()
  phone?: string;

  @Expose()
  username: string;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  accessToken: string;

  @Expose()
  expiresIn: string;
}
