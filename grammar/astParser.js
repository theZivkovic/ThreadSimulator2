var AST = require("./ast");
var format = require('string-format');

function Instruction(name, args)
{
	this.name = name;
	this.args = args;
}

/*=============================================*/
/*
/* 			AST PARSER
/*			generates instructions using
/*			abstract syntax tree
/*
/*==============================================*/

function TSAbstractSyntaxTreeParser(tree)
{
	this.tree = tree;
	this.instructions = [];
}

TSAbstractSyntaxTreeParser.prototype.generateCodeForCalculation = function(expression, n)
{
	if (expression.getType() == "TSInteger" || expression.getType() == "TSDouble" || expression.getType() == "TSBool")
	{
		this.instructions.push(new Instruction("setTempValue", ["global", "$"+n , expression.value]));
		return n;
	}
	if (expression.getType() == "TSIdentifier")
	{
		this.instructions.push(new Instruction("setTempValue", ["global", "$"+n , expression.name]));
		return n;
	}
	else if (expression.getType() == "TSBinaryOperation")
	{
		var first = this.generateCodeForCalculation(expression.firstOperand, 2*n + 1);
		var second = this.generateCodeForCalculation(expression.secondOperand, 2*n + 2);

		this.instructions.push(new Instruction("setTempValue", ["global", "$" + n, format("${0} {1} ${2}", first, expression.operation, second)]));
		return n;
	}
}
TSAbstractSyntaxTreeParser.prototype.parse = function()
{
	// definitely add instruction for making global frame

	this.instructions.push(new Instruction("addFrame", ["global", null]));

	// iterate over great block

	for (var i = 0 ; i < this.tree.statements.length; i++)
	{
		var currentStatement = this.tree.statements[i];

		switch(currentStatement.getType())
		{
			case "TSFunctionDeclaration":
			{
				var returnType = currentStatement.type;  // get return type
				var funcName = currentStatement.identifier; // get function name

				var arguments = [];	 // get arguments
				for (var j = 0;  j < currentStatement.arguments.length; j++)
				{
					var currentArg = currentStatement.arguments[j];

					arguments.push({
										type: currentArg.type,
										name: currentArg.identifier
								  });	
				}

				// make instruction
				this.instructions.push(new Instruction("addFuncDecl", [  "global",
																		 returnType,
																		 funcName,
																		 arguments
																	  ]));
				break;
			}
			case "TSVariableDeclaration":
			{
				// first, add commands to calculate expression

				var expression = currentStatement.expression;

				if (expression != null)
				{
					this.generateCodeForCalculation(expression, 0);

					this.instructions.push(new Instruction("addVariable", [
																		"global",
																		currentStatement.type,
																		currentStatement.identifier,
																		 "$0"	
																	  ]));
				}
				else
				{
					this.instructions.push (new Instruction("addVariable", [
																			"global",
																			currentStatement.type,
																			currentStatement.identifier,
																			null
																			]));
				}
				break;
			}
		}
	}

	// find main method and continue filling instructions from there

	var result = this.tree.statements.filter(function(element)
	{
		return element.getType() == "TSFunctionDeclaration" && element.identifier == "main";
	});

	if (result.length == 0)
	{
		return {
					code : -1,
					methodName : "TSAbstractSyntaxTreeParser.parse",
					errorMessage: format("Main method doesn't exist") 
			   }
	}
	
	var mainMethod = result[0];

	// add main frame to the program

	this.instructions.push(new Instruction("addFrame", ["main", "global"]));

	// add main arguments to its scope

	for (var i = 0 ; i < mainMethod.arguments.length; i++)
	{
		var currentVariable = mainMethod.arguments[i];

		// main arguments can't be declared with a value

		if (currentVariable.expression != undefined)
		{
			return {
					code : -1,
					methodName : "TSAbstractSyntaxTreeParser.parse",
					errorMessage: format("Main method bad arguments") 
			   } 
		}
		this.instructions.push(new Instruction("addVariable", [
																'main',
																currentVariable.type,
																currentVariable.identifier,
																 null
		 													 ]));
	}

	

	return { code : 0 };
}

/*=============================================*/
/*
/* 			EXPORTS
/*
/*==============================================*/

module.exports.TSAbstractSyntaxTreeParser = TSAbstractSyntaxTreeParser;