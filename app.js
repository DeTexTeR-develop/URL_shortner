const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3223;
const mongoose = require('mongoose');
const urlRoutes = require('./routes/url');
const redirectRoute = require('./routes/redirect');

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

app.use('/url', urlRoutes); 
app.use('/redirect', redirectRoute); 

app.listen(port, () => {
    console.log(`App is listening at ${port}`);
});