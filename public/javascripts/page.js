$(document).ready(function() {

	$(window).on('beforeunload', function() {
		$(window).scrollTop(0);
	});
	/* on scrol event for second navigation handling */
	window.addEventListener('wheel', function(e) {
		var hideNav = $(window).scrollTop();
		if (e.deltaY < 0) {
			//console.log('scrolling up');
			$("#nav-second").show();
		}
		if (e.deltaY > 0 && hideNav >= 80) {
			//console.log('scrolling down');
			$("#nav-second").hide();
		}
	});

	/*Back-top-arrow set up */
	$(document).scroll(function() {
		if ($(window).scrollTop() > 300) {
			$("#backtopButton-link").fadeIn(300);
		} else {
			$("#backtopButton-link").fadeOut(300);
		}

	});
	$("#backtopButton-link").click(function(e) { // scroll to the top while clicked endlink Home 
		e.preventDefault();
		$("html, body").animate({ 
			scrollTop: 0
		}, 800, 'easeInQuart'); // animating using scrollTop plugin while clicking button. It goes to top of the id div

		return false;
	});

	// /*moment js*/
	// var now = moment();

	// console.log(now.format("YYYY.MM.DD hh:mma"));

});