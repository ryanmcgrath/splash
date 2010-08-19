/*	Parser for Splash, an attempt at a programming language for kids.
 *
 *	@Author: Ryan McGrath
 *	@Requires: 
 *		Node.js (Run latest for safety ;P)
 *		line_reader.js (custom, supplied in libraries)
 *		wrench.js (custom, supplied in libraries)
 *
 *	@Note: This is just a compiler/parser. Core Splash takes place inside the browser - no need
 *		to muck around in DOM logic here when it's readily available over there. ;P
 */

/*	If no file was passed in, instruct them to do so. */
if(!process.ARGV[2]) sys.puts('\nPlease provide a filename as an argument!\n');

var sys = require('sys'),
	fs = require('fs'),
	wrench = require('./libraries/wrench'),
	line = require('./libraries/line_reader'),
	definitions = require('./libraries/definitions'), /* Mapping of splash ~> JS commands */
	expr = new line.reader(process.ARGV[2]),
	creatingBlock = false,
	stripper = /explain|noun|verb/,
	whitespace = /^\s+|\s+$|/g,
	block = {},
	finalRep = [];

var determineAttrName = function(str) { return str.replace(whitespace, '').split(':')[0]; };
var determineVal = function(str) { return str.replace(whitespace, '').split(':')[1]; };

/*	Aptly, returns a variable type from parsing a string.
 *
 *	e.g, given "verb b:", this will return "verb"
 */
var getType = function(str) {
	if(/verb/.test(str)) return "verb";

	/* Nouns are essentially a generic fallback type. */
	return "noun";
};

exports.writeApp = function(text) {
	/* This gets passed to Splash and evaluated in the browser, since we want the DOM. */
	var finalJSON = "[" + finalRep.join(',') + "]",
		appName = process.ARGV[2].replace(".splash", ""),
		currPath = process.cwd();

	/*	Very messy for the time being, as I'm just doing a proof of concept. Requires you to be
	 *	one directory up from this file for execution.
	 */
	wrench.copyDirSyncRecursive(currPath + '/lib/app_base', currPath + '/' + appName);
	fs.writeFileSync(currPath + "/" + appName + "/scripts/compiled.js", "function main() { splash.game_on(" + finalJSON + "); };", encoding="utf8");
};

/*	In Splash, explanations are essentially variable declarations,
 *	but formulated like simple vocabulary definitions for kids.
 *
 *	Note: This could also prove useful in teaching people English.
 *
 *	e.g: 
 *	verb run:
 *		who: daniel
 *		action: move
 *		direction: left
 *	end
 *
 *	@Note: This parse is currently very "top down", and not as forgiving as it should be.
 */
while(expr.hasNextLine()) {
	var currLine = expr.getNextLine(),
		isBeginning = stripper.test(currLine); /* Tests to see if we make a declaration. */

	if(creatingBlock || isBeginning) {
		creatingBlock = /end/.test(currLine) ? false : true;

		/*	type = verb/noun/etc
		 *	name = name of the variable (e.g, verb run, name = run)
		 */
		if(isBeginning) block["type"] = getType(currLine);
		if(isBeginning) block["name"] = currLine.replace(stripper, '').replace(whitespace, '');
		else block[determineAttrName(currLine)] = determineVal(currLine);
		
		/*	If this is false, we're done building up a new block/JSON structure, so we can
		 *	push it onto the stack for the browser to get down the road. We also reset the 
		 *	block here, so subsequent operations have a blank slate to work with.
		 */
		if(!creatingBlock) {
			finalRep.push(JSON.stringify(block));
			block = {};
		}
	}
}

try {
	this.writeApp();
} catch(error) {
	sys.puts(error);
}
