项目简介：在首页有一些轮播视频，滑动视频轮播列表会展示视频预览图、视频时长，点击预览图，会跳到视频播放页
视频播放页有两部分视频组成，分别是实时视频播放和录制视频播放，理论上两个视频时长相等，录制视频快完成会有倒计时功能，5，4，3，2，1，完成后，到达视频播放页面，播放页面视频会自动播放，播放完毕后，可以点击到合成页面，等待后端合成完毕后，会生成二维码图片，使用小程序扫描二维码下载合成视频

使用的技术栈和遇到的一些问题、如何解决的？  
1. vue+vuex+axios    
2. 一共哪些页面，如何实现页面间跳转  
封面页面，首页，轮播视频页，录制页，  
根据全局变量，其中，视频轮播页、预览完成录制  
current_index展示，  
3，视频轮播问题   
4，全局状态  
5，   
6，如何设置背景图片不滚动  
背景图片平铺占满整个浏览器，且固定住不随滚动条移动的样式写法
https://blog.csdn.net/weixin_39463716/article/details/86508502


1，blob 数据如何在网页展示？   
2，如何实现视频轮播？   
参数如何定义？   

问题： 
为啥模板长度5，但是slide 15 ???   
loop: true,   
	loopedSlides: 5,  
为什么 this.slides.length = 15 ？   

设置为true 则开启loop模式。loop模式：会在原本slide前后复制若干个slide并在合适的时候切换，让Swiper看起来是循环的。
事实证明，前面复制一份，中间一份，后面一份，slides 数目是 实际的 3倍

progress（progress）    
这个参数是什么意思？   






todolist   
img_src，照片地址为啥不能更新   
store 不能使用 mapstate   
global 只能赋值，修改后无法更新，如何更新   
websoket 心跳，其实没太看懂    
Code 为啥 v-show 不能，必须新页面才可以？   
如何强制刷新页面？   
如何刷新页面跳转到首页？   
swiper 不切换 index   
https://blog.csdn.net/qq_38878455/article/details/80462247  
slideChangeTransitionEnd  不生效   
transitionEnd   
 component: () => import('@/pages/Home') ???? 为啥不行   
mounted 只执行一次    





https://www.csdn.net/gather_29/MtTaAg0sMjMyMS1ibG9n.html   


录制完成，跳到loading   
失败跳到滑动页面，添加错误提示   
现在一遍之后，再返回首页重来，就不会播放画面了。每次都得F5刷新页面才能再来   
如果能顺利录制上传完，点击返回首页，再来一遍，录制播放时会卡住显示
先说另一个，现在有3个模板，滑动之后，时长显示是在最前端的那个了，   但点击预览或录制，还是调用的滑动之前在最前端的模板   
并且最好刷新页面能回到首页，而不是最后一页   
去掉点击录制，路由传参   
添加倒计时   
修改loading尺寸   
添加计时  



7.18日，周四
小程序done
上午：
1. 测试显示，小程序已支持保存到手机，测试使用下载地址是写死的
2，录制视频无法检测何时停止

中午出门吃饭，谢师宴
下午：
小程序支持获取动态 下载地址 已提交审核
换线上地址，下午没干活，一直到周五下午改bug

7.17日，周三
下午决定抛弃h5, 转而小程序下载，晚上12点，解决小程序下载

7.16日，周二
添加首页，
最新版本，目前还差
1，录制视频倒计时
2,  录制视频播放后加 loading 动画（需要提供个gif 
3, 手机扫码下载（这是后端做是么

7.15日，周一
晚上在凯哥的帮助下，解决canvas播放，然后写了 心跳websocket

7.14日，周日
解决axios封装，能连上接口了

7.13日，周六
页面写完，等接口联调

7.12日，周五


--------------------------------------------------------------------------------
小程序设置页面背景图

 wxss /Users/leeco/Documents/video-download 



7.17日

手机h5页面
https://blog.csdn.net/qq_16855093/article/details/87604928
https://bbs.csdn.net/topics/392504673
https://www.html5plus.org/doc/zh_cn/downloader.html
react-native
HBuilder 15年后就没人用，微信小程序调用 camera ，
各种机型兼容性不好

下载打包编译

视频下载，Android可以，IOS系统本身限制，不是特别好处理，还是用微信小程序吧



video, 如何自定义按钮播放

 <img src="../assets/back_home.png"  @click="buttonClick">
为什么这个不行












https://blog.csdn.net/qq_30669833/article/details/81706217

根据链接生成二维码？？


vue监听全局变量的改变
但是修改后，不能实时改变全局变量的值




如何使用外部js插件
如何定义全局变量
如何



对了，服务器一段时间没响应会关闭连接，所以要加个心跳包，保持连接
https://my.oschina.net/714593351/blog/1583592


全局变量的使用
https://www.cnblogs.com/JerryMouseLi/archive/2019/06/04/10975066.html


 
https://github.com/phoboslab/jsmpeg  
播放录制的视频流前端组件