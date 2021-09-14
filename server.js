const fetch = require('isomorphic-fetch');
const moment = require('moment-timezone');
const fs = require('fs');

const urls = [
    'https://admin.jelpit.com',
    'https://www.jelpit.com',
    'https://admin-empresas.jelpit.com',
    'https://www.jelpit.com/empresas',
];

const handlerResponse = res => {
    let message = null;
    const now = moment().tz('America/Bogota').format('YYYY-MM-DD HH:mm:ss');
    if (res.status !== 200) {
        message = `Error Date ${now} - ${res.status} - ${res.url}`;
        fs.appendFile('log.txt', `${message}\n`, () => null);
        console.log(message);
    }
};

const requestLoop = setInterval(() => {
    urls.map((url) => {
        fetch(url).then(handlerResponse)
    });
}, 60000);
