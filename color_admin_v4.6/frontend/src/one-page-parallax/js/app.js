/*
Template Name: Color Admin - Responsive Admin Dashboard Template build with Twitter Bootstrap 3 & 4
Version: 4.2.0
Author: Sean Ngu
Website: http://www.seantheme.com/color-admin-v4.2/frontend/one-page-parallax/
    ----------------------------
        APPS CONTENT TABLE
    ----------------------------
    
    <!-- ======== GLOBAL SCRIPT SETTING ======== -->
    01. Handle Home Content Height
    02. Handle Header Navigation State
    03. Handle Commas to Number
    04. Handle Page Container Show
    05. Handle Pace Page Loading Plugins
    06. Handle Page Scroll Content Animation
    07. Handle Header Scroll To Action
    08. Handle Tooltip Activation
    09. Handle Theme Panel Expand
    10. Handle Theme Page Control
    11. Handle Paroller
    12. Handle Check Bootstrap Version
	
    <!-- ======== APPLICATION SETTING ======== -->
    Application Controller
*/



/* 01. Handle Home Content Height
------------------------------------------------ */
var handleHomeContentHeight = function() {
	$('#home').height($(window).height());

	$(window).on('resize', function() {
		$('#home').height($(window).height());
	});
};


/* 02. Handle Header Navigation State
------------------------------------------------ */
var handleHeaderNavigationState = function() {
	$(window).on('scroll load', function() {
		if ($('#header').attr('data-state-change') != 'disabled') {
			var totalScroll = $(window).scrollTop();
			var headerHeight = $('#header').height();
			if (totalScroll > headerHeight) {
				$('#header').addClass('navbar-sm');
			} else {
				$('#header').removeClass('navbar-sm');
			}
		}
	});
};


/* 03. Handle Commas to Number
------------------------------------------------ */
var handleAddCommasToNumber = function(value) {
    return value.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
};


/* 04. Handle Page Container Show
------------------------------------------------ */
var handlePageContainerShow = function() {
	var bootstrapVersion = handleCheckBootstrapVersion();
	var showClass = '';

	if (bootstrapVersion >= 3 && bootstrapVersion < 4) {
		showClass = 'in';
	} else if (bootstrapVersion >= 4 && bootstrapVersion < 5) {
		showClass = 'show';
	}
	$('#page-container').addClass(showClass);
};


/* 05. Handle Page Scroll Content Animation
------------------------------------------------ */
var handlePageScrollContentAnimation = function() {
	$('[data-scrollview="true"]').each(function() {
		var myElement = $(this);
		var elementWatcher = scrollMonitor.create( myElement, 60 );

		elementWatcher.enterViewport(function() {
			$(myElement).find('[data-animation=true]').each(function() {
				var targetAnimation = $(this).attr('data-animation-type');
				var targetElement = $(this);
				if (!$(targetElement).hasClass('contentAnimated')) {
					if (targetAnimation == 'number') {
						var finalNumber = parseInt($(targetElement).attr('data-final-number'));
						$({animateNumber: 0}).animate({animateNumber: finalNumber}, {
							duration: 1000,
							easing:'swing',
							step: function() {
								var displayNumber = handleAddCommasToNumber(Math.ceil(this.animateNumber));
								$(targetElement).text(displayNumber).addClass('contentAnimated');
							}
						});
					} else {
						$(this).addClass(targetAnimation + ' contentAnimated');
						setTimeout(function() {
							$(targetElement).addClass('finishAnimated');
						}, 1500);
					}
				}
			});
		});
	});
};


/* 06. Handle Header Scroll To Action
------------------------------------------------ */
var handleHeaderScrollToAction = function() {
	$(document).on('click', '[data-click=scroll-to-target]', function(e) {
		e.preventDefault();
		e.stopPropagation();
		var target = ($(this).attr('data-scroll-target')) ? $(this).attr('data-scroll-target') : '';
		var target = (!target && $(this).attr('href')) ? $(this).attr('href') : target;
		var headerHeight = 50;
		$('html, body').animate({
			scrollTop: $(target).offset().top - headerHeight
		}, 500);

		var targetLi = $(this).closest('.nav-item');
		if ($(targetLi).hasClass('dropdown')) {
			if ($(targetLi).hasClass('open')) {
				$(targetLi).removeClass('open');
			} else {
				$(targetLi).addClass('open');
			}
		}
		if ($(window).width() < 767 && !$(targetLi).hasClass('dropdown')) {
			$('#header [data-toggle="collapse"]').trigger('click');
		}
	});
	$(document).click(function(e) {
		if (!e.isPropagationStopped()) {
			$('.dropdown.open').removeClass('open'); 
		}
	});
};


/* 07. Handle Tooltip Activation
------------------------------------------------ */
var handleTooltipActivation = function() {
	if ($('[data-toggle=tooltip]').length !== 0) {
		$('[data-toggle=tooltip]').tooltip();
	}
};


/* 08. Handle Theme Panel Expand
------------------------------------------------ */
var handleThemePanelExpand = function() {
	$(document).on('click', '[data-click="theme-panel-expand"]', function() {
	var targetContainer = '.theme-panel';
	var targetClass = 'active';
	if ($(targetContainer).hasClass(targetClass)) {
		$(targetContainer).removeClass(targetClass);
	} else {
		$(targetContainer).addClass(targetClass);
	}
	});
};


/* 09. Handle Theme Page Control
------------------------------------------------ */
var handleThemePageControl = function() {
	if (typeof Cookies !== 'undefined') {
		$(document).on('click', '.theme-list [data-theme]', function(e) {	
			e.preventDefault();
			var targetTheme = $(this).attr('data-theme');
			var targetThemeFile = $(this).attr('data-theme-file');
			
			if ($('#theme-css-link').length === 0) {
				$('head').append('<link href="'+ targetThemeFile +'" rel="stylesheet" id="theme-css-link" />');
			} else {
				$('#theme-css-link').attr('href', targetThemeFile);
			}
			$('.theme-list [data-theme]').not(this).closest('li').removeClass('active');
			$(this).closest('li').addClass('active');
			Cookies.set('theme', $(this).attr('data-theme'));
		});
		
		if (Cookies.get('theme')) {
			if ($('.theme-list').length !== 0) {
				var targetElm = '.theme-list [data-theme="'+ Cookies.get('theme') +'"]';
				$(targetElm).trigger('click');
			}
		}
	}
};


/* 10. Handle Paroller
------------------------------------------------ */
var handleParoller = function() {
	if (typeof $.fn.paroller !== 'undefined') {
		if ($('[data-paroller="true"]').length !== 0) {
			$('[data-paroller="true"]').paroller();
		}
	}
};


/* 11. Handle Check Bootstrap Version
------------------------------------------------ */
var handleCheckBootstrapVersion = function() {
	return parseInt($.fn.tooltip.Constructor.VERSION);
};


/* Application Controller
------------------------------------------------ */
var App = function () {
	"use strict";
	
	return {
		//main function
		init: function () {
			handleHomeContentHeight();
			handleHeaderNavigationState();
			handlePageContainerShow();
			handlePageScrollContentAnimation();
			handleHeaderScrollToAction();
			handleTooltipActivation();
			handleThemePanelExpand();
			handleThemePageControl();
			handleParoller();
		}
  };
}();

$(document).ready(function() {
	App.init();
});