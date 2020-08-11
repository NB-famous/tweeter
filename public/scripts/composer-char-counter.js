$(document).ready(function() {

    let maxLength = 140;

	$('#tweet-text').on('keyup', function() {
	
		let length = $(this).val().length;
		let numCount = maxLength-length;
		
        $('#wordCount').text(numCount);
        
        if (numCount < 0) {
			$('#wordCount').css('color', 'red');
		} else {
			$('#wordCount').css('color', 'white');
		}
	});
    
});