import { Test, TestingModule } from '@nestjs/testing';
import { FilialesResolver } from './filiales.resolver';
import { FilialesService } from './filiales.service';

describe('FilialesResolver', () => {
  let resolver: FilialesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FilialesResolver, FilialesService],
    }).compile();

    resolver = module.get<FilialesResolver>(FilialesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
