import probe from 'probe-image-size';

class checkImgErr {
  constructor(message, status = 'error', brokenData = false) {
    this.status = status;
    this.message = message;
    this.brokenData = brokenData;
    this.name = 'checkImgError';
  }
}

const hexMagic = {
  jpg: ['ffd8ffe1', 'ffd8ffe0', 'ffd8ffdb'],
  png: '89504e47',
  gif: '47494638',
};

const imgMime = ['image/gif', 'image/png', 'image/jpeg'];

function compareResol(data) {
  if (!data.imgBuffer || !data.needWidth || !data.needHeight) {
    throw new checkImgErr(
      'Resolution validation failed: some resolution parameters were not passed.',
    );
  }

  const imgData = probe.sync(data.imgBuffer);
  if (!imgData || !imgData.width || !imgData.height) {
    throw new checkImgErr('Invalid img data', 'fatal', data.imgBuffer);
  }

  const checkWidth = imgData.width === data.needWidth;
  const checkHeigth = imgData.height === data.needHeight;

  return checkWidth && checkHeigth;
}

class checkFiles {
  checkImg({ magic, mime, resolution }) {
    try {
      if (typeof arguments[0] !== 'object' || arguments[0] === null) {
        throw new checkImgErr('Invalid arguments format');
      }
      if (!Object.keys(arguments[0]).length) {
        throw new checkImgErr('No parameters were passed');
      }
      if (magic && typeof magic !== 'string') {
        throw new checkImgErr('Invalid magic numbers format');
      }
      if (mime && typeof mime !== 'string') {
        throw new checkImgErr('Invalid mimetype format');
      }

      const checkMagic = magic
        ? hexMagic.jpg.includes(magic) ||
          magic == hexMagic.png ||
          magic == hexMagic.gif
        : true;
      const checkMime = mime ? imgMime.includes(mime) : true;
      const checkResolution =
        checkMagic && checkMime && resolution ? compareResol(resolution) : true;

      return checkMagic && checkMime && checkResolution;
    } catch (e) {
      if (e.name !== 'checkImgError') {
        throw new checkImgErr(`Unexpected Error: ${e.message}`, 'fatal');
      }
      throw e.message;
    }
  }
}

export default new checkFiles();
