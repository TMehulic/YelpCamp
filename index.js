const express = require('express');
const path = require('path');
const app = express();

app.listen(3000, () => {
    console.log('Listening on port 3000!');
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req,res) => {
    res.render('home');
});