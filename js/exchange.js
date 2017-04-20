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

let testPromise = function(income, expenses, timeLength, homeAbbv, destAbbv, homeCountry, destCountry) {
  return new Promise(function(resolve, reject) {
    $.get('http://api.fixer.io/latest?base='+homeAbbv+'&symbols='+homeAbbv+','+destAbbv)
  .then(function(xchangeRate) {
    let exchangeRate = Object.values(xchangeRate.rates)[0]
    console.log('inside the testPromise');
    calculate(income, expenses, timeLength, homeCountry, destCountry, parseFloat(exchangeRate).toFixed(3))
    return exchangeRate
    });
  })
}

function calculate(income, expenses, timeLength, homeCountry, destCountry, exchangeRate) {
  costConvert = ((costOfLiving[destCountry])/(costOfLiving[homeCountry])).toFixed(2)
  console.log('costConvert : '+costConvert);
  netPerMonthAtHome = ((income/12)-expenses).toFixed(2)
  // console.log('netPerMonthAtHome : '+netPerMonthAtHome);
  neededPerMonthForTrip = ((expenses / exchangeRate) / costConvert).toFixed(2)
  console.log(' neededPerMonthForTrip : '+neededPerMonthForTrip);

  saveTimeForTrip = ((neededPerMonthForTrip/exchangeRate)/netPerMonthAtHome).toFixed(2)
  console.log('saveTimeForTrip : ' + saveTimeForTrip);
  spendingMoneyPerMonthOnTrip = ((expenses / exchangeRate) / costConvert).toFixed(2)
  console.log('spendingMoneyPerMonthOnTrip : '+ spendingMoneyPerMonthOnTrip);
  totalAmountNeededForTrip = (neededPerMonthForTrip * timeLength).toFixed(2)
  console.log('totalAmountNeededForTrip : '+ totalAmountNeededForTrip);
  console.log('=-=-=-=-=-=-=-=-=-=-=');
  // console.log(exchangeRate, costConvert, netPerMonthAtHome, neededPerMonthForTrip, saveTimeForTrip, spendingMoneyPerMonthOnTrip, totalAmountNeededForTrip)
}


exports.testPromise = testPromise;
