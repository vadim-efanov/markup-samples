(function ($) {
	$(document).ready(function () {
		toggleActive();
		sidebarFilterItemActive();
		filterItemExpand();
		filterSidebarExpand();
		taskExpand();
		taskExpandSub();
		radioNav();
		radioNav2();
		initDatepicker();
		initSelect2();
		initTinyMCE();
		columnSettingsSortable();
		sortableToggle();
		toggleActionsMenu()
		// itWorks();
	});

	function itWorks() {
		console.log('it works!');
	}

	function toggleActive() {
		$('.toggle-active').each(function () {
			$(this).click(function (event) {
				event.stopPropagation();
				$(this).toggleClass('active');
			});
		});
	}

	function sidebarFilterItemActive() {
		$('.sidebar-filters .filter-item').click(function (event) {
			event.stopPropagation();
			$('.sidebar-filters .filter-item').removeClass('active');
			$(this).addClass('active');
		});
	}

	function filterItemExpand() {
		$('.filter-item.expandable .glyphicon').click(function (event) {
			event.stopPropagation();
			var context = $(this).closest('.filter-item');
			$('.filter-item-body',context).slideToggle(300);
			context.toggleClass('expanded');
		});
	}

	function filterSidebarExpand() {
		$('.task-browser .icon_sidebar-trigger').click(function (event) {
			event.stopPropagation();
			$(this).closest('.task-browser').toggleClass('sidebar-expanded');
		});
	}

	function taskExpand() {
		$('.tasks-all .task-section_task-head').click(function (event) {
			event.stopPropagation();
			var context = $(this).closest('.task');
			$('.task-section_task-content, .task-section_task-track',context.siblings()).slideUp(300);
			$('.task-section_task-content, .task-section_task-track',context).slideToggle(300);
			context.siblings().removeClass('expanded');
			context.toggleClass('expanded');
		});
	}

	function taskExpandSub() {
		$('.tasks-all .col_task-arrow .glyphicon').click(function (event) {
			event.stopPropagation();
			$(this).closest('.task').toggleClass('expanded-sub');
		});
	}

	function radioNav() {
		$('.radio-nav-item, .radio-nav-close').click(function () {
			var targetAttr = $(this).closest('[data-radio-nav]').attr('data-radio-nav');
			if (targetAttr) {
				$('.form-item[data-radio-nav="' + targetAttr + '"]').slideToggle(300);
				$('[data-radio-nav="' + targetAttr + '"]').toggleClass('active');
			}
		});
	}

	function radioNav2() {
		$('.radio-nav2-item').click(function () {
			var targetAttr = $(this).closest('[data-radio-nav2]').attr('data-radio-nav2');
			var targetElem = $('[data-radio-nav2="' + targetAttr + '"]');
			if (targetAttr) {
				$('.task-history-view[data-radio-nav2="' + targetAttr + '"]').siblings().slideUp(300);
				targetElem.siblings().removeClass('active');
				$('.task-history-view[data-radio-nav2="' + targetAttr + '"]').slideDown(300);
				targetElem.addClass('active');
			}
		});
	}

	function initDatepicker() {
		$('.datepicker').datetimepicker({
			//debug: true,
			sideBySide: true,
			locale: 'ru'
		});
	}

	function initSelect2() {
		$('.select2').select2();
	}

	function initTinyMCE() {
		$('.tinymce').tinymce({
			plugins: 'link',
			content_css: "css/app.css?ver=0" + new Date().getTime()
		});
	}

	function columnSettingsSortable() {
		$('.column-settings').sortable();
	}

	function sortableToggle() {
		$('.sortable').click(function () {
			var self = $(this);
			self.siblings('.sortable').removeClass('sortable_down').removeClass('sortable_up');
			if(self.hasClass('sortable_down')) {
				self.toggleClass('sortable_down sortable_up');
			} else if(self.hasClass('sortable_up')) {
				self.toggleClass('sortable_up');
			} else {
				self.toggleClass('sortable_down');
			}
		});
	}

	function toggleActionsMenu() {
		$('.actions-menu').click(function () {
			$(this).toggleClass('visible');
		});
	}
})(jQuery);