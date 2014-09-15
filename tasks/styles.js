'use strict';

module.exports = function(gulp) {
  gulp.task('styles', function() {
    var gutil = gulp.plugin.util,
        prod  = gutil.env.prod;

    return gulp.src(gulp.cfg.styles.src)
      .pipe( gulp.plugin.plumber() )
      .pipe(
        gulp.plugin.sass({onError: gulp.plugin.notify.onError(function(error) { return error; })})
       )
      .pipe(
         gulp.plugin.autoprefixer({
          browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1'],
          cascade: false
         })
       )
      .pipe( !prod ? gutil.noop() : gulp.plugin.csso() )
      .pipe( gulp.dest(prod ?
        gulp.cfg.env.production.dir + gulp.cfg.styles.subDir
        : gulp.cfg.env.development.dir + gulp.cfg.styles.subDir)
      )
      .pipe( prod ? gutil.noop() : gulp.plugin.connect.reload() );
  });
};
