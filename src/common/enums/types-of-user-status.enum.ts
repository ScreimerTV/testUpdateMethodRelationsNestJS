import { registerEnumType } from '@nestjs/graphql';

/**
 * Enum que define los tipos de estado de usuario
 *
 * @author dgutierrez
 * @version 1.0
 * @since 22/08/2023
 */
export enum TypesOfUserStatusEnum {
  ACTIVE = 1,
  INACTIVE = 2,
  DELETED = 3,
  EXPIRED = 4,
  BLOCKED = 5,
}

registerEnumType(TypesOfUserStatusEnum, {
  name: 'TypesOfUserStatus',
  description: 'Tipos de estado de usuario',
  valuesMap: {
    ACTIVE: {
      description: 'Activo',
    },
    INACTIVE: {
      description: 'Inactivo',
    },
    DELETED: {
      description: 'Eliminado',
    },
    EXPIRED: {
      description: 'Expirado',
    },
    BLOCKED: {
      description: 'Bloqueado',
    },
  },
});

export const TypesOfUserStatus = Object.freeze({
  ACTIVE: {
    code: 1,
    description: 'Activo',
  },
  INACTIVE: {
    code: 2,
    description: 'Inactivo',
  },
  DELETED: {
    code: 3,
    description: 'Eliminado',
  },
  EXPIRED: {
    code: 4,
    description: 'Expirado',
  },
  BLOCKED: {
    code: 5,
    description: 'Bloqueado',
  },
});
