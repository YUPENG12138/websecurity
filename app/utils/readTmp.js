const fs = require('fs');

module.exports = function (src) {
  return fs.readFileSync(src, 'utf-8');
}