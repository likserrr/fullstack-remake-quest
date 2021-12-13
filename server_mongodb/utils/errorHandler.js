import fs from 'fs';
import * as uuid from 'uuid';

class errorHandler {
  checkFilesError(e, res) {
    try {
      if (e.status === 'error') {
        console.error(e.name + ': ' + e.message);
      } else if (e.status === 'fatal') {
        let message = `[${new Date()}] [FATAL] ` + e.message;
        if (e.brokenData) {
          const fatalFile = uuid.v4() + '.txt';
          message += `; Broken file data path: 'brokenData/${fatalFile}'`;
          fs.appendFileSync(`./logs/brokenData/${fatalFile}`, e.brokenData);
        }
        fs.appendFileSync('./logs/FATAL.log', message + '\n');
        console.error(message);
      }
    } catch (e) {
      console.error(e);
    } finally {
      res.status(500).json('Server error. Experts fix the problem');
    }
  }
}

// Классы для отслеживания ошибок

export class defaultErr {
  constructor(message, description = '', status = 'error') {
    this.status = status; // The severity of the caused
    this.message = message; // Message sent to the client
    this.description = description; // Error description to developers
    this.name = 'defaultError'; // To determine the type of error
  }
}

export class saveFilesErr {
  constructor(
    pathDir,
    description,
    created,
    message = 'Server error while saving file',
  ) {
    this.pathDir = pathDir;
    this.created = created;
    this.message = message;
    this.description = description;
    this.name = 'SaveFilesError';
  }
}

export default new errorHandler();
