import path from 'path';
import fse from 'fs-extra';
import { expect } from 'chai';
import extract from '../src/index';

describe('Default tests', () => {
  it('should extract colors with output', (done) => {
    const output = path.resolve(__dirname, 'output.png');
    extract('https://toledo.kuleuven.be', 5, output).then((colors) => {
      expect(colors).to.be.an('array');
      expect(colors).to.have.length(5);
      expect(fse.existsSync(output)).to.equal(true);
      fse.removeSync(output);
      done();
    }).catch(done);
  }).timeout(25000);
  it('should extract colors without output', (done) => {
    const output = path.resolve(__dirname, 'output.png');
    extract('https://toledo.kuleuven.be', 5).then((colors) => {
      expect(colors).to.be.an('array');
      expect(colors).to.have.length(5);
      expect(fse.existsSync(output)).to.equal(false);
      done();
    }).catch(done);
  }).timeout(25000);
  it('should handle invalid url', (done) => {
    extract('blabla', 5).then(() => done('error!')).catch(() => done());
  }).timeout(25000);
  it('should handle unexisting url', (done) => {
    extract('http://qskjdjqsdhgkqjnflqskdnf.net', 5).then(() => done('error!')).catch(() => done());
  }).timeout(25000);
});
