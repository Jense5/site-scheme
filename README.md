
<h1 align="center">Site Scheme</h1>

<p align="center"><b>Fetch color schemes from websites</b></p>

<p align="center">
  <img src="https://img.shields.io/travis/Jense5/site-scheme.svg?style=flat-square"/>
  <img src="https://img.shields.io/npm/v/site-scheme.svg?style=flat-square"/>
  <img src="https://img.shields.io/npm/l/site-scheme.svg?style=flat-square"/>
  <img src="https://img.shields.io/codecov/c/github/Jense5/site-scheme.svg?style=flat-square"/>
  <img src="https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square"/>
</p>

```sh
# Extract color schemes via terminal (optional output file).
# See the images and result below.
$ npm install -g site-scheme
$ site-scheme --url 'http://toledo.kuleuven.be' --number 5 --output 'output.png'
# Prints: [{"r":244,"g":245,"b":245,"a":255},{"r":29,"g":139,"b":177,"a":255},...]
```

```js
// Use it via the module.
import extractScheme from 'site-scheme';
extractScheme('http://toledo.kuleuven.be', 5, 'output.png').then((colors) => {
  winston.info(JSON.stringify(colors, null, 4));
});
```

<p align="center" style="font-family:monospace"><b>- MIT -</b></p>

<h3 align="center">Input</h3>
<img src="http://i.imgur.com/ozx7yjg.png">

<h3 align="center">Output</h3>
<img src="http://i.imgur.com/fgQ3xP8.png">
