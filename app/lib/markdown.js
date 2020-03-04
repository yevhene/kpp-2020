const fs = require('fs');
const glob = require('glob');
const path = require('path');
const marked = require('marked');

module.exports.routes = function(app, baseRoute, dir, config = {}) {
  glob.sync(path.join(dir, '/*.md')).forEach(filePath => {
    const file = path.basename(filePath);
    const route = joinRoute(baseRoute, file);

    app.get(route, (req, res) =>
      render(res, path.join(dir, file), config)
    );
  });
}

function render(res, file, config) {
  fs.readFile(file, 'utf8', (_, content) => {
    const html = marked(content);
    res.render('page', { content: html, ...config });
  });
}

function joinRoute(route, file) {
  if (file === 'README.md') {
    return path.join(route);
  } else {
    return path.join(route, file);
  }
}
