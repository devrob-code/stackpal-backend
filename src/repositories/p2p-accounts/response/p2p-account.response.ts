import { Exclude, Expose, Type } from 'class-transformer';

@Exclude()
export class CreatedByResponse {
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

@Exclude()
export class P2PAccountResponse {
  @Expose()
  id: number;

  @Expose()
  createdBy: number;

  @Expose()
  accountName: string;

  @Expose()
  accountNumber: string;

  @Expose()
  bankName: string;

  @Expose()
  isActive: boolean;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  @Type(() => CreatedByResponse)
  user: CreatedByResponse;
}
