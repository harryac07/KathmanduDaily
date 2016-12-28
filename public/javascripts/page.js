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

	// /*moment js*/
	// var now = moment();

	// console.log(now.format("YYYY.MM.DD hh:mma"));

});