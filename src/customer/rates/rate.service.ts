import { Injectable } from '@nestjs/common';
import { RateRepositoryService } from 'src/repositories/rates/rate-repository.service';

@Injectable()
export class RateService {
  constructor(private readonly rateRepositoryService: RateRepositoryService) {}
}
