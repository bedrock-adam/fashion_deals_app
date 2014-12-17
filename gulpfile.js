var path = require('path'),
    gulp = require('gulp');

var buildDir = path.join(__dirname, 'dist');
var publicDir = path.join(buildDir, 'public');

gulp.task('clean', function() {

});

gulp.task('build', ['clean'],  function() {

});

var dirs = [
  // 'server.js',
  'app.js',
  'app/controllers/**/*.js',
  'app/routers/*.js',
  'app/models/*.js',
  'app/views/**/*.swig',
];

var createServer = function() {
  var env = require(path.join(__dirname, 'config', 'environment')),
      app = require('./app')(env);
      Server = require('http').Server(app);

  var server = Server.listen(env.get('PORT'), function() {
    console.log('server listening on port ' + server.address().port);
  });
}

gulp.task('watch', function() {
  gulp.watch(dirs, createServer());
});

gulp.task('default', function() {
  gulp.run('build', 'watch');
});

gulp.task('db:seed', function(done) {
  var seeds = require(path.join(__dirname, 'db', 'seeds'));

  seeds().then(function() {
    console.log('seeded database');
    done();
  });
});
