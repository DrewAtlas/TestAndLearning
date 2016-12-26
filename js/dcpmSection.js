/* DCPM Manager Javascript file
	Purpose:	Create and manage the implementation of all the accordion and other
				widgets thare are seen in the DCPM section of the main page
	
	The json should be an array of objects, each of which contain a 'title' and a
	'details' field that are to be put into the accordion. For example:
		[
			{"title": "this is the title",
			"details": "these are the details"},
			....
		]

	Using that input, we will generate something like this for every cafe that is going into the 
	Accordion under Dining:

	<div class="panel panel-default">
	<div class="panel-heading" role="tab" id="heading3">
		<h4 class="panel-title">
			<a class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapse3" aria-expanded="false" aria-controls="collapse3">
				Delivery Center 45-11
			</a>
		</h4>
	</div>
	<div id="collapse3" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading3">
		<div class="panel-body">
			<p></p>
		</div>
	</div>
</div>

Here is the phase 2 of the above- turning the dynamic into variables - this is finally implemented in CreateOneAccordion()
    <!-- Notes
        accordion stays unchanged in the output html, it references the panel group
        heading1 is the ID of the panel heading element, its referenced by the collapsed description-containing div
        collapse1 is the id of the panel-collapse element that is collapsed or expanded to show the additional detail of this panel
        panelLabel is the label of the visible panel we see when it is collapsed, e.g. Cafe 33-22
        panelContent is what we see when the panel is expanded, this includes line breaks as needed. e.g. This is a description of this particular cafe<br /> blah blah blah <br />
        -->
    <div class="panel panel-default">
        <div class="panel-heading dcpm_accordPanels" role="tab" id="' + heading1 + '">
            <h4 class="panel-title">
                <a class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#' + collapse1 + '" aria-expanded="false" aria-controls="' + collapse1 + '">
                    + panelLabel + 
                </a>
            </h4>
        </div>
        <div id="' + collapse1 + '" class="panel-collapse collapse" role="tabpanel" aria-labelledby="' + heading1 + '">
            <div class="panel-body">
                <p>' + panelContent + '</p>
            </div>
        </div>
    </div>


	This function will return HTML ready to shove right into the <div> under the accordion 
	header where we need this info to be
*/

function CreateAccordionFromJson(jsonDef) {

}

/* CreateOneAccordion()
* Purpose:		Create an accordion panel that is meant to be part of a panel group. Call this once for each panel in the group
* Inputs:	
	panGrpId	Contains the ID of the top level <div> containing the panel-group
	heading		The ID of the panel heading element, its referenced by the collapsed description-containing div
	collapse	The id of the panel-collapse element that is collapsed or expanded to show the additional detail of this panel
	panelLabe	The label of the visible panel we see when it is collapsed, e.g. Cafe 33-22
	panelContent	What we see when the panel is expanded, this includes line breaks as needed. e.g. This is a description of this particular cafe<br /> blah blah blah <br />
*/
function CreateOneAccordion( panGrpId, heading, collapse, panelLabel, panelContent)
{
		// Build up the HTML for this  one panel
	var basicPanel =
	'<div class="panel panel-default">\
		<div class="panel-heading dcpm_accordPanels" role="tab" id="' + heading + '">\
			<h4 class="panel-title">\
				<a class="collapsed" data-toggle="collapse" data-parent="#' + panGrpId + '" href="#' + collapse + '" aria-expanded="false" aria-controls="' + collapse + '">'
					+ panelLabel
				+ '</a>\
			</h4>\
		</div>\
		<div id="' + collapse + '" class="panel-collapse collapse" role="tabpanel" aria-labelledby="' + heading + '">\
			<div class="panel-body">\
				<p>' + panelContent + '</p>\
			</div>\
		</div>\
	</div>';

	return basicPanel;
}

// Create the top level <div> for an accordian panel group. Use this once and then fill in with many calls to CreateOneAccordion()
function AccordionPanelHeader( panGrpId )
{
	return '<div class="panel-group dcpm_cafes" id="' + panGrpId + '" role="tablist" aria-multiselectable="true">';
}

// Given the selected city, fill in the Cafe accordion
function SetupCafeAccordion( city ) {
	// Temp labels for the accordion buttons we want to make (normally this comes from the DB or Json files)
	console.log("SetupCafeAccordion Entry:" + city);

	var butLabels = ["CafeLabel1", "CafeLabel2", "CafeLabel3", "CafeLabel4", "CafeLabel5", "CafeLabel6", "CafeLabel7", "CafeLabel8"];
	var onePanelHtml = AccordionPanelHeader("accordion");
	for (var but = 0; but < butLabels.length; but++) {
		onePanelHtml += CreateOneAccordion("panelGroupId", "The Master Heading...", "collapse" + but, "Cafes B3-" + but, "boring details about this " + but + " cafe...");
	}
	onePanelHtml += '</div>';
	$("#cafeAccordionJqFill").html(onePanelHtml);
	console.log("SetupCafeAccordion Exit:" + city + "\n" + onePanelHtml);
}