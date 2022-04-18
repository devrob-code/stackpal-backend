import { Exclude, Expose, Transform } from 'class-transformer';

@Exclude()
export class CurrencyResponse {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  alias: string;

  @Expose()
  logo: string;

  @Expose()
  @Transform(({ value }) => parseInt(value))
  price: string;

  @Expose()
  isActive: boolean;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
