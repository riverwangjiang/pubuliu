window.onload = function(){

	var dataInt = {"data":[{"src":"1.jpg"},{"src":"2.jpg"},{"src":"3.jpg"},{"src":"4.jpg"},{"src":"5.jpg"}]};
	waterfall('main','box');
	window.onscroll = function(){
		var oParent = document.getElementById("main");
		if(checkScrollSlide()){
			for (var i = 0; i < dataInt.data.length; i++) {
				var oBox = document.createElement('div');
				oBox.className = 'box';
				oParent.appendChild(oBox);
				var oPic = document.createElement('div');
				oPic.className = 'pic';
				oBox.appendChild(oPic);
				var oImg =  document.createElement('img');
				oImg.src = "img/" + dataInt.data[i].src;
				oPic.appendChild(oImg);
			}
			waterfall('main','box');
		}
	}
}
function waterfall(parent,box) {
	// 将main下的所有class为box的元素取出来
	var oParent = document.getElementById("main");
	var oBoxs = getByClass(oParent,box);
	//计算整个页面显示的列数
	var oBoxsW = oBoxs[0].offsetWidth;
	var cols = Math.floor(document.documentElement.clientWidth/oBoxsW);
	//设置main的宽度
	oParent.style.cssText = 'width:' + oBoxsW*cols +'px;margin:0 auto';
	var hArr = [];
	for (var i = 0; i < oBoxs.length; i++) {
		if (i<cols) {
			hArr.push(oBoxs[i].offsetHeight);
		}else{
			var minH = Math.min.apply(null,hArr);
			var index = getMinhIndex(hArr,minH);
			oBoxs[i].style.position = 'absolute';
			oBoxs[i].style.top = minH + 'px';
			oBoxs[i].style.left = oBoxs[index].offsetLeft+'px';
			hArr[index]+=oBoxs[i].offsetHeight;
		}
	}
}
function getByClass(oParent,box) {
	//根据class获取元素
	var boxArr = new Array(),
		oElements = oParent.getElementsByTagName("*");
		for(var i = 0;i<oElements.length;i++){
			if(oElements[i].className == box){
				boxArr.push(oElements[i]);
			}
		}
		return boxArr;
}
function getMinhIndex(hArr,val) {
	for (var i in hArr) {
		if (hArr[i]==val) {
			return i;
		}
	}
}
function checkScrollSlide() {
	var oParent = document.getElementById("main");
	var oBoxs = getByClass(oParent,'box');
	var lastBoxH = oBoxs[oBoxs.length-1].offsetTop + Math.floor((oBoxs[oBoxs.length-1]).offsetHeight/2);
	var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
	var height = document.body.clientHeight || document.documentElement.clientHeight;
	return (lastBoxH<scrollTop + height)?true:false;
}
