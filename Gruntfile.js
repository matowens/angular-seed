module.exports = function(grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        /**
        * grunt-conrtib-clean
        *
        * Removes files and directories.
        *
        * @type {Object}
        */
        clean: {
            dist: ['.tmp']
        },

        /**
        * grunt-contrib-concat
        *
        * Concatenates multiple files into a single file.
        *
        * @type {Object}
        */
        concat: {

            options: {
                banner: '/* \n * <%= pkg.name %> - concat - <%= grunt.template.today("dddd, mmmm dS, yyyy, h:MM:ss TT") %> \n */\n',
                stripBanners: true
            },

            /* concat:styles concats just our css files. */
            styles: {

                src: [
                    'bower_components/ng-notify/src/styles/ng-notify.css',
                    'bower_components/nprogress/nprogress.css',
                    'app/styles/normalize.css',
                    'app/styles/main.css',
                    'app/styles/**/*.css',
                    '.tmp/**/*.sass'
                ],

                dest: '.tmp/<%= pkg.name %>.css'
            },

            /* concat:scripts concats just our js files. */
            scripts: {

                src: [
                    'bower_components/angular/angular.js',
                    'bower_components/angular-ui-router/release/angular-ui-router.js',
                    'bower_components/ng-notify/src/scripts/ng-notify.js',
                    'bower_components/nprogress/nprogress.js',
                    'app/scripts/plugins/**/*.js',
                    'app/scripts/angular/module.js',
                    'app/scripts/angular/**/*.js'
                ],

                dest: '.tmp/<%= pkg.name %>.js'
            }
        },

        /**
        * grunt-contrib-cssmin
        *
        * Minifies our css files.
        *
        * @type {Object}
        */
        cssmin: {

            options: {
                banner: '/* \n * <%= pkg.name %> - minify - <%= grunt.template.today("dddd, mmmm dS, yyyy, h:MM:ss TT") %> \n */',
                stripBanners: true,
                keepSpecialComments: 0
            },

            dist: {
                src: '.tmp/*.css',
                dest: 'public/css/client.min.css'
            }
        },

        /**
        * grunt-contrib-htmlmin
        *
        * Minifies our html files.
        *
        * @type {Object}
        */
        htmlmin: {

            options: {
                removeComments: true,
                collapseWhitespace: true
            },

            /* htmlmin:index processes our primary index file. */
            index: {
                files: {
                    'public/index.html': 'app/index.html'
                }
            },

            /* htmlmin:partials processes all of our app partials. */
            partials: {
                files: [{
                    expand: true,
                    cwd: 'app/partials/',
                    src: ['*.html'],
                    dest: 'public/partials/',
                    ext: '.html'
                }]
            }
        },

        /**
        * grunt-contrib-imagemin
        *
        * Optimizes our images.
        *
        * @type {Object}
        */
        imagemin: {

            dist: {
                files: [{
                    expand: true,
                    cwd: 'app/images',
                    src: ['**/*.{png,jpg,jpeg,gif,ico}'],
                    dest: 'public/img/'
                }]
            }
        },

        /**
        * grunt-contrib-jshint
        *
        * Lints our javascript files for issues.
        *
        * @type {Object}
        */
        jshint: {

            options: {
                browser: true,
                globals: {
                    'angular': false,
                }
            },

            dist: {
                src: ['app/scripts/angular/**/*.js']
            }
        },

        /**
        *  grunt-contrib-sass
        *
        * Compiles our sass files into css files.
        *
        * @type {Object}
        */
        sass: {

            dist: {
                src: 'app/styles/main.sass',
                dest: '.tmp/<%= pkg.name %>.sass'
            }
        },

        /**
        * grunt-contrib-uglify
        *
        * Minifies and uglifies our javascript for smaller files and faster loading.
        *
        * @type {Object}
        */
        uglify: {

            options: {
                banner: '/* \n * <%= pkg.name %> - uglify - <%= grunt.template.today("dddd, mmmm dS, yyyy, h:MM:ss TT") %> \n */\n',
                stripBanners: true,
                sourceMap: true
            },

            dist: {
                src: '.tmp/<%= pkg.name %>.js',
                dest: 'public/js/<%= pkg.name %>.min.js'
            }
        },

        /**
        * grunt-contrib-watch
        *
        * Watches our project for changes, builds appropriate elements to keep app up to date.
        *
        * @type {Object}
        */
        watch: {

            /* watch:index watches for changes in our primary index file and rebuilds it. */
            index: {
                files: ['app/index.html'],
                tasks: ['index']
            },

            /* watch:partials watches for changes in any of our partials and rebuilds them. */
            partials: {
                files: ['app/partials/**/*.html'],
                tasks: ['partials']
            },

            /* watch:css watches for changes in any of our styles and recompiles them. */
            css: {
                files: ['app/styles/**/*.sass', 'app/styles/**/*.css'],
                tasks: ['styles', 'clean']
            },

            /* watch:scripts watches for changes in any of our scripts and rebuilds them. */
            scripts: {
                files: ['app/scripts/**/*.js'],
                tasks: ['scripts', 'clean']
            },

            /* watch:images watches for changes in any of our images and reoptimizes them. */
            images: {
                files: ['app/images/**/*'],
                tasks: ['images']
            }
        }
    });

    // Load our modules...
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Build process...
    grunt.registerTask('scripts', ['jshint', 'concat:scripts', 'uglify']);
    grunt.registerTask('styles', ['sass', 'concat:styles', 'cssmin']);
    grunt.registerTask('images', ['imagemin']);
    grunt.registerTask('partials', ['htmlmin:partials']);
    grunt.registerTask('index', ['htmlmin:index']);

    // Default...
    grunt.registerTask('default', ['index', 'styles', 'scripts', 'images', 'partials', 'clean']);
};
