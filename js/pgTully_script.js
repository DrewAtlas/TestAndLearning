
/* pgTully_script.js
	Purpose:	Contains the setup script and utility functions to run the Tully page
	Author:		Drew Topel
	Date:		Dec 27, 2016
	Updated:	Dec 27, 2016
   */

/* Note: I'll have to make a Header/nav bar and a footer script - or maybe just anything
* that is one of teh secondary page common sections so that those secetions are all done
* with the same code
*/

$(function () {
	// Generate the sections of the page that we can
	GenerateBoeingHeader("#JqFill_tullyHdr", false);
	GenerateAnnouncementSection("#JqFill_tullyAnnounce");
	GenerateCreditSection("#JqFill_credit");

	// Fill in the IDs of anchor points within this page for the footer links
	var tullyPageAnchors = ["#tullyAnchor1"];
	GenerateFooter("#JqFill_tullyFooter", tullyPageAnchors);

	// Retrieve the city name from the cookie, can't get it from window or top
	top.cityName = getCookie("selectedCity");

	console.log("Tullys using city: " + top.cityName);
	FillInAnnouncements(top.cityName);

	// Fill description paragraph
	$("#TulDescriptParagraph").html(FsDb_GetLorem(500));

	var sd = GenerateBoeingBuildingName();
	var ww = GenerateHoursSet();

	FillInTullyStoreHours(top.cityName);
});

// Create the HTML that shows the hours for all the Tullys stores in the passed city
function FillInTullyStoreHours(city)
{
	/* THe HTML will end up looking like this per row
			<div class="row">
				<!-- Demo for one column, there are 4 of them -->
				<div class="col-md-3 ">
					<div class="TulHoursHdr">Boeing 40-21</div>
					<div class="TulHoursTimes"><span style="font-weight:bold">M-F:</span> 4am-7:30pm</div>
					<div class="TulHoursTimes"><span style="font-weight:bold">SAT:</span> 5am-3:30pm</div>
					<div class="TulHoursTimes"><span style="font-weight:bold">SUN:</span> Closed</div>
				</div>
			</div>			ends one row
	*/
	// Get the objects from the stored jSon dataset for this city
	var curCol = 0;
	var maxCol = 4;
	var hourBlocks = getCrap(city);

	var startRow = '<div class="row"><div class="col-md-3 ">';
	var rowHtml = startRow;
	for (var blk = 0; blk < hourBlocks.length; hourBlocks++) {
		// The .header member contains the store title as it should appear on the column. Any needed line breaks <br/> are built in
		if ( (blk % maxCol == 0) && (rowHtml.length > 0) )
		{	// When the mod value is zero, we are starting a new row...
			rowHtml += '</div>' + startRow;
		}
		// Stick the header on to this group of hours
		rowHtml += '<div class="TulHoursHdr">' + hourBlocks[blk].hoursHeader + '</div>';
		// The .hours member contains the rows times for that store. Any line breaks and bold treatment are built in already, so we just display it
		rowHtml += '<div class="TulHoursTimes">' + hourBlocks[blk].hours + '</div>';
	}
	// Close off the row div35
	rowHtml += '</div>';

	// Insert the table of time blocks into the DOM
	$("#JqFillInHours4Columns").html(rowHtml);
}
var maxHours = 20;
// Create an array of hours objects
function getCrap(city) {

	var hourSets = [];
	for (var hours = 0; hours < maxHours; hours++) {
		hourSets[hours] = { hoursHeader: GenerateBoeingBuildingName(), hours: GenerateHoursSet() };
	}

	return hourSets;
}

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

