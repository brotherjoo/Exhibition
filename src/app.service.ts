import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): number {
    return Number(process.env.DB_PORT);
  }
}
