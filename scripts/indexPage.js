$(document).on('pageinit', '#indexPage', function() {
	$('#indexDish2').hide();
	$('#indexDish3').hide();
	loopPictures(0);
});

function loopPictures(i) {
	setTimeout( function() {
		changePictures(i);
		i = i==2 ? 0 : i+1;
		loopPictures(i);
	}, 2000);
}

function changePictures(i) {
	for (var count=1; count<4; count++) {
		$('#indexDish' + count).hide();
		if (count == i+1) {
			$('#indexDish' + count).fadeIn();
		}
	}
}