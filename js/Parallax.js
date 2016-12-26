
/* jQuery Parallax Handler
  Purpose: When the document is ready, set up a onscroll() handler that is called every
           time the window is scrolled so that we can adjust that scroll to produce the
           parallax effect. 
  Assumes: The code assumes that your background is wide enough so that it can be set at
            x=0, i.e. the left side of your entire page. If this is not true, then you have
            to adjust the backgoroundPosition line below so that the first parameter
            (the x offset) is set up correctly so that you can see  your background
  Assumes:  You have setup a tag that sets the value of the varBkgndOffset global variable. 
            The tag should look something like this:
                    <meta name="varBkgndOffset" content="-400" />
            and you must have included the SetupProjGlobal.js script before this one so
            that the variable has been set before we get here.

  To make this work, setup the following
     1) The element for the effect must have some transparency. It can be a PNG with full or
        partial transparency, or it can be just a <div> with a height assigned.
     2) You must have the transparent color assigned to the background of the element. Otherwise we
        will never see through to the parallax layer, i.e. in CSS put the following line into 
        a class or use some mechanism to get it applied to the element in question
            background-color: transparent;  
     3) Make sure that a background is assigned to the element. This is usually an image, but it
           also can be a repeating pattern. The height of the background should be at least
           150% of the height of the transparent gap through which we are veiwing it.
            Note: the element does NOT have to be full screen, or even close to it, this effect
            will work for whatever height you need.
     4) Put the parallax class as an attribute on the element

  Author: Drew Topel
  Date: 12/9/16
  Copyright (c) 2016 Boeing
 */
$(function () {
	window.onscroll = function () {
		// Process each element that has the parallax class assigned
        $(".parallax").each(function (idx, elem)
        {
            // Default is to move the background 1/2 as fast as the user is scrolling.
            //  adjust this as needed
            var speed = 0.5;
            var calcPos = parseInt(window.parallaxYOffset) + (window.pageYOffset * speed);
            // backgroundPosition takes 2 parameters the xpos and ypos (separated by a space)
            elem.style.backgroundPosition = "0px " + calcPos + "px";
        });         // Ends .each()
    };              // Ends onscroll func definition
});                 // Ends .ready() 
