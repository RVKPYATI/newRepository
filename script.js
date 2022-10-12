'use strict';

let title;
let screens;
let screenPrice;
const rollback = 56;
let adaptive;
let service1;
let service2;


const isNumber = function(num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
};

const asking = function() {
    title = prompt('Как называется ваш проект?', 'Мой проект');
    screens = prompt('Какие типы экранов нужно разработать?', 'Простые, Сложные');

    do {
        screenPrice = +prompt('Сколько будет стоить данная работа?');
    }
    while(!isNumber(screenPrice));

    adaptive = confirm('Нужен ли адаптив на сайте?');
};

const showTypeOf = function(variable) {
    console.log(variable, typeof variable);
};

function getAllServicePrices() {
    let sum = 0;

    for (let i = 0; i < 2; i++) {
        if (i === 0) {
            service1 = prompt('Какой дополнительный тип услуги нужен?');
        
        } else if (i === 1) {
            service2 = prompt('Какой дополнительный тип услуги нужен?');
        }
        let price = prompt('Cколько это будет стоить?');
        while(!isNumber(price) || price.indexOf(' ') > -1) {
            price = prompt('Cколько это будет стоить?');
        }

        sum += +price;
    }
    return sum;
}


const getFullPrice = function(screenprice, allprices) {
    return screenprice + allprices;
};

function getTitle(title) {
    title = title.trim().toLowerCase();
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

asking();

let allServicePrices = getAllServicePrices();
let fullPrice = getFullPrice(screenPrice, allServicePrices);
let servicePercentPrice = getServicePercentPrices(fullPrice,rollback);

showTypeOf(title);
showTypeOf(fullPrice);
showTypeOf(adaptive);

console.log(getRollbackMessage(fullPrice));
console.log(`"Стоимость верстки экранов ${screenPrice} долларов" и “Стоимость разработки сайта ${fullPrice})долларов`);

