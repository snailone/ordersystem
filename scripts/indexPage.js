$(document).on('pageinit', '#indexPage', function() {
	loopPictures(1);
});

function loopPictures(i) {
	setTimeout( function() {
		$('#indexDish' + i).fadeOut(1000).promise().done(function() {
			i = i==3 ? 1 : i+1;
			$('#indexDish' + i).fadeIn(1000);
		});
		loopPictures(i);
	}, 2000);
}