module.exports = function(app) {

            var parser =  require("../grammar/grammar.js").parser;
            var fs = require("fs");
            
            app.get("/api/ast", function(req, res)
            {
                    fs.readFile('test', function(err, data)
                    {
                        if (err)
                        {
                            return console.error(err);
                        } 
                        
                        
                        var greatBlock = parser.parse(data.toString());
                        greatBlock.printDetails(0);

                		console.log("");
                		console.log("");
                
                		var instructionList = [];
                
                		greatBlock.generateCode(instructionList, 0);
                
                		for (var i = 0; i < instructionList.length; i++)
                		{
                		console.log(i + ": " + instructionList[i].name + " - " + instructionList[i].args);
                		} 
                         
                        res.json(instructionList);
                    });
                    
            });



};