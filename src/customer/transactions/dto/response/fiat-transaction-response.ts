import { Exclude, Expose, Type } from 'class-transformer';

@Exclude()
export class FiatTransactionResponse {
  @Expose()
  id: number;

  @Expose()
  userId: number;

  @Expose()
  txId: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
