var mysql=require('mysql');
var db = mysql.createConnection({
  host : 'localhost',
  port : 3306,
  database: 'pkmn_plateau'
  , user:"root",password:""});
  
  db.connect(function(err){
        if(err != null) 
            console.log('Error connecting to mysql:' + err+'\n');
        
		
  });
  db.query("SELECT * from pkmn_plateau.pkmn_db", function(err, rows){
        // There was a error or not?
        if(err != null) {
            console.log("Query error:" + err);
        } else {
            // Shows the result on console window
			for(var i=0;i<rows.length;i++)
			    console.log(rows[i]);
           
			console.log("Success!");
        }
  });