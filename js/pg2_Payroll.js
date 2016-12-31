
/* pg2_Payroll.js
	Purpose:	Contains the setup script and utility functions to run the Payroll secondary page
	Author:		Drew Topel
	Date:		Dec 30, 2016
	Updated:	Dec 30, 2016
   */

$(function () {
	// Generate the sections of the page that we will then fill in below
	GenerateBoeingHeader("#JqFill_PayrollHdr", false);
	GenerateAnnouncementSection("#JqFill_PayrollAnnounce");
	GenerateCreditSection("#JqFill_credit");

	// Fill in the IDs of anchor points within this page for the footer links
	var PayrollPageAnchors = ["#PayrollAnchor1"];
	GenerateFooter("#JqFill_PayrollFooter", PayrollPageAnchors);

	// Retrieve the city name from the cookie, can't get it from window or top
	top.cityName = getCookie("selectedCity");
	console.log("Payrolls using city: " + top.cityName);
	FillInAnnouncements(top.cityName);

	// Fill description paragraph
	$("#PayrollDescriptParagraph").html(FsDb_GetLorem(500));
});
