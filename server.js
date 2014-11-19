#!/usr/bin/env node

var path = require('path'),
    env = require(path.join(__dirname, 'config', 'environment')),
    db = require(path.join(__dirname, 'config', 'db')),
    swig = require('swig'),
    compression = require('compression');
    methodOverride = require('method-override'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    MongoStore = require('connect-mongo')(session),
    csrf = require('csurf'),
    flash = require('connect-flash'),
    debug = require('debug'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    FacebookStrategy = require('passport-facebook').Strategy,
    TwitterStrategy = require('passport-twitter').Strategy,
    GoogleStrategy = require('passport-google').Strategy,
    favicon = require('serve-favicon'),
    morgan = require('morgan'),
    express = require('express'),
    app = express(),
    server = require('http').Server(app),
    io = require('socket.io')(server);

app.engine('swig', swig.renderFile);

app.set('view engine', 'swig');
app.set('views', path.join(__dirname, 'app', 'views'));

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

app.use(csrf({cookie: true}));

app.use(function(req, res, next) {
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use(flash());
app.use(function(req, res, next) {
  res.locals.flash = req.flash();
  next();
});

var User = db.User;

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
  // User.findById(user, function(err, user) {
  //   done(err, user);
  // });
});

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy({
  usernameField: 'session[username]',
  passwordField: 'session[password]' 
}, function(username, password, done) {
  User.authenticate(username, password, done);
}));

passport.use(new FacebookStrategy({
    clientID: env.get('FACEBOOK_CLIENT_ID'),
    clientSecret: env.get('FACEBOOK_CLIENT_SECRET'),
    callbackURL: env.get('FACEBOOK_CALLBACK_URL')
  },
  function(accessToken, refreshToken, profile, done) {
    // User.findOrCreate(..., function(err, user) {
    //   if (err) { return done(err); }
    //   done(null, user);
    // });
    done(null, profile);
  }
));

passport.use(new TwitterStrategy({
    consumerKey: env.get('TWITTER_CONSUMER_KEY'),
    consumerSecret: env.get('TWITTER_CONSUMER_SECRET'),
    callbackURL: env.get('TWITTER_CALLBACK_URL')
  },
  function(token, tokenSecret, profile, done) {
    // User.findOrCreate(..., function(err, user) {
    //   if (err) { return done(err); }
    //   done(null, user);
    // });
    done(null, profile)
  }
));

passport.use(new GoogleStrategy({
    returnURL: env.get('GOOGLE_RETURN_URL'),
    realm: env.get('GOOGLE_REALM')
  },
  function(identifier, profile, done) {
    // User.findOrCreate({ openId: identifier }, function(err, user) {
    //   done(err, user);
    // });
    done(null, profile);
  }
));

app.post('/sessions', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/sessions/new',
  successFlash: 'You have successfully logged in',
  failureFlash: 'Invalid email or password'
}));

app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
      successRedirect: '/',
      failureRedirect: '/sessions/new',
      successFlash: 'Successfully logged in',
      failureFlash: 'Failed to authenticate with provider'
    }));

app.get('/auth/twitter', passport.authenticate('twitter'));
app.get('/auth/twitter/callback',
    passport.authenticate('twitter', {
      successRedirect: '/',
      failureRedirect: '/sessions/new',
      successFlash: 'Successfully logged in',
      failureFlash: 'Failed to authenticate with provider'
    }));

app.get('/auth/google', passport.authenticate('google'));
app.get('/auth/google/return',
  passport.authenticate('google', {
      successRedirect: '/',
      failureRedirect: '/sessions/new',
      successFlash: 'Successfully logged in',
      failureFlash: 'Failed to authenticate with provider'
  }));

var routers = require(path.join(__dirname, 'app', 'routers'))(),
    controllers = require(path.join(__dirname, 'app', 'controllers'))(db);

app.use(routers.homeRouter(express.Router(), controllers.homeController));
app.use(routers.dealsRouter(express.Router(), controllers.dealsController));
app.use(routers.usersRouter(express.Router(), controllers.usersController));
app.use(routers.sessionsRouter(express.Router(), controllers.sessionsController));

app.use('/api', routers.dealsApiRouter(express.Router(), controllers.dealsApiController));

app.use(express.static(path.join(__dirname, 'public')));

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(morgan('dev'));

io.use(function(socket, next) {
  cookieParser(env.get('SESSION_SECRET'))(socket.request, {}, function(err) {
    var sessionId = socket.request.signedCookies['connect.sid'];

    mongoStore.get(sessionId, function(err, session) {
      socket.request.session = session;

      passport.initialize()(socket.request, {}, function() {
        passport.session()(socket.request, {}, function() {
          if (socket.request.user) {
            next(null, true);
          } else {
            next(new Error('User is not authenticated'));
          }
        });
      });
    });
  });
});

io.on('connection', function(socket) {
  console.log('user has connected');

  socket.on('disconnect', function() {
    console.log('user has disconnected');
  });
});

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

var server = server.listen(env.get('PORT'), function() {
  console.log('server listening on port ' + server.address().port);
});
