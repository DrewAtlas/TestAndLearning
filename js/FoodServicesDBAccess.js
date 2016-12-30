/* File:	FoodServicesDbAccess.js
   Purpose:	Provide the interface to the "database" that the FS project is using to get items like
			city announcements, the number of cafes in a location, and anything else that is
			variable and usefult to store in a DB
*/

// Stub function that will be changed into a database-access function to get the city announcements
function FsDb_GetCityAnnouncements(city)
{
	var announce = "";
	if (city == window.sNoCityString) {
		console.info("No City selected yet, returning some lorem for the hello");
		return FsDb_GetLorem(500);
	}
    // Use city as the key into our 'database' of city announcements and return one if we find it
    //  up to a max of 256 characters, a min of 128.
	var loremLen = (8 + Math.floor(Math.random() * 8)) * 16;
	if (loremLen > 0) {
		announce = "Announcements for " + city + ":\n" + FsDb_GetLorem(loremLen);
	}
    console.info("Generating announcement of " + loremLen + " characters for city: " + city);

    return announce;
}

/* FsDb_GetViewMore()
    Purpose:    Sometimes the announcements come with a 'view more' feature. If they do, then this function will return the HTML to a button ref
                that we should put into the DOM. THis function also creates and fills in that other page. 
    Returns:    the href string to put into the view more button, or null if there is nothing more to tell, i.e. the view more button should not be put on the page
*/
function FsDb_GetViewMore(city)
{
    // Check if this city has 'more info' that we need to show here
    //  (execute some DB query here to see if we have to do anything)

    // Right now, randomly decide whether to have more or not
    var howMore = Math.floor(Math.random() * 10);
    if (howMore > 5)
    {
        console.info("No 'View More' Button to show")
        return null;
    }
    else
    {   // The <a> and href are already in the code for this button. All we need to do is send the code that will replace what
        //  is in the href right now.
        var myMore = "http://www.google.com/";
        // Construct a 'view more' hovering panel where we will put the text and supply a URL to it
        console.info("Made a page: " + myMore + " for View More Button to show");
        return myMore;
    }
}

// Return some nonesense latin for demo use - we want at most 256 chars returned from here. We'll pick a random spot within the string to return so it's always different
function FsDb_GetLorem(size) {
    var lorem = "Lorem ipsum dolor sit amet, at mei habemus nostrum scriptorem, dictas repudiare nec at, an his duis omittam. Ne hinc ornatus sententiae qui, quot necessitatibus ut vel. In vocent prompta voluptua mea, an duo agam definitionem. An diam habeo decore his, delenit lobortis ea vis.\
Vix ea ponderum voluptaria. Ius fuisset lucilius indoctum ea. Vix ex debitis tractatos intellegam. Pro tation veritus recteque at, mel inani voluptua id. Perpetua omittantur ea pro, ex vidit utroque propriae has. Et accusamus deseruisse voluptatibus vel. An qui graece doming definiebas.\
Erat adipisci salutatus vim eu, nam gloriatur moderatius in. Aperiri noluisse ad qui, eius fabellas repudiandae ne has. Ne pro ferri eirmod, ex altera eripuit mei. Ea odio solet necessitatibus vim, at velit augue duo. Et qui ridens assueverit, soluta principes conclusionemque in sit.\
At augue utinam iuvaret pro, posse qualisque id per, no erat viris aliquid eam. Sed et inermis verterem repudiandae. No his ubique gloriatur. Inani causae ad sit, ex cum mucius causae conceptam, cum consul comprehensam no. Eu sea inimicus evertitur.\
Malorum ancillae no mel, intellegam consectetuer nec te. Mei cu modo molestiae hendrerit, ut torquatos suscipiantur usu. Pri cetero prompta vituperatoribus id, dicam meliore ex vim. Eu vix eros illud munere, cu vis laoreet appetere.";

    return GetRandomPieceOfText(lorem, size);
}

// Version to get lorem text from a text file on the user's system
function FsDb_GetLoremFromFile(size) {
	var loremFile = "file://Data/Lorem.txt";
	var allLorem = ReadFile(loremFile);
	var myResponse = GetRandomPieceOfText(allLorem, size);
}

/* Given a text string, return a piece of it that is 'size' big from a random spot within
	the string you passed in
*/
function GetRandomPieceOfText(theText, size) {
	var repeat = 0;
	var offset = 0;
	var ret = "";

	if (size < theText.length) {
		// We can deliver the string size they want, but start at the end to give differnet strings in different instances
		// first, figure out how many chunks of text of size 'size' are in my lorem
		var availChunks = parseInt(theText.length / size);
		// Pick a random chunk to fulfill this call
		var thechunk = Math.floor(Math.random() * availChunks);
		offset = thechunk * size;
		ret = theText.substr(offset, size);
	}
	else {
		// Requested length is longer than the string we have, so repeat it.
		repeat = parseInt(theText.length / size);
		var times = 0;
		for (times = 0; times < repeat; times++) {
			ret += theText;
		}
		var left = size - (theText.length * repeat);
		ret += theText.substr(0, left);
	}

	return ret;
}

// Create an array of hours objects for Avenue C store
function GetAveCStoreHoursForCity(city) {
	var maxHours = 3 + Math.floor(Math.random() * 15);
	var hourSets = new Array(maxHours);
	for (var hr = 0; hr < maxHours; hr++) {
		hourSets[hr] = { hoursHeader: GenerateBoeingBuildingName(), hours: GenerateHoursSet() };
		console.info("Set for " + hr + " is [ " + hourSets[hr].hoursHeader + ", " + hourSets[hr].hours + "]");
	}
	console.info("Created " + hourSets.length + " hour sets");
	return hourSets;
}

// Create an array of hours objects for Tullys Stores in this city
function GetTullyStoreHoursForCity(city) {
	var maxHours = 3 + Math.floor(Math.random() * 15);
	var hourSets = new Array(maxHours);
	for (var hr = 0; hr < maxHours; hr++) {
		hourSets[hr] = { hoursHeader: GenerateBoeingBuildingName(), hours: GenerateHoursSet() };
		console.info("Set for " + hr + " is [ " + hourSets[hr].hoursHeader + ", " + hourSets[hr].hours + "]");
	}
	console.info("Created " + hourSets.length + " hour sets");
	return hourSets;
}

var gMaxTitleLen = 15;		// Desired max length for a store title

function GenerateBoeingBuildingName() {
	var names = ["Mezzanine", "Delivery Center", "Harbour Pointe", "Wire Shop", "Atlas Rocket",
				"Skylab", "Twin Towers", "Tower of Power", "House of Paine"];

	var startName = "";
	// Pick a name, Boeing or not, and a building number (or not)
	var nameIdx = Math.floor(Math.random() * (names.length * 1.5));
	if ( nameIdx < names.length )
		startName = names[nameIdx];

	var theBo = "";
	// Pick a name, Boeing or not, and a building number (or not)
	nameIdx = Math.floor(Math.random() * 10);
	if ( nameIdx & 1 )
		theBo = "Boeing";

	var buildingNbr = Math.floor(Math.random() * 100).toString() + "-" + Math.floor(Math.random() * 400).toString();

	var fullName = theBo + " " + startName + " " + buildingNbr;
	if ( fullName.length > gMaxTitleLen )
	{
		fullName = ReplaceWordBreak(fullName, gMaxTitleLen, "<br/>");
	}

	return fullName;
}

/* ReplaceWordBreak()
 * Purpose:	Replace a space inbetween words in a string with another string (e.g. like <br>)
 *			The word break to replace is the one nearest to the number of characters passed in
 *			Only one replacement of the searchStr will be done
 * Inputs:	the string in which to search,
 *			the string we want to replace,
 *			the occurence number we are interested in (e.g. to replace the 2nd occurance of searchStr, pass 2)
 *			the replacement string
 * Returns:	the altered string
 */
function ReplaceWordBreak(original, charsBeforeBreak, replaceStr) {
	// Split the string into words
	var words = original.split(' ');
	// Figure out which word break should be replaced
	var charCount = 0;
	var convertedStr = "";
	for (var j = 0; j < words.length; j++) {
		charCount += words[j].length + 1;
		convertedStr += words[j]
		if (charCount > charsBeforeBreak) {
			convertedStr += replaceStr;
			charsBeforeBreak = original.length + 20;	// Make sure we don't execute this logic again
		}
		else {
			convertedStr += ' ';
		}
	}

	console.info("ReplaceWordBreak(): Changed: " + original + " to " + convertedStr);
	return convertedStr;
}


/* ReplaceNthOccurence() - DOESN'T WORK
 * Purpose:	Replace a string with another string, but only do it to the Nth occurence of that search string in the original
 *			Only one replacement of the searchStr will be done
 * Inputs:	the string in which to search,
 *			the string we want to replace,
 *			the occurence number we are interested in (e.g. to replace the 2nd occurance of searchStr, pass 2)
 *			the replacement string
 * Returns:	the altered string
 */
function ReplaceNthOccurence(original, searchStr, occurNbr, replaceStr) {

	console.info("ReplaceNthOccurence(): Changing full name from: " + original);
	var nth = 0;
	var changedStr = original.replace('/' + searchStr + '/g', function (match) {
		nth++;
		return (nth === occurNbr) ? replaceStr : match;
	});
	console.info("ReplaceNthOccurence(): Full name changed to this: " + changedStr);
	return changedStr;
}

// Before we have real data, make up some hours of the data that this cafe is open so it looks good
function GenerateHoursSet() {
	var weekDays = [ "Open 23 Hours, (Closed 11:30pm-12:30am daily)", 
					"M-F:, 12:30am-11:30pm", "M-F:, 11:00am-4:00pm",
					"M-F:, 5:30am-11:30pm", "M-F:, 8:00am-4:00pm" ];
	
	var Sat = [ "SAT:, 12:30a-6:30pm", "SAT:, 5am-3:30pm", "SAT:, 5am-5:30pm", "SAT:,Closed" ];
	var Sun = ["SUN:, Closed", "SUN:, 5am-3:309pm", "SUN:, 5am-3:309pm", "SUN:, 5am-3:309pm"];

	var set = "";
	// Pick a name, Boeing or not, and a building number (or not)
	var nameIdx = Math.floor(Math.random() * weekDays.length);
	set += Embolden(weekDays[nameIdx]) + "<br/>";
	set += Embolden(Sat[Math.floor(Math.random() * Sat.length)]) + "<br/>";
	set += Embolden(Sun[Math.floor(Math.random() * Sun.length)]);

	console.info("GenerateHoursSet(): " + set);

	return set;
}

/* Embolden()
 * Purpose:	Return a string formatted so that everything before the comma is set to be bold (via HTML) and everything after is left alone
 * Example		this, is a string
			would be changed to:
				<span style="font-weight:bold">this</span> is a string
*/
function Embolden(daysStr) {
	var parts = daysStr.split(',');
	var resultStr = '<span style="font-weight:bold">' + parts[0] + '</span>';
	if (parts.length > 1) {
		var newAry = parts.slice(1);
		console.info("Embolden(): ary parts: " + parts.length + " new array: " + newAry.length + ", joined: " + newAry.join(' '));
		resultStr += newAry.join(' ');
	}
	return resultStr;
}
