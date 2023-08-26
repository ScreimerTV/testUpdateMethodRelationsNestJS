//Nestjs Core
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';

//Passport
import { ExtractJwt, Strategy } from 'passport-jwt';

//Entities
import { User } from 'src/users/entities/user.entity';
import { IJwtPayload } from '../interfaces/jwt-payload.interface';

//Services
import { UsersService } from 'src/users/users.service';

/**
 * Class that implements the Passport Strategy for JWT tokens
 *
 * @description
 * This class is used with the intention to expand the functionality of Passport and to validate the JWT tokens.
 * So that it can also validate if the user exists in the database and if it is active (to be implemented).
 *
 * @author dgutierrez
 * @version 1.0
 * @since 23/08/2023
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly usersService: UsersService,
    readonly configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get<string>('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  /**
   * Validates the token and returns the user if everything is ok
   *
   * @param payload Token payload
   *
   * @returns User object
   */
  async validate(payload: IJwtPayload): Promise<User> {
    const { user_id } = payload;

    const user: User = await this.usersService.findOneById(user_id);

    if (!user) throw new UnauthorizedException('Token not valid');

    //TODO: Check if user is active (Ask alex if we are going to have active and inactive users.)

    //If everything is ok, return the user and add it to the request object
    return user;
  }
}
