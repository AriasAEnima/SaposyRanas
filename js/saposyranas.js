var tab=new Array(7);
var moves=0;
var space=100;
var clickadmin;
var cronometro;
var canclick;
var segs=0;
var mins=0;
var last="";
var width=0;
function start(){	
	createtab();		
	canclick=0;
	clickadmin=setInterval(function(){
		canclick++;
	},1000);
	runTime();
	$(window).resize(function() {
	  organize();
	});
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
function runTime(){
	document.getElementById("timerValue").innerHTML="00:00";
	cronometro=setInterval(function(){		
		var m="";
		var s="";
		if(segs==60){
            segs=0;
            mins++;     
            if(mins==60) mins=0;       
        }
        if (mins<10) m="0"+mins;
        else m=mins;            
        if (segs<10) s ="0"+segs;
        else s= segs;
        segs++;
        document.getElementById("timerValue").innerHTML=m+":"+s;
	},1000);
}

function restart(){
	createtab();
	if(estado()){
		alert("reinicio");		
	}
	clearInterval(cronometro);	
	segs=0;
	mins=0;
	runTime();
	document.getElementById("panelVictoria").style.opacity=0;
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
		row=[imgtype,"c"+i];  // tipo , id
		colection+=src+classhtml+idhtml+action;
		tab[i]=row;	
	}
	document.getElementById("lineaRanas").innerHTML=colection;
	organize();	
}

function organize(){	
	space=parseInt(document.getElementById("r1").offsetWidth,10);  // Punto de referencia
	$(function() {
	    var tab = $('#tablero');
	    var widthtab = tab.width()/2;	   
	    tab.css('height', widthtab);
	});
	for (i=0;i<tab.length;i++){
		document.getElementById(tab[i][1]).style.left=space*i+space/10+"px"; // espaciado
	}	
}


function salto(id){		
	var pos=searchpos(id);	
	var type=tab[pos][0];
	var delta=0;	//Direccion	
	
	obj=document.getElementById(id);	
	if (type=="green")delta=-1;
	if (type=="red")delta=1;	
	// salto simple
	if (pos+delta<7 && pos+delta>=0 && tab[pos+delta][0]=='vacio'){
		jump(obj,delta);
		swap(pos,pos+delta);			
	// salto doble			
	}else if(pos+delta*2<7 && pos+delta*2>=0 && tab[pos+delta*2][0]=='vacio'){		
		jump(obj,delta*2);
		swap(pos,pos+delta*2);				
	}else{
		// evitar pilas de alertas (si se clickea varias veces)
		if(last!=id || canclick>3){
			canclick=0;
			alerta(document.getElementById("alerta"));
		}	
		last=id;
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
		document.getElementById("tiempoFinal").innerHTML="Tiempo: "+document.getElementById("timerValue").innerHTML;
		aparecer(document.getElementById("panelVictoria"));
	}
}

function actualizarMov(){		
	document.getElementById("contadorMov").innerHTML=moves;
}


function jump(obj,delta){		
	if(delta>1|| delta<-1){  // Si debe pasar osbre una rana
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
		if((i<3 && tab[i][0]!='green') || (i==3 && tab[i][0]!='vacio')) ganando=false;		
		i++;
	}
	return ganando;
}

start();
