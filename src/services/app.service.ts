import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getStatus(): string {
    return 'The server is up and running. Keep coding:)';
  }
}
