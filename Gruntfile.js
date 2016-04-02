"use strict";

module.exports = function (grunt) {
    
    // Load multiple grunt tasks using globbing patterns
    // https://www.npmjs.com/package/load-grunt-tasks
    require('load-grunt-tasks')(grunt, {
        scope: 'devDependencies'
    });
    
    // Load typescript task
    // https://www.npmjs.com/package/grunt-typescript
    grunt.loadNpmTasks('grunt-typescript');
    
    // Display the elapsed execution time of grunt tasks
    // https://www.npmjs.com/package/time-grunt
    require('time-grunt')(grunt);
    
    grunt.initConfig({
        bowerPath: 'bower_components',
        
        // ################# CLEAN #################
        clean: ['public'],
        // #########################################
        
        // ############### TYPESCRIPT ##############
        typescript: {
            base: {
                src: ['dev/ts/**/*.ts'],
                dest: 'public/js/',
                options: {
                    module: 'commonjs',
                    target: 'es6',
                    basePath: 'dev/ts/**/*.ts',
                    sourceMap: true,
                    declaration: true
                }
            }
        },
        // #########################################
        
        // ############# COMPILE SASS ##############
        sass : {
           options: {
               sourcemap: 'none',
               trace: true
           },
           dist: {
               files: {
                   'public/css/style.css' : 'dev/sass/main.scss'
               }
           }
        },
        // #########################################
        
        // ############## COPY FILES ###############
        copy : {
            lib: {
                files: [{
                    //font-awesome css
                    expand: true,
                    cwd: '<%= bowerPath %>/font-awesome/css',
                    src: ['*.min.css'],
                    dest: 'public/lib/'
                },{
                    //font-awesome fonts
                    expand: true,
                    cwd: '<%= bowerPath %>/font-awesome/fonts',
                    src: ['**'],
                    dest: 'public/fonts/'
                },{
                    //bootstrap
                    expand: true,
                    cwd: '<%= bowerPath %>/bootstrap/dist/fonts',
                    src: ['**'],
                    dest: 'public/fonts/'
                },{
                    expand: true,
                    cwd: '<%= bowerPath %>/bootstrap/dist/css',
                    src: ['bootstrap.min.css', 'bootstrap-theme.min.css'],
                    dest: 'public/lib/'
                },{
                    expand: true,
                    cwd: '<%= bowerPath %>/bootstrap/dist/js/',
                    src: ['bootstrap.min.js'],
                    dest: 'public/lib/'
                },{
                    expand: true,
                    cwd: '<%= bowerPath %>/angular/',
                    src: ['angular.min.js'],
                    dest: 'public/lib/'
                },{
                    expand: true,
                    cwd: '<%= bowerPath %>/angular-route/',
                    src: ['angular-route.min.js'],
                    dest: 'public/lib/'
                }]
            },
            img: {
                files: [{
                    expand: true,
                    cwd: 'dev/img/',
                    src: ['**/*'],
                    dest: 'public/img/'
                }]
            },
            js: {
                files: [{
                    expand: true,
                    cwd: 'dev/js/',
                    src: ['**/*.js'],
                    dest: 'public/js/'
                },{
                    expand: true,
                    cwd: 'dev/lib/',
                    src: ['**/*'],
                    dest: 'public/lib/'
                }]
            },
            fonts:{
                files: [{
                    expand: true,
                    cwd: 'dev/fonts/',
                    src: ['**/*'],
                    dest: 'public/fonts/'
                }]
            },
            html: {
                files: [{
                    expand: true,
                    cwd: 'dev/html/',
                    src: ['**/*.html'],
                    dest: 'public/'
                }]
            }
       },
        // #########################################
        
        // ############# APPEND DATA ###############
        file_append: {
            dev: {
                files: [{
                        prepend: "LOAD_LIVERELOAD = true;",
                        input: 'public/js/init.js',
                        output: 'public/js/init.js'
                }]
            },
            deploy: {
                files: [{
                        prepend: "LOAD_LIVERELOAD = false;",
                        input: 'public/js/init.js',
                        output: 'public/js/init.js'
                }]
            }
        },
        // #########################################
        
        // ################# WATCH #################
        watch: {
            fonts: {
                files: ['dev/fonts'],
                tasks: ['copy:fonts']
            },
            ts : {
                files: ['dev/ts/**/*.ts'],
                tasks: ['typescript']
            },
            sass: {
                files: ['dev/sass/**/*.scss'],
                tasks: ['sass']
            },
            js: {
                files: ['dev/js/**/*.js'],
                tasks: ['copy:js', 'file_append:dev']
            },
            lib: {
                files: ['dev/lib/**/*'],
                tasks: ['copy:js', 'file_append:dev']
            },
            image: {
                files: ['dev/img/**/*'],
                tasks: ['copy:img']
            },
            html: {
                files: ['dev/html/**/*.html'],
                tasks: ['copy:html']
            },
            configFiles: {
                files: ['Gruntfile.js'],
                options: {
                    reload: true
                }
            },
            client: {
                options: {
                    livereload: 35729 // default: 35729
                },
                files: ['public/**/*']
            }
        },
        // #########################################
    });
    
    
    //Develop task
    grunt.registerTask('dev', [
        'clean',
        'sass',
        'typescript',
        'copy:fonts',
        'copy:lib',
        'copy:img',
        'copy:js',
        'copy:html',
        'file_append:dev'
    ]);
    
    //Deploy task
    grunt.registerTask('deploy', [
        'clean',
        'sass',
        'typescript',
        'copy:fonts',
        'copy:lib',
        'copy:img',
        'copy:js',
        'copy:html',
        'file_append:deploy'
    ]);
    
    //default
    grunt.registerTask('default', [
        'dev',
        'watch'
    ]);
};