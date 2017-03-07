// @flow

import path from 'path';
import Jimp from 'jimp';
import fse from 'fs-extra';
import isUrl from 'is-url';
import Promise from 'bluebird';
import capture from 'web-capture';
import { getProminentColors } from 'color-extract';
import createPattern from 'color-blocks';

const CACHEA = path.resolve(__dirname, '5fba6621adbd97fec1d933874bf49e5a.png');
const CACHEB = path.resolve(__dirname, '5fba6621adbd97fec1d933874bf49e5b.png');

// Resizes the cache files.@
const resizeCache = () => new Promise((resolve, reject) => {
  Jimp.read(CACHEA).then((img) => {
    img.resize(100, 100).write(CACHEB, (err) => {
      if (err) { reject(err); }
      resolve();
    });
  });
});

// Clears the cache.
const clearCache = () => {
  fse.removeSync(CACHEA);
  fse.removeSync(CACHEB);
};

/**
 * Fetches the given amount of colors from the given url. This can be used to determine the color
 * scheme that is used on the given website. An optional output location can be given, which will
 * be the location of the output file (if undefined, no file will be created).
 * @param {string} url The url of the website to check
 * @param {number} amount The amount of colors to fetch
 * @param {?string} output The output location for the theme file
 * @returns {Promise<Color>} A promise with the color scheme
 */
export default (url: string, amount: number, output: ?string) =>
  new Promise((resolve, reject) => {
    if (isUrl(url)) {
      capture(url, CACHEA)
      .then(() => resizeCache())
      .then(() => getProminentColors(CACHEB, amount, true))
      .then((colors) => {
        if (output) {
          const aop = path.resolve(process.cwd(), output);
          const outputPath = path.extname(aop) === '.png' ? aop : path.resolve(aop, 'output.png');
          createPattern(50, [colors.top, ...colors.colors], outputPath).then(() => {
            resolve(colors);
          }).catch(reject);
        } else { resolve(colors); }
      })
      .catch(error => reject(error));
    } else { reject('Invalid url provided.'); }
  }).finally(() => clearCache());
