import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';

import { AuthResponse } from './types/auth-response.type';
import { SigninDto } from './dto/signin.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from 'src/users/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() createAuthDto: SignupDto): Promise<AuthResponse> {
    return this.authService.signup(createAuthDto);
  }

  @Post('signin')
  signin(@Body() signinDto: SigninDto): Promise<AuthResponse> {
    return this.authService.signin(signinDto);
  }

  @Get('private')
  @UseGuards(JwtAuthGuard)
  testingPrivateRoute(@CurrentUser() user: User): string {
    console.log(user);
    return 'I am a private route';
  }
}
