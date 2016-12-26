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
