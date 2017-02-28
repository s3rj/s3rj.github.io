// random int inclusive 0-9
function getRandomIntInclusive() {
 	min = Math.ceil(1);
	max = Math.floor(9);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
// n random ints averaged from above function, 
// Central Limit Theorem and n samples to achieve aprox. normal/gaussian distribution
function getRandomIntGauss(n){
    var sum=1;
    var i = 1 ;
    while (i<=n){
        sum += getRandomIntInclusive();
        i+=1
    }
    return sum/n;
}
//define function to append n random (~gaussian with gaussX samples) numbers to array
function initData(n,values){
    i = 1;
    while (i <=n) {
        values.push(getRandomIntGauss(gaussX));
        i += 1 ;
    }
    return values;
}
//define function to take array and return average (xbar)
function average(values){
	//reduce to sum through iteration
	var sum = values.reduce(function(sum, value){
		return sum + value;
	},0);
	var avg = sum / values.length;
	return avg;
}
//function that takes array and returns standard deviation (s)
function standardDeviation(values){
    var avg = average(values);
	//map to find square difference of each value from mean, returns array
	var sqaureDiffs = values.map(function(value){
		var diff = value -avg;
		var sqrDiff = diff*diff;
		return sqrDiff;
	});
	//calculate average of square difference
	var avgSquareDiff = average(sqaureDiffs);
	//caclulate standard deviation
	var sigma = Math.sqrt(avgSquareDiff);
	return sigma;
}
//z test function that takes array and returns z score, needs popAvg and popSigma defined
function zTest(values){
    var avg = average(values);
    var sN = Math.sqrt(values.length);
    return (avg - popAvg)/(popSigma/sN);
}   
//t test
function tTest(values){
    var avg = average(values);
    var sigma = standardDeviation(values);
    var sN = Math.sqrt(values.length);  
    return (avg -popAvg)/(sigma/sN); 
}
//function z value to p value 
function getZPercent(z) {
    if ( z < -6.5)
        return 0.0;
    if( z > 6.5) 
        return 1.0;
    var factK = 1;
    var sum = 0;
    var term = 1;
    var k = 0;
    var loopStop = Math.exp(-23);
    while(Math.abs(term) > loopStop) {
        term = .3989422804 * Math.pow(-1,k) * Math.pow(z,k) / (2 * k + 1) / Math.pow(2,k) * Math.pow(z,k+1) / factK;
        sum += term;
        k++;
        factK *= k;
    }
    sum += 0.5;
    return sum;
}

function main(values){
    sampleMean = average(values);
    sampleSigma = standardDeviation(values);
    zScore = zTest(values);
    zPValue = getZPercent(zScore);
    tScore = tTest(values);
    tPValue = getZPercent(tScore);
}
