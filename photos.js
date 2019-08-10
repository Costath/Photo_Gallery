/*    Based on :
 *    JavaScript 6th Edition
 *    Chapter 5
 *    Chapter case
 * 
 *    Photo gallery
 *    Variables and functions
 * 
 *    Author: Thales Costa
 *    Date:   August, 2019
 *    Professor: Wallace Balaniuc
 *    Course: Client-Side Web Development - COMP 125
 *    Centennial College
 * 
 *    Filename: photos.js
 */

// interpret document contents in JavaScript strict mode
"use strict";

// global variables
var httpRequest = false;
var picturesList;
var shiftPicture;
var i = 0;

function getRequestObject() {
   try {
      httpRequest = new XMLHttpRequest();
   }
   catch (requestError) {
      alert("Ajax not supported by your browser.");
      return false;
   }
   return httpRequest;
}
function populateFigures() {
   var currentFig;
   
   if (httpRequest.readyState === 4 && httpRequest.status === 200) {
      picturesList = JSON.parse(httpRequest.responseText);
      for(var i = 0; i < 5; i++) {
         currentFig = $("img")[i];
         currentFig.src = picturesList.pictures[i].source;
      }
      createInterval();
   }
}
/* shift all images one figure to the left in picturesList */
function shiftLeft() {
   var currentFig;
   var temp = picturesList.pictures[0];
   
   $("#fig3").fadeOut("fast");
   for(var i = 0; i < 4; i++) {
      picturesList.pictures[i] = picturesList.pictures[i + 1];
      currentFig = $("img")[i];
      currentFig.src = picturesList.pictures[i].source;
   }
   $("#fig3").fadeIn("fast");
   picturesList.pictures[4] = temp;
   createInterval();
}
function rightArrow() {
   shiftLeft();
}
/* shift all images one figure to the right in picturesList */
function shiftRight() {
   var currentFig;
   var temp = picturesList.pictures[4];

   $("#fig3").fadeOut("fast");
   for(var i = 4; i > 0; i--) {
      picturesList.pictures[i] = picturesList.pictures[i - 1];
      currentFig = $("img")[i];
      currentFig.src = picturesList.pictures[i].source;
   }
   $("#fig3").fadeIn("fast");
   
   picturesList.pictures[0] = temp;
   createInterval();
}
function leftArrow() {
   shiftRight();
}
function getPictures() {
	if (!httpRequest) {
		httpRequest = getRequestObject();
	}
   // Cancel any existing HTTP request before beginning a new one
	httpRequest.abort(); 
	// Opens a new HTTP request. Specifies GET as method type
   httpRequest.open("get", "photos.php", true);
   //Specifies Request body as null
   httpRequest.send(null);
   
	httpRequest.onreadystatechange = populateFigures;
}
function createInterval() {
   if (shiftPicture) {
      clearInterval(shiftPicture);
   }
   
   $("#label").text("Name: " + picturesList.pictures[2].source.substr(7));
   $("#showInterval").text("In front for " + picturesList.pictures[2].secondsVisible.substr(0, 1) + "s");
   
   shiftPicture = setInterval(shiftLeft, picturesList.pictures[2].secondsVisible);
}
function createEventListeners() {
	var leftarrow = document.getElementById("leftarrow");
	leftarrow.addEventListener("click", leftArrow, false);
	
	var rightarrow = document.getElementById("rightarrow");
	rightarrow.addEventListener("click", rightArrow, false);
	
	var updateButton = document.querySelector("#updateButton");
	updateButton.addEventListener("click", getPictures, false);
}
/* create event listeners and populate image elements */
function setUpPage() {
   createEventListeners();
   getPictures();
}
/* create event listener to run setUpPage() function when page finishes loading */
window.addEventListener("load", setUpPage, false);
