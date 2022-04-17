import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello there. We are live and running';
  }

  healthCheck(): { status: boolean } {
    return { status: true };
  }
}
