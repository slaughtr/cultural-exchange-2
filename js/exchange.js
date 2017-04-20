const costOfLiving = require('./../costOfLiving.json');
const getCurrencyAbbreviation = require('./../node_modules/country-currency-map').getCurrencyAbbreviation;

let costConvert
let netPerMonthAtHome
let neededPerMonthForTrip
let saveTimeForTrip
let spendingMoneyPerMonthOnTrip
let totalAmountNeededForTrip
let exchangeRateArray = []
let destAbbv
let homeAbbv

function exchangeRatePlease(countryName1, countryName2) {
  // debugger;
  homeAbbv = getCurrencyAbbreviation(countryName1);
  destAbbv = getCurrencyAbbreviation(countryName2);
  return new Promise(function(resolve, reject) {
    $.get('http://api.fixer.io/latest?base='+homeAbbv+'&symbols='+homeAbbv+','+destAbbv).then(function(response2) {
    exchangeRateArray.push(parseFloat(Object.values(response2.rates)[0]))
    console.log('response2.rates[0]: '+parseFloat(Object.values(response2.rates)[0]))
  }).fail(function(error) {
    console.log("exchangeRatePlease failed")
  })
  // return exchangeRateArray[0]
  console.log('exchangeRateArray[0]: '+exchangeRateArray[0])
})
}

function calculate(income, expenses, timeLength, homeCountry, destCountry, exchangeRate) {
  costConvert = ((costOfLiving[destCountry])/(costOfLiving[homeCountry])).toFixed(2)
  console.log('costConvert : '+costConvert);
  netPerMonthAtHome = ((income/12)-expenses).toFixed(2)
  console.log('netPerMonthAtHome : '+netPerMonthAtHome);
  neededPerMonthForTrip = ((expenses / exchangeRate) / costConvert).toFixed(2)
  console.log(' neededPerMonthForTrip : '+neededPerMonthForTrip);
  saveTimeForTrip = ((neededPerMonthForTrip/exchangeRate)/netPerMonthAtHome).toFixed(2)
  console.log('saveTimeForTrip : ' + saveTimeForTrip);
  spendingMoneyPerMonthOnTrip = ((expenses / exchangeRate) / costConvert).toFixed(2)
  console.log('spendingMoneyPerMonthOnTrip : '+ spendingMoneyPerMonthOnTrip);
  totalAmountNeededForTrip = (neededPerMonthForTrip * timeLength).toFixed(2)
  console.log('totalAmountNeededForTrip : '+ totalAmountNeededForTrip);
  // console.log(exchangeRate, costConvert, netPerMonthAtHome, neededPerMonthForTrip, saveTimeForTrip, spendingMoneyPerMonthOnTrip, totalAmountNeededForTrip)
}

function getExchange(homeCountry, homeAbb, destCountry, destAbb, exchangeRate) {
  return $.get('http://api.fixer.io/latest?base='+homeAbb+'&symbols='+homeAbb+','+destAbb).then(function(response) {
    $('#infoBox').text('There are '+exchangeRate+' '+destCountry+' to every '+homeCountry);
  }).fail(function(error) {
    $('#infoBox').text('There was an error');
  });
}


exports.calculate = calculate;
exports.exchangeRatePlease = exchangeRatePlease;
