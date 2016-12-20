/**************************
 *@BY xiaoyin
 ***tpl默认目录结构
 + index.html
 - js
 -lib
 +alllib ... ...
 +common.js
 - css
 -less
 +style.less
 +common.less
 +style.css
 +style.min.css
 +style.css
 ***************************/

/*global module:false*/
module.exports = function (grunt) {
    'use strict';
    require('time-grunt')(grunt);
    var config = grunt.file.readJSON('config.json');
    var date = new Date();
    var time = {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate()
    };
    var appPath = config.isEdit ? config.pathEdit : config.pathProject + '/' + time.year + "/" + time.month + "/" + time.day + "/" + config.pathApp;
    grunt.file.mkdir(appPath);
    grunt.initConfig({
        config: config,
        path: appPath,
        pathBuild: appPath + config.pathBuild,
        copy: {
            pc: {
                expand: true,
                cwd: '<%=config.pathTplpc%>',
                src: '**/*  ',
                dest: '<%=path%>',
            },
            m: {
                expand: true,
                cwd: '<%=config.pathTplm%>',
                src: '**/*',
                dest: '<%=path%>',
            },
            img: {
                expand: true,
                cwd: '<%=config.pathImg%>',
                src: '**/*',
                dest: '<%=path%>images/',
            },
            buildimg: {
                expand: true,
                cwd: '<%=path%>images/',
                src: '**/*',
                dest: '<%=pathBuild%>images/',
            },
            buildjs: {
                expand: true,
                cwd: '<%=path%>js/',
                src: ['**/*', '!/*.js'],
                dest: '<%=pathBuild%>js/',
            },
            buildhtml: {
                expand: true,
                cwd: '<%=path%>',
                src: '*.html',
                dest: '<%=pathBuild%>',
            },
            lesscss: {
                expand: true,
                cwd: '<%=path%>/css/less/',
                src: '*.css',
                dest: '<%=path%>/css',
            }
        },
        rev: {
            options: {
                encoding: 'utf8',
                algorithm: 'md5',
                length: 8
            },
            build: {
                files: [{
                    src: [
                        '<%=pathBuild%>fonts/**/*.{eot,svg,ttf,woff}',
                        '<%=pathBuild%>js/*.js',
                        '<%=pathBuild%>css/*.css'
                    ]
                }]
            }
        },
        clean: {
            css: {
                expand: true,
                cwd: '<%=path%>',
                src: ['css/**/*.css', '!css/style.min.css'],
            },
            app: {
                expand: true,
                cwd: '<%=path%>',
                src: '**/*',
            },
        },
        connect: {

            options: {
                port: 9000,
                hostname: '*', //默认就是这个值，可配置为本机某个 IP，localhost 或域名
                livereload: 35888  //声明给 watch 监听的端口
            },

            server: {
                options: {
                    open: true, //自动打开网页 http://
                    base: [
                        '<%=path%>'  //主目录
                    ]
                }
            }
        },
        csslint: {
            strict: {
                options: {
                    import: 2,
                    csslintrc: '.csslint'
                },
                src: ['<%=path%>css/**/*.css'],
            },
        },
        autoprefixer: {
            options: {
                browers: ['aliases']
                //browsers:['last 2 versions','chrome','ie 8', 'ie 9','moz'],
            },
            css: {
                expand: true,
                cwd: '<%=path%>',
                src: 'css/**/*.css',
                dest: '<%=path%>',
                ext: '.css',
            }
        },
        cssmin: {
            /*压缩 CSS 文件为 .min.css */
            options: {
                keepSpecialComments: 0 /* 移除 CSS 文件中的所有注释 */
            },
            min: {
                expand: true,
                cwd: '<%=path%>',
                src: 'css/**/*.css',
                dest: '<%=path%>',
                ext: '.css'
            }
        },
        csscomb: {
            files: {
                expand: true,
                cwd: '<%=path%>',
                src: 'css/**/*.css',
                dest: '<%=path%>',
                ext: '.css'
            }
        },
        jshint: {
            /* 检查 js 语法 */
            all: ['Gruntfile.js', '<%=path%>js/*.js']
        },
        imagemin: {
            /* 压缩优化图片大小 */
            dist:{
                options: {
                    optimizationLevel: 7
                },
                files: [
                    {
                        expand: true,
                        cwd: '<%=path%>images/',
                        src: ['**/*.{png,jpg,jpeg}'], // 优化 img 目录下所有 png/jpg/jpeg 图片
                        dest: '<%=pathBuild%>images/' // 优化后的图片保存位置，默认覆盖
                    }
                ]
            }
        },
        concat: {
            /* 合并 CSS 文件 */
            css: {
                src: ['<%=path%>css/*.css'],
                dest: '<%=pathBuild%>css/style.css',
            },
            js: {
                src: ['<%=path%>js/*.js'],
                /* 根据目录下文件情况配置 如果可以使用 require.js/LABjs 等配置更佳 */
                dest: '<%=path%>js/concat.js'
            }
        },
        less: {
            files: {
                expand: true,
                cwd: '<%=path%>',
                src: 'css/**/*.less',
                dest: '<%=path%>',
                ext: '.css'
            }
        },
        uglify: {
            /* 最小化、混淆、合并 JavaScript 文件 */
            target: {
                files: {
                    '<%=path%>js/all.min.js': ['<%=path%>js/all.js']
                }
            },
            minjs: { //最小化、混淆所有 js/ 目录下的 JavaScript 文件
                files: [{
                    expand: true,
                    cwd: '<%=path%>js/',
                    src: ['*.js', '!**/*.min.js'],
                    dest: '<%=pathBuild%>js/',
                    ext: '.js'
                }]
            }
        },
        // 处理html中css、js 引入合并问题
        usemin: {
            html: 'dist/html/*.html'
        },
        //压缩HTML
        htmlmin: {
            options: {
                removeComments: true,
                removeCommentsFromCDATA: true,
                collapseWhitespace: true,
                collapseBooleanAttributes: true,
                removeAttributeQuotes: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeOptionalTags: true
            },
            html: {
                files: [{
                    expand: true,
                    cwd: '<%=pathBuild%>',
                    src: ['*.html'],
                    dest: '<%=pathBuild%>'
                }]
            }
        },
        watch: {
            /* 监控文件变化并执行相应任务 */
            img: {
                files: ['<%=path%>**/*.{png,jpg,jpeg}'],
                options: {
                    event: ['changed', 'added'],
                    livereload: 35888
                },
            },
            css: {
                options: {
                    event: ['changed', 'added'],
                    livereload: 35888
                },
                files: ['<%=path%>less/*.css'],
                tasks: ['newer:copy:lesscss']
            },
            less: {
                options: {
                    event: ['changed', 'added'],
                    livereload: 35888
                },
                files: ['<%=path%>**/*.less'],
                tasks: ['newer:less']
            },
            js: {
                options: {
                    livereload: 35888
                },
                files: ['<%=path%>**/*.js'],
            },
            html: {
                options: {
                    livereload: 35888
                },
                files: ['<%=path%>*.html']
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-rev');
    grunt.loadNpmTasks('grunt-newer');
    grunt.loadNpmTasks('grunt-csscomb');
    // 定义默认任务
    if (config.isEdit) {
        grunt.log.writeln("This is Edit model;");
        grunt.registerTask('default', ['connect', 'watch']);
    } else {
        grunt.log.writeln("This is develop model;");
        if (config.isPc) {
            if (grunt.file.isDir(appPath)) {
                grunt.registerTask('default', ['connect', 'watch']);
            } else {
                grunt.registerTask('default', ['copy:pc', 'copy:img', 'connect', 'watch']);
            }
        } else {
            if (grunt.file.isDir(appPath)) {
                grunt.registerTask('default', ['connect', 'watch']);
            } else {
                grunt.registerTask('default', ['copy:m', 'copy:img', 'connect', 'watch']);
            }
        }
    }
    grunt.registerTask('build', ['autoprefixer', 'csscomb', 'cssmin', 'concat:css', 'copy:buildimg', 'copy:buildjs', 'uglify:minjs','copy:buildhtml']);
    grunt.registerTask('css', ['concat:css', 'cssmin']);
    grunt.registerTask('dev', ['csslint', 'jshint']);
    grunt.registerTask('dest', ['imagemin', 'concat:css', 'cssmin', 'uglify:minjs']);
    grunt.registerTask('test', function () {
        //console.log(grunt.config.get('copy.pc.dest'));
    });
};
