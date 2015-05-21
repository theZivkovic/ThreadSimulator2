
/*************************************************
 *
 *  Adds @numberOfTabs tabs before the string @str
 *
 *************************************************/

function indentString(numberOfTabs, str)
{
	for (var i = 0; i < numberOfTabs; i++)
	{
		str = "\t" + str;
	}
	return str;
}

module.exports.indentString = indentString;