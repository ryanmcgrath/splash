/*	splash.js
 *	
 *	Core javascript file for a compiled "Splash" app. Note: This is a template, replacement
 *	occurs at compile time. Certain functions defined below are only referenced on page load
 *	to knock together a working frame for the app to run in.
 *
 *	@Author: Ryan McGrath (ryan@venodesigns.net)
 *	@Requires: jQuery 1.3.2 or greater (preferably 1.4.2, I make no guarantee for anything else, but it should work)
 */

var splash = {
	/*	Stored reference to a jQuery'd window object, so we don't do repeated useless lookups. */
	win: null,

	/*	Stage for programs to run. Gets set at document ready, below. */
	stage: null,

	/*	Handles resizing of the overall window and stage.
	 *
	 *	@param win - jQuery'd window object.
	 */
	resizeStage: function(callbackfn) {
		if(typeof callbackfn !== "undefined")
			splash.stage.animate({"height": splash.win.height() - 50}, 800, callbackfn);
		else
			splash.stage.animate({"height": splash.win.height() - 50}, 800);
	},

	/*	Self explanatory - masked call to console.log, "handles" browsers that don't support it. */
	debug: function(msg) { if(typeof console !== "undefined" && typeof console.log === "function") console.log(msg); },

	/*	splash.game_on gets called by the compiled/written out .splash file. Every
	 *	app gets a "main" function injected (see: parser.js - exports.writeApp), which
	 *	is merely reference to calling splash.game_on.
	 *
	 *	This, of course, has to walk the JSON chain and actually construct the events for
	 *	the stage.
	 */
	game_on: function(json) {
		if(/App Code/.test(json)) return;
		
		// Parse JSON object here - need a lookup table for name/noun/verb/etc?
		
		splash.debug(json);
	}
};

$(document).ready(function() {
	splash.stage = $("#splash_app_wrapper");
	splash.win = $(window);

	splash.win.resize(splash.resizeStage);

	/*	Rough guesstimation for now on desired height, finagle later. Wait until the frame is our desired height before
	 *	"running" our program (in this case, "main" is our program to run, injected by the compiler).
	 */
	splash.resizeStage(main);
});
