
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
	SetButtonsWithCookies();

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
		FillInAnnouncements(window.cityName);
	}
	else {
		alert("Both State and City must be selected to do the search")
	}
}

// Read in the site's cookies and determine if we already know the user's preference for city and state
//  if so, fill them in on the buttons
function SetButtonsWithCookies() {
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
		FillInAnnouncements(window.cityName);
	}
	else {
		FillInNoCityAnnouncement();
	}
}
// Fill in the announcement text from our database
function FillInAnnouncements(city) {
	// Fill in the selected City from the drop down or single city HTML
	console.log("FillInAnnouncements city:" + city);
	$("#announceCityId").html(city);
	// Pull in the announcements from the database and display it
	var cityAnnounce = FsDb_GetCityAnnouncements(city);
	$("#announceTextId").html(cityAnnounce);

	if (cityAnnounce != null && cityAnnounce.length == 0) {
		// No announcements, so just disappear this section
		$("#announceTop").hide();
		return;
	}
	else
	{   // Since we have a city to show, we're not going ot show the 'fork and spoon' background
	    $('#announceTop').css('background-color', 'rgb(246,246,246)');     // Get correct grey color for this setting
		$("#announceTop").show();
	}

	var viewMore = FsDb_GetViewMore(city);
	if (viewMore != null && viewMore.length > 0) {   // This city has more things to say, create the view more page and button
	    $("#announceViewMore").show();
	    // Set the 'View more' button to point to somewhere
	    $("#announceViewMore").attr("href", viewMore);
	}
	else
	{   // No view more info, just hide the button
	    $("#announceViewMore").hide();
	}
		//test
	// Given the city, set up the cafe accordion
	console.log("Going to call SetupCafeAccordion city:" + city);
	SetupCafeAccordion(city);
}

// If user has never been to this site, we have a blank city, so give welcome message
function FillInNoCityAnnouncement() {
	$("#announceCityId").html("Welcome to Food Services");
	$("#announceViewMore").hide();
	$("#announceTextId").html(FsDb_GetCityAnnouncements(window.sNoCityString));

    // Change the css so we can see the 'fork and spoon' background
	$('#announceTop').css({
	    'background-color': 'transparent',  
	    'background-image' : 'url("../img/ForkSpoonBkgnd.png")'
	});
	
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