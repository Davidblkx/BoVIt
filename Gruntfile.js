"use strict";

module.exports = function (grunt) {
    
    // Load multiple grunt tasks using globbing patterns
    // https://www.npmjs.com/package/load-grunt-tasks
    require('load-grunt-tasks')(grunt, {
        scope: 'devDependencies'
    });
    
    // Display the elapsed execution time of grunt tasks
    // https://www.npmjs.com/package/time-grunt
    require('time-grunt')(grunt);
    
    grunt.initConfig({
        bowerPath: 'bower_components',
        
        // ################# CLEAN #################
        clean: ['public'],
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
                },{
                    expand: true,
                    cwd: '<%= bowerPath %>/ui-select/dist',
                    src: ['*.min.*'],
                    dest: 'public/lib/'
                },{
                    expand: true,
                    cwd: '<%= bowerPath %>/angular-sanitize',
                    src: ['angular-sanitize.min.js'],
                    dest: 'public/lib/'
                },{
                    expand: true,
                    cwd: '<%= bowerPath %>/moment/min',
                    src: ['*.min.js'],
                    dest: 'public/lib/'
                },{
                    expand: true,
                    cwd: '<%= bowerPath %>/fullcalendar/dist',
                    src: ['*.min.*'],
                    dest: 'public/lib/'
                },{
                    expand: true,
                    cwd: '<%= bowerPath %>/jquery/dist',
                    src: ['jquery.min.js'],
                    dest: 'public/lib/'
                }]
            },
            img: {
                files: [{
                    expand: true,
                    cwd: 'dev/img/',
                    src: ['**/*'],
                    dest: 'public/img/'
                },{
                    expand: true,
                    cwd: 'dev/html/',
                    src: ['favicon.ico'],
                    dest: 'public/'
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
                },{
                    expand: true,
                    cwd: 'dev/indicadores/html/',
                    src: ['**/*.html'],
                    dest: 'public/'
                }]
            }
        },
        // #########################################
        
        concat: {
            app: {
                src: ['dev/app/controllers/**/*.js', 'dev/app/directives/**/*.js', 'dev/indicadores/app/**/*.js'],
                dest: 'public/js/appDepend.js'
            },
            dateTime: {
                src: ['dev/app/datetime/*.js'],
                dest: 'public/js/dateTime.js'
            },
            indicadores: {
                src: ['dev/indicadores/js/**/*.js'],
                dest: 'public/js/indicadores.js'
            }
        },
        
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
            sass: {
                files: ['dev/sass/**/*.scss'],
                tasks: ['sass']
            },
            js: {
                files: ['dev/js/**/*.js'],
                tasks: ['copy:js', 'file_append:dev']
            },
            concat: {
                files: ['dev/app/**/*', 'dev/**/app/**/*', 'dev/**/js/**/*.js'],
                tasks: ['concat']
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
                files: ['dev/html/**/*.html', 'dev/**/html/**/*.html'],
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
        'copy:fonts',
        'copy:lib',
        'copy:img',
        'copy:js',
        'concat',
        'copy:html',
        'file_append:dev'
    ]);
    
    //Deploy task
    grunt.registerTask('deploy', [
        'clean',
        'sass',
        'copy:fonts',
        'copy:lib',
        'copy:img',
        'copy:js',
        'concat',
        'copy:html',
        'file_append:deploy'
    ]);
    
    //default
    grunt.registerTask('default', [
        'dev',
        'watch'
    ]);
};