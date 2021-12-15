import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './controllers/app.controller';
import { AuthController } from './controllers/auth.controller';
import { ImagesController } from './controllers/images.controller';
import { UsersController } from './controllers/users.controller';
import { Image } from './entities/image.entity';
import { User } from './entities/user.entity';
import { typeOrmConfig } from './orm.config';
import { AppService } from './services/app.service';
import { AuthService } from './services/auth.service';
import { ImagesService } from './services/images.service';
import { UsersService } from './services/users.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    TypeOrmModule.forFeature([User, Image]),
  ],
  controllers: [
    AppController,
    AuthController,
    UsersController,
    ImagesController,
  ],
  providers: [AppService, AuthService, UsersService, ImagesService],
})
export class AppModule {}
