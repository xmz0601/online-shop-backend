// package a function to return a json obj
module.exports = function(req, res, next){
	res.sendResult = function(data,code,message) {
        res.json(
        {
            "data": data, 
            "meta": {
                "msg": message,
                "status": code
            }
        });
	};
	next();
} 