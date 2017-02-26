
<h1 align="center">Site Scheme</h1>

<p align="center"><b>Fetch color schemes from websites</b></p>


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
