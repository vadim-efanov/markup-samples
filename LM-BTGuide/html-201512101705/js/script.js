(function ($) {
	$(document).ready(function () {
		linkAnimationToScroll();
		itWorks();
	});

	function itWorks() {
		console.log('it works!');
	}

	function linkAnimationToScroll() {
		var $animation_elements = $('.animation');
		var $window = $(window);

		$window.on('load', check_if_in_view);
		$window.on('scroll', check_if_in_view);

		function check_if_in_view() {
			var window_height = $window.height();
			var window_top_position = $window.scrollTop();
			var window_bottom_position = (window_top_position + window_height);

			$.each($animation_elements, function() {
				var $element = $(this);
				var element_height = $element.outerHeight();
				var element_top_position = $element.offset().top;
				var element_bottom_position = (element_top_position + element_height);

				if ((element_bottom_position >= window_top_position) &&
					(element_top_position <= window_bottom_position)) {
					$element.addClass('animated');
				} else {
					$element.removeClass('animated');
				}
			});
		}
	}
})(jQuery);