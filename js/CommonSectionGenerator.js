/* Filename:	CommonSectionGenerator.js
 * Purpose:		The landing page and all of the secondary pages have a few common sections
				that are always shown. This js script will generate those sections including
				the slight variations that are needed depending on which page on which
				they will be presented.
 Sections:	Boeing Header - 2 versions, main page and 2ndary
			Announcement -	shows the city name and city blurb
			Credit Card	- Now accepting shown on pg1 and all secondary pages
			Footer - mostl common, but it has different <a> links depending on the page
*/

/* GenerateBoeingHeader()
 * Purpose:	Generate the common 'navigation' or boeing header that is seen on every page
 *			there are two variations, one for pg1 and then the same on all secondary pages
 * Inputs:	the id of the HTML section that jQuery should fill
 *			a boolean to indicate whether this is for the landing page (true)
					or for any of the secondary pages (false)
 * Outputs:	jQuery will write the header into the indicated id-labled Html section
 */
function GenerateBoeingHeader(idToFill, isPg1) {
	var hdrHtml =
		'<div class="navbarHeader">\
			<img src="../img/Nav_Bar.png" />\
			<div class="navBoeingLogo"><img src="../img/BoeingNavBarLogo.png" /></div>';
	var hdrEnd = '</div>';
	var catSection =
		'<div class="navcategories">\
			<div class="navcatHome"><a href="../pages/home.html">Home</a></div>\
			<div class="navcatFeedback"><a href="../pages/home.html">Feedback</a></div>\
		</div>';
	var hdrSearch =
		'<div class="navSearch">\
			<div class="navSearchbox"></div>\
			<div class="navSearchIcon"><img src="../img/SearchBtnIcon.png" /></div>\
		</div>';

	var final = hdrHtml + ((isPg1) ? hdrSearch : "") + catSection + hdrEnd;
	$(idToFill).html(final);
}

function GenerateAnnouncementSection(idToFill)
{
	var final = 
	'<div id="announceTop">\
		<div id="announceCityId"></div>\
		<div id="announceTextId"></div>\
		<div id="announceViewMore"><a href="www.google.com">View More</a></div>\
	</div>';
	
	$(idToFill).html(final);
}

function GenerateCreditSection( idToFill )
{
	var creditSec = 
	'<div id="ccBkgnd" class="fsSection">\
		<div id="ccTitle">Now Accepting</div>\
		<div id="ccText">\
		Now accepting Visa, Mastercard, American Express, Discover & Debit Cards \
		</div>\
		<div id="ccPicture"></div>\
	</div>';

	$(idToFill).html(creditSec);
}

/* GenerateFooter()
 * Purpose:	Fill in the footer part of the page for the caller.
 * Inputs:	the id of the element that JQ should use to fill in that section
 *			an array of anchor points that should be represented in that section of
 *			the footer.
	*** This last parameter will have to change to a dictionary or soomethign becauswe I need
		to have the anchor title to show as well as the link for each for this to work

 * Assumes:	the rest of the footer, i.e. global anchors and informational text, should
 *			remain the same for all uses of the footer
 */
function GenerateFooter(idToFill, anchors) {
	var footer = '\
	<div id="footerBkgnd">\
	  <div class="row">\
		<div class="col-md-4 ">\
			<div id="footerFsLogo">\
				<img class="center-block" src="../img/FS_Logo_Footer.png">\
			</div>\
			<div id="footerBoeingTag">Copyright (C) 1995-2017 Boeing. All Rights Reserved</div>\
		</div>';
	var footerCol2 =
		'<div class="col-md-4">\
			<div id="footerLeftDivider"></div>\
			<div id="footerPageLinks">Page Links:';
	// Go thru the list of anchors they passed in and generate that section
	for ( var anc = 0; anc < anchors.length; anc++ )
	{
		footerCol2 += "<br/>" + anchors[anc];
	}
	footerCol2 += '</div'	// Closes off the footerPageLinks
		 + '<div id="footerOtherLinks">OTHER LINKS<br/>Content Owner<br/>Website Issues</div>\
			<div id="footerRightDivider"></div>\
		</div>';			// Ends column 2 div

	var footerCol3 = '\
		<div class="col-md-4">\
			<div id="footerFeedbackBut">Feedback Form</div>\
			<div id="footerFeedbackText">To help serve you better,<br/>Please go fuck youself!</div>\
		</div>';

	var footerEnd = '</div></div>';	// Closes row then footerBkgnd
	$(idToFill).html(footer + footerCol2 + footerCol3 + footerEnd);
}

/* All the above sections are designed to generate a section from scratch. Now assuming that the
 * common announcements section has been created in the DOM, we can populate it with the city information
 * Inputs:	the name of the city from which we're getting announcements
 * Outputs:	if we have city data, then the announceCityId, announceTextId, announceTop 
 *				and announceViewMore divs will be filled in
 * Returns:	true if there are announcements for the city or false otherwise
 */
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
		return false;
	}
	else {   // Since we have a city to show, we're not going ot show the 'fork and spoon' background
		$('#announceTop').css('background-color', 'rgb(246,246,246)');     // Get correct grey color for this setting
		$("#announceTop").show();
	}

	var viewMore = FsDb_GetViewMore(city);
	if (viewMore != null && viewMore.length > 0) {   // This city has more things to say, create the view more page and button
		$("#announceViewMore").show();
		// Set the 'View more' button to point to somewhere
		$("#announceViewMore").attr("href", viewMore);
	}
	else {   // No view more info, just hide the button
		$("#announceViewMore").hide();
	}

	return true;		// True means we have city info
}
