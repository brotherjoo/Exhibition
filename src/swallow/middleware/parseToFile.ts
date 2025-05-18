import * as danfo from 'danfojs-node';
import { SwallowReq } from '../dto/swallowReq.dto';

export class ParseToFile {
  static async parse(file: Express.Multer.File): Promise<SwallowReq[] | null> {
    const filePath = file.path;

    try {
      const df = await danfo.readCSV(filePath, { delimiter: '\t' } as any);
      // eslint-disable-next-line prefer-const
      let swallowReqList: SwallowReq[] = [];

      df.values.forEach((x) => {
        const swallowReq = SwallowReq.builder()
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
          .setDate(stringToDate(x[1]))
          .setFile(file)
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
          .setLat(x[7])
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
          .setLon(x[6])
          .build();

        swallowReqList.push(swallowReq);
      });

      return swallowReqList;
    } catch (err) {
      console.error(err);
      return null;
    }
  }
}

function stringToDate(string: string): Date {
  const [datePart, timePart] = string.split(' ');

  // 년, 월, 일 분리
  const [year, month, day] = datePart.split('-').map(Number);

  // 시, 분, 초 분리
  const [hour, minute, second] = timePart.split(':').map(Number);

  // Date 객체 생성 (월은 0부터 시작하니까 month-1)
  const dateObj = new Date(year, month, day, hour, minute, second);

  return dateObj;
}
