'use strict';



const appData = {
    title: '',
    screens: [],
    screenPrice: 0,
    rollback: 56,
    adaptive: true,
    services: {},
    allServicePrices: 0,
    fullPrice: 0,
    servicePercentPrice: 0,
    isText: function(variable,text) {
        do {
            variable = prompt(text);
        }
        while (appData.isNumber(variable));
        return variable;
    },
    asking: function () {
        appData.title = appData.isText(appData.title, 'Как называется ваш проект?');

        for (let i = 0; i < 2; i++) {
            let name = '';
            name = appData.isText(name, 'Какие типы экранов нужно разработать?');
            
            let price = 0;

            do {
                price = +prompt('Сколько будет стоить данная работа?');
            }
            while (!appData.isNumber(price));

            appData.screens.push({id: i, name: name, price: price});
        }

        for (let i = 0; i < 2; i++) {
            let name ='';
            name = appData.isText(name, 'Какие типы экранов нужно разработать?');
            let price = prompt('Cколько это будет стоить?');

            while (!appData.isNumber(price)) {
                price = prompt('Cколько это будет стоить?');
            }
            appData.services[name] = +price;
        }

        appData.adaptive = confirm('Нужен ли адаптив на сайте?');
    },
    addPrices: function() {
        for(let screen of appData.screens) {
            appData.screenPrice += +screen.price;
        }

        for(let key in appData.services) {
            appData.allServicePrices += appData.services[key];
        }
    },
    getFullPrice: function (screenprice, allprices) {
        appData.fullPrice = screenprice + allprices;
    },
    getTitle: function (title) {
        title = appData.title.trim().toLowerCase();
        appData.title = title[0].toUpperCase() + title.slice(1);
    },
    getServicePercentPrices: function (price, roll) {
        appData.servicePercentPrice = Math.ceil((price - (price * (roll / 100))));
    },
    getRollbackMessage: function (price) {
        if (price >= 30000) {
            return 'Даем скидку в 10%';
        } else if (price >= 15000) {
            return 'Даем скидку в 5%';
        } else if (price >= 0) {
            return 'Скидка не предусмотрена';
        } else {
            return 'Что то пошло не так';
        }
    },
    isNumber: function (num) {
        return !isNaN(parseFloat(num)) && isFinite(num) && String(num).indexOf(' ') === -1;
    },
    logger: function() {
        
        for(let key in appData) {
            console.log(key + " " + appData[key]);
        }
        console.log(appData.screens);

    },
    start: function () {

        appData.asking();
        appData.addPrices();
        appData.getFullPrice(appData.screenPrice, appData.allServicePrices);
        appData.getServicePercentPrices(appData.fullPrice, appData.rollback);
        appData.getTitle();
        appData.logger();
        
    },
    
};

appData.start();





