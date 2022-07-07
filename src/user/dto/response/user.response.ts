import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UserResponse {
  @Expose()
  id: number;

  @Expose()
  username: string;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  role: string;
}
