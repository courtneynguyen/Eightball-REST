'use strict';

var path = require('path'),
  rootPath = path.normalize(__dirname + '/../..');

module.exports = {
  root: rootPath,
  http: {
    port: process.env.PORT || 3000
  },
  hostname: 'localhost/',
<<<<<<< HEAD
	db:		'crud'
	//db: 'MagicEightBall',
=======
  db: 'crud',
>>>>>>> 8193b2ab5fe74d959b24f25d8054f98a174844b9

};
