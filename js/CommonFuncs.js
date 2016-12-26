/* CommonFuncs()
    Purpose:        Contains functions that are useful for several projects
    Author:         Drew Topel
    Copyright (c) 2016-2017 Boeing
*/

// Set the value of a cookie for this session
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

// Return the value of the named cookie
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

/* SetOnlyTextOnButton()
    Purpose:    If you have an element that has text that you want to replace, but there are more child elements
                after your text within the tag you're changing, you can't just use @#xxx.text("newtext") on that
                element or it will obliterate the other child elements. Using this function will preserve the
                child nodes that are beyond the text in the element you want to change.
    Inputs:     the jQuery selector for the elemetn you want to alter. Note: Its best if this is an ID attribute
                    on that element (e.g. id="myelement") and so the selector will be of the form "#myElement".
                the new text to put into that element
    Assumes:    the text you want to change is the FIRST child node given the selector you pass in
    Outputs:    the first node in the elemnt selected using your selector will be changed so that it only contains
                    the text you passed in
*/
function SetOnlyTextOnButton(theId, newtext) {
	var cache = $(theId).children();
	$(theId).text(newtext).append(cache);
}

// Utility function to make a nice <li> list for pull downs out of a string array
function MakePulldown(elemAry) {
	var list = "";
	for (var j = 0; j < elemAry.length; j++) {
		list += '<li><a href="#">' + elemAry[j] + '</a></li>';
	}
	return list;
}

/* Read files using FileReader (newly supported in HTML5)
		docs here: https://developer.mozilla.org/en-US/docs/Web/API/FileReader
 * Assumes you have something like this in the HTML
	<input type="file" id="input">
 and then you can get the file the user indicated with this
	var selectedFile = $('#input')[0].files[0];
 Input:	a File object - this  is generally retrieved from a FileList object returned
			as a result of a user selecting files using the <input> element,
			, from a drag and drop operation's DataTransfer object, 
			or from the mozGetAsFile() API on an HTMLCanvasElement. 
			In Gecko, privileged code can create File objects representing any local file 
			without user interaction
	*/
function ReadFile(file) {
	var reader = new FileReader();
	reader.onload = function (aImg) {
		return aImg;
	};

	reader.onerror = function (err) {
		var domErr = reader.error;

		console.log("File Read error: " + domErr.name);
	}

	reader.readAsText(file);
}
/* Extra junk: 		return function (e) {
			return (e.target.result);	// This appears to be the file contents?
		};
	};
*/

/* If there is a read error, I can get that info from (FileReader object).error


/* NOPE - won't work
Text File Reading Support functions, the following reads files on the user's local system
 * checkFileAPI()	Use this first to determine if the system you're on allows you to read a file
 * readText(file)	Reads in the entire file and returns it in a string
 * readTextChunk( file, start, size)	Read a chunk out of a file and return it
 *
 * This function will read a file on the server and return it to JavaScript via Ajax

 * 
/**
     * Check for the various File API support.
     */
function checkFileAPI() {
	if (window.File && window.FileReader && window.FileList && window.Blob) {
		reader = new FileReader();
		return true;
	} else {
		alert('The File APIs are not fully supported by your browser. Fallback required.');
		return false;
	}
}

/**
 * read text input
 */
function ReadLocalTextFileBetter(filePath) {
	var output = ""; //placeholder for text output
	try {
		reader.onload = function (e) {
			output = e.target.result;
			return (output);
		};

		// Execute the file read - when it completes, it'll use the above function
		// to deliver the data
		reader.readAsText(filePath);
	}
	catch (exception) {
		console.log("Exception when trying to simply read file: " + filePath + ", going to use ActiveXObject now");
		if (ActiveXObject && filePath) { //fallback to IE 6-8 support via ActiveX
			try {
				reader = new ActiveXObject("Scripting.FileSystemObject");
				var file = reader.OpenTextFile(filePath, 1); //ActiveX File Object
				output = file.ReadAll(); //text contents of file
				file.Close(); //close file "input stream"
				return output;
			}
			catch (e) {
				if (e.number == -2146827859) {
					alert('Unable to access local files due to browser security settings. ' +
					 'To overcome this, go to Tools->Internet Options->Security->Custom Level. ' +
					 'Find the setting for "Initialize and script ActiveX controls not marked as safe" and change it to "Enable" or "Prompt"');
				}
			}
		}
	}

	return null;
}

/* readTextFile()
 * Purpose:	A smaller version of the file reader, that is not as robust as the above, but
			easier to read :-)
	Inputs:	the name of the file to read - and be sure that it starts with file://, e.g.
		file:///c:/path/path2/myfile.txt
	Returns:	the content of the file
*/
function ReadLocalTextFile(file)
{
	var rawFile = new XMLHttpRequest();
	rawFile.open("GET", file, false);
	rawFile.onreadystatechange = function ()
	{
		if(rawFile.readyState === 4)
		{
			if(rawFile.status === 200 || rawFile.status == 0)
			{
				var allText = rawFile.responseText;
				return(allText);
			}
		}
	}
	rawFile.send(null);
}

/* GetFileFromServer()
 * Purpose:	Ajax call that browser JS can use to get a file off the server. 
 * Inputs:	the path to the file on the server,
			a function pointer that takes one parameter, the contents of the file requested
 */
var reader = new XMLHttpRequest() || new ActiveXObject('MSXML2.XMLHTTP');
var fileLoadUserCb = null;

function GetFileFromServer(fileOnServer, callbackWithData) {
	fileLoadUserCb = callbackWithData;
	reader.open('get', 'test.txt', true);
	reader.onreadystatechange = callUserFunc;
	reader.send(null);
}

function callUserFunc() {
	if (reader.readyState == 4) {
		if (fileLoadUserCb != null) {
			fileLoadUserCb(reader.responseText);
		}
	}
}
