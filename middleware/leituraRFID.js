module.exports = function (req, res, next) {	
    var iosocket;
	var entrada = 0;
	//var onOff = false; 
	var toggleVal = 0;
	  
	  
	function initSocketIO()
	{
		
        
        iosocket = io.connect();
		console.log("ronaldo");
        iosocket.on('onconnection', function(value) {
		entrada = value.pollOneValue; // recieve start poll value from server
		//initPoll();
		//initButton();
				
		// recieve changed values by other client from server
		iosocket.on('updateData', function (recievedData) {
			entrada = recievedData.pollOneValue; // recieve start poll value from server
            console.log(entrada);
                
            
		});
	    });
	}
	  

	
     	return next();
}
