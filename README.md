## '���������£�����������'
### ˵��
�����˹�����ǰ�˹�������,������߿��Լ������Ƿ��������Ĺ�����, ������ǵĹ���Ч��,������ǰ��С���ⶼ�޸���,���˽�grunt(����gulp)ǰ�˹������ߵĿ��Կ����ҵ�gruntfile.js,���кõ���������ṩ���ҡ�
##### ��������ʲô?
> 1. copy ģ��
> 2. copy ��Ŀ�е�ͼƬ
> 3. ����less �仯 �Զ�����less(sass ��Ҫ�Լ�����)
> 4. �����ļ��仯�Զ�ˢ����ҳ
> 5. linux �¿��Գ�ʼ����Ŀ�Ŀ���ֱ����"���"����򿪶�Ӧ��Ŀ¼
> 6. ���Լ�����ͼƬ�ļ��еİѱ仯���ļ�ֱ�Ӹ��Ƶ���Ŀ��Ӧ��Ŀ¼
> 7. �����Լ����뷨ȥ���ز��(�����Լ������) �������Լ��Ĺ���
#### 1. ��������
```
windows ���鰲װgit ʹ��git bash�����
����git���������������
git clone https://github.com/yinluobing/grunt-tools.git
���߽���github ֱ��Download ZIP
```
##### 2. ��������ƪ

```
1. grunt�ǻ���nodejs����һЩС�Ĺ��ܲ�� 
2. nodejs ���ذ�װ http://nodejs.cn/
3. nodejs Ĭ���и��������� NPM(nodejs package managers)
4. ��װȫ�ֵ����û����������� "npm install -g grunt-cli"
5. ��������Ŀ¼ Ȼ���������� "npm install" ��ʼ������"grunt-���"
```
##### 3. ��������ƪ:
```
"config.josn"�ļ�����
  {
  "isDev"     :true,//�Ƿ��ǿ���ģʽtrue or false(�Ǳ༭ģʽ)
  "isPc"       :false,//�Ƿ���Pcģʽtrue or false(���ֻ���)"����ģʽ�������������ʼ��ģ��"
  "pathSrc"    :"src/",//����Ŀ¼
  "pathBuild"  :"build/",//���չ���Ŀ¼
  "pathProject": "../work/zt/",//��Ŀ���ڵ��ļ���
  "pathApp"    : "201701bibu/",//AppĿ¼
  "pathTplpc"  :"tpl/html/pc/",//App PC��ģ��
  "pathTplm"   :"tpl/html/m/",//App m��ģ��
  "pathImg"    :"C:/Users/Administrator/Desktop/images/",//App ͼƬ·��
  "pathEdit"   :"C:/Users/Administrator/Desktop/uimaker/",//�༭ģʽ·��
  }
```
```
��Ȼ�����"gruntfile.js" �����Լ���ϲ���������ļ��е�Ŀ¼
```
```
�������� grunt 

```