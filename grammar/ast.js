var format = require('string-format');

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
	return format("[TSInteger: {0}]\n", this.value);
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
	return format("[TSDouble: {0}]\n", this.value);
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
	return format("[TSBool: {0}]\n", this.value);
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
	return format("[TSString: {0}]\n", this.value);
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
	return format("[TSObject: {0}]\n", this.type);
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
	return format("[TSIdentifier: {0}]\n", this.name);
}

/*==============================================================*/
/*
/* 			TSArrayIdentifier
/*
/*===============================================================*/
function TSArrayIdentifier(name, index)
{
	this.name = name;
	this.index = index;
}
TSArrayIdentifier.prototype = Object.create(TSExpression.prototype);
TSArrayIdentifier.prototype.getType = function()
{
	return "TSArrayIdentifier";
}
TSArrayIdentifier.prototype.toString = function()
{
	return format("[TSArrayIdentifier: {0}[{1}]]\n", this.name, this.index);
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
	return format("[TSBinaryOperation:\n{0} {1} {2}]\n", this.firstOperand, this.operation, this.secondOperand);
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
	var str = "[TSBlock:\n";

	for (var i = 0 ; i < this.statements.length; i++)
	{
		str += this.statements[i].toString() + "\n";
	}

	str += "]\n";
	return str;
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
	return format("[TSAssignment:\n{0} = {1}]\n", this.name, this.expression);
}

/*==============================================================*/
/*
/* 			TSFunctionCall
/*
/*===============================================================*/
function TSFunctionCall(identifier, arguments)
{
	this.identifier = identifier;
	this.arguments = arguments;
}

TSFunctionCall.prototype = Object.create(TSExpression.prototype);
TSFunctionCall.prototype.getType = function()
{
	return "TSFunctionCall";
}
TSFunctionCall.prototype.toString = function()
{
	var str = "[TSFunctionCall \n";

	for (var i = 0 ; i < this.arguments.length; i++)
	{
		str += this.arguments[i].toString() + "\n";
	}

	str += "]";
	return str;
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
	var str;

	str = format("[TSFunctionDeclaration : {0} {1} ({2})", this.type, this.identifier, this.arguments) + "{\n";
	str+= this.block.toString();
	str+= "}\n";

	return str;
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
	return format("[TSVariableDeclaration : {0} {1}  = {2}]", this.type, this.identifier, this.expression || "none");
}

/*==============================================================*/
/*
/* 			TSArrayDeclaration
/*
/*===============================================================*/

function TSArrayVariableDeclaration(type, identifier, size)
{
	this.type = type;
	this.identifier = identifier;
	this.size = size;
}
TSArrayVariableDeclaration.prototype = Object.create(TSStatement.prototype);
TSArrayVariableDeclaration.prototype.getType = function()
{
	return "TSArrayVariableDeclaration";
}
TSArrayVariableDeclaration.prototype.toString = function()
{	
	return format("[TSArrayVariableDeclaration : {0} {1}  = {2}]", this.type, this.identifier, this.size);
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
	return format("[TSExpressionStatement : {0}]", this.expression);
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
	var str = format("[TSMethodCall - {0} on {1}\n", this.methodName, this.identifier);

	if (this.arguments != null)
	{
		for (var i = 0 ; i < this.arguments.length; i++)
		{
			str += this.arguments[i].toString() + "\n";
		}
	}

	str += "]";
	return str;
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
	return format("[TSMakeThread: {0} with {1}]", this.identifier, this.func);
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
	var str = "[TSForLoop: \n";

	str += this.initStatements + "\n";
	str += this.endExpression + "\n";
	str += this.stepStatements + "\n";

	str += this.body + "\n";

	str += "]\n";
	return str;
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

module.exports.TSMethodCall = TSMethodCall;
module.exports.TSFunctionDeclaration = TSFunctionDeclaration;
module.exports.TSVariableDeclaration = TSVariableDeclaration;
module.exports.TSExpressionStatement = TSExpressionStatement;
module.exports.TSReturnStatement = TSReturnStatement;
module.exports.TSMakeThread = TSMakeThread;
module.exports.TSForLoop = TSForLoop;
module.exports.TSArrayVariableDeclaration = TSArrayVariableDeclaration;
module.exports.TSArrayIdentifier = TSArrayIdentifier;