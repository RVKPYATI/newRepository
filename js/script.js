'use strict';

const books = document.querySelector('.books');
const book = books.querySelectorAll('.book');
const background = document.body;
const adv = document.querySelector('.adv');
const titleBook = book[4].querySelector('h2 > a');
const listUTwoBook = book[0].querySelector('ul');
const listTwoBook = book[0].querySelectorAll('li');
const listFiveBook = book[5].querySelectorAll('li');
const listSixBook = book[2].querySelectorAll('li')
const liSixBook = document.createElement('li');


book[0].before(book[1]);
books.append(book[2]);
book[4].after(book[3]);

background.style.backgroundImage = "url(./image/you-dont-know-js.jpg)";

titleBook.textContent = 'Книга 3. this и Прототипы Объектов';

adv.remove();

listTwoBook[6].before(listTwoBook[8]);
listUTwoBook.append(listTwoBook[2]);
listTwoBook[10].before(listTwoBook[2]);
listTwoBook[4].before(listTwoBook[6]);
listTwoBook[6].after(listTwoBook[8]);

listFiveBook[2].before(listFiveBook[9]);
listFiveBook[6].before(listFiveBook[2]);
listFiveBook[8].before(listFiveBook[5]);

liSixBook.textContent = 'Глава 8: За пределами ES6';

listSixBook[8].after(liSixBook);




