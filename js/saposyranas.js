var tab=new Array(7);
var moves=0;
var space=100;
function start(){	
	createtab();
		
	$(".card").click(function(){
		salto(this,$(this).attr('id'));		
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

function createtab(){
	var row;
	for (i=0;i<tab.length;i++){
		var imgtype="vacio";
		var row=new Array(2);
		if (i<3){
			imgtype="red.png";			
		}else if(i>3){
			imgtype="green.png";	
		}		
		row[0]=imgtype;
		row[1]="c"+i;		
		space=parseInt(document.getElementById(row[1]).offsetWidth,10);		
		document.getElementById(row[1]).style.left=(space*i*1.3)+"px";
		tab[i]=row;					
	}
}
function salto(obj,id){
	var pos=searchpos(id);	
	var type=tab[pos][0];
	var delta=0;	
	if (type=="green.png")delta=-1;
	if (type=="red.png")delta=1;	
	if (pos+delta<7 && pos+delta>=0 && tab[pos+delta][0]=='vacio'){
		jump(obj,delta);
		swap(pos,pos+delta);	
					
	}else if(pos+delta*2<7 && pos+delta*2>=0 && tab[pos+delta*2][0]=='vacio'){		
		jump(obj,delta*2);
		swap(pos,pos+delta*2);				
	}else{
		alert("imposible mover");
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
	document.getElementById("movimientos").innerHTML=moves;
	if(estado()){
		alert("Ha ganado");
	}
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
	var ans=parseInt(e.style.left, 10)+(space*1.3)*delta;	
	$(e).animate({
       left:ans},500);
}

function abajo(e) {
	$(e).animate({
       top:"0px"},500);
}

function estado(){
	var ganando=true;
	var i=0;
	while (ganando && i<4){
		if(i<3 && tab[i][0]!='green.png'){
			ganando=false;
		}else if(i==3 && tab[i][0]!='vacio'){
			ganando=false;
		}
		i++;
	}
	return ganando;
}

start();
