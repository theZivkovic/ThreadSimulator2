var AST = require("./grammar/ast");
var INSTR = require("./grammar/instructions");
var HELPER = require("./grammar/helper");


try
{
	var program  = new INSTR.TSProgram();

	HELPER.checkForErrors(program.getFrame("global"));
	HELPER.checkForErrors(program.addVariable("global", "x", {}));
	HELPER.checkForErrors(program.addVariable("global", "y", {}));

	HELPER.checkForErrors(program.addFuncDecl("global", "int", "f", ["int", "int"]));
	HELPER.checkForErrors(program.addFuncDecl("global", "int", "f1", ["int", "int"]));

	HELPER.checkForErrors(program.addFrame("main", "global"));

}
catch(e)
{
	console.log(e);
}


