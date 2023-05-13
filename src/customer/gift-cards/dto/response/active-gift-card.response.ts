import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ActiveGiftCardResponse {
  @Expose()
  status: boolean;

  @Expose()
  data: ActiveGiftCardResponseData[];
}

export class ActiveGiftCardResponseData {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  imageUrl: string;
}
