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
				}

				this.instructions.push(new Instruction("addVariable", [
																		"global",
																		currentStatement.type,
																		currentStatement.identifier,
																		 "$0"	
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