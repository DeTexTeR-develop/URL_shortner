const express  =  require('express');
const shortId  =  require('shortid');
const Url      =  require('../models/url');
const validUrl =  require('valid-url');
const router   =  express.Router();



//this route gives health of of the application
const baseUrl = 'http:localhost:3223'

router.get('/health', (req, res) => {
    return res.status(200).json( {message: "application is healthy" });
});

router.get('/shorten' , (req, res) => {
    res.render('home.ejs');
});

router.post('/shorten', async(req , res) => {
    const longUrl = req.body.longUrl;

    if (!validUrl.isUri(baseUrl)) {
        return res.status(401).json('Invalid base URL')
    };

    const urlCode = shortId.generate();

    if(validUrl.isUri(longUrl)){
        try{
            let url = await Url.findOne({longUrl});
            if(url){
                res.send(url)
            }else{
                const shortUrl = baseUrl + '/' + urlCode;
                url = new Url({
                    longUrl,
                    urlCode,
                    shortUrl,
                    date: new Date()
                })

                await url.save();
                res.send(url);
            }
        }catch(err){
            console.log(err);
            res.status(500).json('Server Error')
        }
    }else {
        res.status(401).json('Invalid longUrl')
    };
});


module.exports = router;


