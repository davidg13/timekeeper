module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jshint: {
            files: ['src/main/resources/static/js/**/*.js', '!src/main/resources/static/js/lib/*.js'],
            options: {
                globals: {
                    console: true,
                    document: false
                }
            }
        },

        concat: {
            options: {
                separator: ';'
            },
            dist: {
                cwd: '',
                src: [
                    'src/main/resources/static/js/lib/angular.min.js',
                    'src/main/resources/static/js/lib/angular-route.min.js',
                     'src/main/resources/static/js/lib/ui-bootstrap-tpls-1.3.3.min.js',
                    'src/main/resources/static/js/employees/*.js',
                    'src/main/resources/static/js/shifts/shiftslist.component.js',
                     'src/main/resources/static/js/shifts/shiftscreate.component.js',
                     'src/main/resources/static/js/timekeeperApp.js',
                     'src/main/resources/static/js/services/employees.service.js',
                     'src/main/resources/static/js/services/shifts.service.js',
                     'src/main/resources/static/js/services/departments.service.js'
                    ],
                dest: 'target/classes/static/js/<%= pkg.name %>.js'
            }
        },

        /*
          omitted because minification breaks angular injection.
          There are ways to prevent this, but I have not investigated
        */
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("mm-dd-yyyy")%> */\n'
            },
            dist: {
                files: {
                    'target/classes/static/js/<%= pkg.name %>.min.js':['<%= concat.dist.dest %>']
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.registerTask('default', ['jshint','concat']);
};