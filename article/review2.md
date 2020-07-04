## review2

项目描述：

	在线视频轮播平台，滑动视频轮播列表会展示视频预览图、视频时长，点击预览图，会跳到视频录制页，录制完毕后，合成视频，生成二维码图片，用户扫描二维码通过小程序下载视频

责任描述： 

	1、首页使用swiper实现轮播视频资源，使用transition实现自定义动画效果
	2、基于websocket获取视频流数据，获取视频状态
	3、基于vuex 管理视频当前状态，并通过vue-router进行页面跳转
	4、使用axios进行http请求
	5、利用小程序场景值获取视频地址，保存到手机
	
## 页面


1. swiper 
	
	样式穿透，对于动态添加的 class 无法指定 class，不在scope 范围内
	
		所以样式无法生效，使用样式穿透，
	
	prop 数据
		
		转换，时间的显示，毫秒转为时分秒
	主要功能
		
		1. swiper 视频封面，展示视频时长
		2. transition如何实现的？左右切换的时候，动画效果，
			
			获取距离中心 index 的距离
			偏移位置和距离中心位置成正比，var translate = slideProgress * modify * 2.60 + 'rem';
			大小和距离成反比, scale = 1 - Math.abs(slideProgress) / 5;
			z-index 和距离成反比, var zIndex =  999 - Math.abs(Math.round(10 * slideProgress));
			
			
			
		3. 点击，每次结束transition， 传递当前 图片的 index
			
2. axios	

		对外，export的是一个 方法 request，可以指定 type， get、post	
		然后，get 是基于 axios.get 返回的一个 promise 对象	

3. websocke 逻辑？
	
		点击开始录制，收到服务端允许后
		
		开始请求 websocket,
4. websocket
	
	心跳对象：
	
		reset: 清除 this.setInterval 对象
		start: 设置 setInterval 对象，每隔1 秒发送心跳
	onopen
		
		WebSocket 连接打开事件的回调函数
		
		连接成功回调， start
	send
		
		通过 WebSocket 连接发送数据
	
	onmessage
		
		WebSocket 接受到服务器的消息事件的回调函数
	
		收到服务端消息，reset 保持连接，并对服务端数据做处理
		根据不同数据，做不同的跳转逻辑
		转码完成、录制完成、	
		
		
4. 使用canvas 和 插件 JSMpeg.Player 播放视频流文件		
	
		var player = new JSMpeg.Player(url, {
        canvas: canvas,
        loop: true,
        autoplay: true,
        progressive: false,
	
	