// @flow

import path from 'path';
import fse from 'fs-extra';
import isUrl from 'is-url';
import sharp from 'sharp';
import Promise from 'bluebird';
import capture from 'web-capture';
import { getProminentColors } from 'color-extract';
import { createColorPattern } from 'color-blocks';

const CACHEA = path.resolve(__dirname, '5fba6621adbd97fec1d933874bf49e5a.png');
const CACHEB = path.resolve(__dirname, '5fba6621adbd97fec1d933874bf49e5b.png');

const resizeCache = () => new Promise((resolve, reject) => {
  sharp(CACHEA).resize(100).png().toFile(CACHEB, (error, info) => {
    if (error) { reject(error); }
    if (!error) { resolve(info); }
  });
});

const clearCache = () => {
  fse.removeSync(CACHEA);
  fse.removeSync(CACHEB);
};

export default (url: string, amount: number, output: ?string) =>
  new Promise((resolve, reject) => {
    if (isUrl(url)) {
      capture(url, CACHEA)
      .then(() => resizeCache())
      .then(() => getProminentColors(CACHEB, amount))
      .then((colors) => {
        if (output) {
          const aop = path.resolve(process.cwd(), output);
          const outputPath = path.extname(aop) === '.png' ? aop : path.resolve(aop, 'output.png');
          createColorPattern(50, colors, outputPath).then(() => {
            resolve(colors);
          }).catch(reject);
        } else { resolve(colors); }
      })
      .catch(error => reject(error));
    } else { reject('Invalid url provided.'); }
  }).finally(() => clearCache());
