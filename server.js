#!/usr/bin/env node

var path = require('path'),
    env = require(path.join(__dirname, 'config', 'environment')),
    app = require('./app')(env);
    Server = require('http').Server(app);

var server = Server.listen(env.get('PORT'), function() {
  console.log('server listening on port ' + server.address().port);
});
