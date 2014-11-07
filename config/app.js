var path = require('path'),
    config = require(path.join(Node.root, 'config', 'environment')),
    mongoose = require(path.join(Node.root, 'config', 'mongoose')),
    swig = require('swig'),
    express = require('express'),
    compression = require('compression');
    methodOverride = require('method-override'),
    cookieParser = require('cookie-parser'),
    // cookieSession = require('cookie-session'),
    // csrf = require('csurf'),
    morgan = require('morgan'),
    bodyParser = require('body-parser');
    // debug = require('debug'),
    db = mongoose(),
    app = express();

app.engine('swig', swig.renderFile);

app.set('view engine', 'swig');
app.set('views', path.join(Node.root, 'app', 'views'));

app.set('view cache', false);
swig.setDefaults({ cache: false });

app.use(morgan('dev'));

app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method
    delete req.body._method
    return method
  }
}));

app.use(cookieParser());
// app.use(cookieSession({keys: [env.get('SESSION_SECRET')]}));
// app.use(cookieParser(env.get('SESSION_SECRET')));
// app.use(csrf({cookie: true}));

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static('./public'));

app.use(require(path.join(Node.root, 'app', 'routes', 'home'))(express.Router()));
app.use(require(path.join(Node.root, 'app', 'routes', 'deals'))(express.Router()));
app.use(require(path.join(Node.root, 'app', 'routes', 'sessions'))(express.Router()));
app.use(require(path.join(Node.root, 'app', 'routes', 'users'))(express.Router()));

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;

  next(err);
});

app.use(function(err, req, res, next) {
  res.status(err.status || 500);

  res.render('errors/show', {
    err: (env.get('NODE_ENV') === 'development' ? err : {})
  });
});

app.use(compression());

var server = app.listen(env.get('EXPRESS_PORT'), function() {
  console.log('Express server listening on port ' + server.address().port);
});

module.exports = app;
