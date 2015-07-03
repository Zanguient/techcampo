$(document).ready(function () {
	//Efeito de tags para posts
	$('#tags').tagsInput({
		defaultText:'Adicionar tag',
	});

	//Editor para posts
	$('#body').wysihtml5({
		"font-styles": false,
		"html": true,
		"stylesheets": ["/stylesheets/bootstrap.wysihtml5.css"]
	});
    
    
    
    
    	
    var iosocket;
	var entrada = 0;
	//var onOff = false; 
	var toggleVal = 0;
	  
	  
	function initSocketIO()
	{
		
        
        iosocket = io.connect();
		//console.log("ronaldo");
        iosocket.on('onconnection', function(value) {
		entrada = value.pollOneValue; // recieve start poll value from server
		//initPoll();
		//initButton();
				
		// recieve changed values by other client from server
		iosocket.on('updateData', function (recievedData) {
			entrada = recievedData.pollOneValue; // recieve start poll value from server
            //console.log(recievedData);
            if (entrada != 0){
                document.getElementById("rfid").value = entrada;            
            }
		});
	    });
	}
	  

	initSocketIO();
    
    
    
    
    
    
    
    
    
    
    
    
});