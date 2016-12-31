
/* pg2_FAQs.js
	Purpose:	Contains the setup script and utility functions to run the FAQs secondary page
	Author:		Drew Topel
	Date:		Dec 30, 2016
	Updated:	Dec 30, 2016
   */

$(function () {
	// Generate the sections of the page that we will then fill in below
	GenerateBoeingHeader("#JqFill_FAQsHdr", false);
	GenerateAnnouncementSection("#JqFill_FAQsAnnounce");
	GenerateCreditSection("#JqFill_credit");

	// Fill in the IDs of anchor points within this page for the footer links
	var FAQsPageAnchors = ["#FAQsAnchor1"];
	GenerateFooter("#JqFill_FAQsFooter", FAQsPageAnchors);

	// Retrieve the city name from the cookie, can't get it from window or top
	top.cityName = getCookie("selectedCity");
	console.log("FAQss using city: " + top.cityName);
	FillInAnnouncements(top.cityName);

	// Fill description paragraph
	$("#FAQsDescriptParagraph").html(FsDb_GetLorem(500));
});
