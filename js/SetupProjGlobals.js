
/* jQuery project global variable setter
  Purpose: This .js file needs to be included first of all the JS scripts because in here
            we look up all the global variables that have been setup for this project 
            and then stuff their values into new members of the global window object. Then
            any function that needs them can get them from their context w/o a problem.

    Syntax Note:
        $(function () {                 is equal to
        $(document).ready(function () {
*/
$(function () {
	// y-Offset for a parallax scroll
	window.parallaxYOffset = $("meta[name='parallaxYOffset']").attr("content");
	// on Page 1, the user needs to select the city and state in order to do a search
	window.stateSelected = false;
	window.citySelected = false;
	// Text used to replace the city pick button when no city is selected
	window.gDefaultCityString = "Pick City";
	// At some point, get this expiration through a script setting - number of days to keep a cookie around
	window.cookieExpirationDays = 30;
	// This is the value of the city when the user has never selected one
	window.sNoCityString = "none";
});