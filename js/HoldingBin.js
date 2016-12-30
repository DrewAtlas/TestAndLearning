
/* This file contains code snippets that I might want to use later
*/

var chkHt = $(".heroframe").outerHeight();
$("#announcements").css({ "position": "relative", "margin-top": "60px", "top": "800px" });
var mytopVal = $("#announcements").css("top");



var x = "[\n\t{\"hoursHeader\": \"Boeing 40-21\",\n\t\"hours\": \"<span style=\"font-weight:bold\">M-F:</span> 4am-7:30pm<br/>\n\t\t\t<span style=\"font-weight:bold\">M-F:</span> 4am-7:30pm<br/>\n\t\t\t<span style=\"font-weight:bold\">M-F:</span> 4am-7:30pm<br/>}\n\t{\"hoursHeader\": \"PaineField<br/>Boeing 40-21\",\n\t\"hours\": \"<span style=\"font-weight:bold\">M-F:</span> 4am-7:30pm<br/>\n\t\t\t<span style=\"font-weight:bold\">M-F:</span> 4am-7:30pm<br/>\n\t\t\t<span style=\"font-weight:bold\">M-F:</span> 4am-7:30pm<br/>}\n\t{\"hoursHeader\": \"PaineField<br/>Boeing 40-21\",\n\t\"hours\": \"<span style=\"font-weight:bold\">M-F:</span> 4am-7:30pm<br/>\n\t\t\t<span style=\"font-weight:bold\">M-F:</span> 4am-7:30pm<br/>\n\t\t\t<span style=\"font-weight:bold\">M-F:</span> 4am-7:30pm<br/>}\n]";

var demoHourBlocks =
'[\
	{"hoursHeader": "Boeing 40-21",\
	"hours": "<span style="font-weight:bold">M-F:</span> 4am-7:30pm<br/>\
			<span style="font-weight:bold">M-F:</span> 4am-7:30pm<br/>\
			<span style="font-weight:bold">M-F:</span> 4am-7:30pm<br/>}\
	{"hoursHeader": "PaineField<br/>Boeing 40-21",\
	"hours": "<span style="font-weight:bold">M-F:</span> 4am-7:30pm<br/>\
			<span style="font-weight:bold">M-F:</span> 4am-7:30pm<br/>\
			<span style="font-weight:bold">M-F:</span> 4am-7:30pm<br/>}\
	{"hoursHeader": "PaineField<br/>Boeing 40-21",\
	"hours": "<span style="font-weight:bold">M-F:</span> 4am-7:30pm<br/>\
			<span style="font-weight:bold">M-F:</span> 4am-7:30pm<br/>\
			<span style="font-weight:bold">M-F:</span> 4am-7:30pm<br/>}\
]';

// Parse the above demos tring into a JS object
function xGetTullyStoreHoursForCity(city) {
	return JSON.parse(x);
}

//====================  Functions to return store hours for Tullys ===================
var maxHours = 20;
// Create an array of hours objects
/*
function GetTullyStoreHoursForCity(city) {

	var hourSets = [];
	for (var hours = 0; hours < maxHours; hours++) {
		hourSets[hours] = { hoursHeader: GenerateBoeingBuildingName(), hours: GenerateHoursSet() };
	}

	return hourSets;
}
*/
/* Create something like this
"<span style="font-weight:bold">M-F:</span> 4am-7:30pm<br/>\
			<span style="font-weight:bold">M-F:</span> 4am-7:30pm<br/>\
			<span style="font-weight:bold">M-F:</span> 4am-7:30pm

	For linebreaks: ;	// Use 15ch max on a line
*/



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