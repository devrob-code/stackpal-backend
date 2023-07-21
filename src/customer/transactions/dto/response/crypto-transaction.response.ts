import { Exclude, Expose, Type } from 'class-transformer';

@Exclude()
export class ReceiverResponse {
  @Expose()
  id: number;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  username: string;

  @Expose()
  avatar: string;
}

@Exclude()
export class CryptoTransactionResponse {
  @Expose()
  id: number;

  @Expose()
  userId: number;

  @Expose()
  txId: string;

  @Expose()
  type: string;

  @Expose()
  sendType: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  @Type(() => ReceiverResponse)
  receiver: any;
}
