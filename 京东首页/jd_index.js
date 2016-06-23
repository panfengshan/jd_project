/*封装$*/
function $(selector){
	return document.querySelectorAll(selector);
}
/*广告图片数组*/
var imgs=[
    {"i":0,"img":"images/index/banner_01.jpg"},
    {"i":1,"img":"images/index/banner_02.jpg"},
    {"i":2,"img":"images/index/banner_03.jpg"},
    {"i":3,"img":"images/index/banner_04.jpg"},
    {"i":4,"img":"images/index/banner_05.jpg"},
];

var slider={
	LIWIDTH:0, //每个li的宽度
	DURATION:500, //动画开始到结束的持续时间
	STEPS:50, //动画要移动的总步数
	moved:0, //保存动画已经移动的步数
	INTERVAL:0, //每步的时间间隔：DURATION/STEPS
	WAIT:3000, //自动轮播之间等待的时间
	timer:null,
	canAuto:true,//是否可以自动轮播
	init:function(){
		var self=this;
		self.INTERVAL=self.DURATION/self.STEPS;
		self.LIWIDTH=parseFloat(getComputedStyle($("#slider")[0]).width);
		$("#imgs")[0].style.width=self.LIWIDTH*imgs.length+"px";

		//i从1开始，到小于等于imgs.length结束，每次+1，同时声明index数组
		for(var i=1,idxs=[];i<=imgs.length;i++){
			idxs[i]="<li>"+i+"</li>";
		}
		$("#indexs")[0].innerHTML=idxs.join("");
		$("#indexs>li")[0].className="hover";

		//为每个index绑定onmouseover
		$("#indexs")[0].onmouseover=function(e){
			e=window.event||e;
			var target=e.target||e.srcElement;
			if(target.nodeName=="LI"&&target.className!="hover"){
				var oldi=$("#indexs>.hover")[0].innerHTML;
				self.move(target.innerHTML-oldi);
			}
		}

		$("#slider")[0].onmouseover=function(){
			self.canAuto=false;
		}
		$("#slider")[0].onmouseout=function(){
			self.canAuto=true;
		}

		self.updateView();
		self.autoMove();
	},
	updateView:function(){ //按数组的新内容更新ul
		for(var i=0,lis=[];i<imgs.length;i++){
			lis[i]='<li><img src="'+imgs[i].img+'"></li>';
		}
		$("#imgs")[0].innerHTML=lis.join("");
		//清除indexs中现在为hover的li的样式
		$("#indexs>.hover")[0].className="";
		$("#indexs>li")[imgs[0].i].className="hover";
	},
	move:function(n){ //移动n个li，n为新的li-旧的li
		clearTimeout(this.timer);
		this.timer=null;
		if(n<0){ //右移
			//先更新数组和页面，再移动
			imgs=imgs.splice(imgs.length-(-n),-n).concat(imgs);
			this.updateView();
			//先设置id为imgs的ul的left设置为LIWIDTH*n;
			$("#imgs")[0].style.left=this.LIWIDTH*n+"px";
		}
		var step=this.LIWIDTH*n/this.STEPS;
		this.moveStep(n,step);
	},
	moveStep:function(n,step){ //只负责移动一步
		var left=parseFloat(getComputedStyle($("#imgs")[0]).left);
		$("#imgs")[0].style.left=left-step+"px";
		this.moved++;
		if(this.moved<=this.STEPS){
			this.timer=setTimeout(this.moveStep.bind(this,n,step),this.INTERVAL);
		}else{
			this.moved=0;
			this.timer=null;
		//先设置id为imgs的ul的left设置为0;
		$("#imgs")[0].style.left="";
			if(n>0){
				//修改数组，更新页面
				imgs=imgs.concat(imgs.splice(0,n));
				this.updateView();
			}
			//只要移动结束，就启动新的自动轮播
			this.autoMove();
		}
	},
	
	autoMove:function(){ //启动自动轮播
		if(this.canAuto){ //如果可以自动轮播，则继续
			this.timer=setTimeout(this.move.bind(this,1),this.WAIT);
		}else{ //否则，如果不允许轮播，再次等待调用autoMove
			this.timer=setTimeout(this.autoMove.bind(this),this.WAIT);
		}
	}
}
window.addEventListener("load",slider.init.bind(slider),false);