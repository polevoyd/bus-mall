'use strict';

// array of images to fill an object
var imgsArray = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg'];
var imgsObj = [];
var previousImgIndexes = [undefined, undefined, undefined];
var attempts = 25;

// checking for a localStorage entry

if (localStorage.getItem('chartData'))
{
    imgsObj = JSON.parse(localStorage.getItem('chartData'));
}


//////////////////////////////////////////////////////////////////////////////////
/////////////////////CONSTRUCTOR FOR AN IMAGE OBJECT//////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

function ImageTracker(imgName)
{
    // imagePath -> ./img/breakfast.jpg
    this.name = imgName.split('.'[0]);
    this.path = imgName;
    this.totalClicks = 0;
    this.totalViews = 0;
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

// description section

// var description = document.getElementById('descriptionSection');

// connecting a canvas for a chart

var resultsChart = document.getElementById("myChart").getContext('2d');


//////////////////////////////////////////////////////////////////////////////////
////////////////////////////////FUNCTIONS DEFINITIONS/////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

// pick a random number from array indexes that doesn't equal to previous image
function pickRandomNumber(arrayOfImages)
{
    var rt = [];

    for (var i = 0; i < 3; i++)
    {
        var rndNumber = Math.floor(Math.random() * Math.floor(arrayOfImages.length));

        while (previousImgIndexes.includes(rndNumber) || rt.includes(rndNumber)) 
        {
            rndNumber = Math.floor(Math.random() * Math.floor(arrayOfImages.length));
        }

        rt.push(rndNumber);
    }

    return rt;
}

/**********************************************************************************/

// function to rotate picture that selected currently

function rotatePicture(pictureId) 
{
    // switching depends on a frame ID
    switch (pictureId) {
    case 'picOne':
        frameOne.style.animation = 'spin 1.5s linear infinite';
        frameTwo.style.animationIterationCount = 0;
        frameThree.style.animationIterationCount = 0;
        break;
    
    case 'picTwo':
        frameOne.style.animationIterationCount = 0;
        frameTwo.style.animation = 'spin 1.5s linear infinite';
        frameThree.style.animationIterationCount = 0;
        break;

    case 'picThree':
        frameOne.style.animationIterationCount = 0;
        frameTwo.style.animationIterationCount = 0;
        frameThree.style.animation = 'spin 1.5s linear infinite';
        break;

    default:
        break;
    }
}

/**********************************************************************************/

// function to flash picture after we click vote button

function flashOnSelection(radioButtonId) 
{
    // switching depends on a frame ID
    switch (radioButtonId) {
    case 'radioOne':
        frameOne.style.animation = 'flashing 0.05s 3';
        break;
    
    case 'radioTwo':
        frameTwo.style.animation = 'flashing 0.05s 3';
        break;

    case 'radioThree':
        frameThree.style.animation = 'flashing 0.05s 3';
        break;

    default:
        break;
    }
}

/**********************************************************************************/

// display random pictures to a page

function displayRandomPictures()
{
    // array of random indexes (3)
    var randomImagesIndexes = pickRandomNumber(imgsArray);

    // --------------randomize first picture-----------------
    // find out random picture from array
    var pictureIndexOne = randomImagesIndexes[0];
    // place it to a frame
    frameOne.src = './img/' + imgsArray[pictureIndexOne];
    // set a value of radio button as index of that image in our initial array
    radioOne.setAttribute('value', pictureIndexOne);
    // set value to prev indexes array, so when it will look it up it does not repeats
    previousImgIndexes[0] = pictureIndexOne;
    // add a view to that image object
    imgsObj[pictureIndexOne].totalViews++;
    
    // --------------randomize second picture-----------------
    // find out random picture from array
    var pictureIndexTwo = randomImagesIndexes[1];
    // place it to a frame
    frameTwo.src = './img/' + imgsArray[pictureIndexTwo];
    // set a value of radio button as index of that image in our initial array
    radioTwo.setAttribute('value', pictureIndexTwo);
    // set value to prev indexes array, so when it will look it up it does not repeats
    previousImgIndexes[1] = pictureIndexTwo;
    // add a view to that image object
    imgsObj[pictureIndexTwo].totalViews++;

    // --------------randomize third picture-----------------
    // find out random picture from array
    var pictureIndexThree = randomImagesIndexes[2];
    // place it to a frame
    frameThree.src = './img/' + imgsArray[pictureIndexThree];
    // set a value of radio button as index of that image in our initial array
    radioThree.setAttribute('value', pictureIndexThree);
    // set value to prev indexes array, so when it will look it up it does not repeats
    previousImgIndexes[2] = pictureIndexThree;
    // add a view to that image object
    imgsObj[pictureIndexThree].totalViews++;
}
/**********************************************************************************/

// function to execute when picture clicked (to set radio buttons checked)
function clickOnImage(event)
{
    // switcher to make a pictures clickable and 
    // turn on same radio button under
    switch (event.target.id) 
    {
    case 'picOne':
        radioOne.checked = true;
        rotatePicture('picOne');
        break;
    case 'picTwo':
        radioTwo.checked = true;
        rotatePicture('picTwo');
        break;
    case 'picThree':
        radioThree.checked = true;
        rotatePicture('picThree');
        break;
    default:
        break;
    }
}

// create and connect listener for that event to a pictures

frameOne.addEventListener('click', clickOnImage);
frameTwo.addEventListener('click', clickOnImage);
frameThree.addEventListener('click', clickOnImage);

/**********************************************************************************/
// what happens after 'vote' clicked
var clicked = function()
{
    // add a total click count to a image
    for (var radioBtn of radioArr)
    {
        if (radioBtn.checked)
        {
            // flashOnSelection(radioBtn.id);
            // in image object with same index we increment a total click
            imgsObj[radioBtn.value].totalClicks += 1;
            // and jump out of loop
            break;
        }
    }
    
    // var alerttt = alert('paused!');
    // var a = displayRandomPictures(imgsObj);

    // setTimeout(displayRandomPictures, 250, imgsObj);

    // display random pictures
    displayRandomPictures(imgsObj);

    // check if attempts is gone
    if (attempts === 0)
    {
        // display results
        // renderResults(); // dont need anymore since we have a fancy chart

        // make button disappear
        vote.style.display = 'none';

        // shut down a event listener
        vote.removeEventListener('click', clicked);

        // make description disappear
        // description.style.opacity = 0;

        // show alert that user run out of votes
        alert('Done! Let\'s see a results below:');

        // show a results chart
        displayResultsChart();
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
////////////////////////////CHART.JS RELATED SECTION//////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

function displayResultsChart()
{

    // add all the data to a localStorage

    localStorage.setItem('chartData', JSON.stringify(imgsObj));

    

    // construct arrays of names, votes and views

    // var imgNames = [];
    var imgVotes = [];
    var imgViews = [];

    // array of background + border colors
    var imgBackgroundColors = [];

    // now filling arrays with imgs data
    for (var img of imgsObj)
    {
        // imgNames.push(img.name[0]);
        imgVotes.push(img.totalClicks);
        imgViews.push(img.totalViews);
    }

    // filling array of background colors (each one will be random N from 0 to 255)

    for (var img of imgsObj)
    {
        var tmpColor = `rgba(${Math.floor(Math.random() * Math.floor(255))}, ${Math.floor(Math.random() * Math.floor(255))}, ${Math.floor(Math.random() * Math.floor(255))}, 1)`;
        imgBackgroundColors.push(tmpColor);
    }

    var myChart = new Chart(resultsChart, {
        type: 'bar',
        data: 
    {
        labels: imgsArray,
        datasets: [{
            label: '# of Votes',
            data: imgVotes,
            backgroundColor: imgBackgroundColors,
            borderColor: imgBackgroundColors,
            borderWidth: 1
        }]
    },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });
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

// rotate first one (cause by default radio checked on first)
rotatePicture('picOne');

// // rendering results for them
// renderResults();