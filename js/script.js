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
        while (this.isNumber(variable));
        return variable;
    },
    startValidate: function () {
        if (this.isValidate() === true) {
            this.start();
        } else {
            alert('Вы ввели не все поля!');
        }
    },
    init: function () {
        this.addTitle();
        btnStart.addEventListener('click', startval);
        btnPlus.addEventListener('click', addScreen);
        this.getRollback();
    },
    addTitle: function () {
        document.title = title.textContent;
    },
    addScreenBlock: function () {
        const cloneScreen2 = cloneScreen.cloneNode(true);
        screensBlocks[screensBlocks.length - 1].after(cloneScreen2);
        screensBlocks = document.querySelectorAll('.screen');
    },
    addPrices: function () {
        for (let screen of this.screens) {
            this.screenPrice += +screen.price;
            this.screensCounts += +screen.count;
        }

        for (let key in this.servicesNumber) {
            this.servicePricesNumber += this.servicesNumber[key];
        }

        for (let key in this.servicesPercent) {
            this.servicePricesPercent += this.screenPrice * (this.servicesPercent[key] / 100);
        }
        this.fullPrice = +this.screenPrice + this.servicePricesPercent + this.servicePricesNumber;
        this.servicePercentPrice = Math.ceil((this.fullPrice - (this.fullPrice * (this.rollback / 100))));

    },
    showResult: function () {
        summHtmlCoding.value = this.screenPrice;
        addServSumm.value = this.servicePricesPercent + this.servicePricesNumber;
        totalSumm.value = this.fullPrice;
        summRollback.value = this.servicePercentPrice;
        totalScreens.value = this.screensCounts;
    },
    addScreens: function () {
        screensBlocks = document.querySelectorAll('.screen');
        screensBlocks.forEach((screen, index) => {
            const select = screen.querySelector('select');
            const input = screen.querySelector('input');
            const selectName = select.options[select.selectedIndex].textContent;

            this.screens.push({
                id: index,
                name: selectName,
                price: +select.value * +input.value,
                count: +input.value
            });

        });
    },
    addServices: function () {
        otherPercents.forEach((item) => {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');

            if (check.checked) {
                this.servicesPercent[label.textContent] = +input.value;
            }

        });

        otherNumbers.forEach((item) => {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');

            if (check.checked) {
                this.servicesNumber[label.textContent] = +input.value;
            }

        });
    },
    logger: function () {

        // for (let key in appData) {
        //     console.log(key + " " + appData[key]);
        // }

    },
    isDisabled: function () {
        screensBlocks.forEach((item) => {
            const select = item.querySelector('select');
            const input = item.querySelector('input');
            select.disabled = true;
            input.disabled = true;
        });
        otherPercents.forEach((item)=>{
            const checkbox = item.querySelector('input[type=checkbox]');
            checkbox.disabled = true;
        });
        otherNumbers.forEach((item)=>{
            const checkbox = item.querySelector('input[type=checkbox]');
            checkbox.disabled = true;
        });
        inputRange.disabled = true;
        btnStart.style.display = 'none';
        btnReset.style.display = 'block';
        btnReset.addEventListener('click', reset);
    },
    resetScreensBlocks: function() {
        screensBlocks.forEach((item) => {
            item.remove();
        });
        const cloneScreen2 = cloneScreen.cloneNode(true);
        btnPlus.before(cloneScreen2);
    },
    resetShowResult: function() {
        summHtmlCoding.value = 0;
        addServSumm.value = 0;
        totalSumm.value = 0;
        summRollback.value = 0;
        totalScreens.value = 0;
    },
    reset: function() {
        this.resetScreensBlocks();
        this.resetShowResult();
        btnStart.style.display = 'block';
        btnReset.style.display = 'none';
    },
    isValidate: function () {
        screensBlocks = document.querySelectorAll('.screen');
        let count = true;
        let select = '';
        let input = '';
        screensBlocks.forEach((item) => {
            select = item.querySelector('select');
            input = item.querySelector('input');
            if (select.value === '' || input.value === '') {
                count = false;
            }

        });
        if (count === false) {
            return false;
        } else if (count === true) {
            return true;
        }
    },
    countRollback: function () {
        percentProgress.textContent = inputRange.value + '%';
        this.rollback = +inputRange.value;
    },
    getRollback: function () {
        inputRange.addEventListener('input', coutntRoll);
    },
    start: function () {
        this.addScreens();
        this.addServices();
        this.addPrices();

        // appData.getServicePercentPrices(appData.fullPrice, appData.rollback);
        this.logger();
        this.showResult();
        this.isDisabled();

    },

};
const startval = appData.startValidate.bind(appData);
const addScreen = appData.addScreenBlock.bind(appData);
const coutntRoll = appData.countRollback.bind(appData);
const reset = appData.reset.bind(appData);

appData.init();
