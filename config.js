'use strict';

var path = require('path'),
rootPath = path.normalize(__dirname + '/../..');

module.exports = {
  root: rootPath,
  http: {
    port: process.env.PORT || 3000
  },
  hostname: 'localhost/',
  db:		'crud'
  //db: 'MagicEightBall',

};
