//专门计算任意元素距离页面顶部的top值
function getElementTop(element){
	//获得当前元素element距离相对定位的父元素的top值
	var top=element.offsetTop;
	//将element换成父元素，再取offsetTop
	
	while((element=element.offsetParent)!=null){
		top+=element.offsetTop;
	}
	return top;
}
var floor={
	MINTOP:100, //距文档显示区顶部的距离
	MAXTOP:0, //距文档显示区底部的规定距离
	init:function(){
		var self=this;
		self.MAXTOP=innerHeight-self.MINTOP;
		document.onscroll=function(){
			var spans=$(".floor>header>span:first-child");
			for(var i=0;i<spans.length;i++){
				var top=getElementTop(spans[i]);
				var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
				var as=$("#elevator li[data-idx='"+parseInt(spans[i].innerHTML)+"']>a");
				if((top-scrollTop)>self.MINTOP&&(top-scrollTop)<self.MAXTOP){
					spans[i].className="hover";
					as[0].style.display="none";
					as[1].style.display="block";
				}else{
					spans[i].className="";
					as[0].style.display="block";
					as[1].style.display="none";
				}
				if(i==0){
					if(top<=(scrollTop+self.MAXTOP)){
						$("#elevator")[0].style.display="block";
					}else{
						$("#elevator")[0].style.display="none";
					}
				}
			}
		}

		$("#elevator>ul")[0].onmouseover=function(e){
			e=window.event||e;
			var target=e.target||e.srcElement;
			target.nodeName=="A"&&(target=target.parentNode);
			if(target.nodeName=="LI"){
				var a=target.getElementsByTagName("a");
				a[0].style.display="none";
				a[1].style.display="block";
			}
		}
		$("#elevator>ul")[0].onmouseout=function(e){
			e=window.event||e;
			var target=e.target||e.srcElement;
			target.nodeName=="A"&&(target=target.parentNode);
			if(target.nodeName=="LI"){
				var span=$("#f"+target.dataset.idx+">header>span")[0];
				if(span.className!="hover"){
					var a=target.getElementsByTagName("a");
					a[0].style.display="block";
					a[1].style.display="none";
				}
				
			}
		}
		$("#elevator>ul")[0].onclick=function(e){
			e=window.event||e;
			var target=e.target||e.srcElement;
			target.nodeName=="A"&&(target=target.parentNode);
			if(target.nodeName=="LI"){
				var span=$("#f"+target.dataset.idx+">header>span")[0];
				var top=getElementTop(span);
				scrollTo(0,top-self.MINTOP-1);

			}
		}

	}

	
	

}
window.addEventListener("load",floor.init.bind(floor),false);