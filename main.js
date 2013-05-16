/*
BBD Hyphy Catalog Javascript

URL: 			http://bakerboysdist.com/catalogs/
Created by: 	Ivo KH Janssen <ivo@codedealers.com>
For:			Code Dealers
Site Design by:	Code Dealers

http://codedealers.com

*/

// Amount of pages to buffer before/after the current ones
pageBuffer = 2;
topIndex = 90;

// Starting animation
var startAnimation;

// Go to next page
function nextPage() {
	
	// Return if past end
	if (currentPage >= numPages) return false;
	
	// Set webkit transition
	$("#catalog .front, #catalog .back").css("-webkit-transition", "-webkit-transform .8s ease").css("-moz-transition", "-moz-transform .8s ease");
	
	// Starting animation
	if ($("body").hasClass("start")) {
		$("body").removeClass("start");
		$(".next").removeClass("active");
		clearInterval(startAnimation);
	}

	// Add two to the currentPage
	currentPage += 2;
	
	// Flip page
	flippedPage = $(".page:not(.flipped):first");
	
	// Unhide any hidden pages
	$(flippedPage).next().show();
	
	// Make sure pages are stacked correctly
	$(flippedPage).addClass("flipped").css("z-index", topIndex);
	$(flippedPage).prevAll().each(function(index, el) {
		$(el).css("z-index", topIndex - index - 1);
	});
	$(flippedPage).nextAll().each(function(index, el) {
		$(el).css("z-index", topIndex - index - 1)
	});
	
	// Small hack to make sure no z-index overlap occurs and the right page remains clickable
	setTimeout(function() {
		$(flippedPage).next().css("z-index", topIndex);
	}, 400);
	
	// Show navigation
	if (currentPage >= numPages) $(".next").hide();
	else $(".next").show();
	$(".prev").show();
	
	// Load new pages if necessary
	bufferLength = $(".page:not(.flipped)").length - 1;
	if (bufferLength < pageBuffer) {
		for(page = currentPage + (bufferLength * 2) + 3; page < currentPage + (pageBuffer * 2) + 3; page = page + 2) {
			if (page > numPages) continue;
			$(".page:last").after("<div class=\"page\" style=\"display: none; width: " + pageWidth + "px; height: " + pageHeight + "px;\">" +
				"<div class=\"front\"><a href=\"images/page" + page + "-big.jpg\"><img src=\"images/page" + page + ".jpg\" width=\"" + pageWidth + "\" height=\"" + pageHeight + "\" alt=\"Page" + page + "\" /></a></div>" + 
				"<div class=\"back\"><a href=\"images/page" + (page + 1) + "-big.jpg\"><img src=\"images/page" + (page + 1) + ".jpg\" width=\"" + pageWidth + "\" height=\"" + pageHeight + "\" alt=\"Page" + (page + 1) + "\" /></a></div>" + 
			"</div>");
		}
	}
	
	$(".page a").click(function() {
		window.open($(this).attr("href"), "bigger");
		return false;
	});
	
	return false;
	
}


// Go to previous page
function prevPage() {
	
	// Return if at beginning
	if (currentPage == 0) return false;
	
	// Set webkit transition
	$("#catalog .front, #catalog .back").css("-webkit-transition", "-webkit-transform .8s ease");

	// Add two to the currentPage
	currentPage -= 2;
	
	// Flip page
	flippedPage = $(".flipped:last");
	
	// Unhide any hidden pages
	$(flippedPage).prev().show();
	
	// Make sure pages are stacked correctly
	$(flippedPage).removeClass("flipped").css("z-index", topIndex);
	$(flippedPage).prevAll().each(function(index, el) {
		$(el).css("z-index", topIndex - index - 1);
	});
	$(flippedPage).nextAll().each(function(index, el) {
		$(el).css("z-index", topIndex - index - 1)
	});
	
	// Show navigation
	if (currentPage <= 0) $(".prev").hide();
	else $(".prev").show();
	$(".next").show();
	
	// Load new pages if necessary
	bufferLength = $(".page.flipped").length - 1;
	if (bufferLength < pageBuffer) {
		for(page = currentPage - (bufferLength * 2) - 3; page > currentPage - (pageBuffer * 2) - 3; page = page - 2) {
			if (page <= 0) continue;
			$(".page:first").before("<div class=\"page flipped\" style=\"display: none; width: " + pageWidth + "px; height: " + pageHeight + "px;\">" +
				"<div class=\"front\"><a href=\"images/page" + page + "-big.jpg\"><img src=\"images/page" + page + ".jpg\" width=\"" + pageWidth + "\" height=\"" + pageHeight + "\" alt=\"Page" + page + "\" /></a></div>" + 
				"<div class=\"back\"><a href=\"images/page" + (page + 1) + "-big.jpg\"><img src=\"images/page" + (page + 1) + ".jpg\" width=\"" + pageWidth + "\" height=\"" + pageHeight + "\" alt=\"Page" + (page + 1) + "\" /></a></div>" + 
			"</div>");
		}
	}
	
	$(".page a").click(function() {
		window.open($(this).attr("href"), "bigger");
		return false;
	});
	
	return false;
	
}

// Resize layout to keep aspect ratio
function resize() {
	
	if (window.parent.location == window.location) $("body").css("background-color", "#fff");
	
	// Get catalog ratio
	catalogPageRatio = $(".page img").height() / ($(".page img").width());
	catalogRatio = $(".page img").attr("height") / ($(".page img").attr("width") * 2);
	viewportRatio = $(window).height() / $(window).width();
	
	// For landscape overflow, set the catalog to the viewport height
	if (catalogRatio > viewportRatio) {
		pageHeight = $(window).height();
		pageWidth = Math.round(pageHeight / catalogPageRatio);
	}
	// For portrait overflow (or exact ratio match), set the catalog to the viewport width
	else {
		pageWidth = Math.round($(window).width() / 2);
		pageHeight = Math.round(pageWidth * catalogPageRatio);
	}
	
	// Set on page
	$(".page img, .page").height(pageHeight).width(pageWidth);
	
	// Make sure catalog is properly centered
	marginSpace = Math.round(($(window).height() / 2) - (pageHeight / 2));
	if (marginSpace < 30) $("h1").addClass("hidden");
	else $("h1").removeClass("hidden");
	if (marginSpace < 90) $("footer").addClass("hidden");
	else $("footer").removeClass("hidden");
	$("#catalog").height(pageHeight).css("margin-top", marginSpace + "px");
	// SPICELLY FOR UR GOOD OL FRIND ONTERNAT EXPLURER
	$("#wrapper").css("margin-top", marginSpace + "px");
	
	// Make sure pages are stacked correctly
	$(".flipped:last,.page:not(.flipped):first").css("z-index", topIndex);
	$(".flipped:last").prevAll().each(function(index, el) {
		$(el).css("z-index", topIndex - index - 1);
	});
	$(".page:not(.flipped):first").nextAll().each(function(index, el) {
		$(el).css("z-index", topIndex - index - 1)
	});
	
}

$(document).ready(function(){
	
	// Resize layout
	resize();
	$(window).resize(resize);
	
	// Set prev/next navigation
	$(".prev").click(prevPage);
	$(".next").click(nextPage);
	
	// Check for enhanced or normal version
	if (!$("body").hasClass("forced")) {
		if (Modernizr.csstransforms3d) $("body").addClass("enhanced");
		else $("body").addClass("normal");
	}
	
	// Touchscreen navigation
	$("#catalog").touchwipe({
		wipeLeft: function() {
			nextPage();
		},
		wipeRight: function() {
			prevPage();
		}
	});
	
	// Footer hide/show
	$("footer").click(function() {
		$(this).toggleClass("show");
	});
	
	$(".page a").click(function() {
		window.open($(this).attr("href"), "bigger");
		return false;
	});
	
	// Starting animation
	startAnimation = setInterval(function() {
		$(".start .next").toggleClass("active");
	}, 100);
		
});

/**
 * jQuery Plugin to obtain touch gestures from iPhone, iPod Touch and iPad, should also work with Android mobile phones (not tested yet!)
 * Common usage: wipe images (left and right to show the previous or next image)
 * 
 * @author Andreas Waltl, netCU Internetagentur (http://www.netcu.de)
 * @version 1.1.1 (9th December 2010) - fix bug (older IE's had problems)
 * @version 1.1 (1st September 2010) - support wipe up and wipe down
 * @version 1.0 (15th July 2010)
 */
(function($){$.fn.touchwipe=function(settings){var config={min_move_x:20,min_move_y:20,wipeLeft:function(){},wipeRight:function(){},wipeUp:function(){},wipeDown:function(){},preventDefaultEvents:true};if(settings)$.extend(config,settings);this.each(function(){var startX;var startY;var isMoving=false;function cancelTouch(){this.removeEventListener('touchmove',onTouchMove);startX=null;isMoving=false}function onTouchMove(e){if(config.preventDefaultEvents){e.preventDefault()}if(isMoving){var x=e.touches[0].pageX;var y=e.touches[0].pageY;var dx=startX-x;var dy=startY-y;if(Math.abs(dx)>=config.min_move_x){cancelTouch();if(dx>0){config.wipeLeft()}else{config.wipeRight()}}else if(Math.abs(dy)>=config.min_move_y){cancelTouch();if(dy>0){config.wipeDown()}else{config.wipeUp()}}}}function onTouchStart(e){if(e.touches.length==1){startX=e.touches[0].pageX;startY=e.touches[0].pageY;isMoving=true;this.addEventListener('touchmove',onTouchMove,false)}}if('ontouchstart'in document.documentElement){this.addEventListener('touchstart',onTouchStart,false)}});return this}})(jQuery);