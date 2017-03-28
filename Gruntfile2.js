"use strict";

module.exports = function (grunt) {
    grunt.initConfig({
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    "dist/html/index.html": ["src/html/index.html"]
                }
            }
        },
        uglify: {
            options: {
                mangle: false
            },
            build: {
                files: {
                    "dist/js/comm.js": ["src/js/comm.js"]
                }
            }
        },
        cssmin : {
            with_bannel : {
                options : {
                    bannel : '/* GRUNT Css files by Sonic */'
                },
                files : {
                    'dist/css/combo.css' : ['src/css/base.css','src/css/index.css']
                }
            }
        },
        imagemin : {
            dist : {
                options : {
                    optimizationLevel : 3
                },
                files : {
                    'dist/images/photo.png' : 'src/images/photo.png',
                    'dist/images/badge.jpg' : 'src/images/badge.jpg'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');

    grunt.registerTask('build', ['htmlmin', 'uglify','cssmin','imagemin']);
};