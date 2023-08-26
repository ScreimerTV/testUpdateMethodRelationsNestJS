import { Test, TestingModule } from '@nestjs/testing';
import { FilialesService } from './filiales.service';

describe('FilialesService', () => {
  let service: FilialesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FilialesService],
    }).compile();

    service = module.get<FilialesService>(FilialesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
