const express = require('express');
const generateAccessToken = require('./middleware/auth').generateAccessToken
const router = express.Router();

router.get('/',(req, res, next) => {
	res.json({countries : 'Countries Api'});
});

router.post('/login', (req, res, next) => {
   try {
       let user = {
           username : req.body.username,
           password : req.body.password
       }
           if (user.username.toLowerCase() === 'admin' && user.password.toLowerCase() === 'admin') {
               generateAccessToken(user, (err, token) => {
                   if (err || !token) {
                       return res.status(401).json("error", { "responseMessage": "Username or Password not valid"})
                   } else {
                    return res.status(200).json("success", {token}, "Success");
                   }
               })
           } else {
             res.status(401).json("error", {"responseMessage": "incorrect username or password"});
           }
       
   } catch (error) {
       console.error(error);
   }
});

let Countries = {};
let allCountries = [];

router.get('/countries', (req, res, next) =>{
    try {
        res.status(200).json("success", {"responseData": saveCountries})

    } catch (error) {
        console.error({error})
        next(error)
    }
});

router.put('/countries', (req, res, next) => {
    try {
        
        if (req.body.countries) {
            let Saved = allCountries.find(country => country.toLowerCase() === req.body.countries.toLowerCase())

            if(Saved) res.status(200).json("success", {"responseData": "Country Already Exist"}, "Not Added");
            else {
                allCountries.push(req.body.countries)
                res.status(200).json("success", {"responseData": "Country Added"});
            }
         
        }

        else res.status(400).json(transformResponse(0, "success", {"responseData": "Country Not Added"}, "Empty Body"))


    } catch (error) {  
        console.error({error})
        next(error)   
    }
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