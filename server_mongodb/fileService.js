import dotenv from 'dotenv';
dotenv.config();

import * as uuid from 'uuid';
import * as path from 'path';
import fs from 'fs';

import { saveFilesErr } from './utils/errorHandler.js';

class FileService {
  checkBlogDir() {
    try {
      let dirName;
      for (let i = 0; i < 4; i++) {
        dirName = uuid.v4();
        let pathDir = path.resolve(process.env.blogPATH, dirName);
        console.log(pathDir);
        if (!fs.existsSync(pathDir)) break;
        if (i === 3) throw new Error('Cycle create path directory is a long');
      }

      return { status: true, mes: dirName };
    } catch (e) {
      return { status: false, mes: e.message };
    }
  }

  saveHeadImg(headImg_dir, files) {
    return new Promise((resolve, reject) => {
      const pathDir = path.resolve(process.env.blogPATH, headImg_dir);
      fs.promises
        .mkdir(pathDir)
        .catch((err) => reject(new saveFilesErr(pathDir, err.message, false)));

      let i = 1;
      const numFiles = Object.keys(files).length;
      for (let key in files) {
        let fileName = key + '.jpg';
        let filePath = path.resolve(pathDir, fileName);
        files[key].mv(filePath, (err) => {
          if (err) reject(new saveFilesErr(pathDir, err.message, true));
          if (i === numFiles) resolve('Success');
          i++;
        });
      }
    });
  }
}

export default new FileService();
