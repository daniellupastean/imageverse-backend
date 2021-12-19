import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(data) {
    const user = await this.usersRepository.findOne({ email: data.email });
    if (!user) throw new UnauthorizedException('Invalid credentials!');
    if (!(await bcrypt.compare(data.password, user.password)))
      throw new UnauthorizedException('Invalid credentials!');

    const jwt = await this.jwtService.signAsync({
      id: user.id,
      role: user.role,
    });

    return { accessToken: jwt };
  }

  async register(data) {
    const existingUser = await this.usersRepository.findOne({
      email: data.email,
    });
    if (existingUser && !('message' in existingUser))
      throw new BadRequestException('Email already used');

    data['role'] = 'user'; // set default user role to user

    const user = await this.usersRepository.save(data);
    if (!user) throw new BadRequestException('Something went wrong');

    // delete result.password;
    const jwt = await this.jwtService.signAsync({
      id: user.id,
      role: user.role,
    });

    return { message: 'Account successfully created', accessToken: jwt };
  }

  async getUserData(userData) {
    if (!userData || !userData?.id)
      return { message: 'Access to the requested resource is forbidden!' };
    const userId = userData.id;
    const user = await this.usersRepository.findOne({ id: userId });
    if (!user) return { message: 'User not found' };
    delete user.password;
    return user;
  }
}
