var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var bowerFiles = require('main-bower-files');


// == PATH STRINGS ========

var paths = {
  scripts: './app/dashboard/app/**/*.js',
  angularTemplates: './app/dashboard/app/**/*.html',
  styles: ['./source/dashboard/**/*.css', './source/dashboard/**/*.scss'],
  vendorStyles: [
    'bower_components/angular-chart.js/dist/angular-chart.css',
    'bower_components/angular-notify/dist/angular-notify.min.css',
    'bower_components/sweetalert/dist/sweetalert.css',
    'bower_components/angularjs-datepicker/dist/angular-datepicker.min.css',
    'bower_components/angular-loading-bar/build/loading-bar.min.css'
  ],
  distDev: './app/dashboard/assets',
  jsDir: './source/dashboard/js',
  bowerDir: './bower_components'
};

var includePaths = [
  'bower_components/bourbon/app/assets/stylesheets'
];

// == PIPE SEGMENTS ========

var pipes = {};

pipes.orderedVendorScripts = function() {
  return plugins.order([
    'jquery.js',
    'angular.js',
    'moment.js',
    'moment-timezone.js',
    'ui-bootstrap.js',
    'ui-bootstrap-tpls.js',
    'chart.js',
    'sweetalert.js',
    'SweetAlert.js',
    'angular-chart.js'
  ]);
};

pipes.orderedAppScripts = function() {
  return plugins.angularFilesort();
};

pipes.buildAngularTemplates = function() {
  return gulp.src(paths.angularTemplates)
    .pipe(plugins.angularTemplatecache('js/motherload-templates.min.js', {
      module: 'app.templates',
      standalone: true
    }))
    // .pipe(plugins.concat('js/motherload-templates.min.js'))
    .pipe(plugins.notify({
      title: 'Angular Templates : Success',
      message: 'Your templates have compiled successfully'
    }))
    .pipe(gulp.dest(paths.distDev));
}

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

pipes.buildVendorStyles = function() {


  return gulp.src(paths.vendorStyles)
    .pipe(plugins.concat('css/vendor.min.css'))
    .pipe(plugins.notify({
      title: 'Vendor Styles',
      message: 'Your scripts have compiled successfully'
    }))
    .pipe(gulp.dest(paths.distDev));

}

pipes.buildVendorScripts = function() {
  return gulp.src(bowerFiles('**/*.js', {
      "group": ['dashboard'],
      "overrides": {
        "angular-loading-bar": {
          "main": "./build/loading-bar.min.js"
        },
        "moment": {
          "main": "./moment.js"
        },
        "chart.js": {
          "main": []
        },
        "moment-timezone": {
          "main": "./moment-timezone.js"
        },
        "ace-builds": {
          "main": []
        }
      }
    }))
    .pipe(pipes.orderedVendorScripts())
    .pipe(plugins.concat('js/vendor.min.js'))
    // .pipe(stripDebug())
    // .pipe(plugins.uglify())
    // Notify does not work on windows machine.
    .pipe(plugins.notify({
      title: 'Vendor Javascript',
      message: 'Your scripts have compiled successfully'
    }))
    .pipe(gulp.dest(paths.distDev));
};

pipes.buildAppScripts = function() {

  return gulp.src(paths.scripts)
    .pipe(pipes.orderedAppScripts())
    .pipe(plugins.concat('js/motherload.min.js'))
    // .pipe(stripDebug())
    // .pipe(plugins.uglify())
    // Notify does not work on windows machine.
    .pipe(plugins.notify({
      title: 'App Javascript',
      message: 'Your scripts have compiled successfully'
    }))
    .pipe(gulp.dest(paths.distDev));
};

pipes.buildAll = function() {

  var vendorScripts = pipes.buildVendorScripts();
  var appScripts = pipes.buildAppScripts();
  var appStyles = pipes.buildStyles();
  var angularTemplates = pipes.buildAngularTemplates();
  var appVendorStyles = pipes.buildVendorStyles();

  // return pipes.pipe(plugins.inject(appScripts, {
  //     relative: true
  //   }))
  //   .pipe(plugins.inject(appStyles, {
  //     relative: true
  //   }))
}


// == TASKS ========


gulp.task('dashboard-clean-build', pipes.buildAll);

gulp.task('dashboard-dev', ['dashboard-clean-build'], function() {

  // watch styles
  gulp.watch(paths.styles, function() {
    return pipes.buildStyles();
  });

  // watch angular templates
  gulp.watch(paths.angularTemplates, function() {
    return pipes.buildAngularTemplates();
  })

  // watch vendor scripts
  gulp.watch(paths.bowerDir, function() {
    pipes.buildVendorStyles();
    return pipes.buildVendorScripts();
  })

  // watch scripts
  gulp.watch(paths.scripts, function() {
    return pipes.buildAppScripts();
  });

});
