import { join } from 'path';

import { Module } from '@nestjs/common';
//imports of interceptors | and nestjs core
import { APP_INTERCEPTOR } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

//Services & Resolvers
import { AppController } from './app.controller';
import { AppService } from './app.service';

//This is the package to run Apollo Studio locally and should be used instead of 'apollo-server-core'.
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';

//Imports of modules
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { FilialesModule } from './filiales/filiales.module';
import { CondosModule } from './condos/condos.module';
import { AddressesModule } from './addresses/addresses.module';
import { CommonModule } from './common/common.module';
import { AuthModule } from './auth/auth.module';
import { SeedModule } from './seed/seed.module';

//Interceptors
import { RemovePasswordInterceptor } from './common/interceptors/remove-password/remove-password.interceptor';

//Others
import { IJwtPayload } from './auth/interfaces/jwt-payload.interface';
import { UserStatusModule } from './user_status/user-status.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [AuthModule],
      inject: [JwtService],
      useFactory: (jwtService: JwtService) => ({
        playground: false,
        plugins: [ApolloServerPluginLandingPageLocalDefault()],
        autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        sortSchema: true,
        context({ req }): void {
          const token = req.headers.authorization?.replace('Bearer ', '');
          if (!token) throw new Error('Token needed');
          const payload = jwtService.verify<IJwtPayload>(token);
          if (!payload) throw new Error('Invalid token');
        },
      }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      //Se deshabilita el await porque no se necesita
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [],
        synchronize: true,
        autoLoadEntities: true,
      }),
    }),
    UsersModule,
    RolesModule,
    FilialesModule,
    CondosModule,
    AddressesModule,
    CommonModule,
    AuthModule,
    SeedModule,
    UserStatusModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: RemovePasswordInterceptor,
    },
  ],
})
export class AppModule {}
