(function(){
    
	var ToggleMenu = function () {
		var leadershipHeader = $(".lost-my-name__header");
		var menuWrapper = leadershipHeader.find(".lost-my-name__header__right-nav-wrapper");
	    var toggleBtn = leadershipHeader.find(".lost-my-name__header__toggle-button");

		var animatedMenu = function () {
			$(window).scroll($.debounce(5, function () {
			    if ($(window).scrollTop() > 350) {
			        leadershipHeader.addClass('animated');
			    } else {
			        leadershipHeader.removeClass('animated');
			    }
			}));
		}

		var showHideMenu = function (selector, isShown) {
		    var nav = selector.next().next().next();
	        if (isShown) {
	            selector.addClass('open');
	            nav.css('right', 0);
	            nav.prev().css('right', 0);
	            $('.nav-mask').fadeIn('fast');
	            $('html, body').css('overflow', 'hidden');
	        } else {
	            selector.removeClass('open');
	            nav.removeAttr('style');
	            nav.prev().removeAttr('style');
	            $('.nav-mask').fadeOut('fast');
	            $('html, body').removeAttr('style');
	        }
	    }

		var toggle = function (selector) {
		    var nav = selector.next().next().next();
			if (parseInt(nav.css('right'), 10) < 0) {
				showHideMenu(selector, true);
			} else {
				showHideMenu(selector, false);
			}
		}
        
		var init = function () {
			if (typeof leadershipHeader !== 'undefined' && leadershipHeader.length > 0) {
				// Scroll to animate menu
				animatedMenu();

			    $(window).bind('blur', function () {
					if (toggleBtn.hasClass('open')) toggle(toggleBtn);
			    });
				$(document).bind('click', function () {
					if ($(event.target).parents(".lost-my-name__header__nav").length == 0 && toggleBtn.hasClass('open')) toggle(toggleBtn);
				});

				toggleBtn.bind('click', function (e) {
				    e.stopPropagation();
				    toggle(toggleBtn);
				});
			}
		}
        
        return {
            init: init
        }
	}
	
	var Slider = function(selector, options) {
		var ele = $(selector);
		var settings = options || '';

		var init = function() {
			if (typeof ele !== 'undefined' && ele.length > 0) {
				ele.ubislider(settings); 
			}
		}

		return {
			init: init
		}
	}

	var BookCutomizer = function() {
		var ele = $(".lost-my-name__book-editor");
		var wish = ele.find(".lost-my-name__book-editor__tabbed .wish");
		var wishOptions = ele.find(".wish-option");

		var init = function() {
			if (ele.length > 0 && wish.length > 0) {
				wish.on('click', function() {
					var $this = $(this);
					var target = $this.attr('data-target');

					// hide all wish options
					wishOptions.hide();
					$("#" + target).show();
				});

				$(document).on('click', function(event) {
					if ($(event.target).parents('.lost-my-name__book-editor__options').length == 0) wishOptions.hide();
				});
			}
		}

		return {
			init: init
		}
	}
    
    var menu = new ToggleMenu();
	menu.init();
	
	var productImageSlider = new Slider('#product-image-slider', {
		arrowsToggle: true,
		type: 'ecommerce',
		hideArrows: true,
		autoSlideOnLastClick: true,
		modalOnClick: true
	});
	productImageSlider.init();

	var bookCutomizer = new BookCutomizer();
	bookCutomizer.init();

	var SlickSlider = function(selector, options) {
		var $ele = $(selector);
		var settings = options || {};

		var init = function() {
			$ele.slick(settings)
		};

		return {
			init: init
		}
	};

	var bannerSlider = new SlickSlider('.lost-my-name__banner__slider', {
		dots: false,
		arrows: false,
		autoplay: true,
		autoplaySpeed: 5000
	});
	bannerSlider.init();

	// Responsive images
	$.fn.imgLoad = function (callback) {
        return this.each(function () {
            if (callback) {
                if (this.complete || /*for IE 10-*/ $(this).height() > 0) {
                    callback.apply(this);
                }
                else {
                    $(this).on('load', function () {
                        callback.apply(this);
                    });
                }
            }
        });
    };

    var PhotoGallery = function (selector, child) {
		var photoGallery = $(selector);
        var photos = photoGallery.find(child + " img");

		var resizeImages = function() {
			photos.imgLoad(function () {
			    var $this = $(this);
			    var parentInfor = {
			        width: $this.parent().width(),
			        height: $this.parent().height()
			    };
			    var imgInfor = {
			        width: $this.width(),
			        height: $this.height()
				};

			    var fillClass = '';

			    if (parentInfor.width / parentInfor.height > imgInfor.width / imgInfor.height) {
			        fillClass = (parentInfor.height > parentInfor.width)
			            ? 'fillheight'
			            : 'fillwidth';
			    } else {
			        fillClass = (imgInfor.height > imgInfor.width)
			            ? 'fillwidth'
			            : 'fillheight';
			    }
			    $(this).removeClass('fillheight').removeClass('fillwidth').addClass(fillClass);
			});
		}

        var init = function () {
            // Check ele defined or not
			if (typeof photoGallery !== 'undefined' && typeof photos !== 'undefined') {

				// resize at first loaded
				resizeImages();

				// resize on user resize window
				$(window).on('resize orientationchange', $.debounce(5, resizeImages));
			}
        }

        return {
            init: init
        }
    }

	var carouselSlider = new PhotoGallery('.lost-my-name__banner__slider', '.lost-my-name__banner__slider-item__thumbnail');
	carouselSlider.init();
	var carouselSlider = new PhotoGallery('.lost-my-name__photo-gallery__photos', '.lost-my-name__photo-gallery-photos__content');
	carouselSlider.init();

	// gender box active class
	function setActiveGenderBox(inputBox) {
		var $genderBox = $('.gender-box');
		var $el = $genderBox.find('>label');
		var $dropdown = $genderBox.find('.dropdown-menu >li');
		var $input = $(inputBox);

		// remove click to hide dropdown
		$dropdown.click(function(e) {
			e.stopPropagation();
			var _this = $(this);

			// reset all character's active
			$dropdown.removeClass('active');

			// set active characters
			_this.addClass('active');

			// set value for input
			$input.val(_this.data('value'));
			console.log($input.val())

			return false;
		});

		$el.click(function() {
			var _this = $(this);
			
			if (!_this.hasClass('active')) {
				// reset all active
				$el.removeClass('active');

				// reset value
				$input.val('INVALID');
				console.log($input.val());

				$el.parent().find('.dropdown-menu >li').removeClass('active');
				_this.addClass('active');
			}
		});
		
	}
	setActiveGenderBox('#gender');

	$('.lost-my-name__photo-gallery__photos').masonry({
		// options
		itemSelector: '.lost-my-name__photo-gallery__photos-item',
		columnWidth: '.grid-sizer',
		percentPosition: true
	});

	// Magnific popup for images and videos
	var MagnificPopup = function(selector, options) {
		var $ele = $(selector);
		var settings = options || {};

		var init = function() {
			if (typeof $ele !== 'undefined' && $ele.length > 0) {
				$ele.magnificPopup(options);
			}
		}

		return {
			init: init
		}
	} 

	var headerSlider = new MagnificPopup('.image-box', {
		type: 'image',
		mainClass: 'mfp-with-zoom',
		zoom: {
			enabled: true,
			duration: 300,
			easing: 'ease-in-out',
			opener: function(openerElement) {
				return openerElement.is('img') ? openerElement : openerElement.find('img');
			}
		}
	});
	headerSlider.init();
	var photoGallery = new MagnificPopup('.video-box', {
		type: 'iframe',
		removalDelay: 160,
		fixedContentPos: false,
		mainClass: 'mfp-with-zoom'
	});
	photoGallery.init();
})();