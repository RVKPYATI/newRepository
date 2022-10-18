'use strict';



const appData = {
    title: '',
    screens: '',
    screenPrice: 0,
    rollback: 56,
    adaptive: true,
    service1: '',
    service2: '',
    asking: function () {
        appData.title = prompt('Как называется ваш проект?', 'Мой проект');
        appData.screens = prompt('Какие типы экранов нужно разработать?', 'Простые, Сложные');

        do {
            appData.screenPrice = +prompt('Сколько будет стоить данная работа?');
        }
        while (!isNumber(appData.screenPrice));

        appData.adaptive = confirm('Нужен ли адаптив на сайте?');
    },
    getAllServicePrices: function() {
        let sum = 0;

    for (let i = 0; i < 2; i++) {
        if (i === 0) {
            appData.service1 = prompt('Какой дополнительный тип услуги нужен?');
        
        } else if (i === 1) {
            appData.service2 = prompt('Какой дополнительный тип услуги нужен?');
        }
        let price = prompt('Cколько это будет стоить?');
        while(!isNumber(price)) {
            price = prompt('Cколько это будет стоить?');
        }

        sum += +price;
    }
    return sum;
    }
};


const isNumber = function(num) {

    return !isNaN(parseFloat(num)) && isFinite(num) && String(num).indexOf(' ') === -1;

};

const getFullPrice = function(screenprice, allprices) {
    return screenprice + allprices;
};

function getTitle(title) {
    title = appData.title.trim().toLowerCase();
    return title[0].toUpperCase() + title.slice(1);
}

function getServicePercentPrices(price, roll) {
    return Math.ceil((price - (price * (roll/100))));
}

const getRollbackMessage = function(price) {
    if(price >= 30000) {
        return 'Даем скидку в 10%';
    } else if (price >= 15000) {
        return 'Даем скидку в 5%';
    } else if (price >= 0) {
        return 'Скидка не предусмотрена';
    } else {
        return 'Что то пошло не так';
    }
};

appData.asking();

let allServicePrices = getAllServicePrices();
let fullPrice = getFullPrice(appData.screenPrice, allServicePrices);
let servicePercentPrice = getServicePercentPrices(fullPrice,appData.rollback);


console.log(fullPrice);
console.log(servicePercentPrice);

