var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    FacebookStrategy = require('passport-facebook').Strategy,
    TwitterStrategy = require('passport-twitter').Strategy,
    GoogleStrategy = require('passport-google').Strategy;

module.exports = function(app, env, User) {
  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(new LocalStrategy({
    usernameField: 'session[username]',
    passwordField: 'session[password]' 
  }, function(username, password, done) {
    User.authenticate(username, password, done);
  }));

  // passport.use(new FacebookStrategy({
  //     clientID: env.get('FACEBOOK_CLIENT_ID'),
  //     clientSecret: env.get('FACEBOOK_CLIENT_SECRET'),
  //     callbackURL: env.get('FACEBOOK_CALLBACK_URL')
  //   },
  //   function(accessToken, refreshToken, profile, done) {
  //     // User.findOrCreate(..., function(err, user) {
  //     //   if (err) { return done(err); }
  //     //   done(null, user);
  //     // });
  //     done(null, profile);
  //   }
  // ));

  // passport.use(new TwitterStrategy({
  //     consumerKey: env.get('TWITTER_CONSUMER_KEY'),
  //     consumerSecret: env.get('TWITTER_CONSUMER_SECRET'),
  //     callbackURL: env.get('TWITTER_CALLBACK_URL')
  //   },
  //   function(token, tokenSecret, profile, done) {
  //     // User.findOrCreate(..., function(err, user) {
  //     //   if (err) { return done(err); }
  //     //   done(null, user);
  //     // });
  //     done(null, profile)
  //   }
  // ));

  // passport.use(new GoogleStrategy({
  //     returnURL: env.get('GOOGLE_RETURN_URL'),
  //     realm: env.get('GOOGLE_REALM')
  //   },
  //   function(identifier, profile, done) {
  //     // User.findOrCreate({ openId: identifier }, function(err, user) {
  //     //   done(err, user);
  //     // });
  //     done(null, profile);
  //   }
  // ));

  app.post('/sessions', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/sessions/new',
    successFlash: 'You have successfully logged in',
    failureFlash: 'Invalid email or password'
  }));

  // app.get('/auth/facebook', passport.authenticate('facebook'));
  // app.get('/auth/facebook/callback',
  //   passport.authenticate('facebook', {
  //     successRedirect: '/',
  //     failureRedirect: '/sessions/new',
  //     successFlash: 'Successfully logged in',
  //     failureFlash: 'Failed to authenticate with provider'
  //   })
  // );

  // app.get('/auth/twitter', passport.authenticate('twitter'));
  // app.get('/auth/twitter/callback',
  //   passport.authenticate('twitter', {
  //     successRedirect: '/',
  //     failureRedirect: '/sessions/new',
  //     successFlash: 'Successfully logged in',
  //     failureFlash: 'Failed to authenticate with provider'
  //   })
  // );

  // app.get('/auth/google', passport.authenticate('google'));
  // app.get('/auth/google/return',
  //   passport.authenticate('google', {
  //     successRedirect: '/',
  //     failureRedirect: '/sessions/new',
  //     successFlash: 'Successfully logged in',
  //     failureFlash: 'Failed to authenticate with provider'
  //   })
  // );
};
