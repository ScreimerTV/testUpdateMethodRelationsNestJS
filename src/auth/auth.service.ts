//NestJS Core
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

//Services
import { UsersService } from 'src/users/users.service';
import { BcryptService } from 'src/common/services/bcrypt/bcrypt.service';

//DTOs
import { AuthResponse } from './types/auth-response.type';
import { SigninDto, SignupDto } from './dto';

//Entities
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly bcryptService: BcryptService,
  ) {}

  /**
   * Requests the user service to create a new user and returns an object with the user and authentication token
   *
   * @param signupDto Object with the user's data
   *
   * @returns Object with the user and authentication token
   *
   * @author dgutierrez
   * @version 1.0
   * @since 23/08/2023
   */
  async signup(signupDto: SignupDto): Promise<AuthResponse> {
    const user: User = await this.usersService.create(signupDto);

    const token: string = this.getJwtToken(user.user_id);

    return { user, token };
  }

  /**
   * Requests the user service to search for a user by email and if found, compares the password provided with the
   * password stored in the database. Password provided with the password stored in the database. If the passwords
   * match, it returns. An object with the user and the authentication token
   *
   * @param signinDto Object with the user's email and password
   *
   * @returns Object with the user and authentication token
   *
   * @author dgutierrez
   * @version 1.0
   * @since 23/08/2023
   */
  async signin(signinDto: SigninDto): Promise<AuthResponse> {
    const { email, password } = signinDto;

    const userFounded: User = await this.usersService.findOneByEmail(email);

    const isPasswordValid = await this.bcryptService.compare(
      password,
      userFounded.password,
    );

    if (!isPasswordValid) {
      //TODO: Crear un enum con los códigos de error
      throw new BadRequestException('Invalid credentials');
    }

    const token = this.getJwtToken(userFounded.user_id);

    return { user: userFounded, token };
  }

  /**
   * Generates a JWT token with the user's id
   *
   * @param userId User's id
   *
   * @returns JWT token
   *
   * @author dgutierrez
   * @version 1.0
   * @since 23/08/2023
   */
  private getJwtToken(userId: number): string {
    return this.jwtService.sign({ user_id: userId });
  }
}
