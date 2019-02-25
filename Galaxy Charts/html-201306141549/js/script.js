

$(document).ready(function(){
	$('#video-popup-button').click(function(){
		$('#video-popup').show();
	});
	$('#chart-theme-popup-button').click(function(){
		$('#chart-theme-popup').show();
	});
	$('#edition-popup-button').click(function(){
		$('#edition-popup').show();
	});
	$('.js-popup-hide').click(function(){
		$(this).parents('.b-body-section_popup').hide();
	});
	$('.b-chart-theme-select-item:first-child').addClass('active');
	$('.b-chart-theme-select-item').click(function(){
		$(this).siblings().removeClass('active');
		$(this).addClass('active');
	});
	$(".b-switch .b-button-text").click(function(){
		$(this).parents(".b-switch").toggleClass("b-switch_on b-switch_off");
	});
	$(".b-ajaxed-loader").height(function(){
		return $(this).parents(".b-ajaxed").innerHeight();
	});
});

$(window).load(function(){
	$('.b-examples-slider').cycle({
		fx:'fade',
		next:'.b-examples-next',
		prev:'.b-examples-prev',
		speed:'slow',
		timeout:10000
	});
});
