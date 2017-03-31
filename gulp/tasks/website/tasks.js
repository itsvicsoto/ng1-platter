var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();


// == PATH STRINGS ========

var paths = {
  scripts: './source/website/js/**/*.js',
  styles: ['./source/website/**/*.css', './source/website/**/*.scss'],
  distDev: './app/website/assets',
  jsDir: './source/website/js',
  bowerDir: './bower_components'
};

var includePaths = [
  'bower_components/compass-mixins/lib'
];

// == PIPE SEGMENTS ========

var pipes = {};

pipes.buildStyles = function() {
  return gulp.src(paths.styles)
    .pipe(plugins.sass({
      includePaths: includePaths,
      outputStyle: 'compressed',
      errLogToConsole: true
    }))
    .pipe(plugins.notify({
      title: 'CSS : Success',
      message: 'Your css have compiled successfully'
    }))
    .pipe(gulp.dest(paths.distDev));
};

pipes.buildScripts = function() {
  return gulp.src([
      paths.bowerDir + '/jquery/dist/jquery.js',
      paths.bowerDir + '/bootstrap-sass/assets/javascripts/bootstrap.min.js',
      paths.bowerDir + '/slick-carousel/slick/slick.min.js',
      paths.bowerDir + '/lightbox2/dist/js/lightbox.min.js',
      paths.jsDir + '/flickity/flickity.pkgd.min.js',
      paths.jsDir + '/parallaxImg/parallaxImg.js',
      paths.jsDir + '/app.constants.js',
      paths.jsDir + '/app.js'
    ])
    .pipe(plugins.concat('js/main.js'))
    // .pipe(plugins.stripDebug())
    .pipe(plugins.uglify())
    // Notify does not work on windows machine.
    .pipe(plugins.notify({
      title: 'Javascript : Success',
      message: 'Your scripts have compiled successfully'
    }))
    .pipe(gulp.dest(paths.distDev));
};

pipes.buildAll = function() {

  var appScripts = pipes.buildScripts();
  var appStyles = pipes.buildStyles();


  // return pipes.pipe(plugins.inject(appScripts, {
  //     relative: true
  //   }))
  //   .pipe(plugins.inject(appStyles, {
  //     relative: true
  //   }))
}


// == TASKS ========


gulp.task('website-clean-build', pipes.buildAll);

gulp.task('website-dev', ['website-clean-build'], function() {

  // watch styles
  gulp.watch(paths.styles, function() {
    return pipes.buildStyles();
  });

  // watch scripts
  gulp.watch(paths.scripts, function() {
    return pipes.buildScripts();
  });


});
