var AST = require("./ast");

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

TSAbstractSyntaxTreeParser.prototype.generateCodeForCalculation = function(expression)
{
	
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
					
				}

				this.instructions.push(new Instruction("addVariable", [
																		"global",
																		currentStatement.type,
																		currentStatement.identifier	
																	  ]));
				break;
			}
		}
	}
}

/*=============================================*/
/*
/* 			EXPORTS
/*
/*==============================================*/

module.exports.TSAbstractSyntaxTreeParser = TSAbstractSyntaxTreeParser;