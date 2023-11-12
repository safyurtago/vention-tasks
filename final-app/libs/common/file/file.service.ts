import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import * as fs from 'fs';
import * as path from 'path';
import * as uuid from 'uuid';

@Injectable()
export class FileService {
  async createFile(file: any): Promise<string> {
    try {
      const fileName = uuid.v4() + `.jpg`;
      const filePath = path.resolve(__dirname, '..', 'static');

      if (!fs.existsSync(filePath)) fs.mkdirSync(filePath, { recursive: true });

      fs.writeFileSync(path.join(filePath, fileName), file.buffer);
      return fileName;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Error while writing files',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
