import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class GiftCardResponse {
  @Expose()
  id: number;

  @Expose()
  userId: number;

  @Expose()
  cardNo: string;

  @Expose()
  imageUrl: string;

  @Expose()
  isApproved: boolean;

  @Expose()
  approvedBy: number;

  @Expose()
  rate: number;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
