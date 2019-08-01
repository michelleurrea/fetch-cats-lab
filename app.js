/*// MY ATTEMPT
// When submit button is pressed...
$('#cat-form').click(function() {
	e.preventDefault();
	validNumber();
	console.log('YOU ROCK');
	console.log(convertedInput);
});

// Check if the value inputted is an actual number and not a
// negative number 
function validNumber() {
	console.log($('#num-cats').val);
	var numCats = $('#num-cats').val;
	// If the inpput is indeed a number greater than 0
	if(input <= 0){
		console.log('we are all good!');
		return convertedInput;
	}

	// Then allow for the submit button to be clicked

	// If not, keep submit button disabled
}
*/

var API_URL = 'https://api.thecatapi.com/v1/images/search?limit=';

document.getElementById('cat-form').addEventListener('submit', function(e) {
	// Prevent submission
	e.preventDefault();

	// Grab number from box
	var numCats = document.getElementById('num-cats').value;

	// Make sure input is valid
	var numberVal = Number(numCats);

	if(isNaN(numberVal)) {
		// Display error message: non-numeric
		document.getElementById('error-message').textContent = numCats + ' was not a number';
	}
	else if (numberVal <= 0) {
		// Display an error message: negative number
		document.getElementById('error-message').textContent = 'Please enter a positive number, greater than 0';
	}
	else{
		//Clear error message
		document.getElementById('error-message').textContent = '';
		
		// Fetch cats: Make AJAX call to the Cats API
		fetch(API_URL + numberVal)
		.then(function(response) {
			// Just parse the JSON
			return response.json();
		})
		.then(function(jsonData) { // Actually do stuff
			// Clear any previous searches
			document.getElementById('result').innerHTML = '';
			// Loop through return array
			for (var i = 0; i < jsonData.length; i++) {
				console.log(jsonData[i].url);
				// Create an img tag; set its src to the url
				var img = document.createElement('img');
				img.src = jsonData[i].url;
				// Append the img ta that I created to an existing DOM element
				document.getElementById('result').append(img);
			}
		})
		.catch(function(err) {
			// Print out the error
			console.log('ERROR', err);
		});
	}
});