var path = require('path'),
    config = require(path.join(Node.root, 'config', 'environment')),
    mongoose = require(path.join(Node.root, 'config', 'mongoose')),
    swig = require('swig'),
    express = require('express'),
    compression = require('compression');
    methodOverride = require('method-override'),
    cookieSession = require('cookie-session'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    cookieSession = require('cookie-session'),
    csrf = require('csurf'),
    morgan = require('morgan'),
    debug = require('debug'),
    db = mongoose(),
    app = express();

app.engine('swig', swig.renderFile);

app.set('view engine', 'swig');
app.set('views', path.join(Node.root, 'app', 'views'));

app.set('view cache', false);
swig.setDefaults({ cache: false });

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method
    delete req.body._method
    return method
  }
}));

app.use(cookieParser());
app.use(cookieSession({secret: env.get('SESSION_SECRET'), cookie: { maxAge: 60000 }}));

app.use(csrf({cookie: true}));
app.use(function(req, res, next) {
  res.locals.csrfToken = req.csrfToken();
  next();
});
app.use(express.static('./public'));

app.use(require(path.join(Node.root, 'app', 'routes', 'home'))(express.Router()));
app.use(require(path.join(Node.root, 'app', 'routes', 'deals'))(express.Router()));
app.use(require(path.join(Node.root, 'app', 'routes', 'sessions'))(express.Router()));
app.use(require(path.join(Node.root, 'app', 'routes', 'users'))(express.Router()));

app.use(morgan('dev'));

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
