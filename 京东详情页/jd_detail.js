function $(selector){
	return document.querySelectorAll(selector);
}
window.onload=function(){
	$(".service")[0].onmouseover=
	$(".app_jd")[0].onmouseover=function(){
		$("."+this.className+">[id$='_items']")[0].style.display="block";
		$("."+this.className+">a")[0].className="hover";
	}
	$(".service")[0].onmouseout=
	$(".app_jd")[0].onmouseout=function(){
		$("."+this.className+">[id$='_items']")[0].style.display="none";
		$("."+this.className+">a")[0].className="";
	}
	$("#category")[0].onmouseover=function(){
		$("#cate_box")[0].style.display="block";
	}
	$("#category")[0].onmouseout=function(){
		$("#cate_box")[0].style.display="none";
	}
	var lis=$("#cate_box>li");
	for(var i=0;i<lis.length;i++){
		lis[i].onmouseover=function(){
			this.children[1].style.display="block";
			this.children[0].className="hover";
		}
		lis[i].onmouseout=function(){
			this.children[1].style.display="none";
			this.children[0].className="";
		}
	}

	picture.init();

	$("#product_detail>.main_tabs")[0].onclick=function(e){
		e=window.event||e;
		var target=e.target||e.srcElement;
		var li=null;
		if(target.nodeName=="A"){
			li=target.parentNode;
		}else if(target.nodeName=="LI"){
			li=target;
		}
		if(li){
			if(li.className!="current"){
				$("#product_detail>.main_tabs>.current")[0].className="";
				li.className="current";
				//获得当前点中的li的下标
				var i=li.dataset.i;
				//获得所有id以product_开头的元素，保存在divs
				var divs=$("#product_detail>[id^='product_']");
				//无论本次点哪个
				for(var n=0;n<divs.length;n++){
				//  将每个元素隐藏
					divs[n].style.display="none";
				}
				if(i!==undefined){
					divs[i].style.display="block";
				}
			}
		}
	}
}
var picture={
	STARTLEFT:0,//表示ul的初始left值
	LIWIDTH:0,//每个li的宽度
	count:0,//记录图片总数
	moved:0,//记录图片左移的张数
	
	//superMask的宽和高
	SMHEIGHT:0,
	SMWIDTH:0,
	//mask的宽和高
	MHEIGHT:0,
	MWIDTH:0,

	init:function(){
		var self=this;
		var lis=$("#icon_list>li");
		//初始化图片总数
		this.count=lis.length;
		this.LIWIDTH=parseFloat(getComputedStyle(lis[0]).width);
		this.STARTLEFT=parseFloat(getComputedStyle($("#icon_list")[0]).left);
		//找到两个a，分别绑定move方法
		var btns=$("#preview>h1>a");
		btns[0].onclick=btns[1].onclick=function(){
			var btn=this;  //self-->picture
			if(btn.className.indexOf("disabled")==-1){
				self.moved+=btn.className=="forward"?+1:
													-1
			}
			$("#icon_list")[0].style.left=-(self.moved*self.LIWIDTH)+self.STARTLEFT+"px";

			if(self.moved==0){
				btns[0].className="backward_disabled";
			}else if((self.count-self.moved)==5){
				btns[1].className="forward_disabled";			
			}else{
				btns[0].className="backward";
				btns[1].className="forward";
			}
		}
		$("#icon_list")[0].onmouseover=function(e){
			e=window.event||e;
			var target=e.target||e.srcElement;
			if(target.nodeName=="IMG"){
				var path=target.src;
				var i=path.lastIndexOf(".");
				$("#mImg")[0].src=path.slice(0,i)+"-m"+path.slice(i);
			}
		}
		$("#superMask")[0].onmouseover=$("#superMask")[0].onmouseout=function(){
			$("#mask")[0].style.display=
			$("#mask")[0].style.display!="block"?
								"block":
								"none";
			var path=$("#mImg")[0].src;
			var i=path.lastIndexOf(".");
			$("#largeDiv")[0].style.backgroundImage="url("+path.slice(0,i-1)+"l"+path.slice(i)+")";
			//将mask的display属性值赋值给largeDiv的display属性
			$("#largeDiv")[0].style.display=$("#mask")[0].style.display;
		}

		var style=getComputedStyle($("#superMask")[0]);
		self.SMHEIGHT=parseFloat(style.height);
		self.SMWIDTH=parseFloat(style.width);

		style=getComputedStyle($("#mask")[0]);
		self.MHEIGHT=parseFloat(style.height);
		self.MWIDTH=parseFloat(style.width);

		$("#superMask")[0].onmousemove=function(e){
			e=window.event||e;
			var x=e.offsetX;
			var y=e.offsetY;
			var mLeft=x-self.MWIDTH/2;
			var mTop=y-self.MHEIGHT/2;
			if(mTop<0){
				mTop=0;
			}else if(mTop>(self.SMHEIGHT-self.MHEIGHT)){
				mTop=self.SMHEIGHT-self.MHEIGHT;
			} 
			if(mLeft<0){
				mLeft=0;
			}else if(mLeft>(self.SMWIDTH-self.MWIDTH)){
				mLeft=self.SMWIDTH-self.MWIDTH;
			}
			$("#mask")[0].style.top=mTop+"px";
			$("#mask")[0].style.left=mLeft+"px";
			
			//修改largeDiv的背景图片位置为-2mTop和-2mLeft
			$("#largeDiv")[0].style.backgroundPosition=-2*mLeft+"px "+(-2*mTop)+"px";
		}
	}
	
}