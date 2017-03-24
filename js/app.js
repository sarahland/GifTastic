var animalSet = [];

//takes in user response and sends it to the giphy api
$('#findAnimal').on('click', function(){
	var userAnimal = $('#getAnimal').val().trim();
	//store animal in array
	animalSet.push(userAnimal);
	$('#getAnimal').val('');
	//get the entered animal in the array and make it a button
	makeButton(animalSet[animalSet.length-1]);
	//add url for button?
	return false;//to not refresh the page
});
$(document).on('click','.animalButtons', displayAnimalImages)
$(document).on('click', '.animalPictures', toggleAnimalImages)

function makeButton(woof){
	var newDiv = $('<div class="col-md-2 buttonContainer">')
	
	var newButton = $('<button class="btn btn-info btn-block animalButtons">');
	newButton.attr('id', woof);
	newButton.attr('data-name', woof);
	newButton.text(woof);

	newDiv.append(newButton);
	$('#animalButtonSection').append(newDiv);
}

function displayAnimalImages(){
	var animal = $(this).attr('data-name');
	var queryURL = "http://api.giphy.com/v1/gifs/search?limit=10&q=funny+" + animal + "&api_key=dc6zaTOxFJmzC"

	$.ajax({url:queryURL, method:'GET'}).done(function(response){

		$('#imageContainer').empty();

		for(i = 0; i < response.data.length; i++){
			var gifRating = response.data[i].rating;
			var gifURL = response.data[i].images.fixed_width.url;
			var gifStill = response.data[i].images.fixed_width_still.url;
			
			//create div container
			var newDiv = $('<div class="col-md-4">');
			newDiv.attr('id', 'imgDiv' + i);
			newDiv.text('Rating: ' + gifRating);

			var renderedImg = imageRender(i,gifURL,gifStill);
			newDiv.append(renderedImg);
			$('#imageContainer').append(newDiv);
		}
	});
}
function imageRender(count, url, still){
	var newImg = $('<img class="animalPictures">');
	newImg.attr('data-gif', url);
	newImg.attr('data-still-image', still);
	newImg.attr('data-still-switch', 'true')
	newImg.attr('id', 'img' + count);
	newImg.attr('src', still);
	return newImg;
}
function toggleAnimalImages(){
	if($(this)[0].dataset.stillSwitch == 'false'){
		$(this)[0].src = $(this)[0].dataset.stillImage;
		$(this)[0].dataset.stillSwitch = 'true';
	}
	else{
		$(this)[0].src = $(this)[0].dataset.gif;
		$(this)[0].dataset.stillSwitch = 'false';
	}
}