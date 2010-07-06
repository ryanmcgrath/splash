/*	Simple linereader functionality for Node.js
 *
 *	Allows you to iterate through a file line by line. "Nice" functionality.
 *
 *	@Author: Ryan McGrath (ryan@venodesigns.net)
 *	@Requires: Nothing
 */

var fs = require("fs");

exports.reader = function(filename) {
        var bufferSize = 8192, /* Generic for now */
            currentPosition = 0,
            buffer = "",
            fd = fs.openSync(filename, "r");

        function getBuffer(position) {
            var res = fs.readSync(fd, bufferSize, position, "ascii");

            buffer += res[0];
            if(res[1] === 0) return -1;

            return position + res[1];
        }

        currentPosition = getBuffer(0);

        this.hasNextLine = function() {
            while(buffer.indexOf("\n") === -1) {
                currentPosition = getBuffer(currentPosition);        
                if(currentPosition === -1) return false;
            }

            if(buffer.indexOf("\n") > -1) return true;
            return false;
        };

        this.getNextLine = function() {
            var lineEnd = buffer.indexOf("\n"),
                result = buffer.substring(0, lineEnd);

            buffer = buffer.substring(result.length + 1, buffer.length);
            return result;
        };

        return this;
    };
