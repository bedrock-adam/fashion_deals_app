var path = require('path'),
    config = require(path.join(Node.root, 'config', 'environment')),
    mongoose = require(path.join(Node.root, 'config', 'mongoose')),
    swig = require('swig'),
    express = require('express'),
    compression = require('compression');
    methodOverride = require('method-override'),
    session = require('express-session'),
    morgan = require('morgan');
    // passport = require('passport'),
    // FacebookStrategy = require('passport-facebook').Stategy,
    csrf = require('csurf'),
    bodyParser = require('body-parser');
    debug = require('debug');

var db = mongoose();
var app = express();
app.engine('swig', swig.renderFile);

app.set('port', env.get('EXPRESS:PORT'));
app.set('view engine', 'swig');
app.set('views', path.join(Node.root, 'app', 'views'));

app.set('view cache', false);
swig.setDefaults({ cache: false });
app.use(morgan('dev'));
app.use(session({
  secret: 'some really long secret',
  resave: true,
  saveUninitialized: true
}));
app.use(csrf());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(compression());
app.use(express.static('./public'));

app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method
    delete req.body._method
    return method
  }
}));

// passport.use(new FacebookStrategy({
//     clientID: env.get('FACEBOOK_CLIENT_ID'),
//     clientSecret: env.get('FACEBOOK_CLIENT_SECRET'),
//     callbackURL: env.get("FACEBOOK_CALLBACK_URL')
//   },
//   function(accessToken, refreshToken, profile, done) {
//     done();
//     // User.findOrCreate(..., function(err, user) {
//     //   if (err) { return done(err); }
//     //   done(null, user);
//     // });
//   }
// ));

app.use(require('../app/routes/home')(express.Router()));
app.use(require('../app/routes/deals')(express.Router()));
app.use(require('../app/routes/sessions')(express.Router()));
app.use(require('../app/routes/users')(express.Router()));

app.use(function(err, req, res, next) {
  if (err.code !== 'EBADCSRFTOKEN') return next(err);

  res.status(403)
  res.send('session has expired or form tampered with')
});

// app.use(function(err, req, res, next) {
//   if (err.
// });

var server = app.listen(env.get('EXPRESS_PORT'), function() {
  debug('Express server listening on port ' + server.address().port);
});

module.exports = app;
