var fseq = null;

// x0 = ( 760 - (32*17) )/2 = 108
// y0 = ( 160 - (28* 4) )/2 = 32

var idxx=["1- ","2- ","3- ","4- "];
var idxy=["1- ","2- ","3- ","4- ","5- ","6- ","7- ","8- ",
	"9- ","10- ","11- ","12- ","13- ","14- ","15- ","16- "];

window.addEventListener('load', function (){

	var i;
	fseq = new DrawGraph(0,(32*17),16+(24*5),16);
	fseq.fSetCanvas(document.getElementById('step_seq'));
//	fseq.fStrokeRect();
	fseq.fSetViewPort(0,17,0,5);

	for(i=1; i<=17; i++){
		fseq.fVLine(i,1,i,5);
	}

	for(i=1; i<=5; i++){
		fseq.fVLine(1,i,17,i);
	}

	fseq.fSetViewPort(0,34,0,10);
	for(i=0; i<4; i++){
		fseq.fVWriteText(idxx[i],0,i*2+4);
	}
	for(i=0; i<16; i++){
		fseq.fVWriteText(idxy[i],(i+1)*2,1);
	}

	fseq.fSetWindowXY(32,(32*17),16+(24*5),16+24);
	fseq.fSetViewPort(0,32,0,8);

	for(i=0; i<16*4; i++){
		var k=Math.floor(i/16);
		var j=i%16;
		fSwSeqview(k,j,mSecPattern[k][j]);
	}

});

function goAnimation()
{
	var ch  = Math.floor((fseq.iVy)/2);
	var num = Math.floor((fseq.iVx)/2);

	if(mSecPattern[ch][num]) mSecPattern[ch][num]=0;
	else mSecPattern[ch][num]=1;

	fSwSeqview(ch,num,mSecPattern[ch][num]);
}

function fSwSeqview(ch,num,on)
{
	var ix = num*2+1;		// 何番目?
	var iy = ch*2 +1;		// CH

	fseq.fFillColor("#DDDDDD");

	switch(ch){
		case 0:
			if(on) fseq.fFillColor("#FF0000");
			break;
		case 1:
			if(on) fseq.fFillColor("#00FF00");
			break;
		case 2:
			if(on) fseq.fFillColor("#0000FF");
			break;
		case 3:
			if(on) fseq.fFillColor("#00FFFF");
			break;
	}

	fseq.fDrawArcXY(ix,iy,4);
	fseq.fFillColor("#222222");
}

