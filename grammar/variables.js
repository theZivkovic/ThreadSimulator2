function Variable(type, name, value){
	
	var _type = type;
	var _name = name;
	var _value = value;
	
	return {
		"setType" : function(newType)
		{
			_type = newType;
		},
		"getType" : function()
		{
			return _type;
		},
		"setName" : function(newName)
		{
			_name = newName;
		},
		"getName" : function()
		{
			return _name;
		},
		"setValue" : function(newValue)
		{
			_value = newValue;
		},
		"getValue" : function()
		{
			return _value;
		},
		"isTemporary" : function()
		{
			return  _name.match(/^\$[0-9]+$/) != null;
		},
		"isValid" : function()
		{
			if (_type == "bool" && typeof value == "boolean")
				return true;
				
			if (_type == "int" && (_value+"").match(/^[0-9]+$/) != null)
				return true;
				
			if (_type == "double" && (_value+"").match(/^[0-9]+.[0-9]+$/) != null)
				return true;
				
			if (_type == "string" && typeof _value == 'string')
				return true;
				
			return false;
		}
	};
}

module.exports.Variable = Variable;