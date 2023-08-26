//Imports Nest Core
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';

//Imports Services
import { AuthService } from './auth.service';

//Imports Controllers
import { AuthController } from './auth.controller';

//imports from other modules
import { UsersModule } from 'src/users/users.module';
import { CommonModule } from 'src/common/common.module';

//Imports Other
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      // eslint-disable-next-line @typescript-eslint/require-await
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRES_IN') },
      }),
    }),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    UsersModule,
    CommonModule,
  ],
  exports: [JwtModule],
})
export class AuthModule {}
