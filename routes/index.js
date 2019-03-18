const express = require('express');
const generateAccessToken = require('../middleware/auth').generateAccessToken
const router = express.Router();

router.get('/',(req, res, next) => {
	res.json({countries : 'Countries Api'});
});

router.post('/login', (req, res, next) => {
    let user = {
        username : req.body.username,
        password : req.body.password
    }
    console.log(user);
    if (user.username === 'admin' && user.password === 'admin') {
        generateAccessToken(user, (err, token) => {
            if (err || !token) {
                return res.status(401).json({ "responseMessage": "Username or Password not valid"})
            } else {
            return res.status(200).json({token});
            }
        })
    } else {
        res.status(400).json({"responseMessage": "incorrect username or password"});
    }
});

let Countries = {};
let allCountries = [];

router.get('/countries', (req, res, next) =>{
    try {
        res.status(200).json({"responseData": allCountries})

    } catch (error) {
        console.error({error})
        next(error)
    }
});

router.put('/countries', (req, res, next) => {
    let country = req.body.country;
    if (country) {
        let Saved = allCountries.find(country => country === req.body.countries)

        if(Saved) res.status(200).json("success", {"responseData": "Country Already Exist"}, "Not Added");
        else {
            allCountries.push(req.body.countries)
            res.status(200).json("success", {"responseData": "Country Added"});
        }
        
    }

    else res.status(400).json(transformResponse(0, "success", {"responseData": "Country Not Added"}, "Empty Body"))
});

router.delete('/countries', (req, res, next) => {
    try {
        let country = req.params.name
        
        let position = allCountries.indexOf(country)

        if (position > -1) {
            allCountries.splice(position, 1)
            res.status(200).json ("success", {"responseData": "Country Deleted"});
       }

        else res.status(404).json ("error", {"responseData": "Country not found"});
        
        

    } catch (error) {
        console.error({error})   
        next(error)           
    }
});

module.exports = router;