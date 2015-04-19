$(document).on('pageinit', '#indexPage', function() {
	$('#indexDish1').show();
	loopPictures(3);
});

function loopPictures(i) {
	$('#indexDish' + i).fadeOut(1000).promise().done(function() {
		i = i==3 ? 1 : i+1;
		$('#indexDish' + i).fadeIn(1000);
	});
	setTimeout( function() {
		loopPictures(i);
	}, 4000);
}