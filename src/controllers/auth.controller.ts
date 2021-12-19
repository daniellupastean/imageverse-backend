import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from 'src/services/auth.service';
import * as bcrypt from 'bcrypt';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { AuthUser } from 'src/decorators/user.decorator';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() data) {
    return await this.authService.login(data);
  }

  @Post('register')
  async register(@Body() data) {
    const hashedPassword = await bcrypt.hash(data.password, 12);
    data.password = hashedPassword;
    return await this.authService.register(data);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getCurrentUser(@AuthUser() user: any) {
    return await this.authService.getUserData(user);
  }
}
