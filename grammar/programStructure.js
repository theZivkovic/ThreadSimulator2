var format = require('string-format');

/*=============================================*/
/*
/* 			PROGRAM
/*
/*=============================================*/

function TSProgram()
{
	this.frames = new Array();
	
	this.frames.push(new TSFrame("global", null));
}

TSProgram.prototype.getCurrentFrame = function()
{
	return this.frames.peek();
}

TSProgram.prototype.popFrame = function()
{
	if (this.frames.length != 0)
	{
		this.frames.pop();
		
		return { code : 0};
	}	
	
	return { 
				code : -1,
				methodName: "TSProgram.popFrame",
				errorMessage: "Frames stack is empty, can not pop"	
		   }
}
TSProgram.prototype.pushFrame = function(name, parentName)
{
	// check if frame with this name already exists

	var result = this.getFrame(name);

	if (result.code == 0)
	{
		return {
					code : -1,
					methodName : "TSProgram.pushFrame",
					errorMessage: format("Frame {0} already exists in the program", name) 
			   }
	}

	// check if frame with parentName exists

	result = this.getFrame(parentName);

	if (result.code < 0)
		return result;

	var parentFrame = result.data;

	// make new frame and add it to the list

	var newFrame = new TSFrame(name, parentFrame);

	this.frames.push(newFrame);

	return { code: 0 };

}
TSProgram.prototype.getFrame = function(name)
{
	for (var i = 0 ; i < this.frames.length; i++)
	{
		if (this.frames[i].name == name)
		{
			return {
						code: 0,
						data: this.frames[i]
				   }
		}
	}

	return { 
				code : -1,
				methodName : "TSProgram.getFrame",
				errorMessage: format("Frame {0} does not exists in program", name) 
		   };
	
	
}
TSProgram.prototype.addVariable = function(frameName, variableName, variableData)
{
	// get frame by frame name

	var result = this.getFrame(frameName);

	if (result.code != undefined && result.code < 0)
		return result;

	var frame = result.data;

	// add variable to frame

	return frame.addVariable(variableName, variableData);
}

TSProgram.prototype.addFuncDecl = function(frameName, returnType, name, arguments)
{
	// get frame by frame name

	var result = this.getFrame(frameName);

	if (result.code != undefined && result.code < 0)
		return result;

	var frame = result.data;

	// add variable to frame
	
	return frame.addFuncDecl(returnType, name, arguments);
}


/*=============================================*/
/*
/* 			FRAME STRUCTURE
/*
/*==============================================*/

function TSFrame(name, parent)
{
	this.name = name;
	this.parent = parent;
	
	this.variables = {};
	this.functionDeclarations = {};
	this.tempVariables = {};
}

////////////////////////////////////////////////////////
//
//	@variable has "type" property, and other propertis
//  which define its value ("value", "locked", "joined")
//
/////////////////////////////////////////////////////////

TSFrame.prototype.addVariable = function(name, variable)
{
	// check if this variable already exists in this frame or
	// in the parent chain

	var currentFrame = this;

	while (currentFrame != null)
	{		
		if (currentFrame.variables[name] != undefined)
			break;

		currentFrame = currentFrame.parent;
	}

	// if found throw error

	if (currentFrame == null)
	{
		this.variables[name] = variable;
		return { code : 0 };
	}

	return {  code : -1, 
			  methodName: "TSFrame.addVariable",
			  errorMessage: format("Can't add variable {0} to frame {1} because this var already exists in its parent frame - {2}", name, this.name, currentFrame.name)
		   };
}
TSFrame.prototype.setVariable = function(name, value)
{
	var currentFrame = this;

	while (currentFrame != null)
	{		
		if (currentFrame.variables[name] != undefined)
			break;

		currentFrame = currentFrame.parent;
	}
	
	if (currentFrame == null)
	{
		return {  code : -1, 
				  methodName: "TSFrame.setVariable",
			  	  errorMessage: format("Can't set variable {0}, because it does not exists", name);
		   		};
	}
	
	currentFrame.variables[name] = value;
	return { code : 0 };
	
}
////////////////////////////////////////////////////////////////////
//
//	checks arguments, returnType and existence of 
//  this function name in this frame
//
/////////////////////////////////////////////////////////////////////

TSFrame.prototype.addFuncDecl = function(returnType, name, arguments)
{
	if (this.functionDeclarations[name] == undefined)
	{
		// check return type

		if (returnType != "int" && returnType != "string")
		return { 
					code : -1,
					methodName: "TSFrame.addFuncDecl",
					errorMessage: format("Return type must be int/string in function {0} of frame {1}", name, this.name)
			   }

		// check arguments

		for (var i = 0 ; i < arguments.length; i++)
		{
			if (arguments[i] != "int" && arguments[i] != "string" && arguments[i] != "double")
			return { 
					code : -1,
					methodName: "TSFrame.addFuncDecl",
					errorMessage: format("Arguments must be int/string/double in function {0} of frame {1}", name, this.name)
			   }
		}

		this.functionDeclarations[name] = { returnType: returnType, arguments: arguments};
		return { code : 0 };
	}

	return {
				code : -1,
				methodName: "TSFrame.addFuncDecl",
				errorMessage: format("Can't add funcion declaration {0} to frame {1} because it already exists", name, this.name)
		   }
}

/*=============================================*/
/*
/* 			EXPORTS
/*
/*==============================================*/

module.exports.TSFrame = TSFrame;
module.exports.TSProgram = TSProgram;
