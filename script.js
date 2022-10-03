'use strict';

const title = prompt('Как называется ваш проект?');
const screens = prompt('Какие типы экранов нужно разработать?');
const screenPrice = +prompt('Сколько будет стоить данная работа?');
const rollback = 56;
const adaptive = confirm('Нужен ли адаптив на сайте?');
const service1 = prompt('Какой дополнительный тип услуги нужен?');
const servicePrice1 = +prompt('Сколько это будет стоить?');
const service2 = prompt('Какой дополнительный тип услуги нужен?');
const servicePrice2 = +prompt('Сколько это будет стоить?');
let fullPrice = (screenPrice + servicePrice1 + servicePrice2);
const servicePercentPrice = Math.ceil((fullPrice - (fullPrice * (rollback/100))));

console.log(servicePercentPrice);

console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);

console.log(screens.length);

console.log(`"Стоимость верстки экранов ${screenPrice} долларов" и “Стоимость разработки сайта ${fullPrice})долларов`);

console.log(screens.toLocaleLowerCase().split(', '));

console.log((fullPrice * (rollback/100)));


if(fullPrice >= 30000) {
    console.log('Даем скидку в 10%');
} else if (fullPrice >= 15000) {
    console.log('Даем скидку в 5%');
} else if (fullPrice >= 0) {
    console.log('Скидка не предусмотрена');
} else {
    console.log('Что то пошло не так');
}

