/* pg1_script.js
	Purpose:	Contains the functions needed to run pg1 of Food Services website. In particular
				the jQuery calls that load up the state and city picker pull-downs are done
				here and the logic to put in the city based on the state. Also anything needed
				to support the creation of lists throughout page one are done here.
	Author:		Drew Topel
	Date:		Dec 10, 2016
	Updated:	Dec 22, 2016
    */


// Document().ready function - what we need to do when the page loads
$(function () {
	// Fill in the state dropdown
	var statePd = ["Alabama", "Arizona", "California", "Canada", "Illinois", "Missouri",
                    "Oregon", "Pennsylvania", "South Carolina", "Texas", "Washington", "Washington DC"];
	var list = MakePulldown(statePd);
	// We have the states, make up the HTML
	$("#JqFillInStatePulldown").html(list);

	// Setup callback for when the search button is clicked
	$("#searchBut").click(function (e) {
		SearchButtonClicked();
		// Have to call preventDefault to keep the page from jumping to the top
		e.preventDefault();
	});

	// Hide the 'view more' button unless it is needed
	$("#announceViewMore").hide();
	// Read cookie to see if they have been here before and if so pre-populate the button values
	SetupCitySearchwCookies();

	// When the state has been selected, we can fill in the city drop down...
	$('#JqFillInStatePulldown li > a').click(function (e) {
		// Have to call preventDefault to keep the page from jumping to the top
		e.preventDefault();
		// Get the state they selected and then create the city array for the next button
		var selectedSt = this.innerHTML;
		var cityPd = new Array();
		SetOnlyTextOnButton("#stateBut", selectedSt);
		// Be sure to reset the city selection
		SetOnlyTextOnButton("#cityBut", window.gDefaultCityString);
		// Set global var indicating the state is selected
		window.stateSelected = true;
		window.stateName = selectedSt;

		switch (selectedSt) {
			case 'Alabama':
				cityPd[0] = 'Montgomery';
				break;
			case 'Arizona':
				cityPd[0] = 'Mesa';
				break;
			case 'California':
				cityPd = ["Seal Beach", "Huntington Beach", "El Segundo"];
				break;
			case 'Canada':
				cityPd[0] = 'Winnipeg';
				break;
			case 'Illinois':
				cityPd[0] = 'Chicago';
				break;
			case 'Missouri':
				cityPd[0] = 'St. Louis';
				break;
			case 'Oregon':
				cityPd[0] = 'Portland';
				break;
			case 'Pennsylvania':
				cityPd[0] = 'Philadelphia';
				break;
			case 'South Carolina':
				cityPd[0] = 'Charleston';
				break;
			case 'Texas':
				cityPd = ["Houston", "San Antonio"];
				break;
			case 'Washington DC':
				cityPd[0] = 'Washington DC';
				break;
			case 'Washington':
				cityPd[0] = 'Puget Sound';
				break;
		}
		var list = MakePulldown(cityPd);
		if (cityPd.length == 1) {   // Populate the button with the city if there is just one choice
			SetOnlyTextOnButton("#cityBut", cityPd[0]);
			// Set global var indicating the city is selected
			window.citySelected = true;
			window.cityName = cityPd[0];
		}
		else {   // Note that we now have a city that must be selected
			window.citySelected = false;
		}

		// The selected state has more than one city set the dropdown list
		$("#JqFillInCityPulldown").html(list);
		// Setup up callback for when the select a city to fill in announcements
		$('#JqFillInCityPulldown li > a').click(function (e) {
			var selectedCity = this.innerHTML;
			SetOnlyTextOnButton("#cityBut", selectedCity);
			// Set global var indicating the city is selected
			window.citySelected = true;
			window.cityName = selectedCity;
			// Have to call preventDefault to keep the page from jumping to the top
			e.preventDefault();
		});
	});				// Ends $(JqFillInStatePulldown).onclick
});				// Ends $(Document.ready())

// User picked the 'Search for City' button
function SearchButtonClicked() {
	if (window.stateSelected && window.citySelected) {
		setCookie("selectedState", window.stateName, window.cookieExpirationDays);
		setCookie("selectedCity", window.cityName, window.cookieExpirationDays);
		pg1PrepAnnouncements(window.cityName);
	}
	else {
		alert("Both State and City must be selected to do the search")
	}
}

// Read in the site's cookies and determine if we already know the user's preference for city and state
//  if so, fill them in on the buttons
function SetupCitySearchwCookies() {
	var cookieState = getCookie("selectedState");
	if (cookieState.length > 0) {
		SetOnlyTextOnButton("#stateBut", cookieState);
		window.stateSelected = true;
	}

	var cookieCity = getCookie("selectedCity");
	if (cookieCity.length > 0) {
		SetOnlyTextOnButton("#cityBut", cookieCity);
		window.citySelected = true;
	}

	// Fill in the announcement text up front since we have the city
	if (window.stateSelected && window.citySelected) {
		window.stateName = cookieState;
		window.cityName = cookieCity;
		pg1PrepAnnouncements(window.cityName);
	}
	else {
		FillInNoCityAnnouncement();
	}
}


// Globals that are set according to city capabilities
var cityHasEurest = true;
var cityHasPayrollDeduction = true;

// Fill in the announcement text from our database
function pg1PrepAnnouncements(city) {

	var cityExists = FillInAnnouncements(city);
	// Look up how to set globals according to city capabilities
			// CODE INSERT HERE - The JSON for a city will have this info
	cityHasEurest = false;
	cityHasPayrollDeduction = true;

	console.log("City: " + city + ", " + ((cityHasEurest) ? "has" : "does not have") + " Eurest");
	console.log("City: " + city + ", " + ((cityHasPayrollDeduction) ? "has" : "does not have") + " Payroll deduction");

	ChangePg1SectionsVisibleState(true);
	// Given the city, set up the cafe accordion
	SetupDiningColumn(city);
	// Now the catering column
	SetupCateringColumn(city);
	// Finally, the promos column
	SetupPromosColumn(city);
}

/* If user has never been to this site, they have never selected a city, 
 *	so give welcome message and eliminate all the other pg1 sections until they do
*/
function FillInNoCityAnnouncement() {
	$("#announceCityId").html("Welcome to Food Services");
	$("#announceViewMore").hide();
	$("#announceTextId").html(FsDb_GetCityAnnouncements(window.sNoCityString));

    // Change the css so we can see the 'fork and spoon' background
	$('#announceTop').css({
	    'background-color': 'transparent',  
	    'background-image' : 'url("../img/ForkSpoonBkgnd.png")'
	});
	
	ChangePg1SectionsVisibleState(false);
}

// An array of page 1 sections that we need to hide if there is not a city. Also the list
//	to show when there is a city ;-)
var pg1SectionsToHide = ["#DCMP", "#contactsBg", "#wbSection",
						"#cycleSection", "#ccBkgnd"];

/* There are sections that should not be shown unless we have a city selected. 
*	This function will show or hide them based on the boolean input (i.e. true = show)
*/
function ChangePg1SectionsVisibleState(areVisible) {
	for (var sect = 0; sect < pg1SectionsToHide.length; sect++) {
		ExecuteShowHide(pg1SectionsToHide[sect], areVisible);
	}
	ChangeOptionalSectionVisibleState(areVisible);
}


/* Some of the sections are only there if the selected city has that particular feature
 *	e.g. Eurest or loyalty programs and payroll deduction are not universal, so they are hidden
 * Here we execute that logic in addition to whether we are showing sections to determine
 *	if we should make those visible
 */
function ChangeOptionalSectionVisibleState(areVisible) {
	if ( cityHasEurest )
	{
		ExecuteShowHide("#eurBkgnd", areVisible);
	}

	if ( cityHasPayrollDeduction )
	{
		ExecuteShowHide("#payBkgnd", areVisible);
	}
}

// Actually execute the show/hide on a section
function ExecuteShowHide( sectLbl, areVisible )
{
	if (areVisible)
		$(sectLbl).show();
	else
		$(sectLbl).hide();
}


/* Demo Ajax call */
/*
$(document).ready(function () {
	var ajaxSrvr = "http://localhost:60869/CultureRestSvc.svc/";
	ajaxSrvr = "http://localhost:56141/CultureRestSvc.svc";
	var restUri = ajaxSrvr + "/GetGridItems";
	var fullUrl = restUri + "?itemStart=2&numItems=8";
	// Load the data for the culture 3x5 table
	$.ajax({
		type: "GET",
		url: fullUrl,      // Since I'm using the data item below, just use the server URL here
		dataType: "json",  // This param must match the ResponseFormat on the WCF Method
		//  Also BodyStyle for responses must be wrapped
		// Changing this to json from HTML forced an error return
		// but the data that was returned included the right responseText!
		// ContentType indicates the format of the data member
		// contentType: "application/json; charset=utf-8",
		// Data contains the parameters we want to pass in
		// data: "{\"ItemStart\":2, \"numItems\":8}",
		success: function (markup) {
			$(".tableFromServer").html(markup.GetGridItemsResult);
		},
		error: function (errTxt) {
			$(".tableFromServer").html(
				errTxt.responseText
				/*"<h2>Error Return (readyState: "
						+ errTxt.readyState + ", status: " 
						+ errTxt.status + ", statusText: " + errTxt.statusText
						+ ", Response: " + errTxt.responseText + ")</h2></br>"
				   */
/*
				   );
			// .substr(0,30));
			//alert(xhr.responseText);
		}
	});
*/