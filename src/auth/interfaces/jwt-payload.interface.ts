/**
 * Interface defining the JWT token payload attributes
 *
 * @author dgutierrez
 * @version 1.0
 * @since 23/08/2023
 */
export interface IJwtPayload {
  user_id: number;
  exp: number;
  iat: number;
}
