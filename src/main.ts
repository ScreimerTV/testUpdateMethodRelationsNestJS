//NestJS Core
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

//Modules
import { AppModule } from './app.module';

/**
 * Function that starts the application and listens on port 3000
 *
 * @author TEAM_NEST_JS
 * @version 1.0
 * @since 21/08/2023
 */
async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/condominium');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      //Ahora como estamos en un contexto de GraphQL, no podemos usar el forbidNonWhitelisted
      //porque no nos va a dejar pasar los argumentos que no estén en el DTO
      //En cambio graphql va a devolver un error de validación y no va a dejar pasar la petición
      /*       forbidNonWhitelisted: true, */
    }),
  );

  await app.listen(3000);
}
bootstrap();
