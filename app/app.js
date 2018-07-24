'use strict';

// array of images to fill an object
var imgsArray = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.jpg', 'tauntaun.jpg', 'unicorn.jpg', 'usb.jpg', 'water-can.jpg', 'wine-glass.jpg'];
var imgsObj = [];



function ImageTracker(img)
{
    // imagePath -> ./img/breakfast.jpg
    this.name = img.split('.'[0]);
    this.path = img;
    this.totalClicks = 0;
}

for( var i=0; i < imgsArray.length; i++) 
{
    imgsObj[i] = new ImageTracker(imgsArray[i]);
}



// connect all pictures from a page and radio buttons
// var radioOne = document.getElementById('radioOne');

function displayRandomPicture(imgsObj)
{
    // --------------randomize first picture-----------------
    // find out random picture from array
    var pictureIndexOne = Math.floor(Math.random() * Math.floor(imgsObj.length));
    // place it to a frame
    document.getElementById('picOne').src = './img/' + imgsArray[pictureIndexOne];
    //pop it from array, so it doesn't repeat
    // imgsArray.splice(pictureIndexOne, 1);
    // ----------------------------------------------------

    // --------------randomize second picture-----------------
    // find out random picture from array
    var pictureIndexTwo = Math.floor(Math.random() * Math.floor(imgsObj.length));
    // place it to a frame
    document.getElementById('picTwo').src = './img/' + imgsArray[pictureIndexTwo];
    //pop it from array, so it doesn't repeat
    // imgsArray.splice(pictureIndexTwo, 1);
    // ----------------------------------------------------

    // --------------randomize third picture-----------------
    // find out random picture from array
    var pictureIndexThree = Math.floor(Math.random() * Math.floor(imgsObj.length));
    // place it to a frame
    document.getElementById('picThree').src = './img/' + imgsArray[pictureIndexThree];
    //pop it from array, so it doesn't repeat
    // imgsArray.splice(pictureIndexThree, 1);
    // ----------------------------------------------------

}