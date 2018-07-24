'use strict';

// array of images to fill an object
var imgsArray = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.jpg', 'tauntaun.jpg', 'unicorn.jpg', 'usb.jpg', 'water-can.jpg', 'wine-glass.jpg'];
var imgsObj = [];
var previousImgIndexes = [undefined, undefined, undefined];


//////////////////////////////////////////////////////////////////////////////////
/////////////////////CONSTRUCTOR FOR AN IMAGE OBJECT//////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

function ImageTracker(imgName)
{
    // imagePath -> ./img/breakfast.jpg
    this.name = imgName.split('.'[0]);
    this.path = imgName;
    this.totalClicks = 0;
}

//////////////////////////////////////////////////////////////////////////////////
/////////////////////DEFINING INTERACTIVE ELEMENTS ON A PAGE//////////////////////
//////////////////////////////////////////////////////////////////////////////////

// picture frames

var frameOne = document.getElementById('picOne');
var frameTwo = document.getElementById('picTwo');
var frameThree = document.getElementById('picThree');

// radio buttons

var radioOne = document.getElementById('radioOne');
var radioTwo = document.getElementById('radioTwo');
var radioThree = document.getElementById('radioThree');

var radioArr = [radioOne, radioTwo, radioThree];

// vote button

var vote = document.getElementById('voteButton');




//////////////////////////////////////////////////////////////////////////////////
////////////////////////////////FUNCTIONS DEFINITIONS/////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

// pick a random number from array indexes that doesn't equal to previous image
function pickRandomNumber(arrayOfImages)
{
    var rndNumber = Math.floor(Math.random() * Math.floor(arrayOfImages.length));

    
    while (previousImgIndexes.includes(rndNumber)) 
    {
        rndNumber = Math.floor(Math.random() * Math.floor(arrayOfImages.length));
    }

    return rndNumber;
}








// display random pictures to a page
function displayRandomPictures()
{
    // --------------randomize first picture-----------------
    // find out random picture from array
    var pictureIndexOne = pickRandomNumber(imgsArray);
    // place it to a frame
    frameOne.src = './img/' + imgsArray[pictureIndexOne];
    // set a value of radio button as index of that image in our initial array
    radioOne.setAttribute('value', pictureIndexOne);
    // set value to prev indexes array, so when it will look it up it does not repeats
    previousImgIndexes[0] = pictureIndexOne;
    
    // --------------randomize second picture-----------------
    // find out random picture from array
    var pictureIndexTwo = pickRandomNumber(imgsArray);
    // place it to a frame
    frameTwo.src = './img/' + imgsArray[pictureIndexTwo];
    // set a value of radio button as index of that image in our initial array
    radioTwo.setAttribute('value', pictureIndexOne);
    // set value to prev indexes array, so when it will look it up it does not repeats
    previousImgIndexes[1] = pictureIndexOne;

    // --------------randomize third picture-----------------
    // find out random picture from array
    var pictureIndexThree = pickRandomNumber(imgsArray);
    // place it to a frame
    frameThree.src = './img/' + imgsArray[pictureIndexThree];
    // set a value of radio button as index of that image in our initial array
    radioThree.setAttribute('value', pictureIndexOne);
    // set value to prev indexes array, so when it will look it up it does not repeats
    previousImgIndexes[2] = pictureIndexOne;
}

// what happens after 'vote' clicked
var clicked = function()
{
    // add a total click count to a image
    for (var radioBtn of radioArr)
    {
        if (radioBtn.checked)
        {
            // in image object with same index we increment a total click
            imgsObj[radioBtn.value].totalClicks += 1;
            // and jump out of loop
            break;
        }
    }

    displayRandomPictures(imgsObj);
};

// attaching event listener to a 'vote' button
vote.addEventListener('click', clicked);



//////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////ACTION/////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

// filling an objects array
for( var i=0; i < imgsArray.length; i++) 
{
    imgsObj.push(new ImageTracker(imgsArray[i]));
}

// putting random pictures on a screen
displayRandomPictures();