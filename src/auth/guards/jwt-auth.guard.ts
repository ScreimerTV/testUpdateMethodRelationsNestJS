//Nestjs Core
import { ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';

/**
 * Customized passport AuthGuard extending guard to validate JWT token
 *
 * @description
 * This guard is used to validate the JWT token in the routes that require it.
 * It is necessary because we need to pass the GraphQL context to passport,
 * the library we use for authentication.
 *
 * @author dgutierrez
 * @version 1.0
 * @since 23/08/2023
 */
export class JwtAuthGuard extends AuthGuard('jwt') {
  /**
   * Method that gets the request from the context
   *
   * @param context Context of the request
   *
   * @returns Request object
   */
  getRequest(context: ExecutionContext): any {
    const ctx = GqlExecutionContext.create(context);

    const request = ctx.getContext().req;

    return request;
  }
}
