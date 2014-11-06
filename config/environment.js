var nconf = require('nconf'),
    path = require('path');

nconf.defaults({
  'NODE_ENV': 'development',
});

nconf.env();
nconf.file(path.join(Node.root, 'config', 'environments', nconf.get('NODE_ENV') + '.json'));

module.exports = nconf;
