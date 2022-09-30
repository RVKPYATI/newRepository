const title = 'Мой первый проект';
const screens = 'Простые, Сложные, Интерактивные';
const screenPrice = 15;
const rollback = 56;
const fullPrice = 2000;
const adaptive = true;

console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);

console.log(screens.length);

console.log(`"Стоимость верстки экранов ${screenPrice} долларов" и “Стоимость разработки сайта ${fullPrice})долларов`);

console.log(screens.toLocaleLowerCase().split(', '));

console.log((fullPrice * (rollback/100)));
