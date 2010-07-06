/*	splash.js
 *	
 *	Core javascript file for a compiled "Splash" app. Note: This is a template, replacement
 *	occurs at compile time. Certain functions defined below are only referenced on page load
 *	to knock together a working frame for the app to run in.
 *
 *	@Author: Ryan McGrath (ryan@venodesigns.net)
 *	@Requires: jQuery 1.3.2 or greater (preferably 1.4.2, I make no guarantee for anything else, but it should work)
 */

if(typeof splash === "undefined")
	var splash = {};

var game_on = function(json) {
	if(/App Code/.test(json)) return;

	debug(json);
};

if(typeof debug === "undefined")
	var debug = function(msg) {
		/* TODO: Support debugging in other annoying consoles (Opera, I'm looking at you) */
		if(typeof console !== "undefined" && typeof console.log === "function") console.log(msg);
	};

$(document).ready(function() {
	splash.wrapper = $("#splash_app_wrapper");
	
	/*	Rough guesstimation for now on desired height, finagle later. Wait until the frame is our desired height before
	 *	"running" our program.
	 */
	splash.wrapper.animate({"height": $(window).height() - 50}, 800, function() { 
		main();
	}); 
});
