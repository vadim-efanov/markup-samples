

$(document).ready(function () {
	pseudoRadio();
	pseudoCheckbox();
	headerLoginDialog();
	startInterviewDialog();
	interviewSlideshow();
	startAutocomplete();
	startMeteringSlider();
});

$(window).load(function () {
	teleport();
});

$(window).resize(function () {
});

function interviewSlideshow() {
	$('.interview-slideshow-items').cycle({
		autoHeight: false,
		caption: '.interview-slideshow-caption',
		captionTemplate: '[ {{slideNum}} из {{slideCount}} ]',
		next: '.interview-slideshow-nav_next',
		prev: '.interview-slideshow-nav_prev',
		slides: '.interview-slideshow-item',
		timeout: 0
	});
}

function pseudoRadio() {
	$('.pseudo-radio').click(function () {
		$(this).siblings('.pseudo-radio').removeClass('checked');
		$(this).addClass('checked');
	});
}

function pseudoCheckbox() {
	$('.pseudo-checkbox').click(function () {
		$(this).toggleClass('checked');
	});
}

function headerLoginDialog() {
	var h1 = $(window).height();
	var w1 = $(window).width();
	var w2 = 580;

	$('#header-login-dialog, #header-login-dialog-2, #header-login-dialog-3').dialog({
		// appendTo: '.header-login',
		autoOpen: false,
		closeOnEscape: true,
		dialogClass: 'header-login-dialog',
		draggable: true,
		maxHeight: 0.8 * h1,
		maxWidth: 0.8 * w1,
		modal: false,
		position: {
			my: 'center center',
			at: 'center center',
			of: $(window)
		},
		resizable: true,
		width: w2,

		close: function () {
		},
		open: function () {
		},
		resize: function () {
		}
	});

	$('#header-login-link').click(function () {
		$('#header-login-dialog').dialog('open');
	});

	$('.header-login-dialog .link_login-register').click(function () {
		$('#header-login-dialog, #header-login-dialog-3').dialog('close');
		$('#header-login-dialog-2').dialog('open');
	});

	$('.header-login-dialog .link_login-reminder').click(function () {
		$('#header-login-dialog, #header-login-dialog-2').dialog('close');
		$('#header-login-dialog-3').dialog('open');
	});

	$('.header-login-dialog .link_login-entrance').click(function () {
		$('#header-login-dialog-2, #header-login-dialog-3').dialog('close');
		$('#header-login-dialog').dialog('open');
	});
}

function startInterviewDialog() {
	var h1 = $(window).height();
	var w1 = $(window).width();
	var w2 = 720;

	$('#start-dialog-company, #start-dialog-boss').dialog({
		// appendTo: '.start',
		autoOpen: false,
		closeOnEscape: true,
		dialogClass: 'start-dialog',
		draggable: true,
		maxHeight: 0.8 * h1,
		maxWidth: 0.8 * w1,
		modal: false,
		position: {
			my: 'center center',
			at: 'center center',
			of: $(window)
		},
		resizable: true,
		width: w2,

		close: function () {
		},
		open: function () {
		},
		resize: function () {
		}
	});

	$('.start-menu .item_company .link').click(function () {
		$('#start-dialog-company').dialog('open');
		$('#start-dialog-boss').dialog('close');
	});

	$('.start-menu .item_boss .link').click(function () {
		$('#start-dialog-boss').dialog('open');
		$('#start-dialog-company').dialog('close');
	});
}

function startAutocomplete() {
	 var availableTags = [
		"ActionScript",
		"AppleScript",
		"Asp",
		"BASIC",
		"C",
		"C++",
		"Clojure",
		"COBOL",
		"ColdFusion",
		"Erlang",
		"Fortran",
		"Groovy",
		"Haskell",
		"Java",
		"JavaScript",
		"Lisp",
		"Perl",
		"PHP",
		"Python",
		"Ruby",
		"Scala",
		"Scheme"
	];

	$('.autocomplete').each(function () {
		$(this).autocomplete({
			source: availableTags
		});
	});

	$('.input-wrapper > .autocomplete').each(function () {
		var context = $(this).closest('.input-wrapper');
		var w1 = context.outerWidth();

		$(this).autocomplete({
			appendTo: context,
			position: {
				my : 'left top',
				at: 'left bottom',
				of: context
			},

			open: function() {
				$('.ui-autocomplete',context).css({
					'width': w1
				});
			}
		});
	});
}

function startMeteringSlider() {
	$('.metering-slider_ui').each(function () {
		var $self = $(this);
		var $context = $self.closest('.metering-item');
		var $selfVal = $('.input-text',$context);
		var sliderLimit = 5;

		$self.slider({
			value: 0,
			min: -sliderLimit,
			max: sliderLimit,
			step: 1,
			create: function( event, ui ) {
//				$self.prepend('<div class="metering-slider-backlight"></div>');
			},
			slide: function( event, ui ) {
				meteringSliderBacklightWidth('.metering-slider-backlight', $context, ui.value, sliderLimit);
				$selfVal.val(ui.value);
			}
		});

		$selfVal.val($self.slider('value'));
	});
}

function meteringSliderBacklightWidth(elementSelector, context, sliderValue, sliderLimit) {
	var backlightWidth = (Math.abs(sliderValue) / (sliderLimit * 2)) * 100 + '%';

	if (sliderValue == 0) {
		$(elementSelector, context).removeClass('minus plus').addClass('zero');
		$(elementSelector, context).css({
			'opacity': Math.abs(sliderValue) / sliderLimit,
			'width': backlightWidth
		});
	} else if (sliderValue < 0) {
		$(elementSelector, context).removeClass('zero plus').addClass('minus');
		$(elementSelector, context).css({
			'opacity': Math.abs(sliderValue) / sliderLimit,
			'width': backlightWidth
		});
	} else if (sliderValue > 0) {
		$(elementSelector, context).removeClass('zero minus').addClass('plus');
		$(elementSelector, context).css({
			'opacity': Math.abs(sliderValue) / sliderLimit,
			'width': backlightWidth
		});
	}
}

function teleport() {
	var h1 = $(window).height();
	var h2 = $('.body').height();
	var overflow = 300; /* Allowed overflow size in pixels */
	var isScrolled = false;
	var scrollTop = $(window).scrollTop();

	function blink(elem) {
		for (var i=0; i<4; i++)
		$(elem).hide('fade',500).show('fade',500);
	}

	setTimeout(function () {
		if (((h2 - h1) > overflow) && (!isScrolled) && (scrollTop === 0)) {
			$('body').append('<div class="teleport"></div><div id="teleport"></div>');
			blink('.teleport');
		}

		$('.teleport').click(function () {
			$(this).stop(true, true);
			$('html, body').animate({
				scrollTop: $('#teleport').offset().top
			}, 2000);
		});
	}, 3000);

	$(window).scroll(function () {
		isScrolled = true;
		$('.teleport').hide('fade',500);
	});
}
