function Instruction(name, args)
{
	this.name = name;
	this.args = args;
}

/*=============================================*/
/*
/* 			InstructionGenerator
/*			takes and AST and makes instructions
/*
/*=============================================*/

function InstructionGenerator(ast)
{
	this.ast = ast;
}

InstructionGenerator.prototype.generateInstructions = function()
{
	var instructionList = new Array();
	
	// first, generate instructions on the global level
	
	this.ast.generateCode(instructionList, 0);
	
	// find main and generate its code
	
	var mainDecl = null;
	
	for (var i = 0 ; i < this.ast.statements.length; i++)
	{
		var stmt = this.ast.statements[i];
		if (stmt.getType() == "TSFunctionDeclaration" && stmt.identifier.name == "main")
		{
			mainDecl = stmt;		
			break;
		}
	}
	
	if (mainDecl == null)
		return {
					code: -1,
					methodName: "InstructionGenerator.generateInstructions",
					errorMessage: "Main does not exists"
		       }
	
	console.log(mainDecl.block);
	mainDecl.block.generateCode(instructionList, 0);
	
	console.log(instructionList);
	
	return { code : 0};
}


// exports

module.exports.InstructionGenerator = InstructionGenerator;