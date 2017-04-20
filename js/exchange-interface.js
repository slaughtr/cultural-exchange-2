const getCurrencyAbbreviation = require('./../node_modules/country-currency-map').getCurrencyAbbreviation;
const getExchange = require('./../js/exchange-interface.js').getExchange;
const testPromise = require('../js/exchange.js').testPromise;

let countryName1;
let homeAbbv;
let countryName2;
let destAbbv;
let income;
let expenses;
let timeLength;
let exchangeRate;
const inputArray = []


$(function() {
  $('#submitButton').click(function(event) {
    // debugger;
    event.preventDefault();
    countryName1 = $('#country1Input').val();
    inputArray.push(countryName1) //0
    // console.log('countryName1 : '+countryName1);
    homeAbbv = getCurrencyAbbreviation(countryName1);
    inputArray.push(homeAbbv) // 1
    // console.log('homeAbbv : '+homeAbbv);
    countryName2 = $('#country2Input').val();
    inputArray.push(countryName2) //2
    // console.log('countryName2 : '+countryName2);
    destAbbv = getCurrencyAbbreviation(countryName2);
    inputArray.push(destAbbv)//3
    // console.log('destAbbv : '+destAbbv);
    income = parseInt($('#income').val());
    inputArray.push(income)//4
    // console.log('income:  '+income);
    expenses = parseInt($('#expenses').val());
    inputArray.push(expenses)//5
    // console.log('expenses : '+expenses);
    timeLength = parseInt($('#timeLength').val());
    inputArray.push(timeLength)//6
    // console.log('timeLength: '+timeLength);
    // console.log('exchangeRate : '+exchangeRate);

    // Promise.all(testPromise(income, expenses, timeLength, homeAbbv, destAbbv)).then(function(stuff) {
    //   console.log(stuff);
    // })
    // testPromise(homeAbbv, destAbbv, inputArray)
    testPromise(income, expenses, timeLength, homeAbbv, destAbbv, countryName1, countryName2)
})
})


// exports.inputArray = inputArray
