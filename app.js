const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3223;
const mongoose = require('mongoose');

const dbUrl = 'mongodb://localhost:27017/url-shortner';
mongoose.connect(dbUrl); 

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", ()=>{
    console.log("Database connected");
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

app.get('/shortUrl' , (req, res) => {
    res.render('home.ejs');
});

app.listen(port, () => {
    console.log(`App is listening at ${port}`);
});