import { Exclude, Expose } from 'class-transformer';

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
}
