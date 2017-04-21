/**************************
 *@BY xiaoyin
 ***tpl默认目录结构
 **************************/
/*global module:false*/
module.exports = function(grunt) {
    'use strict';
    require('time-grunt')(grunt);
    var config = grunt.file.readJSON('config.json');
    var date = new Date();
    var time = {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate()
    };
    //time.day = 11;
    if (time.day < 10) {
        time.day = '0' + time.day;
    }
    var pathApp = config.isDev ? config.pathProject + '/' + time.year + "/" + time.month + time.day + "/" + config.pathApp : config.pathEdit;
    //process.exit();
    var fs = require("fs");
    var path = require("path");
    var is_dir;
    function mkdirs(dirname) {
        //console.log(dirname);
        if (!fs.existsSync(dirname)) {
            if (mkdirs(path.dirname(dirname))) {
                fs.mkdirSync(dirname);
                is_dir = false;
                return true;
            }
        } else {
            return true;
        }
    }
    mkdirs(pathApp);
    grunt.initConfig({
        config: config,
        pathApp: pathApp,
        pathAppSrc: config.isDev ? pathApp + config.pathSrc : pathApp,
        pathAppBuild: config.isDev ? pathApp + config.pathBuild : pathApp,
        copy: {
            pc: {
                expand: true,
                cwd: '<%=config.pathTplpc%>',
                src: '**/*  ',
                dest: '<%=pathAppSrc%>',
            },
            m: {
                expand: true,
                cwd: '<%=config.pathTplm%>',
                src: '**/*',
                dest: '<%=pathAppSrc%>',
            },
            img: {
                expand: true,
                cwd: '<%=config.pathImg%>',
                src: '**/*',
                dest: '<%=pathAppSrc%>images/',
            },
            buildcss: {
                expand: true,
                cwd: '<%=pathAppSrc%>css/',
                src: 'style.css',
                dest: '<%=pathAppBuild%>css/',
            },
            buildimg: {
                expand: true,
                cwd: '<%=pathAppSrc%>images/',
                src: '**/*',
                dest: '<%=pathAppBuild%>images/',
            },
            buildjs: {
                expand: true,
                cwd: '<%=pathAppSrc%>js/',
                src: ['**/*', '!/*.js'],
                dest: '<%=pathAppBuild%>js/',
            },
            buildhtml: {
                expand: true,
                cwd: '<%=pathAppSrc%>',
                src: '*.html',
                dest: '<%=pathAppBuild%>',
            },
            lesscss: {
                expand: true,
                cwd: '<%=pathAppSrc%>/css/less/',
                src: '*.css',
                dest: '<%=pathAppSrc%>/css',
            }
        },
        clean: {
            css: {
                expand: true,
                cwd: '<%=pathAppSrc%>',
                src: ['css/**/*.css', '!css/style.min.css'],
            },
            app: {
                expand: true,
                cwd: '<%=pathAppSrc%>',
                src: '**/*',
            },
        },
        connect: {
            options: {
                port: 9000,
                hostname: '*', //默认就是这个值，可配置为本机某个 IP，localhost 或域名
                livereload: 35888 //声明给 watch 监听的端口
            },
            server: {
                options: {
                    open: true, //自动打开网页 http://
                    base: [
                        '<%=pathAppSrc%>' //主目录
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
                src: ['<%=pathAppSrc%>css/**/*.css'],
            },
        },
        autoprefixer: {
            options: {
                browers: ['aliases']
                    //browsers:['last 2 versions','chrome','ie 8', 'ie 9','moz'],
            },
            css: {
                expand: true,
                cwd: '<%=pathAppSrc%>',
                src: 'css/**/*.css',
                dest: '<%=pathAppSrc%>',
                ext: '.css',
            }
        },
        cssmin: {
            /*压缩 CSS 文件为 .min.css */
            options: {
                keepSpecialComments: 1 /* 移除 CSS 文件中的所有注释 */
            },
            min: {
                expand: true,
                cwd: '<%=pathAppSrc%>',
                src: 'css/**/*.css',
                dest: '<%=pathAppSrc%>',
                ext: '.css'
            }
        },
        csscomb: {
            files: {
                expand: true,
                cwd: '<%=pathAppSrc%>',
                src: 'css/**/*.css',
                dest: '<%=pathAppSrc%>',
                ext: '.css'
            }
        },
        jshint: {
            /* 检查 js 语法 */
            all: ['Gruntfile.js', '<%=pathAppSrc%>js/*.js']
        },
        imagemin: {
            /* 压缩优化图片大小 */
            dist: {
                options: {
                    optimizationLevel: 7
                },
                files: [{
                    expand: true,
                    cwd: '<%=pathAppSrc%>images/',
                    src: ['**/*.{png,jpg,jpeg}'], // 优化 img 目录下所有 png/jpg/jpeg 图片
                    dest: '<%=pathAppBuild%>images/' // 优化后的图片保存位置，默认覆盖
                }]
            }
        },
        concat: {
            /* 合并 CSS 文件 */
            css: {
                src: ['<%=pathAppSrc%>css/**/*.css', '!<%=pathAppSrc%>css/style.css'],
                dest: '<%=pathAppSrc%>css/style.css',
            },
            js: {
                src: ['<%=pathAppSrc%>js/*.js'],
                /* 根据目录下文件情况配置 如果可以使用 require.js/LABjs 等配置更佳 */
                dest: '<%=pathAppSrc%>js/concat.js'
            }
        },
        less: {
            files: {
                expand: true,
                cwd: '<%=pathAppSrc%>',
                src: '**/*.less',
                dest: '<%=pathAppSrc%>',
                ext: '.css'
            }
        },
        uglify: {
            /* 最小化、混淆、合并 JavaScript 文件 */
            target: {
                files: {
                    '<%=pathAppSrc%>js/all.min.js': ['<%=pathAppSrc%>js/all.js']
                }
            },
            minjs: { //最小化、混淆所有 js/ 目录下的 JavaScript 文件
                files: [{
                    expand: true,
                    cwd: '<%=pathAppSrc%>js/',
                    src: ['*.js', '!**/*.min.js'],
                    dest: '<%=pathAppBuild%>js/',
                    ext: '.js'
                }]
            },
            test: {
                src: "C:/Users/Administrator/Desktop/test/js/posts.js",
                dest: "C:/Users/Administrator/Desktop/test/js/posts.min.js"
            }
        },
        //压缩HTML
        htmlmin: {
            options: {
                removeComments: false,
                removeCommentsFromCDATA: false,
                collapseWhitespace: true,
                collapseBooleanAttributes: true,
                removeAttributeQuotes: false,
                removeRedundantAttributes: true,
                useShortDoctype: false,
                removeEmptyAttributes: true,
                removeOptionalTags: false
            },
            html: {
                files: [{
                    expand: true,
                    cwd: '<%=pathAppBuild%>',
                    src: ['*.html'],
                    dest: '<%=pathAppBuild%>'
                }]
            }
        },
        hashmap: {
            options: {
                output: '<%=pathAppBuild%>json/hashmap.json',
                rename: '#{= dirname}/#{= hash}.#{= basename}#{= extname}',
                //rename: '#{= dirname}/#{= basename}#{= extname}?v=#{= hash}',
                keep: false,
                hashlen: 8
            },
            all: {
                cwd: '<%=pathAppBuild%>',
                src: '**/*.{css,js,eot,svg,ttf,woff}',
                dest: '<%=pathAppBuild%>'
            }
        },
        htmlurlrev: {
            options: {
                assets: '<%= hashmap.options.output %>',
                hashmap_rename: '<%= hashmap.options.rename %>'
            },
            files: {
                src: ['<%=pathAppBuild%>*.html'],
            },
        },
        shell: {
            options: {
                stderr: false,
            },
            subl: {
                stdout: false,
                stderr: false,
                command: 'RunHiddenConsole D:/Program Files (x86)/Sublime Text 3/sublime_text.exe <%=pathAppSrc%>',
            },
            webs: {
                command: 'RunHiddenConsole D:/Program Files (x86)/JetBrains/WebStorm 2017.1/bin/webstorm64.exe <%=pathAppSrc%>',
            },
        },
        watch: {
            /* 监控文件变化并执行相应任务 */
            img: {
                files: ['<%=pathAppSrc%>**/*.{png,jpg,jpeg}'],
                options: {
                    event: ['changed', 'added'],
                    livereload: 35888
                },
            },
            pathImg: {
                files: ['<%=config.pathImg%>**/*.{png,jpg,jpeg,gif}'],
                options: {
                    event: ['changed', 'added'],
                },
                tasks: ['newer:copy:img']
            },
            css: {
                options: {
                    event: ['changed', 'added'],
                    livereload: 35888
                },
                files: ['<%=pathAppSrc%>less/*.css'],
                //tasks: ['newer:copy:lesscss']
            },
            less: {
                options: {
                    event: ['changed', 'added'],
                    livereload: 35888
                },
                files: ['<%=pathAppSrc%>**/*.less'],
                tasks: ['newer:less', 'newer:autoprefixer', 'newer:csscomb', 'newer:cssmin', 'concat:css']
            },
            js: {
                options: {
                    livereload: 35888
                },
                files: ['<%=pathAppSrc%>**/*.js'],
            },
            html: {
                options: {
                    livereload: 35888
                },
                files: ['<%=pathAppSrc%>*.html']
            }
        }
    });
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-csscomb');
    grunt.loadNpmTasks('grunt-hashmap');
    grunt.loadNpmTasks('grunt-htmlurlrev');
    grunt.loadNpmTasks('grunt-newer');
    grunt.loadNpmTasks('grunt-shell');
    // define default tasker
    if (config.isDev) {
        grunt.log.writeln("This is develop model;");
        if (config.isPc) {
            console.log("This is Pc project;");
            if (typeof is_dir != 'undefined') {
                grunt.registerTask('default', ['copy:pc', 'copy:img', 'connect', 'shell:webs', 'watch']);
            } else {
                console.log('project already exist!');
                grunt.registerTask('default', ['connect', 'shell:webs', 'watch']);
            }
        } else {
            console.log("This is Mobile project;");
            console.log(pathApp);
            if (typeof is_dir != 'undefined') {
                grunt.registerTask('default', ['copy:m', 'copy:img', 'connect','shell:webs', 'watch']);
            } else {
                console.log('project already exist!');
                grunt.registerTask('default', ['connect', 'shell:webs', 'watch']);
            }
        }
    } else {
        grunt.log.writeln("This is Edit model;");
        grunt.log.writeln(pathApp);
        grunt.registerTask('default', ['connect','shell:webs','watch']);
    }
    grunt.registerTask('winBuild', ['copy:buildcss', 'copy:buildimg', 'copy:buildjs', 'uglify:minjs', 'copy:buildhtml', /*'hashmap','htmlurlrev',*/ 'htmlmin']);
    grunt.registerTask('build', ['copy:buildcss', 'copy:buildimg', 'copy:buildjs', 'uglify:minjs', 'copy:buidhtml', 'hashmap', 'htmlurlrev', 'htmlmin']);
    grunt.registerTask('css', ['concat:css', 'cssmin']);
    grunt.registerTask('jsmin', ['uglify:test']);
    grunt.registerTask('test', function() {
        //console.log(grunt.config.get('copy.pc.dest'));
    });
};
