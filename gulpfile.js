let gulp = require("gulp");
let cleanCSS = require("gulp-clean-css");
let uglify = require("gulp-uglify");
let babel = require("gulp-babel");
let concat = require("gulp-concat");
let sourcemaps = require("gulp-sourcemaps");
let rename = require("gulp-rename");
let pump = require("pump");
 

gulp.task("js", (cb) =>
	pump([
		gulp.src([
			"src/js/nav.js",
			"src/js/main.js",
			"src/js/viz/large-device/*.js",
			"src/js/viz/small-device/*.js"]),
		sourcemaps.init(),
		babel({
			presets: ["@babel/env"]
		}),
		concat("script.js"),
		uglify(),
		rename("script-min.js"),
		sourcemaps.write("../maps"),
		gulp.dest("dist/js")
	],
	cb
	)
);


gulp.task("css", (cb) => 
	pump([
		gulp.src("src/css/*.css"),
		sourcemaps.init(),
		cleanCSS({compatibility: "ie8"}),
		sourcemaps.write("../maps"),
		gulp.dest("dist/css")
	],
	cb
	)
);
