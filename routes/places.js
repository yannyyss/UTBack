const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Place = require('../models/Place');
// Middlewhere

// function isLogin(){

// }


/* map */

router.post('/new', /*isLogin,*/ (req, res, next) => {
    console.log(req.body);
    if (req.user) {
        req.body.user = req.user._id;
        Place.create(req.body)
            .then((place) => {
                User.findByIdAndUpdate(req.user._id, { $push: { places: place._id } }, { new: true })
                    .then(() => {
                        res.json(place);
                    })
                    .catch((e) => next(e)); 
                    //if (err) return res.json(err);
            })
            .catch((e) => next(e));
            //if (err) return res.json(err);
    }else{
        res.status(401).json({msg: "no estas logeado"})
    }
});

module.exports = router;