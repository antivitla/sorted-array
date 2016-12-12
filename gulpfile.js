var gulp = require("gulp");
var rename = require("gulp-rename");
var insert = require("gulp-insert");
var run = require("gulp-run");

// Patterns

var patterns = {
  node: {
    module: ".tmp/*.node.js",
    tests: "src/*.node.tests.js"
  },
  browser: {
    module: ".tmp/*.browser.js",
    tests: ".tmp/*.browser.tests.js"
  },
  src: [
    "src/*.js",
    "!src/*.tests.js",
    "!src/*.node.js",
    "!src/*.browser.js"
  ]
};

// Export/copy

gulp.task("export-node-module", function () {
  return gulp.src(patterns.node.module)
    .pipe(insert.prepend("module.exports = "))
    .pipe(gulp.dest("./"))
});

gulp.task("export-node-tests", function () {
  return gulp.src(patterns.node.tests)
    .pipe(gulp.dest("./"))
});

gulp.task("export-browser-module", function () {
  return gulp.src(patterns.browser.module)
    .pipe(gulp.dest("./"))
});

gulp.task("export-browser-tests", function () {
  return gulp.src(patterns.browser.tests)
    .pipe(gulp.dest("./"))
});

gulp.task("export", [
  "export-node-module",
  "export-browser-module",
  "export-node-tests",
  "export-browser-tests"
], function () {
  return gulp.src(patterns.src).pipe(gulp.dest("./"));
});

// Test

gulp.task("test-node", function () {
  return run("mocha *.node.tests.js").exec();
});

gulp.task("test-browser", function () {
  return run("jasmine *.browser.tests.js").exec();
});

gulp.task("test", ["test-node", "test-browser"]);

// Watch

gulp.task("watch", function () {
  gulp.watch(patterns.browser.tests, ["export-browser-tests", "test-browser"]);
  gulp.watch(patterns.browser.module, ["export-browser-module", "test-browser"]);
  gulp.watch(patterns.node.tests, ["export-node-tests", "test-node"]);
  gulp.watch(patterns.node.module, ["export-node-module", "test-node"]);
});

// Default

gulp.task("default", ["export", "test"]);
