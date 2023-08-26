import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { FilialesService } from './filiales.service';
import { Filial } from './entities/filial.entity';
import { CreateFilialInput } from './dto/inputs/create-filial.input';
import { UpdateFilialInput } from './dto/inputs/update-filiale.input';

@Resolver(() => Filial)
export class FilialesResolver {
  constructor(private readonly filialesService: FilialesService) {}

  @Mutation(() => Filial)
  createFiliale(
    @Args('createFilialeInput') createFilialeInput: CreateFilialInput,
  ) {
    return this.filialesService.create(createFilialeInput);
  }

  @Query(() => [Filial], { name: 'filiales' })
  findAll() {
    return this.filialesService.findAll();
  }

  @Query(() => Filial, { name: 'filiale' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.filialesService.findOne(id);
  }

  @Mutation(() => Filial)
  updateFiliale(
    @Args('updateFilialeInput') updateFilialeInput: UpdateFilialInput,
  ) {
    return this.filialesService.update(
      updateFilialeInput.id,
      updateFilialeInput,
    );
  }

  @Mutation(() => Filial)
  removeFiliale(@Args('id', { type: () => Int }) id: number) {
    return this.filialesService.remove(id);
  }
}
