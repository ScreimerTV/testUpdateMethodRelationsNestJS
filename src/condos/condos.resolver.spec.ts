import { Test, TestingModule } from '@nestjs/testing';
import { CondosResolver } from './condos.resolver';
import { CondosService } from './condos.service';

describe('CondosResolver', () => {
  let resolver: CondosResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CondosResolver, CondosService],
    }).compile();

    resolver = module.get<CondosResolver>(CondosResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
