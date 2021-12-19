import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from 'src/services/auth.service';
import * as bcrypt from 'bcrypt';

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
}
