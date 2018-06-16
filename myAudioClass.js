var mAudioContext = null;
var audiosource	= null;;
//var splitter 	= null;
//var merger 		= null;
var mNode 		= null;

//var mGainW = null;
//var mGainD = null;
//var mReverb = null;
//var mLowpass = null;
//var mLowshelf = null;

var mAudioBuffer= [null,null];
var mBuffersize = 1024;

function mAudioInitialize(process){

	if(mAudioContext!=null) return;

	navigator.getUserMedia = ( navigator.getUserMedia ||
		navigator.webkitGetUserMedia ||
		navigator.mozGetUserMedia ||
		navigator.msGetUserMedia);

	mAudioContext = new AudioContext();
//	splitter	= mAudioContext.createChannelSplitter(2);
//	merger 		= mAudioContext.createChannelMerger(2);
	mNode 		= mAudioContext.createScriptProcessor(mBuffersize, 2, 2);

//	mGainW 		= mAudioContext.createGain();
//	mGainD 		= mAudioContext.createGain();
//	mGainW.gain.value = 0.4;
//	mGainD.gain.value = 1.0;
//	mReverb		= mAudioContext.createConvolver();
//	mLowpass 	= mAudioContext.createBiquadFilter();
//	mLowpass.type = "lowpass";
//	mLowpass.frequency = 16000;
//	mLowshelf 	= mAudioContext.createBiquadFilter();
//	mLowshelf.type = "lowshelf";
//	mLowshelf.frequency = 200;
//	mLowshelf.gain = 3;

/* Convolver のインパルス応答のロード*/
//	mloadDogSound(
//		"https://mikatahara.github.io/1 Halls 11 Gold Hall.1.1.wav"
// 		, 0);

//データ処理関数の定義
	mNode.onaudioprocess	= process;

// Mic -> SP を立ち上げる
	soundThrough();
}

function mAudioClose(){
	if(mAudioContext!=null){
		mAudioContext.close();
		mAudioContext=null;
	}
}

function soundThrough() {
	navigator.getUserMedia({video: false, audio: true},

		function(stream){
			audiosource = mAudioContext.createMediaStreamSource(stream);
			audiosource.connect(mNode);
			mNode.connect(mAudioContext.destination);
//			node.connect(splitter);
//			splitter.connect(gainL, 0);
//			splitter.connect(gainR, 1);
//			gainL.connect(merger, 0, 0)
//			gainR.connect(merger, 0, 1)
//			mNode.connect(mLowshelf);
//			mLowshelf.connect(mLowpass);
//			mLowpass.connect(mReverb);
//			mNode.connect(mReverb);
//			mReverb.connect(mGainW);
//			mNode.connect(mGainD);
//			mGainW.connect(mAudioContext.destination);
//			mGainD.connect(mAudioContext.destination);

	},

		function(e) {	// I can't use getUserMedia
			console.log(e);
		}
	);
}

function mloadDogSound(url, n) {
	var request = new XMLHttpRequest();
	request.open('GET', url, true);
	request.responseType = 'arraybuffer';

	// Decode asynchronously
	request.onload = function() {
		mAudioContext.decodeAudioData(request.response, function(buffer) {
		mAudioBuffer[n]= buffer; 
		mReverb.buffer = mAudioBuffer[n];
		}, function(){ alert('Error'); } );
	}
	request.send();
}
