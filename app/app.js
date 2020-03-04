const path = require('path');
const express = require('express');

const markdown = require('./lib/markdown');
const config = require('../config');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'assets')));

// Github Markdown CSS
const githubMarkdownPath = path.dirname(
  require.resolve('github-markdown-css/package.json')
);
app.use('/assets/github-markdown.css', express.static(
  path.join(githubMarkdownPath, 'github-markdown.css')
));

app.use('/slides', require('../slides/app'));

markdown.routes(app, '/', path.join(__dirname, '../'), config);
markdown.routes(app, '/docs', path.join(__dirname, '../docs'), config);
markdown.routes(app, '/labs', path.join(__dirname, '../labs'), config);

app.use('/posts', express.static(path.join(__dirname, '../posts/images')));

const port = config.port;
app.listen(port, () => {
  console.log(`App listening http://localhost:${port} port`)
});
