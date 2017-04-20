
const getCurrencyAbbreviation = require('./../node_modules/country-currency-map').getCurrencyAbbreviation;
const getExchange = require('./../js/exchange-interface.js').getExchange;
const exchangeRatePlease = require('./../js/calculator.js').exchangeRatePlease;
const calculate = require('./../js/calculator.js').calculate;


let countryName1;
let homeAbbv;
let countryName2;
let destAbbv;
let income;
let expenses;
let timeLength;
let exchangeRate;


$(function() {
  $('#submitButton').click(function(event) {
    // debugger;
    event.preventDefault();
    countryName1 = $('#country1Input').val();
    // console.log('countryName1 : '+countryName1);
    homeAbbv = getCurrencyAbbreviation(countryName1);
    // console.log('homeAbbv : '+homeAbbv);
    countryName2 = $('#country2Input').val();
    // console.log('countryName2 : '+countryName2);
    destAbbv = getCurrencyAbbreviation(countryName2);
    // console.log('destAbbv : '+destAbbv);
    income = parseInt($('#income').val());
    // console.log('income:  '+income);
    expenses = parseInt($('#expenses').val());
    // console.log('expenses : '+expenses);
    timeLength = parseInt($('#timeLength').val());
    // console.log('timeLength: '+timeLength);
    exchangeRate = parseFloat(exchangeRatePlease(countryName1, countryName2));
    // console.log('exchangeRate : '+exchangeRate);
    function doStuff() {
      Promise.all(exchangeRatePlease(countryName1, countryName2), getExchange(countryName1, homeAbbv, countryName2, destAbbv, exchangeRate)).then(function() {
      calculate(income, expenses, timeLength, countryName1, countryName2, exchangeRate)
      console.log('did stuff')
    })
  };
  doStuff()
    // console.log('calculate : '+  calculate(income, expenses, timeLength, countryName1, countryName2, exchangeRate));
  })
});
