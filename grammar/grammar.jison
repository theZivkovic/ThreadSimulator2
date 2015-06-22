/* description: Parses simple C++ programs with threads */

%{
	var AST = require("./ast");
	var HELPER = require("./helper");
	var GENERATOR = require("./instructionGenerator");

	var greatBlock;
%}


/* lexical grammar */
%lex


%%

[ \t\n]								/* skip whitespace */
true|false							return 'BOOL'
return                              return 'RETURN'
for 								return 'FOR'
[a-zA-Z_][a-zA-Z0-9_]*				return 'IDENTIFIER'
[0-9]+\.[0-9]+						return 'DOUBLE'
[0-9]+								return 'INTEGER'
"=="								return 'EQUAL'
"="									return 'ASSIGN'
\.									return 'DOT'
"{"									return 'LCURLY'
"}"									return 'RCURLY'
"("									return 'LBRACKET'
")"									return 'RBRACKET'
"["									return 'LSHARPBRACKET'
"]"									return 'RSHARPBRACKET'
";"									return 'SEMICOLON'
"+"									return 'PLUS'
"-"									return 'MINUS'
"*"									return 'TIMES'
"/"									return 'DIVIDE'
"<="								return 'LET'
">="								return 'GET'
"<"									return 'LT'
">"									return 'GT'
","									return 'COMMA'
<<EOF>>								return 'EOF';

/lex

%left 'PLUS' 'MINUS'
%left  'TIMES' 'DIVIDE'
%left 'LT' 'GT'
%left 'LET' 'GET'
%right 'ASSIGN'


%%

 /* language grammar */

program
	: statements EOF
	{
		ast = $1;
		
		//console.log($1.ast);
		ast.printDetails(0);
		
		console.log("");
		console.log("");
		
		var generator = new GENERATOR.InstructionGenerator(ast);
		generator.generateInstructions();
		return ast;
	}
	;

statements
	: statements statement
	{
		$1.statements.push($2);
	}
	| statement
	{
		$$ = new AST.TSBlock([]);
		$$.statements.push($1);
	}
	;

statement
	: variable_declaration
	| function_declaration
	| assign_statement
	| expression_statement
	| method_call
	| for_loop
	;

expression_statement
	: function_call
	{
	
	}
	| RETURN expression
	{
		$$ = new AST.TSReturn(new AST.TSExpression($2));
	}
	;

function_call
	: IDENTIFIER LBRACKET function_call_args RBRACKET
	{
		$$ = new AST.TSFunctionCall(new AST.TSIdentifier($1), $3);
	}
	| IDENTIFIER LBRACKET RBRACKET
	{
		$$ = new AST.TSFunctionCall(new AST.TSIdentifier($1), null);
	}
	;
	
assign_statement
	: IDENTIFIER ASSIGN expression
	{
		$$ = new AST.TSAssignment(new AST.TSIdentifier($1), new AST.TSExpression($3));
	}
	| array_identifier ASSIGN expression
	{
		$$ = new AST.TSAssignment($1, new AST.TSExpression($3));
	}
	;

array_identifier
	: IDENTIFIER LSHARPBRACKET expression RSHARPBRACKET
	{
		$$ = new AST.TSArrayIdentifier($1, new AST.TSExpression($3));
	}
	;

for_loop
	: FOR LBRACKET for_init SEMICOLON expression SEMICOLON for_step RBRACKET block
	{
		$$ = new AST.TSForLoop($3, $5, $7, $9);
	}
	;

for_init
	: for_init COMMA statement
	{
		$1.push($3);
	}
	| statement
	{
		$$ = [$1];
	}
	| /* empty */
	{
		$$ = [];
	}
	;

for_step
	: for_step COMMA statement
	{
		$1.push($3);
	}
	| statement
	{
		$$ = [$1];
	}
	| /* empty */
	{
		$$ = []
	}
	;



variable_declaration
	: IDENTIFIER IDENTIFIER
	{
		$$ = new AST.TSVariableDeclaration($1, $2, undefined);
	}
	| IDENTIFIER IDENTIFIER ASSIGN expression
	{
		$$ = new AST.TSVariableDeclaration($1, $2, new AST.TSExpression($4));
	}
	| IDENTIFIER IDENTIFIER LSHARPBRACKET INTEGER RSHARPBRACKET
	{
		$$ = new AST.TSArrayVariableDeclaration($1, $2, $4)
	}
	;

expression
	: expression PLUS expression
	{
		$$ = new AST.TSBinaryOperation('+', $1, $3);
	}
	| expression MINUS expression
	{
		$$ = new AST.TSBinaryOperation('-', $1, $3);
	}
	| expression TIMES expression
	{
		$$ = new AST.TSBinaryOperation('*', $1, $3);
	}
	| expression LET expression
	{
		$$ = new AST.TSBinaryOperation('<=', $1, $3);
	}
	| expression GET expression
	{
		$$ = new AST.TSBinaryOperation('>=', $1, $3);
	}
	| expression LT expression
	{
		$$ = new AST.TSBinaryOperation('<', $1, $3);
	}
	| expression GT expression
	{
		$$ = new AST.TSBinaryOperation('>', $1, $3);
	}
	| LBRACKET expression RBRACKET
	{
		$$ = $2;
	}
	| function_call
	{

	}
	| array_identifier
	{
		$$ = $1
	}
	| IDENTIFIER
	{
		$$ = new AST.TSIdentifier($1);
	}
	| value
	{
		$$ = $1;
	}
	;

value
	: DOUBLE
	{
		$$ = new AST.TSDouble($1);
	}
	| INTEGER
	{
		$$ = new AST.TSInteger($1);
	}
	| BOOL
	{
		$$ = new AST.TSBool($1);
	}
	;

function_declaration
	: IDENTIFIER IDENTIFIER LBRACKET function_declaration_args RBRACKET block
	{
		$$ = new AST.TSFunctionDeclaration($1, new AST.TSIdentifier($2), $4, $6);
	}
	;

block
	: LCURLY statements RCURLY
	{
		$$ = $2;
	}
	| LCURLY RCURLY
	{
		$$ = new AST.TSBlock([]);
	}
	;

function_declaration_args
	: function_declaration_args COMMA variable_declaration
	{
		$1.push($3);
	} 
	| variable_declaration
	{
		$$ = [$1];
	}
	| /* empty */
	{
		$$ = []
	}

	;

function_call_args
	: function_call_args COMMA expression
	{
		$1.push(new AST.TSExpression($3));
	}
	| expression
	{
		$$ = [new AST.TSExpression($1)];
	}
	; 

method_call
	: IDENTIFIER DOT IDENTIFIER LBRACKET function_call_args RBRACKET
	{
		$$ = new AST.TSMethodCall(new AST.TSIdentifier($1), $3, $5);
	}
	| IDENTIFIER DOT IDENTIFIER LBRACKET RBRACKET
	{
		$$ = new AST.TSMethodCall(new AST.TSIdentifier($1), $3, null);
	}
	| array_identifier DOT IDENTIFIER LBRACKET function_call_args RBRACKET
	{
		$$ = new AST.TSMethodCall($1, $3, $5);
	}
	| array_identifier DOT IDENTIFIER LBRACKET RBRACKET
	{
		$$ = new AST.TSMethodCall($1, $3, null);
	}
	;
	
*/
