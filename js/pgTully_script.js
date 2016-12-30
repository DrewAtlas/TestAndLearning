
/* pgTully_script.js
	Purpose:	Contains the setup script and utility functions to run the Tully page
	Author:		Drew Topel
	Date:		Dec 27, 2016
	Updated:	Dec 29, 2016
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

	FillInTullyStoreHours(top.cityName);

	// Because the browser doesn't know the real height of this element, fill it in
	var realHt = CalcHeightofDiv("#JqFill_credit");
	$("#JqFill_credit").css('height', realHt + 20);
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
	var hourBlocks = GetTullyStoreHoursForCity(city);
	console.info("FillInTullyStoreHours(): Got " + hourBlocks.length + " hour sets");

	var rowStart = '<div class="row">';
	var rowEnd = '</div>';
	var colStart = '<div class="col-md-3 ">';
	var colEnd = '</div>';

	var allHtml = "";
	var rowHtml = rowStart;
	var colHtml = "";

	for (var blk = 0; blk < hourBlocks.length; blk++) {
		// Each block contains the content of one column
		colHtml = colStart;
		// Stick the header on to this group of hours
		colHtml += '<div class="TulHoursHdr">' + hourBlocks[blk].hoursHeader + '</div>';
		// The .hours member contains the rows times for that store. Any line breaks and bold treatment are built in already, so we just display it
		colHtml += '<div class="TulHoursTimes">' + hourBlocks[blk].hours + '</div>';
		colHtml += colEnd;
		// Add this column to the row
		rowHtml += colHtml;
		// Decide if it is time to start another row
		if ((blk+1) % maxCol == 0)
		{	// When the mod value is zero, we are starting a new row...
			rowHtml += rowEnd;
			allHtml += rowHtml;
			rowHtml = rowStart;
		}
	}
	// Stick any remaining row items onto our output string
	if (rowHtml.length > rowStart.length) {
		allHtml += rowHtml + rowEnd;
	}

	// Insert the table of time blocks into the DOM
	$("#JqFillInHours4Columns").html(allHtml);
}

