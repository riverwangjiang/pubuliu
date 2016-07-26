$(function(){
	var dataInt = {"data":[{"src":"1.jpg"},{"src":"2.jpg"},{"src":"3.jpg"},{"src":"4.jpg"},{"src":"5.jpg"}]};
	 waterfall();
	 $(window).on('scroll', function(event) {
	 	if (checkScrollSlide) {
	 		$.each(dataInt.data,function(index, el) {
	 			var oBox = $('<div>').addClass('box').appendTo('#main');
	 			var oPic = $('<div>').addClass('pic').appendTo($(oBox));
	 			var oImg = $('<img>').attr('src', 'img/' + el.src);
	 			$(oImg).appendTo($(oPic));
	 		});
	 		waterfall();
	 	}
	 });
});
function waterfall(){
	var $boxs = $('#main>div');
	var w = $boxs.eq(0).outerWidth();//包括padding，margin
	var cols = Math.floor($(window).width()/w);
	$('#main').width(w*cols).css('margin', '0 auto');
	var hArr = [];
	$boxs.each(function(index, el) {
		var h = $(el).outerHeight();
		if (index<cols) {
			hArr[index] = h;
		}else{
			var minH = Math.min.apply(null,hArr);
			var minHIndex = $.inArray(minH,hArr);
			$(el).css({
				'position': 'absolute',
				'top': minH + 'px',
				'left' : minHIndex*w + 'px'
			});
			hArr[minHIndex] += $(el).outerHeight(); 
		}
	});
}
function checkScrollSlide(){
	var $lastBox = $('#main>div').last();
	var lastBoxDiv = $lastBox.offset().top + Math.floor($lastBox.outerHeight()/2);
	var scrollTop = $(window).scrollTop();
	var documentH = $(window).height();
	return (lastBoxDiv<(scrollTop + documentH))?true :false;
}