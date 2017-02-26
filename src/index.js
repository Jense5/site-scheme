// @flow

import path from 'path';
import fse from 'fs-extra';
import isUrl from 'is-url';
import winston from 'winston';
import capture from 'web-capture';
import fetchScheme from 'color-extract';
import { createColorPattern } from 'color-blocks';

const CACHE = path.resolve(__dirname, '5fba6621adbd97fec1d933874bf49e5d.png');

export default (url: string, output: ?string) =>
  new Promise((resolve, reject) => {
    if (isUrl(url)) {
      capture(url, CACHE).then(() => {
        winston.debug('Fetched site...');
        fetchScheme(CACHE, 5).then((colors) => {
          winston.debug('Fetched scheme...');
          fse.removeSync(CACHE);
          if (output) {
            const aop = path.resolve(process.cwd(), output);
            const outputPath = path.extname(aop) === '.png' ? aop : path.resolve(aop, 'output.png');
            createColorPattern(50, colors, outputPath).then(() => {
              resolve(colors);
            }).catch(reject);
          } else { resolve(colors); }
        }).catch((error) => {
          fse.removeSync(CACHE);
          reject(error);
        });
      }).catch(reject);
    } else { reject('Invalid url provided.'); }
  });
