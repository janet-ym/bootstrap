'use strict';
// 使用严格模式
$(function(){
	// 当文档加载完成才会执行
	// 根据屏幕宽度的变化决定轮播图片应该展示什么
	// @return{[type]} [description]
	function resize(){
		// 获取屏幕宽度
		var windowWidth = $(window).width();
		// 判断屏幕属于大还是小
		var isSmallScreen = windowWidth < 768;
		// 根据大小为界面上的每一张轮播图设置背景
		// $('main_ad > .carousel-inner > .item')获取到的是一个DOM数组(多个元素)
		$('#main_ad > .carousel-inner > .item').each(function(i,it){
			// 因为拿到的是DOM对象，需要转换
			var $item = $(it);
			// 三目运算符a?b:c,如果a为true,那么结果是b,如果a为true，那么结果是c
			// data()用来获取data-属性的属性值
			var imgSrc = isSmallScreen ? $item.data('image-xs') : $item.data('image-lg');
			// 设置背景图片
			$item.css('backgroundImage','url("' + imgSrc + '")');
			// 因为我们需要小图时，尺寸等比例变化，所以小图用img方式
			if(isSmallScreen){
				$item.html('<img src="' + imgSrc +'" alt="" />');
				$item.css('backgroundImage','none');
			} else{
				$item.empty();
			}
		});	 
		
	}
	// 当浏览器窗口发生尺寸变化时，触发resize函数
	$(window).on('resize', resize).trigger('resize');




	// 控制标签页的标签容器宽度
	var $ulContainer = $('.nav-tabwjs')
	// 获取所有子元素的宽度和
	var width = 50;
	// 因为原本ul上有padding-left遍历子元素
	$ulContainer.children().each(
		function(index,element){
			width += element.clientWidth;
		});
	// 此时width等于所有li的宽度总和
	// 判断当前ul的宽度是否超出屏幕，如果超出就显示横向滚动条
	if(width > $(window).width()){
		$ulContainer.css('width',width).parent().css('overflow-x','scroll');
	}

	$(function () {
  		$('[data-toggle="tooltip"]').tooltip()
	});




	// a点击注册事件
	var $newTitle = $('.news-title');
	$('#news .nav-pills a').on('click',function(){
		// 获取当前点击元素
		var $this = $(this);
		// 获取对应的title值
		var title = $this.data('title');
		// 将title设置到相应的位置
		$newTitle.text(title);
	});




	// 获取界面上的轮播图容器
	// 获取手指在轮播图元素上的一个滑动方向(左右)
	var $slide = $('#main_ad');
	var startX, endX;
	var offset = 50;
	// 注册滑动事件
	$slide.on('touchstart',function(e){
		// 手指触摸开始时记录一下手指所在的坐标X
		startX = e.originalEvent.touches[0].clientX;
		// console.log(startX);
	});
	$slide.on('touchmove',function(e){
		// 变量重复赋值
		endX = e.originalEvent.touches[0].clientX;
		// console.log(endX);
	});
	$slide.on('touchend',function(e){
		// console.log(e);
		// 结束触摸一瞬间记录最后的手指所在坐标X
		// console.log(endX);
		// 控制精度
		// 获取每次运动的距离，当距离大于一定值时认为是有方向变化.
		var distance = Math.abs(startX);
		if(distance > offset){
			// 原生的carousel方法实现 http://v3.bootcss.com/javascript/#carousel-methods
			$(this).carousel(startX > endX ? 'next' : 'prev');
		}
	});


});