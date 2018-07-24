'use strict';

// array of images to fill an object
var imgsArray = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.jpg', 'tauntaun.jpg', 'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg'];
var imgsObj = [];
var previousImgIndexes = [undefined, undefined, undefined];
var attempts = 25;


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

// section to print results
var resultsList = document.getElementById('resultsList');




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

/**********************************************************************************/
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
    radioTwo.setAttribute('value', pictureIndexTwo);
    // set value to prev indexes array, so when it will look it up it does not repeats
    previousImgIndexes[1] = pictureIndexTwo;

    // --------------randomize third picture-----------------
    // find out random picture from array
    var pictureIndexThree = pickRandomNumber(imgsArray);
    // place it to a frame
    frameThree.src = './img/' + imgsArray[pictureIndexThree];
    // set a value of radio button as index of that image in our initial array
    radioThree.setAttribute('value', pictureIndexThree);
    // set value to prev indexes array, so when it will look it up it does not repeats
    previousImgIndexes[2] = pictureIndexThree;
}

/**********************************************************************************/
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

    // display random pictures
    displayRandomPictures(imgsObj);

    // display results
    renderResults();


    // check if attempts is gone
    if (attempts === 0)
    {
        // show alert
        alert('Attempts done!');
    }
    else
    {
        // decrement attempts
        attempts--;
    } 
};

// attaching event listener to a 'vote' button
vote.addEventListener('click', clicked);

/**********************************************************************************/
// render result clicks from array of objects to a page

function renderResults()
{
    // while list has some list items - delete it
    while (resultsList.firstChild) 
    {
        resultsList.removeChild(resultsList.firstChild);
    }

    // going through array of objects
    for (var obj of imgsObj)
    {
        // create a list item node
        var tmpNode = document.createElement('li');
        // create a text node
        var nameClicks = document.createTextNode(obj.name[0] + ': ' + obj.totalClicks);
        // connect text node to list item
        tmpNode.appendChild(nameClicks);
        // connect list item to a results list
        resultsList.appendChild(tmpNode);
    }
}


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

// rendering results for them
renderResults();
