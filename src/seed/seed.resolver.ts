import { Resolver, Mutation } from '@nestjs/graphql';
import { SeedService } from './seed.service';

@Resolver(() => Boolean)
export class SeedResolver {
  constructor(private readonly seedService: SeedService) {}

  @Mutation(() => Boolean, {
    name: 'executeSeed',
    description: 'Executes the construction of the test data',
  })
  executeSeed(): Promise<boolean> {
    return this.seedService.executeSeed();
  }
}
