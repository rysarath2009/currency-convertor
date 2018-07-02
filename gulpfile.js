var gulp = require('gulp'),
    gutil = require('gulp-util'),
    bump = require('gulp-bump'),
    fs = require('fs'),
    rename = require('gulp-rename'),
    replace = require('gulp-replace'),
    runSequence = require('run-sequence'),

    configLoc = './config/config.json',
    versionLoc = './config/version.json',
    versionJsLoc = './config/version.js';

/* Retrieves config json based on NODE_ENV */
function generateConfig() {
    var NODE_ENV = gutil.env.NODE_ENV;
    if (!NODE_ENV) gutil.env.NODE_ENV = NODE_ENV = "local";
    var configJson = fs.readFileSync(configLoc, 'utf8');
    configJson = JSON.parse(JSON.stringify(configJson));
    var appConfig = JSON.parse(configJson)[NODE_ENV];

    return appConfig;
}

/* Generate globals.js in config directory */
gulp.task('globals', function () {
    return gulp.src('config/globals.temp')
        .pipe(replace('$version', "'" + generateVersion() + "'"))
        .pipe(replace('$config', JSON.stringify(generateConfig())))
        .pipe(rename('globals.ts'))
        .pipe(gulp.dest('config/'));
});

/* Generates a manifest for a specific environment */
gulp.task('generate-single-manifest', function () {
    var appConfig = generateConfig();

    return gulp.src('manifest.yml.template')
        .pipe(rename(gutil.env.NODE_ENV + '.manifest.yml'))
        .pipe(replace('$appName', appConfig.projectInfo.appName + "-" + generateVersion()))
        .pipe(replace('$hostName', appConfig.projectInfo.hostName))
        .pipe(replace('$memory', appConfig.projectInfo.memory))
        .pipe(replace('$instances', appConfig.projectInfo.instances))
        .pipe(replace('$configJson', JSON.stringify(appConfig)))
        .pipe(gulp.dest('./'));
});

/* Generates a manifest for all environments */
gulp.task('generate-all-manifest', function () {
    var configJson = fs.readFileSync(configLoc, 'utf8');
    configJson = JSON.parse(JSON.stringify(configJson));
    var appConfig = JSON.parse(configJson);

    for (var environment in appConfig) {
        var envConfig = appConfig[environment];

        gulp.src('manifest.yml.template')
            .pipe(rename(environment + '.manifest.yml'))
            .pipe(replace('$appName', envConfig.projectInfo.appName + "-" + generateVersion()))
            .pipe(replace('$hostName', envConfig.projectInfo.hostName))
            .pipe(replace('$memory', envConfig.projectInfo.memory))
            .pipe(replace('$instances', envConfig.projectInfo.instances))
            .pipe(replace('$configJson', JSON.stringify(envConfig)))
            .pipe(gulp.dest('./'));
    }

    return true;
});

function buildSequence() {
    runSequence(
        'generate-single-manifest',
        'globals',
        'bump-version'
    );
}

/* Task to execute test scripts and generate build code on success for local */
gulp.task('build-local', function () {
    gutil.env.NODE_ENV = "local";
    gutil.log(gutil.colors.bold.white.bgBlue("BUILDING FOR: " + gutil.env.NODE_ENV));
    buildSequence();
});

/* Task to execute test scripts and generate build code on success for develop */
gulp.task('build-develop', function () {
    gutil.env.NODE_ENV = "develop";
    gutil.log(gutil.colors.bold.white.bgBlue("BUILDING FOR: " + gutil.env.NODE_ENV));
    buildSequence();
});

/* Task to execute test scripts and generate build code on success for production */
gulp.task('build-production', function () {
    gutil.env.NODE_ENV = "production";
    gutil.log(gutil.colors.bold.white.bgBlue("BUILDING FOR: " + gutil.env.NODE_ENV));
    buildSequence();
});

/* Generates version string from version.json */
function generateVersion() {
    var versionJson = fs.readFileSync(versionLoc, 'utf8');
    versionJson = JSON.parse(versionJson);

    var version = versionJson.majorVersion +
        "." + versionJson.minorVersion +
        "." + versionJson.tertiaryVersion;

    return version;
}

/* Bumps bower.json and package.json versions to current version */
gulp.task('bump-version', function () {
    gulp.src(['./package.json', './bower.json'])
        .pipe(bump({ version: generateVersion() }))
        .pipe(gulp.dest('./'));
});
