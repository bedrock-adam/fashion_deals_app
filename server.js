#!/usr/bin/env node

var path = require('path');

global.Node = {
  root: path.dirname(require.main.filename)
};

var path = require('path'),
    config = require(path.join(Node.root, 'config', 'environment')),
    app = require(path.join(Node.root, 'config', 'app'));
