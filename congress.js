'use strict';

$(document).ready(function () {
	$('.all-the-results').hide();
	$('#rep-lookup').submit(function(e){
		e.preventDefault();
		$(this).fadeOut(300);
		$('body > header > h1').fadeOut(300);
		$('body > header > span:nth-child(1)').fadeOut(300);
		$('.all-the-results').delay(500).fadeIn(700);
				
		var apiKey = '06bb09b47d9f48d99a70bbe000fe275d',
			zipCode = $('#txt-zip').val(),
			$resultsArea1 = $('#sen-lookup-results'),
			$resultsArea2 = $('#house-lookup-results');
		
		var requestURL = 'http://congress.api.sunlightfoundation.com/legislators/locate?callback=?';

		$.getJSON(requestURL, {
			'apikey' : apiKey,
			'zip' : zipCode,
		}, function(data){
			console.log(data);
			
			if (data.results && data.results.length > 0) {
			
				var mySenatePeople = '<p class="results-title">Senators</p>';
			
				$.each(data.results, function(i, rep) {
					if ('senate' === rep.chamber.toLowerCase()) {
						mySenatePeople += '<p>';
						mySenatePeople += '<a class="pol-name" href="' + rep.contact_form + '" target="_blank">';
						mySenatePeople += rep.first_name + ' ' + rep.last_name;
						mySenatePeople += '</a>';
						mySenatePeople += '</p>';
					}
					
				});

				
			
				mySenatePeople += '';
			
				$resultsArea1.html(mySenatePeople);

				var myHousePeople = '<br><hr><br><p class="results-title">House Members</p>';
			
				$.each(data.results, function(i, rep) {
					if ('house' === rep.chamber.toLowerCase()) {
						myHousePeople += '<p>';
						myHousePeople += '<a class="pol-name" href="' + rep.contact_form + '" target="_blank">';
						myHousePeople += rep.first_name + ' ' + rep.last_name;
						myHousePeople += '</a>';
						myHousePeople += '</p>';
					}
					
				});

				
			
				myHousePeople += '<p style="margin-top:30px;"><input id="reload-btn" type="button" style="font-size:13px;" value="Enter Different Zip Code" onClick="window.location.reload()"></p>';
			
				$resultsArea2.html(myHousePeople);


			} else {
				$resultsArea1.html('<p>No Senators found for zip code ' + zipCode + '. <span class="reload">Please try again.</span></p>');
				$resultsArea2.html('<p>No House Reps found for zip code ' + zipCode + '. <span class="reload">Please try again.</span></p><br><p><input id="reload-btn" type="button" value="Try Again" onClick="window.location.reload()"></p>');

			}
		});
	});
});

$('.reload').click(function() {
	location.reload();
});