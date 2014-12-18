var path = require('path'),
    swig = require('swig'),
    compression = require('compression'),
    methodOverride = require('method-override'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    MongoStore = require('connect-mongo')(session),
    flash = require('connect-flash'),
    debug = require('debug'),
    favicon = require('serve-favicon'),
    morgan = require('morgan'),
    express = require('express'),
    browserify = require('browserify-middleware'),
    app = express();

module.exports = function(env) {
  var db = require(path.join(__dirname, 'app', 'models'))(env);

  app.engine('swig', swig.renderFile);

  app.set('view engine', 'swig');
  app.set('views', path.join(__dirname, 'app', 'views'));

  app.set('view cache', false);
  swig.setDefaults({ cache: false });

  app.use(methodOverride(function(req, res){
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      var method = req.body._method;
      delete req.body._method;
      return method
    }
  }));

  app.use(cookieParser());

  var mongoStore = new MongoStore({
    db: db.connection.db,
  });

  app.use(session({
    secret: env.get('SESSION_SECRET'),
    resave: true,
    saveUninitialized: true,
    store: mongoStore,
    cookie: {
      maxAge: new Date(Date.now() + 3600000 * 24)
    }
  }));

  app.use(flash());
  app.use(function(req, res, next) {
    res.locals.flash = req.flash();
    next();
  });

  require(path.join(__dirname, 'config', 'passport'))(app, env, db.User);


  var routers = require(path.join(__dirname, 'app', 'routers'))(),
      controllers = require(path.join(__dirname, 'app', 'controllers'))(db);

  app.use(routers.homeRouter(express.Router(), controllers.homeController));
  app.use(routers.dealsRouter(express.Router(), controllers.dealsController));
  app.use(routers.usersRouter(express.Router(), controllers.usersController));
  app.use(routers.sessionsRouter(express.Router(), controllers.sessionsController));

  app.use('/api', routers.dealsApiRouter(express.Router(), controllers.dealsApiController));

  app.get('/marionette', function(req, res) {
    var fs = require('fs');
    var filePath = path.join(__dirname, 'client', 'public', 'index.html');
    var content = fs.readFileSync(filePath);

    res.setHeader('Content-Type', 'text/html');
    res.send(content);
  });

  app.get('/js/app.js', browserify('./client/public/js/app.js'));

  app.use(express.static(path.join(__dirname, 'client', 'public')));
  app.use(favicon(path.join(__dirname, 'client', 'public', 'favicon.ico')));

  app.use('/bower_components', express.static(path.join(__dirname, 'client', 'bower_components')));

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

  return app;
};
