let gulp = require("gulp");
let cleanCSS = require("gulp-clean-css");
let uglify = require("gulp-uglify");
let babel = require("gulp-babel");
let pump = require("pump");
 

gulp.task("babel", () =>
	gulp.src([
		"src/js/viz/large-device/*.js",
		"src/js/viz/small-device/*.js"
])
		.pipe(babel({
			presets: ["@babel/env"]
		}))
		.pipe(gulp.dest("test"))
);


gulp.task("css", () => {
	return gulp.src("css/*.css")
		.pipe(cleanCSS({compatibility: "ie8"}))
		.pipe(gulp.dest("dist"));
});

gulp.task("compress", function (cb) {
	pump([
		gulp.src("js/viz/large-device/*.js"),
		uglify(),
		gulp.dest("dist")
	],
	cb
	);
});
