'use strict';




var imgsArray = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.jpg', 'tauntaun.jpg', 'unicorn.jpg', 'usb.jpg', 'water-can.jpg', 'wine-glass.jpg'];
var imgsObj = {};



function ImageTracker(img)
{
  // imagePath -> ./img/breakfast.jpg
  this.name = img.split('.'[0]);
  this.path = img;
  this.totalClicks = 0;
}

for( var i=0; i < imgsArray.length; i++) 
{
  imgsObj.push(new ImageTracker(imgsArray[i]));
}



// connect all pictures from a page and radio buttons


function displayRandomPictures(imgsArray)
{

  // find out random picture
  var pictureOneIndex = Math.floor(Math.random() * Math.floor(imgsArray.length));
  // place it to a page

  //pop it from array
  var firstPicture = imgsArray.splice(pictureOneIndex, 1);






  

}