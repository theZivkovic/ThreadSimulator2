var format = require('string-format');
var HELPER = require('./helper');

function Instruction(name, args)
{
	this.name = name;
	this.args = args;
}

/*=============================================*/
/*
/* 			TSNODE
/*
/*==============================================*/
function TSNode()
{

}

/*=============================================*/
/*
/* 			TSExpression
/*
/*==============================================*/
function TSExpression()
{

}
TSExpression.prototype = Object.create(TSNode.prototype);
TSExpression.prototype.getType = function()
{
	return "TSExpression";
}
TSExpression.prototype.toString = function()
{
	return "TSExpression";
}
TSExpression.prototype.printDetails = function(level)
{
	return "";
}
TSExpression.prototype.generateCode = function(instructionList)
{

}

/*=============================================*/
/*
/* 			TSStatement
/*
/*==============================================*/
function TSStatement()
{

}
TSStatement.prototype = Object.create(TSNode.prototype);
TSStatement.prototype.getType = function()
{
	return "TSStatement";
}
TSStatement.prototype.toString = function()
{
	return "TSStatement";
}
TSStatement.prototype.printDetails = function(level)
{
	return "";
}
TSStatement.prototype.generateCode = function(instructionList)
{
	
}
/*=============================================*/
/*
/* 			TSInteger
/*
/*==============================================*/
function TSInteger(value)
{
	this.value = value;
}
TSInteger.prototype = Object.create(TSExpression.prototype);
TSInteger.prototype.getType = function()
{
	return "TSInteger";
}
TSInteger.prototype.toString = function()
{
	return "TSInteger";
}
TSInteger.prototype.printDetails = function(level)
{
	console.log(HELPER.indentString(level, format("[TSInteger] {0} [/TSInteger]", this.value)));
}
TSInteger.prototype.generateSetTempValueCode = function(index , instructionList)
{
	instructionList.push(new Instruction("setTempValue", ["$" + index , this.value]));
}
TSInteger.prototype.generateCode = function(instructionList)
{
	
}
/*=============================================*/
/*
/* 			TSDouble
/*
/*==============================================*/
function TSDouble(value)
{
	this.value = value;
}
TSDouble.prototype = Object.create(TSExpression.prototype);
TSDouble.prototype.getType = function()
{
	return "TSDouble";
}
TSDouble.prototype.toString = function()
{
	return "TSDouble";
}
TSDouble.prototype.printDetails = function(level)
{
	console.log(HELPER.indentString(level, format("[TSDouble] {0} [/TSDouble]", this.value)));
}
TSDouble.prototype.generateSetTempValueCode = function(index , instructionList)
{
	instructionList.push(new Instruction("setTempValue", ["$" + index , this.value]));
}
TSDouble.prototype.generateCode = function(instructionList)
{
	
}

/*=============================================*/
/*
/* 			TSBool
/*
/*==============================================*/
function TSBool(value)
{
	this.value = value;
}
TSBool.prototype = Object.create(TSExpression.prototype);
TSBool.prototype.getType = function()
{
	return "TSBool";
}
TSBool.prototype.toString = function()
{
	return "TSBool";
}
TSBool.prototype.printDetails = function(level)
{
	console.log(HELPER.indentString(level, format("[TSBool] {0} [/TSBool]", this.value)));
}
TSBool.prototype.generateSetTempValueCode = function(index , instructionList)
{
	instructionList.push(new Instruction("setTempValue", ["$" + index , this.value]));
}
TSBool.prototype.generateCode = function(instructionList)
{
	
}
/*=============================================*/
/*
/* 			TSString
/*
/*==============================================*/
function TSString(value)
{
	this.value = value;
}
TSString.prototype = Object.create(TSExpression.prototype);
TSString.prototype.getType = function()
{
	return "TSString";
}
TSString.prototype.toString = function()
{
	return "TSString";
}
TSString.prototype.printDetails = function(level)
{
	console.log(HELPER.indentString(level, format("[TSString] {0} [/TSString]", this.value)));
}
TSString.prototype.generateSetTempValueCode = function(index , instructionList)
{
	instructionList.push(new Instruction("setTempValue", ["$" + index , this.value]));
}
TSString.prototype.generateCode = function(instructionList)
{
	
}
/*=============================================*/
/*
/* 			TSObject
/*
/*==============================================*/
function TSObject(type)
{
	this.type = type;
}
TSObject.prototype = Object.create(TSExpression.prototype);
TSObject.prototype.getType = function()
{
	return "TSObject";
}
TSObject.prototype.toString = function()
{
	return "TSObject";
}
TSObject.prototype.printDetails = function(level)
{
	console.log(HELPER.indentString(level, format("[TSObject] {0} [/TSObject]", this.type)));
}
TSObject.prototype.generateCode = function(instructionList)
{
	
}
/*==============================================================*/
/*
/* 			TSIdentifier
/*
/*===============================================================*/
function TSIdentifier(name)
{
	this.name = name;
}
TSIdentifier.prototype = Object.create(TSExpression.prototype);
TSIdentifier.prototype.getType = function()
{
	return "TSIdentifier";
}
TSIdentifier.prototype.toString = function()
{
	return "TSIdentifier";
}
TSIdentifier.prototype.printDetails = function(level)
{
	console.log(HELPER.indentString(level, format("[TSIdentifier] {0} [/TSIdentifier]", this.name)));
}
TSIdentifier.prototype.generateSetTempValueCode = function(index , instructionList)
{
	instructionList.push(new Instruction("setTempValue", ["$" + index , this.value]));
}
TSIdentifier.prototype.generateCode = function(instructionList)
{
	
}
/*==============================================================*/
/*
/* 			TSArrayIdentifier
/*
/*===============================================================*/
function TSArrayIdentifier(name, indexExpr)
{
	this.name = name;
	this.indexExpr = indexExpr;
}
TSArrayIdentifier.prototype = Object.create(TSExpression.prototype);
TSArrayIdentifier.prototype.getType = function()
{
	return "TSArrayIdentifier";
}
TSArrayIdentifier.prototype.toString = function()
{
	return "TSArrayIdentifier";
}
TSArrayIdentifier.prototype.printDetails = function(level)
{
	console.log(HELPER.indentString(level, format("[TSIdentifier] {0}[...]]", this.name)));
		this.indexExpr.printDetails(level + 1);
	console.log(HELPER.indentString(level, "[/TSIdentifier]"));
}
TSArrayIdentifier.prototype.generateSetTempValueCode = function(index , instructionList)
{
	this.indexExpr.generateCode(instructionList);

	instructionList.push(new Instruction("setTempValue", ["$" + index , format("{0}[{1}]",this.name, "$0")]));
}
TSArrayIdentifier.prototype.generateCode = function(instructionList)
{
	
}
/*==============================================================*/
/*
/* 			TSBinaryOperation
/*
/*===============================================================*/
function TSBinaryOperation(operation, firstOperand, secondOperand)
{
	this.operation = operation;
	this.firstOperand = firstOperand;
	this.secondOperand = secondOperand;
}
TSBinaryOperation.prototype = Object.create(TSExpression.prototype);
TSBinaryOperation.prototype.getType = function()
{
	return "TSBinaryOperation";
}
TSBinaryOperation.prototype.toString = function()
{
	return "TSBinaryOperation";
}
TSBinaryOperation.prototype.printDetails = function(level)
{
	console.log(HELPER.indentString(level, format("[TSBinaryOperation {0}]", this.operation)));
		this.firstOperand.printDetails(level + 1);
		this.secondOperand.printDetails(level + 1);
	console.log(HELPER.indentString(level, "[/TSBinaryOperation]"));
}
TSBinaryOperation.prototype.generateCode = function(instructionList)
{
	
}
/*==============================================================*/
/*
/* 			TSBlock
/*
/*===============================================================*/
function TSBlock(statements)
{
	this.statements = statements;
}
TSBlock.prototype = Object.create(TSExpression.prototype);
TSBlock.prototype.getType = function()
{
	return "TSBlock";
}
TSBlock.prototype.toString = function()
{
	return "TSBlock";
}
TSBlock.prototype.printDetails = function(level)
{
	console.log(HELPER.indentString(level, "[TSBlock]"));
	for (var i = 0; i < this.statements.length; i++)
	{
		this.statements[i].printDetails(level+1);
	}
	console.log(HELPER.indentString(level, "[/TSBlock]"));
}
TSBlock.prototype.generateCode = function(instructionList)
{
	for (var i = 0 ; i < this.statements.length; i++)
	{
		this.statements[i].generateCode(instructionList);
	}
}
/*==============================================================*/
/*
/* 			TSAssignment
/*
/*===============================================================*/
function TSAssignment(name, expression)
{
	this.name = name;
	this.expression = expression;
}

TSAssignment.prototype = Object.create(TSExpression.prototype);
TSAssignment.prototype.getType = function()
{
	return "TSAssignment";
}
TSAssignment.prototype.toString = function()
{
	return "TSAssignment";
}
TSAssignment.prototype.printDetails = function(level)
{
	console.log(HELPER.indentString(level, format("[TSAssignment] {0} -> ", this.name)));
		this.expression.printDetails(level + 1);
	console.log(HELPER.indentString(level, "[/TSAssignment]")); 
}
TSAssignment.prototype.generateCode = function(instructionList)
{
	instructionList.push(new Instruction("assignValue", [this.name, "$0"]));
}

/*==============================================================*/
/*
/* 			TSExpression
/*
/*===============================================================*/

function TSExpression(expression)
{
	this.expression = expression;
}

TSExpression.prototype = Object.create(TSExpression.prototype);
TSExpression.prototype.getType = function()
{
	return "TSExpression";
}
TSExpression.prototype.toString = function()
{
	return "TSExpression";
}
TSExpression.prototype.printDetails = function(level)
{
	console.log(HELPER.indentString(level, "[TSExpression]"));
		this.expression.printDetails(level + 1);
	console.log(HELPER.indentString(level, "[/TSExpression]")); 
}
TSExpression.prototype.generateCodeForCalculation = function(expression, n, instructionList) // helper function
{
	if (expression.getType() == "TSBinaryOperation")
	{
		var first = this.generateCodeForCalculation(expression.firstOperand, 2*n + 1, instructionList);
		var second = this.generateCodeForCalculation(expression.secondOperand, 2*n + 2, instructionList);

		instructionList.push(new Instruction("setTempValue", ["$" + n, format("${0} {1} ${2}", first, expression.operation, second)]));
		return n;
	}
	else 
	{
		expression.generateSetTempValueCode(n, instructionList);
		return n;
	}
}
TSExpression.prototype.generateCode = function(instructionList)
{
	this.generateCodeForCalculation(this.expression, 0, instructionList);
}
/*==============================================================*/
/*
/* 			TSFunctionCall
/*
/*===============================================================*/
function TSFunctionCall(identifier, argumentsExpressions)
{
	this.identifier = identifier;
	this.argumentsExpressions = argumentsExpressions;
}

TSFunctionCall.prototype = Object.create(TSExpression.prototype);
TSFunctionCall.prototype.getType = function()
{
	return "TSFunctionCall";
}
TSFunctionCall.prototype.toString = function()
{
	return "TSFunctionCall";
}
TSFunctionCall.prototype.printDetails = function(level)
{
	console.log(HELPER.indentString(level, format("[TSFunctionCall] {0} ", this.name)));
		for (var i = 0 ; i < this.argumentsExpressions.length; i++)
		{
			this.argumentsExpressions[i].printDetails(level + 1);
		}
	console.log(HELPER.indentString(level, "[/TSFunctionCall]")); 
}
TSFunctionCall.prototype.generateSetTempValueCode = function(index , instructionList)
{
	instructionList.push(new Instruction("prepareArgList", []));

	for (var i = 0 ; i < this.argumentsExpressions.length; i++)
	{
		this.argumentsExpressions[i].generateCode(instructionList);

		instructionList.push(new Instruction("setArgListValue", [
																	 i,
																	 "$0"
																 ]));

	}
	instructionList.push(new Instruction("setTempValue", ["$" + index , format("call {0}", this.identifier)]));
	instructionList.push(new Instruction("clearArgList", []));
}
TSFunctionCall.prototype.generateCode = function(instructionList)
{
	
}
/*==============================================================*/
/*
/* 			TSFunctionDeclaration
/*
/*===============================================================*/

function TSFunctionDeclaration(type, identifier, arguments, block)
{
	this.type = type;
	this.identifier = identifier;
	this.arguments = arguments;
	this.block = block;
}
TSFunctionDeclaration.prototype = Object.create(TSStatement.prototype);
TSFunctionDeclaration.prototype.getType = function()
{
	return "TSFunctionDeclaration";
}
TSFunctionDeclaration.prototype.toString = function()
{	
	return "TSFunctionDeclaration";
}
TSFunctionDeclaration.prototype.printDetails = function(level)
{
	console.log(HELPER.indentString(level, format("[TSFunctionDeclaration] {0} {1} ", this.type, this.identifier)));
		console.log(HELPER.indentString(level + 1, "[arguments]"));
			for (var i = 0; i < this.arguments.length; i++)
			{
				this.arguments[i].printDetails(level + 2);
			}
		console.log(HELPER.indentString(level + 1, "[/arguments]"));
		
		this.block.printDetails(level + 1);		
	console.log(HELPER.indentString(level, "[/TSFunctionDeclaration]")); 
}
TSFunctionDeclaration.prototype.generateCode = function(instructionList)
{
	var arguments = [];	 // fill arguments

	for (var j = 0;  j < this.arguments.length; j++)
	{
		var currentArg = this.arguments[j];

		arguments.push({
							type: currentArg.type,
							name: currentArg.identifier
					  });	
	}

	// make instruction
	instructionList.push(new Instruction("addFuncDecl", [ 
															this.type,
															this.identifier,
															arguments

														  ]));
}
/*==============================================================*/
/*
/* 			TSVariableDeclaration
/*
/*===============================================================*/

function TSVariableDeclaration(type, identifier, expression)
{
	this.type = type;
	this.identifier = identifier;
	this.expression = expression;
}
TSVariableDeclaration.prototype = Object.create(TSStatement.prototype);
TSVariableDeclaration.prototype.getType = function()
{
	return "TSVariableDeclaration";
}
TSVariableDeclaration.prototype.toString = function()
{	
	return "TSVariableDeclaration";
}
TSVariableDeclaration.prototype.printDetails = function(level)
{
	console.log(HELPER.indentString(level, format("[TSVariableDeclaration] {0} {1} -> ", this.type, this.identifier)));
		if (this.expression != undefined)
		{
			this.expression.printDetails(level + 1);
		}
	console.log(HELPER.indentString(level, "[/TSVariableDeclaration]"));	
}

TSVariableDeclaration.prototype.generateCode = function(instructionList)
{
	this.expression.generateCode(instructionList);

	instructionList.push(new Instruction("addVariable", [
												this.type,
												this.identifier,
												"$0"
										]));
}
/*==============================================================*/
/*
/* 			TSArrayDeclaration
/*
/*===============================================================*/

function TSArrayVariableDeclaration(type, identifier, sizeExpr)
{
	this.type = type;
	this.identifier = identifier;
	this.sizeExpr = sizeExpr;
}
TSArrayVariableDeclaration.prototype = Object.create(TSStatement.prototype);
TSArrayVariableDeclaration.prototype.getType = function()
{
	return "TSArrayVariableDeclaration";
}
TSArrayVariableDeclaration.prototype.toString = function()
{	
	return "TSArrayVariableDeclaration";
}
TSArrayVariableDeclaration.prototype.printDetails = function(level)
{
	console.log(HELPER.indentString(level, format("[TSArrayVariableDeclaration] {0} {1} [{2}] [/TSArrayVariableDeclaration]", 
		this.type, this.identifier, this.sizeExpr)));	
}
TSArrayVariableDeclaration.prototype.generateCode = function(instructionList)
{
	this.sizeExpr.generateCode(instructionList);

	instructionList.push(new Instruction("addArrayVariable", [
																this.type,
																this.identifier,
																"$0"	
															 ]));
}

/*==============================================================*/
/*
/* 			TSExpressionStatement
/*
/*===============================================================*/

function TSExpressionStatement(expression)
{
	this.expression = expression;
}
TSExpressionStatement.prototype = Object.create(TSStatement.prototype);
TSExpressionStatement.prototype.getType = function()
{
	return "TSExpressionStatement";
}
TSExpressionStatement.prototype.toString = function()
{	
	return "TSExpressionStatement";
}
TSExpressionStatement.prototype.printDetails = function(level)
{
	console.log(HELPER.indentString(level, "[TSExpressionStatement]"));
		this.expression.printDetails(level + 1);
	console.log(HELPER.indentString(level, "[/TSExpressionStatement]"));
}
TSExpressionStatement.prototype.generateCode = function(instructionList)
{

}

/*==============================================================*/
/*
/* 			TSReturnStatement
/*
/*===============================================================*/

function TSReturnStatement(expression)
{
	this.expression = expression;
}
TSReturnStatement.prototype = Object.create(TSStatement.prototype);
TSReturnStatement.prototype.getType = function()
{
	return "TSReturnStatement";
}
TSReturnStatement.prototype.toString = function()
{	
	return format("[TSReturnStatement: {0}]", this.expression);
}
TSReturnStatement.prototype.printDetails = function(level)
{
	console.log(HELPER.indentString(level, "[TSReturnStatement]"));
		this.expression.printDetails(level + 1);
	console.log(HELPER.indentString(level, "[/TSReturnStatement]"));
}
TSReturnStatement.prototype.generateCode = function(instructionList)
{
	this.expression.generateCode(instructionList);

	instructionList.push(new Instruction("return", [
														"$0"
												   ]));
}

/*==============================================================*/
/*
/* 			TSMethodCall
/*
/*===============================================================*/
function TSMethodCall(identifier, methodName, arguments)
{
	this.identifier = identifier;
	this.arguments = arguments;
	this.methodName = methodName;
}

TSMethodCall.prototype = Object.create(TSStatement.prototype);
TSMethodCall.prototype.getType = function()
{
	return "TSMethodCall";
}
TSMethodCall.prototype.toString = function()
{
	return "TSMethodCall";
}
TSMethodCall.prototype.printDetails = function(level)
{
	console.log(HELPER.indentString(level, format("[TSMethodCall {0}]", this.methodName)));

		this.identifier.printDetails(level + 1);
	
		console.log(HELPER.indentString(level + 1, "[arguments]"));
			
			if (this.arguments != null)
			{
				for (var i = 0; i < this.arguments.length; i++)
				{
					this.arguments[i].printDetails(level + 2);
				}
			}
		console.log(HELPER.indentString(level + 1, "[/arguments]"));
		
	console.log(HELPER.indentString(level, "[/TSMethodCall]"));
}
TSMethodCall.prototype.generateCode = function(instructionList)
{
	// TO_DO	
}

/*==============================================================*/
/*
/* 			TSMakeThread
/*
/*===============================================================*/

function TSMakeThread(identifier, func)
{
	this.identifier = identifier;
	this.func = func;
}
TSMakeThread.prototype = Object.create(TSStatement.prototype);
TSMakeThread.prototype.getType = function()
{
	return "TSMakeThread";
}
TSMakeThread.prototype.toString = function()
{	
	return "TSMakeThread";
}
TSMakeThread.prototype.printDetails = function(level)
{
	console.log(HELPER.indentString(level, format("[TSMakeThread] {0} {1} [/TSMakeThread]"), this.identifier, this.func));
}
TSMakeThread.prototype.generateCode = function(instructionList)
{
	// TO_DO
}
/*==============================================================*/
/*
/* 			TSForLoop
/*
/*===============================================================*/

function TSForLoop(initStatements, endExpression, stepStatements, body)
{
	this.initStatements = initStatements;
	this.endExpression = endExpression;
	this.stepStatements = stepStatements
	this.body = body;
}
TSForLoop.prototype = Object.create(TSStatement.prototype);
TSForLoop.prototype.getType = function()
{
	return "TSForLoop";
}
TSForLoop.prototype.toString = function()
{	
	return "TSForLoop";
}
TSForLoop.prototype.printDetails = function(level)
{
	console.log(HELPER.indentString(level, "[TSForLoop]"));
		console.log(HELPER.indentString(level + 1, "[init]"));
			for (var i = 0 ; i < this.initStatements.length; i++)
			{
				this.initStatements[i].printDetails(level + 2);
			}
		console.log(HELPER.indentString(level + 1, "[/init]"));	
		console.log(HELPER.indentString(level + 1, "[end]"));
			this.endExpression.printDetails(level + 2);
		console.log(HELPER.indentString(level + 1, "[/end]"));
		console.log(HELPER.indentString(level + 1, "[step]"));
			for (var i = 0 ; i < this.stepStatements.length; i++)
			{
				this.stepStatements[i].printDetails(level + 2);
			}
		console.log(HELPER.indentString(level + 1, "[/step]"));
		this.body.printDetails(level + 1);
	console.log(HELPER.indentString(level, "[/TSForLoop]"));		
}
TSForLoop.prototype.generateCode = function(instructionList)
{
	// TO_DO
}

/*==============================================================*/
/*
/* 			EXPORTS
/*
/*===============================================================*/

module.exports.TSInteger = TSInteger;
module.exports.TSDouble = TSDouble;
module.exports.TSString = TSString;
module.exports.TSObject = TSObject;
module.exports.TSIdentifier = TSIdentifier;
module.exports.TSBinaryOperation = TSBinaryOperation;
module.exports.TSBlock = TSBlock;
module.exports.TSAssignment = TSAssignment;
module.exports.TSFunctionCall = TSFunctionCall;
module.exports.TSExpression = TSExpression;

module.exports.TSMethodCall = TSMethodCall;
module.exports.TSFunctionDeclaration = TSFunctionDeclaration;
module.exports.TSVariableDeclaration = TSVariableDeclaration;
module.exports.TSExpressionStatement = TSExpressionStatement;
module.exports.TSReturnStatement = TSReturnStatement;
module.exports.TSMakeThread = TSMakeThread;
module.exports.TSForLoop = TSForLoop;
module.exports.TSArrayVariableDeclaration = TSArrayVariableDeclaration;
module.exports.TSArrayIdentifier = TSArrayIdentifier;