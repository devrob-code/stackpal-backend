import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class SendFiatResponse {
  @Expose()
  status: boolean;

  @Expose()
  message: any;

  @Expose()
  data: any;
}
