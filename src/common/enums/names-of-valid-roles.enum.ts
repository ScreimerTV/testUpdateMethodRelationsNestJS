//NestJS Core
import { registerEnumType } from '@nestjs/graphql';

/**
 * Enum that defines the valid user roles
 *
 * @author dgutierrez
 * @version 1.0
 * @since 22/08/2023
 */
export enum ValidRolesEnum {
  ADMIN = 'ADMIN',
  USER = 'USER',
  SUPER_ADMIN = 'SUPER_ADMIN',
}

//Permite que el enum sea usado en GraphQL, es decir, lo registra como un tipo de dato
registerEnumType(ValidRolesEnum, {
  name: 'ValidRolesEnum',
  description: 'Roles de usuario válidos',
  valuesMap: {
    ADMIN: {
      description: 'ADD DESCRIPTION HERE',
    },
    USER: {
      description: 'ADD DESCRIPTION HERE',
    },
    SUPER_ADMIN: {
      description: 'ADD DESCRIPTION HERE',
    },
  },
});
