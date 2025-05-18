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
import { SwallowPostService } from './swallowPost.service';
import { ParseToFile } from './middleware/parseToFile';
import { SwallowReq } from './dto/swallowReq.dto';

@Controller('swallow')
export class SwallowController {
  constructor(
    private readonly swallowService: SwallowService,
    private readonly swallowPostService: SwallowPostService,
  ) {}

  @Get('/')
  GetById(@Param('id') id: number) {
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
  async PostSwallow(
    @UploadedFile() file: Express.Multer.File,
    @Param('name') name?: string,
  ) {
    if (!name) {
      name = file.filename;
    }
    const swallowReqList: SwallowReq[] | null = await ParseToFile.parse(file);

    if (!swallowReqList) {
      throw new Error('error');
    }

    this.swallowPostService.PostSwallow(swallowReqList);
  }
}
