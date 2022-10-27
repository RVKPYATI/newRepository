'use strict';

const title = document.getElementsByTagName('h1')[0];
const btnStart = document.getElementsByClassName('handler_btn')[0];
const btnReset = document.getElementsByClassName('handler_btn')[1];
const btnPlus = document.querySelector('.screen-btn');
const otherPercents = document.querySelectorAll('.other-items.percent');
const otherNumbers = document.querySelectorAll('.other-items.number');
const inputRange = document.querySelector('.main-controls__range input[type="range"]');
const percentProgress = document.querySelector('.main-controls__range .range-value');
const summHtmlCoding = document.getElementsByClassName('total-input')[0];
const totalScreens = document.getElementsByClassName('total-input')[1];
const addServSumm = document.getElementsByClassName('total-input')[2];
const totalSumm = document.getElementsByClassName('total-input')[3];
const summRollback = document.getElementsByClassName('total-input')[4];
let screensBlocks = document.querySelectorAll('.screen');
const cloneScreen = screensBlocks[0].cloneNode(true);



const appData = {
    title: '',
    screens: [],
    screensCounts: 0,
    screenPrice: 0,
    rollback: 0,
    adaptive: true,
    services: {},
    servicePricesPercent: 0,
    servicePricesNumber: 0,
    fullPrice: 0,
    servicePercentPrice: 0,
    servicesPercent: {},
    servicesNumber: {},
    isText: function (variable, text) {
        do {
            variable = prompt(text);
        }
        while (appData.isNumber(variable));
        return variable;
    },
    init: function () {
        appData.addTitle();
        btnStart.addEventListener('click', function() {
            if(appData.isValidate() === true) {
                appData.start();
            } else {
                alert('Вы ввели не все поля!');
            }
        });
        btnPlus.addEventListener('click', appData.addScreenBlock);
        appData.getRollback();
    },
    addTitle: function () {
        document.title = title.textContent;
    },
    addScreenBlock: function () {
        // const cloneScreen = screensBlocks[0].cloneNode(true);
        const cloneScreen2 = cloneScreen.cloneNode(true);
        screensBlocks[screensBlocks.length-1].after(cloneScreen2);
        screensBlocks = document.querySelectorAll('.screen');
    },
    addPrices: function () {
        for (let screen of appData.screens) {
            appData.screenPrice += +screen.price;
            appData.screensCounts += +screen.count;
        }

        for (let key in appData.servicesNumber) {
            appData.servicePricesNumber += appData.servicesNumber[key];
        }

        for (let key in appData.servicesPercent) {
            appData.servicePricesPercent += appData.screenPrice * (appData.servicesPercent[key] / 100);
        }
        appData.fullPrice = +appData.screenPrice + appData.servicePricesPercent + appData.servicePricesNumber;
        appData.servicePercentPrice = Math.ceil((appData.fullPrice - (appData.fullPrice * (appData.rollback/ 100))));
        
    },
    showResult: function () {
        summHtmlCoding.value = appData.screenPrice;
        addServSumm.value = appData.servicePricesPercent + appData.servicePricesNumber;
        totalSumm.value = appData.fullPrice;
        summRollback.value = appData.servicePercentPrice;
        totalScreens.value = appData.screensCounts;
    },
    addScreens: function () {
        screensBlocks = document.querySelectorAll('.screen');
        screensBlocks.forEach(function (screen, index) {
            const select = screen.querySelector('select');
            const input = screen.querySelector('input');
            const selectName = select.options[select.selectedIndex].textContent;

            appData.screens.push({
                id: index,
                name: selectName,
                price: +select.value * +input.value,
                count: +input.value
            });

        });
    },
    addServices: function () {
        otherPercents.forEach(function (item) {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');

            if (check.checked) {
                appData.servicesPercent[label.textContent] = +input.value;
            }

        });

        otherNumbers.forEach(function (item) {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');

            if (check.checked) {
                appData.servicesNumber[label.textContent] = +input.value;
            }

        });
    },
    logger: function () {

        // for (let key in appData) {
        //     console.log(key + " " + appData[key]);
        // }

    },
    isValidate: function() {
        screensBlocks = document.querySelectorAll('.screen');
        let count = 0;
        let select = '';
        let input = '';
        screensBlocks.forEach(function(item) {
            select = item.querySelector('select');
            input = item.querySelector('input');
            if(select.value === '' || input.value === '') {
                count++;
            } 
            
        });
        if(count > 0) {
            return false;
        } else if (count === 0){
            return true;
        }
    },
    getRollback: function() {
        inputRange.addEventListener('input', function() {
            percentProgress.textContent = inputRange.value + '%';
            appData.rollback = +inputRange.value;
        });
    },
    start: function () {
        appData.addScreens();
        appData.addServices();
        appData.addPrices();
        
        // appData.getServicePercentPrices(appData.fullPrice, appData.rollback);
        appData.logger();
        appData.showResult();

    },

};

appData.init();





