/**
 * Created by JM on 05.05.2017.
 */

const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', hbs);

app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    let log = `${new Date().toString()} ${req.method} ${req.url}\n`;
    console.log(log);
    fs.appendFile('server.log', log, (err) => {
        if (err) {
            console.log('Unable to append to server.log');
        }
    });
    next();
});

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    res.render('view.hbs', {
        pageTitle: 'About page'
    });
});

app.get('/about', (req, res) => {
    res.send('<h1>About page</h1>');
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Smůla'
    });
});

app.listen(3000, () => {
    console.log('--------------------------------');
    console.log('Server is listening on port 3000');
});