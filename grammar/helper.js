
///////////////////////////////////////////////////
//
//  Adds @numberOfTabs tabs before the string @str
//
///////////////////////////////////////////////////

var indentString = function(numberOfTabs, str)
{
	for (var i = 0; i < numberOfTabs; i++)
	{
		str = "\t" + str;
	}
	return str;
}

///////////////////////////////////////////////////
//
//  Basis asserion
//
///////////////////////////////////////////////////

var checkForErrors = function (myError)
{
	if (myError.code == undefined)
		return;
	
	if (myError.code < 0)
		throw "Error in " + myError.methodName + ": \n " + myError.errorMessage;
}

module.exports.indentString = indentString;
module.exports.checkForErrors = checkForErrors;