import { Exclude, Expose } from 'class-transformer';
import { UserRoles } from 'src/user/user.constants';

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
  role: UserRoles;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  accessToken?: string;

  @Expose()
  expiresIn?: string;

  @Expose()
  avatar?: string;

  @Expose()
  dob?: string;

  @Expose()
  bvnVerified?: boolean;
}
