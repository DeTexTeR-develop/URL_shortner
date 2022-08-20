const express = require('express');
const url = require('../models/url');

const router = express.Router();

const Url = require('../models/url');


router.get('/:code', async (req, res) => {
    const { code } = req.params;

    try{
        const url = await Url.findOne({
            urlCode: code
        })
        console.log(url);
        if(url){
            res.redirect(url.longUrl);
        }else{
            res.status(401).json('url not found')
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json('Server Error');
    }
})

module.exports = router;