// JavaScript Document
module.exports = {
	
		var atk_type,immune_array,dmg,atk_effect,count;
		
	atck:function(req,res)
	{
		var yp=document.window.req.body.form.yourpk.val();
		var op=document.window.req.body.form.opk.val();
		alert(yp);
	
	}
	
	calcdmg:function(atk_bp,atk_type,immune_array,all_weak,all_resist,atk_effect){
	{
		for(i=0;i<count(immunne_array);i++)
		{
			if(atk_type==immune_array[i])
			{	
				dmg=0;
				atk_effect="having no effect";
		    	break;
			}
		}
		for(i=0;i<count(all_weak);i++)
			{ 
				if(atk_type==all_weak[i])
				{
				dmg*=2;
				atk_effect="super effective";
				}
			}	
		for(i=0;i<count(all_resist);i++)
			{
 				if(atk_type==all_resist[i])
				{
					dmg/=2;
					atk_effect="not very effective";
				}

			}	
		return array(ceil(dmg),atk_effect);
	}

	my_dmg_calc=calcdmg(my_atk_bp,my_atk_type,cp_immune_array,cp_all_weak,cp_all_resist,effect);
	$cp_dmg_calc=calcdmg(cp_atk_bp,cp_atk_type,my_immune_array,my_all_weak,my_all_resist,effect);

	my_dmg=my_dmg_calc[0];
	my_eff=my_dmg_calc[1];

	cp_dmg=cp_dmg_calc[0];
	cp_eff=cp_dmg_calc[1];

	updatehp:function(pkmn,hp,dmg)
	{
		if(!(($hp-$dmg)<=0))
		{
			$hp=$hp-$dmg;
			console.log(pkmn+" has $hp HP left");
		}
		else
		{
		hp=0;
		console.log(pkmn+" got knocked out");
		ko=1;
	}

	return $hp;	
	}
	hp=updatehp(my_pkmn_name,hp,cp_dmg);
	hp2=updatehp(cp_pkmn_name,hp2,my_dmg);

	
	if($ko==1)
	{
		echo "<div class='alert'>";
		echo "Battle over<br>";
		echo $hp>=$hp2?"You won":"You lost";
		echo "</div>";
		echo "<a href='select.php'>Go back and start new battle</a>";
		session_destroy();	
	
	}
}