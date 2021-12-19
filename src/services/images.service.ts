import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Image } from 'src/entities/image.entity';
import { Repository } from 'typeorm';
const imgbbUploader = require('imgbb-uploader');

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(Image)
    private readonly imagesRepository: Repository<Image>,
  ) {}

  async uploadImage(pictureData, user) {
    if (!user || !user?.id)
      return { message: 'Access to the requested resource is forbidden!' };

    const userId = user.id;
    const link = await this.uploadImageToImgbb(pictureData.picture);

    return await this.imagesRepository.save({ userId, link });
  }

  async uploadImageToImgbb(base64Image: string) {
    const options = {
      apiKey: process.env.IMGBB_API_KEY,
      base64string: base64Image,
    };
    const result = await imgbbUploader(options);

    return result.url;
  }

  async getImagesByUserId(user) {
    if (!user || !user?.id)
      return { message: 'Access to the requested resource is forbidden!' };
    const userId = user.id;
    const images = await this.imagesRepository.find({
      where: { userId },
    });

    return images;
  }
}
