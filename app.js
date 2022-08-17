const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3223;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

app.get('/shortUrl' , (req, res) => {
    res.render('home.ejs');
});

app.listen(port, () => {
    console.log(`App is listening at ${port}`);
});