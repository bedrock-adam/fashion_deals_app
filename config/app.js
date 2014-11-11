var path = require('path'),
    env = require(path.join(__dirname, 'environment')),
    db = require(path.join(__dirname, 'db')),
    swig = require('swig'),
    express = require('express'),
    compression = require('compression');
    methodOverride = require('method-override'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    cookieSession = require('cookie-session'),
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
    app = express();

app.engine('swig', swig.renderFile);

app.set('view engine', 'swig');
app.set('views', path.join(__dirname, '../', 'app', 'views'));

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

app.use(require(path.join(__dirname, '..', 'app', 'routes', 'api', 'deals'))(express.Router()));

app.use(require(path.join(__dirname, '..', 'app', 'routes', 'homeRouter'))(express.Router()));
app.use(require(path.join(__dirname, '..', 'app', 'routes', 'dealsRouter'))(express.Router()));
app.use(require(path.join(__dirname, '..', 'app', 'routes', 'sessionsRouter'))(express.Router()));
app.use(require(path.join(__dirname, '..', 'app', 'routes', 'usersRouter'))(express.Router()));

app.use(express.static(path.join(__dirname, '..', 'public')));

app.use(favicon(path.join(__dirname, '..', 'public', 'favicon.ico')));

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
