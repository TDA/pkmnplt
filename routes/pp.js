var plib=require('../lib/pokelib.js');
module.exports={
	rend:function(req,res){
		res.render('../views/select.ejs');
	},
	
	index:function(req,res)
	{
	res.render('../views/select.ejs');
	},
	
	calc:function(req,res)
	{
		var myatktype=req.query.myatk,
		opatktype=req.query.opatk,
		my_type_1=req.query.mtype1,
		my_type_2=req.query.mtype2,
		cp_type_1=req.query.ctype1,
		cp_type_2=req.query.ctype2,
		my_dmg_multi,cp_dmg_multi;
		//console.log('till here A-OK');
		plib.calcdmg(myatktype,cp_type_1,cp_type_2,function(dmg_multi,eff){
			my_dmg_multi=dmg_multi;
			my_eff=eff;
			plib.calcdmg(opatktype,my_type_1,cp_type_2,function(dmg_multi,eff){
				cp_dmg_multi=dmg_multi;
				cp_eff=eff;
				//console.log( my_dmg_multi+','+cp_dmg_multi+','+my_eff+','+cp_eff); 
				res.end(my_dmg_multi+','+cp_dmg_multi+','+my_eff+','+cp_eff);
				});
			
			});
		
	},
	/*
*/
	displ:function(req,res,callback){
	var ypk=req.query.yourpk;
	var opk=req.query.opk;
	var ypkdet='ss';
	var opkdet='qq';
	
	console.log(ypk+","+opk);
	i=0;
	plib.getPkmnById(ypk,function(det){
		ypkdet=det;
		plib.getPkmnById(opk,function(det){
		console.log("enterin 2nd");
		opkdet=det;
		
	//	i++;
		//if(i>8)
		res.render('../views/battle.ejs',{ypk:ypkdet,opk:opkdet})
	
		});
		
		});
		
		//count=0;
	//function func(){
		//count++;
		//if(count==2)
		
	//}
	}

};