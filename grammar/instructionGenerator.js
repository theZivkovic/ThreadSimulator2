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

//////////////////////////////////////////////////////////////////////////////////////
//
//	Genereate code for specific function call
//
///////////////////////////////////////////////////////////////////////////////////////
InstructionGenerator.prototype.generateInstructionsForFunctionCall = function(funcName)
{
	var funcDecl = null;
	
	for (var i = 0 ; i < this.ast.statements.length; i++)
	{
	
		var stmt = this.ast.statements[i];
		
		if (stmt.getType() == "TSFunctionDeclaration" && stmt.identifier.name == funcName)
		{		
			funcDecl = stmt;
			break;
		}
	}
	
	if (funcDecl == null)
	{
		throw "" + funcName + " does not exists";
	}
	
	var resultList = [];
	
	for (var i = 0; i < funcDecl.block.statements.length; i++)
	{
		funcDecl.block.statements[i].generateCode(resultList, 0);
	}
	
	return resultList;
}


// exports

module.exports.InstructionGenerator = InstructionGenerator;