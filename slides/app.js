const glob = require('glob');
const path = require('path');

const config = require('../config');

const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname);

app.use(expressLayouts);
app.set('layout', path.join(__dirname, 'layouts/layout'));

app.use(express.static(path.join(__dirname, '../app/assets')));

// Attach reveal dirs from node_moduels
const revealPath = path.dirname(require.resolve('reveal.js/package.json'));
['css', 'js', 'lib', 'plugin'].forEach((dir) => {
  app.use(`/${dir}`, express.static(path.join(revealPath, dir)));
});

app.use(express.static(path.join(__dirname, 'static')));

app.get('/:unit/', (req, res) => {
  if (!req.originalUrl.endsWith('/'))
  {
    return res.redirect(`${req.originalUrl}/`);
  }

  res.render(path.join('content', req.params.unit), {
    white: 'white' in req.query,
    title: config.title
  })
});

// Setup content assets
glob.sync(path.join(__dirname, 'content/*/')).forEach(dir => {
  const unit = path.basename(dir);
  app.use(`/${unit}`, express.static(path.join(__dirname, 'content', unit)));
});

module.exports = app;
