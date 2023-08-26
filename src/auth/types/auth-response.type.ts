import { User } from 'src/users/entities/user.entity';

/**
 * Defines the structure of the user authentication response
 *
 * @author dgutierrez
 * @version 1.0
 * @since 22/08/2023
 */
export class AuthResponse {
  token: string;

  user: User;
}
