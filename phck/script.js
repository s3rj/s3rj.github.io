 	
    // var sampleSize = 0;
    // var gaussX = 0;
    // var popAvg = 5;
    // var popSigma = (80/12)/gaussX;
    // var data = [];
    // var data1 = initData(sampleSize, data);
    // var sampleMean = 0;
    // var sampleSigma = 0;
    // var zScore = 0;
    // var zPValue = 0;
    // var tScore = 0;
    // var tPValue = 0;

    var sampleSize = 0;
    var gaussX = 0;
    var popAvg = 5;
    var popSigma = Math.sqrt(((81-1/12))/gaussX);
    var data = [];
    var data1 = initData(sampleSize, data);
    var sampleMean = 0;
    var sampleSigma = 0;
    var zScore = 0;
    var zPValue = 0;
    var tScore = 0;
    var tPValue = 0;

//on button press
function onPress(){
	gaussX = document.getElementById('certainty').value;
    console.log(gaussX);
	sampleSize = document.getElementById('samples').value;
    popSigma = Math.sqrt(((81-1/12))/gaussX);
	data = initData(sampleSize, data);
	main(data);
	document.getElementById('sample-mean').innerHTML = sampleMean;
	document.getElementById('standard-deviation').innerHTML = sampleSigma;
	document.getElementById('z-score').innerHTML = zScore;
	document.getElementById('z-p-value').innerHTML = zPValue;
	document.getElementById('t-score').innerHTML = tScore;
	document.getElementById('t-p-value').innerHTML = tPValue;
    console.log(document.getElementById('reset').checked);
    if (document.getElementById('reset').checked==true){
        data=[];
    }
   if (zPValue>0.97 || zPValue<0.03 || tPValue>0.97 || tPValue<0.03){
       alert("Success, you have found a significant result!");
   }
}