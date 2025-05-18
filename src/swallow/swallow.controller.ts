import {
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { SwallowService } from './swallowGet.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('swallow')
export class SwallowController {
  constructor(private readonly swallowService: SwallowService) {}

  @Get('/all')
  GetById(@Param('id') id: string) {
    return this.swallowService.getById(id);
  }

  @Post('/register')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads', // 저장 폴더
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  PostSwallow(
    @UploadedFile() file: Express.Multer.File,
    @Param('name') name?: string,
  ) {
    if (!name) {
      name = file.filename;
    }

    console.log(file);
  }
}
