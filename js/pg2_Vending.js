
/* pg2_Vending.js
	Purpose:	Contains the setup script and utility functions to run the Vending secondary page
	Author:		Drew Topel
	Date:		Dec 30, 2016
	Updated:	Dec 30, 2016
   */

$(function () {
	// Generate the sections of the page that we will then fill in below
	GenerateBoeingHeader("#JqFill_VendingHdr", false);
	GenerateAnnouncementSection("#JqFill_VendingAnnounce");
	GenerateCreditSection("#JqFill_credit");

	// Fill in the IDs of anchor points within this page for the footer links
	var VendingPageAnchors = ["#VendingAnchor1"];
	GenerateFooter("#JqFill_VendingFooter", VendingPageAnchors);

	// Retrieve the city name from the cookie, can't get it from window or top
	top.cityName = getCookie("selectedCity");
	console.log("Vendings using city: " + top.cityName);
	FillInAnnouncements(top.cityName);

	// Fill description paragraph
	$("#VendingDescriptParagraph").html(FsDb_GetLorem(500));
});
