function cFilter(){
	this.a	=0.9;	//Coefficient
	this.d	=0.0; 	//Delay
}

cFilter.prototype={
	fCalc : function(x) {
		this.d = (1.0-this.a)*x + this.a*this.d;
		return this.d;
	},

	fSetC : function(c) {
		this.a = c;
	}

}

function cDelay(n){
	this.delay=new Array(n);
	this.cnt=0;
	this.Len=n;
	this.gain=0.9;
	for(var i=0; i<this.Len; i++) this.delay[i]=0;
}

cDelay.prototype={
	fAcc : function(x){
		var p = (this.Len-1 + this.cnt)%(this.Len-1);
		this.delay[this.cnt] = x + this.gain*this.delay[p];
		this.cnt--;
		if(this.cnt<0) this.cnt = this.Len-1;
		return this.delay[p];
	},

	fSetDT : function(x){		// delay time x sec
		this.gain=Math.pow(10, -0.068*this.Len*0.001/x);
	}
}

function cReverb(){

	this.DL = Array(6);
	this.DL[0] = new cDelay(199);
	this.DL[1] = new cDelay(331);
	this.DL[2] = new cDelay(593);
	this.DL[3] = new cDelay(881);
	this.DL[4] = new cDelay(967);
	this.DL[5] = new cDelay(1721);
	for(var i=0; i<6; i++) this.DL[i].fSetDT(1.8);
}

cReverb.prototype={
	fAcc : function(x){
		var rtn=0;
		for(var i=0; i<6; i++){
			rtn += this.DL[i].fAcc(x);
		}
		return rtn;
	}
}



