/**
 * Tasks: Copy
 *
 * Copies all static files to the webroot
 */

// Task
module.exports = (gulp, paths) => {
    return () => {
        return gulp.src(
            [
                `${paths.src.audio}**/*`,
                `${paths.src.fonts}**/*`,
                `${paths.src.images}**/*`,
                `${paths.src.root}{*.html,*.ico}`,
                `${paths.src.videos}**/*`
            ],
            {'base': paths.src.root})
            .pipe(gulp.dest(paths.webroot.root));
    };
};
