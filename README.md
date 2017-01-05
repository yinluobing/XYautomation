## '工欲善其事，必先利其器'
### 说明
　　此工具是前端构建工具,这个工具可以减少我们反反复复的工作量, 提高我们的工作效率,里面以前的小问题都修复了,有了解grunt(或者gulp)前端构建工具的可以看下我的gruntfile.js,你有好的意见可以提供给我。
##### 工具能做什么?
> 1. copy 模板
> 2. copy 项目切的图片
> 3. 监听less 变化 自动编译less(sass 需要自己配置)
> 4. 监听文件变化自动刷新网页
> 5. linux 下可以初始化项目的可以直接用"编程"软件打开对应的目录
> 6. 可以监听切图片文件夹的把变化的文件直接复制到项目对应的目录
> 7. 按照自己的想法去下载插件(或者自己做插件) 来配置自己的工具
#### 1. 工具下载
```
windows 建议安装git 使用git bash命令窗口
利用git命令下载这个工具
git clone https://github.com/yinluobing/grunt-tools.git
或者进入github 直接Download ZIP
```
##### 2. 环境配置篇

```
1. grunt是基于nodejs做的一些小的功能插件 
2. nodejs 下载安装 http://nodejs.cn/
3. nodejs 默认有个包管理工具 NPM(nodejs package managers)
4. 安装全局的配置环境运行命令 "npm install -g grunt-cli"
5. 进到工具目录 然后运行命令 "npm install" 初始化下载"grunt-插件"
```
##### 3. 工具配置篇:
```
"config.josn"文件配置
  {
  "isDev"     :true,//是否是开发模式true or false(是编辑模式)
  "isPc"       :false,//是否是Pc模式true or false(是手机端)"开发模式才有这个用来初始化模板"
  "pathSrc"    :"src/",//生产目录
  "pathBuild"  :"build/",//最终构建目录
  "pathProject": "../work/zt/",//项目所在的文件夹
  "pathApp"    : "201701bibu/",//App目录
  "pathTplpc"  :"tpl/html/pc/",//App PC端模板
  "pathTplm"   :"tpl/html/m/",//App m端模板
  "pathImg"    :"C:/Users/Administrator/Desktop/images/",//App 图片路径
  "pathEdit"   :"C:/Users/Administrator/Desktop/uimaker/",//编辑模式路径
  }
```
```
当然里面的"gruntfile.js" 根据自己的喜好来配置文件夹的目录
```
```
运行命令 grunt 

```