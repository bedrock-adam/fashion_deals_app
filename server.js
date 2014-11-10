#!/usr/bin/env node

var path = require('path'),
    config = require(path.join(__dirname, 'config', 'environment')),
    app = require(path.join(__dirname, 'config', 'app'));
