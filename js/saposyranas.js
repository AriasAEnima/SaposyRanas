var tab=new Array(7);
var moves=0;
var space=100;
function start(){	
	createtab();		
}

function printtab() {
	var print="";
	for (var i=0;i<tab.length;i++){
		print+=" "+i;
		for(var j=0;j<tab[i].length;j++){
			print+=" "+tab[i][j];
		}
		alert(print);
	}	
}

function restart(){
	createtab();
	moves=0;
	actualizarMov();	
}

function createtab(){
	//<img src="image/red.png" class="card animal" id="c2" onclick="salto('c2')">	
	var colection="";
	var row;	
	for (i=0;i<tab.length;i++){
		var src='<img src=';
		var classhtml=' class ="card';	
		var idhtml=' id="c'+i+'"';
		var imgtype="vacio";
		var row=new Array(2);
		var action=' onclick="salto('; 	action+="'c"+i+"')";action+='">'
		if (i<3){
			src+='"image/red.png"';
			imgtype="red";
			classhtml+=' animal"';
		}else if(i>3){
			src+='"image/green.png"';
			imgtype="green";
			classhtml+=' animal"';
		}else{
			src+='""';
			classhtml+='"';
		}
		row=[imgtype,"c"+i];
		colection+=src+classhtml+idhtml+action;
		tab[i]=row;	
	}
	document.getElementById("lineaRanas").innerHTML=colection;
	organize();	
}

function organize(){	
	space=parseInt(document.getElementById("r1").offsetWidth,10);
	//console.log(space);
	for (i=0;i<tab.length;i++){
		document.getElementById(tab[i][1]).style.left=space*i+10+"px";
	}	
}


function salto(id){		
	var pos=searchpos(id);	
	var type=tab[pos][0];
	var delta=0;		
	obj=document.getElementById(id);	
	if (type=="green")delta=-1;
	if (type=="red")delta=1;	
	if (pos+delta<7 && pos+delta>=0 && tab[pos+delta][0]=='vacio'){
		jump(obj,delta);
		swap(pos,pos+delta);	
					
	}else if(pos+delta*2<7 && pos+delta*2>=0 && tab[pos+delta*2][0]=='vacio'){		
		jump(obj,delta*2);
		swap(pos,pos+delta*2);				
	}else{
		alerta(document.getElementById("alerta"));
	}
	//alert("salta");
}

function searchpos(id){
	var ans=0;
	for (var i=0;i<tab.length;i++){
		if (tab[i][1]==id){
			ans=Number(i);
		}
	}	
	return ans;
}

function swap(pos1,pos2){
	var temp1t=tab[pos1][0];
	var temp1i=tab[pos1][1];
	tab[pos1][0]=tab[pos2][0];
	tab[pos2][0]=temp1t;
	tab[pos1][1]=tab[pos2][1];
	tab[pos2][1]=temp1i;
	moves++;
	actualizarMov();
	if(estado()){
		aparecer(document.getElementById("victoria"));
	}
}

function actualizarMov(){		
	document.getElementById("contadorMov").innerHTML=moves;
}


function jump(obj,delta){		
	if(delta>1|| delta<-1){
		arriba(obj);
	}
	alLado(obj,delta);
	abajo(obj);			
}

function arriba(e) {	
	$(e).animate({
       top:-1*space+"px"},500);
}

function alLado(e,delta) {	
	var ans=parseInt(e.style.left, 10)+space*delta;	
	$(e).animate({
       left:ans},500);
}

function abajo(e) {
	$(e).animate({
       top:"0px"},500);
}

function alerta(e){
	$(e).animate({        
        opacity: '1',       
    },500);
    $(e).animate({        
        opacity: '0',        
    },1000);
}

function aparecer(e){
	$(e).animate({        
        opacity: '1',       
    },500);   
}


function estado(){
	var ganando=true;
	var i=0;
	while (ganando && i<4){
		if(i<3 && tab[i][0]!='green'){
			ganando=false;
		}else if(i==3 && tab[i][0]!='vacio'){
			ganando=false;
		}
		i++;
	}
	return ganando;
}

start();
