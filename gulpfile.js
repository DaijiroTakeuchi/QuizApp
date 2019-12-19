var gulp = require("gulp");
var browserSync = require("browser-sync");

gulp.task("watch", function() {
  browserSync.init({
    server: {
      baseDir: "./public/"
    },
    files: ["./public/**.html", "./public/**.css", "./public/**.js"]
  });
});
