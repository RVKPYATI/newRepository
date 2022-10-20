'use strict';

const books = document.querySelector('.books');
const book = books.querySelectorAll('.book');

book[0].before(book[1])
books.append(book[2])
book[4].after(book[3])
