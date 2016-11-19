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
    var config = grunt.file.readJSON('config.json');
    var date = new Date();
    var time = {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate()
    };
    var appPath =config.App_path ? config.App_path : config.Project_path + '/' + time.year + "/" + time.month + "/" + time.day + "/" + config.App_name;

    /*creat App Path*/
    var fs = require("fs");
    var node_path = require("path");

    //create dir function
    function mkdirsSync(dirname, mode) {
        if (fs.existsSync(dirname)) {
            grunt.log.writeln('project directory already!')
            return true;
        } else {
            if (mkdirsSync(node_path.dirname(dirname), mode)) {
                fs.mkdirSync(dirname, mode);
                grunt.log.writeln('project directory creation success!')
                return true;
            }
        }
    }
    mkdirsSync(appPath);
    /*creat App Path end*/

    // grunt execution time
    require('time-grunt')(grunt);
    grunt.initConfig({
        config: config,
        path: appPath,
        copy: {
            pc:{
                expand: true,
                cwd:'<%=config.Tpl_pc%>',
                src: '**/*',
                dest:'<%=path%>',
            },
            m:{
                expand: true,
                cwd:'<%=config.Tpl_m%>',
                src: '**/*',
                dest:'<%=path%>',
            },
            img:{
                expand: true,
                cwd:'<%=config.Img_path%>',
                src: '**/*',
                dest:'<%=path%>images/',
            }
        },
        clean:{
            css:{
                expand: true,
                cwd:'<%=path%>',
                src: ['css/**/*.css','!css/style.min.css'],
            },
            app:{
                expand: true,
                cwd:'<%=path%>',
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
                //browers:['aliases']
                //browsers:['last 2 versions','chrome','ie 8', 'ie 9','moz'],
            },
            css: {
                expand: true,
                flatten: true,
                src: '<%=path%>css/less/**/*.css',
                dest: '<%=path%>css/less/',
            }
        },
        cssmin: {
            /*压缩 CSS 文件为 .min.css */
            options: {
                keepSpecialComments: 0 /* 移除 CSS 文件中的所有注释 */
            },
            min: {
                expand: true,
                cwd: '<%=path%>css/',
                src: ['style.css'],
                dest: '<%=path%>css/',
                ext: '.min.css'
            }
        },
        csscomb:{
            files: {
                expand: true,
                cwd: '<%=path%>',
                src: ['css/*.css'],
                dest: 'css/',
                ext: '.css'
            }
        },
        jshint: {
            /* 检查 js 语法 */
            all: ['Gruntfile.js', '<%=path%>js/*.js']
        },
        imagemin: {
            /* 压缩优化图片大小 */
            dist: {
                options: {
                    optimizationLevel: 3
                },
                files: [
                    {
                        expand: true,
                        cwd: '<%=path%>images/',
                        src: ['**/*.{png,jpg,jpeg}'], // 优化 img 目录下所有 png/jpg/jpeg 图片
                        dest: '<%=path%>images/' // 优化后的图片保存位置，默认覆盖
                    }
                ]
            }
        },
        concat: {
            /* 合并 CSS 文件 */
            css: {
                src: ['<%=path%>css/less/*.css'],
                /* 根据目录下文件情况配置 */
                dest: '<%=path%>css/style.css'
            },
            js: {
                src: ['<%=path%>js/*.js'],
                /* 根据目录下文件情况配置 如果可以使用 require.js/LABjs 等配置更佳 */
                dest: '<%=path%>js/main.js'
            }
        },
        less: {
            files: {
                expand: true,
                cwd: '<%=path%>css/less/',
                src: ['**/*.less'],
                dest: '<%=path%>css/less/',
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
                    dest: '<%=path%>js/',
                    ext: '.min.js'
                }]
            }
        },
        newer: {
            options: {
                override: function(detail, include) {
                    if (detail.task === 'less') {
                        checkForModifiedImports(detail.path, detail.time, include);
                    } else {
                        include(false);
                    }
                }
            }
        },
        watch: {
            /* 监控文件变化并执行相应任务 */
            img: {
                files: ['<%=path%>images/**/*.{png,jpg,jpeg}'],
                options: {
                    event: ['changed', 'added'],
                    livereload: 35888
                },
                tasks: ['imagemin'],
            },
            css: {
                options: {
                    event: ['changed', 'added'],
                    livereload: 35888
                },
                files: ['<%=path%>css/*.css'],
                tasks: ['autoprefixer', 'concat:css','csscomb','cssmin']
            },
            less: {
                options: {
                    event: ['changed', 'added'],
                    livereload: 35888
                },
                files: ['<%=path%>css/less/**/*.less'],
                tasks: ['less', 'autoprefixer', 'concat:css','csscomb','cssmin']
            },
            js: {
                options: {
                    livereload: 35888
                },
                files: ['<%=path%>js/*.js'],
                //tasks: ['concat:js', 'uglify:minjs']
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
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-newer');
    grunt.loadNpmTasks('grunt-csscomb');
    // 定义默认任务
    grunt.registerTask('initp',['copy:pc','copy:img']);
    grunt.registerTask('initm',['copy:m','copy:img']);
    grunt.registerTask('default', ['connect', 'watch']);
    grunt.registerTask('edit', ['connect', 'watch:css']);
    grunt.registerTask('css', ['concat:css', 'cssmin']);
    grunt.registerTask('dev', ['csslint', 'jshint']);
    grunt.registerTask('dest', ['imagemin', 'concat:css', 'cssmin', 'uglify:minjs']);
    grunt.registerTask('test', function () {
        //console.log(grunt.config.get('copy.pc.dest'));
    });
};