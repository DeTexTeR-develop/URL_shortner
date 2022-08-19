const express  =  require('express');
const shortId  =  require('shortid');
const Url      =  require('../models/url');
const validUrl =  require('valid-url');
const config   =  require('config')
const router   =  express.Router();



//this route gives health of of the application
router.get("/health", (req, res) => {
    return res.status(200).json( {message: "application is healthy" });
});




