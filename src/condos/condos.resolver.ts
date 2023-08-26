import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CondosService } from './condos.service';
import { Condo } from './entities/condo.entity';
import { CreateCondoInput } from './dto/inputs/create-condo.input';
import { UpdateCondoInput } from './dto/inputs/update-condo.input';

@Resolver(() => Condo)
export class CondosResolver {
  constructor(private readonly condosService: CondosService) {}

  @Mutation(() => Condo)
  createCondo(@Args('createCondoInput') createCondoInput: CreateCondoInput) {
    return this.condosService.create(createCondoInput);
  }

  @Query(() => [Condo], { name: 'condos' })
  findAll() {
    return this.condosService.findAll();
  }

  @Query(() => Condo, { name: 'condo' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.condosService.findOne(id);
  }

  @Mutation(() => Condo)
  updateCondo(@Args('updateCondoInput') updateCondoInput: UpdateCondoInput) {
    return this.condosService.update(updateCondoInput.id, updateCondoInput);
  }

  @Mutation(() => Condo)
  removeCondo(@Args('id', { type: () => Int }) id: number) {
    return this.condosService.remove(id);
  }
}
