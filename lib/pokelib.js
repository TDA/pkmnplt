var cookie = require('cookie')
  , crypto = require('crypto')
  , express = require('express')
  , http = require('http');
  
  
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
  
  module.exports={
	getPkmnById:function(id,callback)
	{	
		var pkmndet='';
		var pptnames='';
		db.query("SELECT * from pkmn_plateau.pkmn_db where pkmn_id="+id, function(err, rows){
        // There was a error or not?
        if(err != null) {
            console.log("Query error:" + err);
        } else {
            // Shows the result on console window
				for(ppt in rows[0])
				if(rows[0].hasOwnProperty(ppt))
			    {
					pkmndet+=rows[0][ppt]+',';
				}
			console.log("Success!");
			//console.log(pkmndet+'inside 1st');
			
			//for(i=1;i<=4;i++)
			db.query("select * from pkmn_plateau.atk_db where atk_id="+rows[0]['atk_1'],function(err,atkrow){	
			if(err != null) {
            console.log("Query error:" + err);
        	} else {
				for(ppt in atkrow[0])
				if(atkrow[0].hasOwnProperty(ppt))
			    pkmndet+=atkrow[0][ppt]+',';
				}
        	//console.log(pkmndet+'inside 2nd');
				db.query("select * from pkmn_plateau.atk_db where atk_id="+rows[0]['atk_2'],function(err,atkrow){	
				if(err != null) {
            	console.log("Query error:" + err);
        		} else {
				for(ppt in atkrow[0])
				if(atkrow[0].hasOwnProperty(ppt))
			    pkmndet+=atkrow[0][ppt]+',';
				}
        	//console.log(pkmndet+'inside 2nd');
			
						db.query("select * from pkmn_plateau.atk_db where atk_id="+rows[0]['atk_3'],function(err,atkrow){	
					if(err != null) {
        		    console.log("Query error:" + err);
        			} else {
					for(ppt in atkrow[0])
					if(atkrow[0].hasOwnProperty(ppt))
			    	pkmndet+=atkrow[0][ppt]+',';
					}
        	//console.log(pkmndet+'inside 2nd');
					db.query("select * from pkmn_plateau.atk_db where atk_id="+rows[0]['atk_4'],function(err,atkrow){	
					if(err != null) {
    	        	console.log("Query error:" + err);
        			} else {
					for(ppt in atkrow[0])
					if(atkrow[0].hasOwnProperty(ppt))
			    	pkmndet+=atkrow[0][ppt]+',';
					}
        	//console.log(pkmndet+'inside 2nd');
				
				callback(pkmndet);
			});

			
				});

			
			
				});

			
			});
			
			
		}
			
		//return rows;
		
   });
		
		
	},
	calcdmg:function(attack_type,opp_type_1,opp_type_2,callback){
		var dmg=1;
		var weaknesses,resistances,immune;
		db.query("SELECT * from pkmn_plateau.type_db where type_name='"+opp_type_1+"'", function(err, rows){
        	weaknesses=rows[0]['weaknesses'];
			resistances=rows[0]['resistances'];
			immune=rows[0]['immune'];
			//console.log('til first query');
			db.query("SELECT * from pkmn_plateau.type_db where type_name='"+opp_type_2+"'", function(err, rows){
        	if(rows[0])
			{
			weaknesses+=rows[0]['weaknesses'];
			resistances+=rows[0]['resistances'];
			immune+=rows[0]['immune'];
			}
			if(immune.indexOf(attack_type)!=-1)
			callback(0,"having no effect");
			else if (weaknesses.indexOf(attack_type)!=-1)
			callback(2,"super effective");
			else if (resistances.indexOf(attack_type)!=-1)
			callback(0.5,"not very effective");
			else
			callback(1);
			
			//console.log(immune.indexOf(attack_type))
			//console.log(weaknesses.indexOf(attack_type))
			//console.log(resistances.indexOf(attack_type))
			});
		});
	}
			
}