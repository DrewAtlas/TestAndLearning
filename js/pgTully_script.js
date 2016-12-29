
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
});