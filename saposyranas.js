var tab=new Array(7);
var moves=0;
function start(){
	var row;	
	for (var i = 0; i <7;i++) {
		if(i<3){
			tab[i]='red';
		}else if(i!=3){
			tab[i]='green';
		}
		tab[3]='vacio';
	}
	drawtab();
}

function drawtab(){
	var row;
	for (i=0;i<tab.length;i++){
		var imgtype="";

		if (tab[i]=='red'){
			imgtype="red.png";
		}else if(tab[i]=='green'){
			imgtype="green.png";
		}
		row=document.getElementById("r"+i);
		row.innerHTML='<img src="'+imgtype+'" class="animal" onclick="salto('+i+')"><img src="roca.png" alt="">';
	}
}

function salto(pos){
	var delta=0;
	var dir=tab[pos];
	if(dir=="red") delta=1;
	if(dir=="green") delta=-1;
	if ((pos+delta<7) && (pos+delta>=0) && (tab[pos+delta]=='vacio')){
		swap(pos,pos+delta);		
	}else if(pos+delta*2<7 && pos+delta*2>=0 && tab[pos+delta*2]=='vacio'){
		swap(pos,pos+delta*2);		
	}else{
		alert("imposible mover");
	}
	//alert("salta");
}

function swap(pos1,pos2){
	var temp1=tab[pos1];
	tab[pos1]=tab[pos2];
	tab[pos2]=temp1;
	moves++;
	drawtab();
	document.getElementById("movimientos").innerHTML=moves;
}

start();