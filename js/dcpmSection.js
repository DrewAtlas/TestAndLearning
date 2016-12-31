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
	panelLabel	The label of the visible panel we see when it is collapsed, e.g. Cafe 33-22
	panelContent	What we see when the panel is expanded, this includes line breaks as needed. e.g. This is a description of this particular cafe<br /> blah blah blah <br />
*/
function CreateOneAccordion( panGrpId, heading, collapse, panelLabel, panelContent)
{
		// Build up the HTML for this  one panel
	var basicPanel =
	'<div class="panel panel-default">\
		<div class="panel-heading dcpm_accordPanels" role="tab" id="' + heading + '">\
			<h4 class="panel-title">\
				<a class="collapsed" data-toggle="collapse" data-parent="#' + panGrpId + '" href="#' + collapse + '" aria-expanded="false" aria-controls="#' + collapse + '">'
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
function AccordionPanelHeader( label, panGrpId )
{
	var hdrBut = '<div class="dcpm_accordionButs">' + label
				+ '<button class="dcpm_NoBut " data-toggle="collapse" data-target="#' + panGrpId + '">\
					<span class="dcpm_caret"><img src="../img/AccordianDownBut.png" /></span>\
				</button> </div>';
	// Now add in the panel group that will contain all of the different accordion buttons. The panGrpId 
	//	ties together the hdr and the panel
	hdrBut += '<div class="panel-group dcpm_cafes" id="' + panGrpId + '" role="tablist" aria-multiselectable="true">';

	return hdrBut;
}

// Given the selected city, fill in the Cafe accordion
function SetupDiningColumn(city) {
	// Temp labels for the accordion buttons we want to make (normally this comes from the DB or Json files)
	console.log("SetupDiningColumn Entry:" + city);

	var butLabels = ["CafeLabel1", "CafeLabel2", "CafeLabel3", "CafeLabel4", "CafeLabel5", "CafeLabel6", "CafeLabel7", "CafeLabel8"];
	var onePanelHtml = AccordionPanelHeader("Cafe", "diningAccordion");
	for (var but = 0; but < butLabels.length; but++) {
		onePanelHtml += CreateOneAccordion("diningAccordion", "diningBut" + but, "dinCollapse" + but, butLabels[but], FsDb_GetLorem(60));
	}
	onePanelHtml += '</div>';

	var otherButs = "";
	// Fill in the HTML to other buts
	otherButs = '<div>';
	otherButs += AddDcmpBut("Tully's Coffee", "pg2_Tullys.html");
	otherButs += AddDcmpBut("Avenue C", "pg2_AveC.html");
	otherButs += '</div>';
	$("#JqFillDiningCol").html(onePanelHtml + otherButs);
}

function AddDcmpBut(title, link) {
	return '<div class="dcpm_SectBut"><a href="' + link + '">' + title + '</a></div>';
}

// Given the selected city, fill in the Catering Column
function SetupCateringColumn(city) {
	// Temp labels for the accordion buttons we want to make (normally this comes from the DB or Json files)
	console.log("SetupCateringColumn Entry:" + city);

	var butLabels = ["Place an Order", "Online Ordering", "10 Minute Trainer"];
	var onePanelHtml = AccordionPanelHeader("Order Catering", "cateringAccordion");
	for (var but = 0; but < butLabels.length; but++) {
		onePanelHtml += CreateOneAccordion("cateringAccordion", "citybut" + but, "cityCollapse" + but, butLabels[but], FsDb_GetLorem(60));
	}
	onePanelHtml += '</div>';		// Required close of div from AccordionPanelHeader
	onePanelHtml += '<div>';
	onePanelHtml += AddDcmpBut("Order Coffee Service", "pg2_CoffeeService.html");
	onePanelHtml += '</div>';
	$("#JqFillCateringCol").html(onePanelHtml);
	console.log("SetupCateringColumn Exit:" + city);
}

// Fill in promotions for this city
function SetupPromosColumn(city) {
	// Temp labels for the accordion buttons we want to make (normally this comes from the DB or Json files)
	console.log("SetupPromosColumn Entry:" + city);
	var colHtml = AddDcmpBut("View Monthly Promos", "pg2_Promos.html");

	$("#JqFillPromosCol").html(colHtml);
	console.log("SetupPromosColumn Exit:" + city);
}