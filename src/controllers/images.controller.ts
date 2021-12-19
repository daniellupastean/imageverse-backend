import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthUser } from 'src/decorators/user.decorator';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { ImagesService } from 'src/services/images.service';

@Controller('gallery')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async uploadImage(@Body() data, @AuthUser() user: any) {
    return await this.imagesService.uploadImage(data, user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getImagesByUserId(@AuthUser() user: any) {
    return await this.imagesService.getImagesByUserId(user);
  }
}
