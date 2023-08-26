//NestJS Core
import {
  ExecutionContext,
  ForbiddenException,
  InternalServerErrorException,
  createParamDecorator,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

//Enums
import { ValidRoles } from 'src/common/enums';
import { Role } from 'src/roles/entities/role.entity';

//Entities
import { User } from 'src/users/entities/user.entity';

/**
 * Decorator that gets the current user from the request
 *
 * @description
 * Remember that for this decorator to work, you must use the JwtAuthGuard in the driver or resolve
 * and this is located in the auth module guards folder.
 *
 * In some lifecycle of a request, the current user will be needed, for example, in order to to know if he/she
 * has permissions to perform an action. This decorator is in charge of obtaining the current user from the request
 * and, if roles are passed to it, it validates that the user has one. If roles are passed to it, it validates that
 * the user has one of those roles. If no roles are passed, it simply returns the current user.
 *
 * @example
 * ```typescript
 * // In your resolver or controller
 * import { CurrentUser, JwtAuthGuard } from './path-to-auth-module';
 * import { User } from './path-to-user-model';
 *
 * @Query(() => String)
 * @UseGuards(JwtAuthGuard)
 * async testingPrivateRoute(@CurrentUser() user: User): Promise<string> {
 *     console.log(user);
 *     return 'I am a private route';
 * }
 * ```
 *
 * @author dgutierrez
 * @version 1.0
 * @since 23/08/2023
 */
export const CurrentUser = createParamDecorator(
  async (roles: ValidRoles[] = [], context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const user: User = ctx.getContext().req.user;

    if (!user)
      throw new InternalServerErrorException(
        'No user inside the request - make sure that we used the AuthGuard',
      );

    if (roles.length === 0) return user;

    //TODO: Eliminar el cast a ValidRoles

    const hasRole: boolean = user.roles.some((rol: Role) =>
      roles.includes(rol.role_name as ValidRoles),
    );

    if (!hasRole)
      throw new ForbiddenException(
        `The user ${user.email} has not a valid role - valid roles: ${roles}`,
      );

    return user;
  },
);
