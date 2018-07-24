'use strict';

// array of images to fill an object
var imgsArray = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.jpg', 'tauntaun.jpg', 'unicorn.jpg', 'usb.jpg', 'water-can.jpg', 'wine-glass.jpg'];
var imgsObj = [];


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

// display random pictures to a page
function displayRandomPicture()
{
    // --------------randomize first picture-----------------
    // find out random picture from array
    var pictureIndexOne = Math.floor(Math.random() * Math.floor(imgsArray.length));
    // place it to a frame
    frameOne.src = './img/' + imgsArray[pictureIndexOne];
    // set a value of radio button as index of that image in our initial array
    radioOne.setAttribute('value', pictureIndexOne);
    
    // --------------randomize second picture-----------------
    // find out random picture from array
    var pictureIndexTwo = Math.floor(Math.random() * Math.floor(imgsArray.length));
    // place it to a frame
    frameTwo.src = './img/' + imgsArray[pictureIndexTwo];
    radioTwo.setAttribute('value', pictureIndexOne);

    // --------------randomize third picture-----------------
    // find out random picture from array
    var pictureIndexThree = Math.floor(Math.random() * Math.floor(imgsArray.length));
    // place it to a frame
    frameThree.src = './img/' + imgsArray[pictureIndexThree];
    radioThree.setAttribute('value', pictureIndexOne);
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

    displayRandomPicture(imgsObj);
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
displayRandomPicture();