#!/usr/bin/env node
// @flow

import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import winston from 'winston';
import commander from 'commander';

import extract from './index';

winston.remove(winston.transports.Console);
winston.add(winston.transports.Console, { showLevel: false });

const pkg = path.resolve(__dirname, '../package.json');
const conf = JSON.parse(fs.readFileSync(pkg, 'utf8'));
winston.info(chalk.bold(`SITE-SCHEME v${conf.version}`));

commander
.version(conf.version)
.usage('<options>')
.option('-u, --url [url]', 'Url to capture')
.option('-o, --output [output]', 'Output file to write to')
.option('-n, --number [number]', 'Amount of colors to extract', parseInt)
.parse(process.argv);

if (!commander.url) {
  winston.error(chalk.red('No url provided. Please use the --url option.'));
  process.exit();
}

let outputFile;
if (commander.output) {
  const outputPath = path.resolve(process.cwd(), commander.output);
  outputFile = path.extname(outputPath) === '.png' ? outputPath : path.resolve(outputPath, 'output.png');
}

const number = commander.number || 5;
extract(commander.url, number, outputFile).then((colors) => {
  winston.info(JSON.stringify(colors));
}).catch(error => winston.error(chalk.red(error)));
