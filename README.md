
# Site Scheme

**Fetch color schemes from websites.**

<img src="https://img.shields.io/travis/Jense5/site-scheme.svg?style=flat-square"/>
<img src="https://img.shields.io/npm/v/site-scheme.svg?style=flat-square"/>
<img src="https://img.shields.io/npm/l/site-scheme.svg?style=flat-square"/>
<img src="https://img.shields.io/codecov/c/github/Jense5/site-scheme.svg?style=flat-square"/>
<img src="https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square"/>

```sh
# Extract color schemes via terminal (optional output file).
# See the images and result below. The top is the color at the top of the site.
$ npm install -g site-scheme
$ site-scheme --url 'http://toledo.kuleuven.be' --number 5 --output 'output.png'
# Prints: {"top":"#1E8EB1","colors":["#F3F5F5","#96C4D5",...]}
```

```js
// Use it via the module.
import extractScheme from 'site-scheme';
extractScheme('http://toledo.kuleuven.be', 5, 'output.png').then((colors) => {
  winston.info(JSON.stringify(colors, null, 4));
});
```
<br /><img src="http://i.imgur.com/XAXi1CF.png">
