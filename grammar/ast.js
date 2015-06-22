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
//////////////////////////////////////////
//
// 	prints string identification of object
//
//////////////////////////////////////////
TSNode.prototype.getType = function()
{
	return "TSNode";
}
//////////////////////////////////////////
//
// 	dummy toString()
//
//////////////////////////////////////////
TSNode.prototype.toString = function()
{
	return "TSNode";
}
//////////////////////////////////////////
//
// 	Prints details about node, and propagates
//  printing to sub nodes, so the whole ast
//  can be print with one call 
//
//////////////////////////////////////////
TSNode.prototype.printDetails = function(level)
{
	return "";
}
//////////////////////////////////////////////////////////
//
// 	fills instruction-list with instructions
//	that this node generates. @n is starting
//  index of temp variable that will be used
//  while generating these instructions
//
//	return value is the last variable index
// 	used
//
///////////////////////////////////////////////////////////
TSNode.prototype.generateCode = function(instructionList, n)
{
	return n;
}

////////////////////////////////////////////////
//
// Find all subnodes of node
//
////////////////////////////////////////////////
TSNode.prototype.getSubNodes = function()
{
	return [];
}

//////////////////////////////////////////////////////
//
//  This method gives the Node the posibillity
// 	to see the whole AST
//  DO NOT OVERRIDE!
//
//////////////////////////////////////////////////
TSNode.prototype.bindWithAST = function(ast)
{
	this.ast = ast;
	
	for (var i = 0; i < this.getSubNodes().length; i++)
	{
		var subNode = this.getSubNodes()[i];
		if (subNode == undefined)
			continue;
		console.log(subNode);
		subNode.bindWithAST(ast);
	}
}

/*=============================================*/
/*
/* 			TSStatement
/*
/*==============================================*/
function TSStatement()
{
	TSNode.call(this);
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
TSStatement.prototype.generateCode = function(instructionList, n)
{
	return n;
}
TSStatement.prototype.getSubNodes = function()
{
	return [];
}
/*==============================================================*/
/*
/* 			TSExpression
/*
/*===============================================================*/

function TSExpression(expression)
{
	TSNode.call(this);
	this.expression = expression;
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
	console.log(HELPER.indentString(level, "[TSExpression]"));
		this.expression.printDetails(level + 1);
	console.log(HELPER.indentString(level, "[/TSExpression]")); 
}
TSExpression.prototype.generateCode = function(instructionList, n)
{
	n = this.expression.generateCode(instructionList, n);

	return n;
}
TSExpression.prototype.getSubNodes = function()
{
	return [this.expression];
}
/*=============================================*/
/*
/* 			TSInteger
/*
/*==============================================*/
function TSInteger(value)
{
	TSExpression.call(this);
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
TSInteger.prototype.generateCode = function(instructionList, n)
{
	instructionList.push(new Instruction("setTempValue", ["$" + n , this.value]));

	return n;
}
TSInteger.prototype.getSubNodes = function()
{
	return [];
}
/*=============================================*/
/*
/* 			TSDouble
/*
/*==============================================*/
function TSDouble(value)
{
	TSExpression.call(this);
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
TSDouble.prototype.generateCode = function(instructionList, n)
{
	instructionList.push(new Instruction("setTempValue", ["$" + n , this.value]));

	return n;
}
TSDouble.prototype.getSubNodes = function()
{
	return [];
}

/*=============================================*/
/*
/* 			TSBool
/*
/*==============================================*/
function TSBool(value)
{
	TSExpression.call(this);
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
TSBool.prototype.generateCode = function(instructionList, n)
{
	instructionList.push(new Instruction("setTempValue", ["$" + n , this.value]));

	return n;
}
TSBool.prototype.getSubNodes = function()
{
	return [];
}
/*=============================================*/
/*
/* 			TSString
/*
/*==============================================*/
function TSString(value)
{
	TSExpression.call(this);
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
TSString.prototype.generateCode = function(instructionList, n)
{
	instructionList.push(new Instruction("setTempValue", ["$" + n , this.value]));

	return n;
}
TSString.prototype.getSubNodes = function()
{
	return [];
}

/*=============================================*/
/*
/* 			TSObject
/*
/*==============================================*/
function TSObject(type)
{
	TSExpression.call(this);
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
TSObject.prototype.generateCode = function(instructionList, n)
{
	// nothing for now
}
TSObject.prototype.getSubNodes = function()
{
	return [];
}
/*==============================================================*/
/*
/* 			TSIdentifier
/*
/*===============================================================*/
function TSIdentifier(name)
{
	TSExpression.call(this);
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
TSIdentifier.prototype.generateCode = function(instructionList, n)
{
	instructionList.push(new Instruction("setTempValue", ["$" + n , format("valueOF({0})",this.name)]));

	return n;
}
TSIdentifier.prototype.getSubNodes = function()
{
	return [];
}
/*==============================================================*/
/*
/* 			TSArrayIdentifier
/*
/*===============================================================*/
function TSArrayIdentifier(name, indexExpr)
{
	TSExpression.call(this);
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
	console.log(HELPER.indentString(level, format("[TSArrayIdentifier] {0}[...]]", this.name)));
		this.indexExpr.printDetails(level + 1);
	console.log(HELPER.indentString(level, "[/TSArrayIdentifier]"));
}
TSArrayIdentifier.prototype.generateCode = function(instructionList, n)
{
	var lastN = this.indexExpr.generateCode(instructionList, n) + 1;

	lastN = instructionList.push(new Instruction("setTempValue", ["$" + n , format("{0}[{1}]",this.name, "$" + n)]));

	return lastN;
}
TSIdentifier.prototype.getSubNodes = function()
{
	return [this.indexExpr];
}
/*==============================================================*/
/*
/* 			TSBinaryOperation
/*
/*===============================================================*/
function TSBinaryOperation(operation, firstOperand, secondOperand)
{
	TSExpression.call(this);
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
TSBinaryOperation.prototype.generateCode = function(instructionList, n)
{
	var afterLeftN = this.firstOperand.generateCode(instructionList, n) + 1;

	var afterRightN = this.secondOperand.generateCode(instructionList, afterLeftN);

	instructionList.push(new Instruction("setTempValue", ["$" + n, format("${0} {1} ${2}", n, this.operation, afterLeftN)]));

	return afterRightN;
}
TSIdentifier.prototype.getSubNodes = function()
{
	return [this.firstOperand, this.secondOperand];
}
/*==============================================================*/
/*
/* 			TSBlock
/*
/*===============================================================*/
function TSBlock(statements)
{
	TSStatement.call(this);
	this.statements = statements;
}
TSBlock.prototype = Object.create(TSStatement.prototype);
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
TSBlock.prototype.generateCode = function(instructionList, n)
{
	for (var i = 0 ; i < this.statements.length; i++)
	{
		this.statements[i].generateCode(instructionList, n);
	}
	return n;
}
TSBlock.prototype.getSubNodes = function()
{
	var result = [];
	
	for (var i = 0; i < this.statements.length; i++)
		result.push(this.statements[i]);
	return result;
}
/*==============================================================*/
/*
/* 			TSAssignment
/*
/*===============================================================*/
function TSAssignment(leftSide, expression)
{
	TSExpression.call(this);
	this.leftSide = leftSide;
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
	console.log(HELPER.indentString(level, "[TSAssignment]"));
		
		console.log(HELPER.indentString(level + 1, "[left side]"));
				this.leftSide.printDetails(level + 2);
		console.log(HELPER.indentString(level + 1, "[/left side]"));
		console.log(HELPER.indentString(level + 1, "[right side]"));
			this.expression.printDetails(level + 2);
		console.log(HELPER.indentString(level + 1, "[/right side]"));

	console.log(HELPER.indentString(level, "[/TSAssignment]")); 
}
TSAssignment.prototype.generateCode = function(instructionList, n)
{	
	var lastN = this.expression.generateCode(instructionList, n) + 1;

	if (this.leftSide.getType() == "TSArrayIdentifier")
	{
		lastNN = this.leftSide.indexExpr.generateCode(instructionList, lastN) + 1;

		instructionList.push(new Instruction("setArrayVariable", [
									this.leftSide.name,
									"$" + lastN,
									"$" + n]));
		return lastNN;
	}
	else if (this.leftSide.getType() == "TSIdentifier")
	{
		instructionList.push(new Instruction("setVariable", [this.leftSide.name, "$" + n]));
	}
}
TSAssignment.prototype.getSubNodes = function()
{
	return [this.leftSide, this.expression];
}

/*==============================================================*/
/*
/* 			TSFunctionCall
/*
/*===============================================================*/
function TSFunctionCall(identifier, argumentsExpressions)
{
	TSExpression.call(this);
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
	console.log(HELPER.indentString(level, format("[TSFunctionCall] {0} ", this.identifier.name)));
		if (this.argumentsExpressions != null)
		{
			for (var i = 0 ; i < this.argumentsExpressions.length; i++)
			{
				this.argumentsExpressions[i].printDetails(level + 1);
			}
		}
	console.log(HELPER.indentString(level, "[/TSFunctionCall]")); 
}
TSFunctionCall.prototype.generateCode = function(instructionList, n)
{
	instructionList.push(new Instruction("prepareArgList", []));

	var lastN = n;
	var beforeN = n;

	if (this.argumentsExpressions != null)
	{
		for (var i = 0 ; i < this.argumentsExpressions.length; i++)
		{
			lastN = this.argumentsExpressions[i].generateCode(instructionList, beforeN) + 1;

			instructionList.push(new Instruction("setArgListValue", [
										 i,
										 "$" + beforeN
									 	]));
			beforeN = lastN;
		}
	}

	instructionList.push(new Instruction("setTempValue", ["$" + n , format("call {0}", this.identifier.name)]));
	instructionList.push(new Instruction("clearArgList", []));
	
	return beforeN;
}
TSExpression.prototype.getSubNodes = function()
{
	var result = [this.identifier];
	
	if (this.argumentExpressions == null)
		return result;
		
	for (var i = 0 ; i < this.argumentsExpressions.length; i++)
		result.push(this.argumentsExpressions[i]);
	return result;
}
/*==============================================================*/
/*
/* 			TSFunctionDeclaration
/*
/*===============================================================*/

function TSFunctionDeclaration(type, identifier, arguments, block)
{
	TSStatement.call(this);
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
TSFunctionDeclaration.prototype.generateCode = function(instructionList, n)
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

	return n;
}
TSFunctionDeclaration.prototype.getSubNodes = function()
{
	var result = [this.identifier];
	
	for (var i = 0 ; i < this.arguments.length; i++)
		result.push(this.arguments[i]);
		
	result.push(this.block);
	
	return result;
}
/*==============================================================*/
/*
/* 			TSVariableDeclaration
/*
/*===============================================================*/

function TSVariableDeclaration(type, identifier, expression)
{
	TSStatement.call(this);
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

TSVariableDeclaration.prototype.generateCode = function(instructionList, n)
{
	if (this.expression != null)
	{
		var lastN = this.expression.generateCode(instructionList, n) + 1;

		instructionList.push(new Instruction("addVariable", [
													this.type,
													this.identifier,
													"$" + n
											]));
		return lastN;
	}
	else
	{
		instructionList.push(new Instruction("addVariable", [
													this.type,
													this.identifier,
													null
											]));
		return n;
	}
}
TSVariableDeclaration.prototype.getSubNodes = function()
{
	return [this.identifier, this.expression];
}
/*==============================================================*/
/*
/* 			TSArrayDeclaration
/*
/*===============================================================*/

function TSArrayVariableDeclaration(type, identifier, sizeExpr)
{
	TSStatement.call(this);
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
TSArrayVariableDeclaration.prototype.generateCode = function(instructionList, n)
{
	this.sizeExpr.generateCode(instructionList);

	instructionList.push(new Instruction("addArrayVariable", [
																this.type,
																this.identifier,
																"$" + n	
															 ]));
	return n + 1;
}
TSArrayVariableDeclaration.prototype.getSubNodes = function()
{
	return [this.identifier, this.sizeExpr];
}
/*==============================================================*/
/*
/* 			TSExpressionStatement
/*
/*===============================================================*/

function TSExpressionStatement(expression)
{
	TSStatement.call(this);
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
TSExpressionStatement.prototype.generateCode = function(instructionList, n)
{
	// nothing for now
}
TSArrayVariableDeclaration.prototype.getSubNodes = function()
{
	return [this.expression];
}

/*==============================================================*/
/*
/* 			TSReturnStatement
/*
/*===============================================================*/

function TSReturnStatement(expression)
{
	TSStatement.call(this);
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
TSReturnStatement.prototype.generateCode = function(instructionList, n)
{
	var lastN = this.expression.generateCode(instructionList) + 1;

	instructionList.push(new Instruction("return", [
														"$" + n
												   ]));
	return lastN;
}
TSReturnStatement.prototype.getSubNodes = function()
{
	return [this.expression];
}

/*==============================================================*/
/*
/* 			TSMethodCall
/*
/*===============================================================*/
function TSMethodCall(identifier, methodName, arguments)
{
	TSStatement.call(this);
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
TSMethodCall.prototype.getSubNodes = function()
{
	var result = [this.identifier];
	
	for (var i = 0; i < this.arguments.length; i++)
	{
		result.push(this.arguments[i]);
	}
	return result;
}

/*==============================================================*/
/*
/* 			TSMakeThread
/*
/*===============================================================*/

function TSMakeThread(identifier, func)
{
	TSStatement.call(this);
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
	instructionList.push(new Instruction("generateThread", [this.identifier, this.func]));
}
TSMakeThread.prototype.getSubNodes = function()
{
	return [this.identifier];
}
/*==============================================================*/
/*
/* 			TSForLoop
/*
/*===============================================================*/

function TSForLoop(initStatements, endExpression, stepStatements, body)
{
	TSStatement.call(this);
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
TSForLoop.prototype.generateCode = function(instructionList, n)
{	
	instructionList.push(new Instruction("pushFrame", []));

	for (var i = 0; i < this.initStatements.length; i++)
	{
		this.initStatements[i].generateCode(instructionList,n);
	}

	instructionList.push(new Instruction("beginLoop",[]));

	var beginLoopInstrIndex  = instructionList.length - 1;

	this.endExpression.generateCode(instructionList, n);

	// tempList is used to calculate number of steps in loop body

	var tempList = [];

	if (this.body != null && this.body.statements != null)
	{
		for (var i = 0;  i < this.body.statements.length; i++)
		{
			this.body.statements[i].generateCode(tempList, n);
		}
	}

	instructionList.push(new Instruction("IfFalseJumpFor", [tempList.length + 2]));


	if (this.body != null && this.body.statements != null)
	{
		for (var i = 0;  i < this.body.statements.length; i++)
		{
			this.body.statements[i].generateCode(instructionList, n);
		}
	}
	

	instructionList.push(new Instruction("jumpBackTo", [beginLoopInstrIndex]));

	instructionList.push(new Instruction("popFrame", []));
}
TSForLoop.prototype.getSubNodes = function()
{
	var result = [];
	
	for (var i =0 ; i < this.statements.length; i++)
		result.push(this.initStatements[i]);
	
	for (var i =0 ; i < this.endExpression.length; i++)
		result.push(this.endExpression[i]);
		
	for (var i =0 ; i < this.stepStatements.length; i++)
		result.push(this.stepStatements[i]);
		
	result.push(this.body);
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
