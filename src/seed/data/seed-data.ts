import { ValidRoles } from 'src/common/enums';
import {
  TypesOfUserStatus,
  TypesOfUserStatusEnum,
} from 'src/common/enums/types-of-user-status.enum';

/**
 * Array that contains the roles that will be created by default
 *
 * @author dgutierrez
 * @version 1.0
 * @since 23/08/2023
 */
export const SEED_ROLS = [
  ValidRoles.ADMIN,
  ValidRoles.SUPER_ADMIN,
  ValidRoles.USER,
];

/**
 * Arreglo que contiene los estados de usuario que se crearán por defecto
 *
 * @author dgutierrez
 * @version 1.0
 * @since 24/08/2023
 */
export const SEED_USER_STATUS = [
  TypesOfUserStatus.ACTIVE,
  TypesOfUserStatus.INACTIVE,
  TypesOfUserStatus.DELETED,
  TypesOfUserStatus.EXPIRED,
  TypesOfUserStatus.BLOCKED,
];
