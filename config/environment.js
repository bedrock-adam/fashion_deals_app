var nconf = require('nconf'),
    path = require('path');

nconf.env();
nconf.defaults({

  'NODE_ENV': 'development',
});

nconf.file(path.join(__dirname, 'environments', nconf.get('NODE_ENV') + '.json'));

module.exports = nconf;
