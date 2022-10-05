'use strict';

let title = prompt('Как называется ваш проект?');
const screens = prompt('Какие типы экранов нужно разработать?');
const screenPrice = +prompt('Сколько будет стоить данная работа?');
const rollback = 56;
const adaptive = confirm('Нужен ли адаптив на сайте?');
const service1 = prompt('Какой дополнительный тип услуги нужен?');
const servicePrice1 = +prompt('Сколько это будет стоить?');
const service2 = prompt('Какой дополнительный тип услуги нужен?');
const servicePrice2 = +prompt('Сколько это будет стоить?');
let fullPrice = (screenPrice + servicePrice1 + servicePrice2);
let servicePercentPrice = Math.ceil((fullPrice - (fullPrice * (rollback/100))));

const showTypeOf = function(variable) {
    console.log(variable, typeof variable);
};

function getAllServicePrices(serviceOne, serviceTwo) {
    return serviceOne + serviceTwo;
}
let allServicePrices = getAllServicePrices(servicePrice1,servicePrice2);

const getFullPrice = function(screenprice, allprices) {
    return screenprice + allprices;
};

function getTitle(title) {
    title = title.trim();
    title = title.toLowerCase();
    title = title[0].toUpperCase() + title.slice(1);
    return title;
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



fullPrice = getFullPrice(screenPrice, allServicePrices);
servicePercentPrice = getServicePercentPrices(fullPrice,rollback);

showTypeOf(title);
showTypeOf(fullPrice);
showTypeOf(adaptive);

console.log(getRollbackMessage(fullPrice));
console.log(servicePercentPrice);
console.log(screens.length);

console.log(`"Стоимость верстки экранов ${screenPrice} долларов" и “Стоимость разработки сайта ${fullPrice})долларов`);

console.log(screens.toLocaleLowerCase().split(', '));

console.log((fullPrice * (rollback/100)));