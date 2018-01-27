var express = require("express");
var models = require("../models");
var helpers = require("../helpers/auth.helpers")
var router = express.Router();


router.post("/register", function(req, res) {
    var user = {
        blurb: req.body.blurb,
        email: req.body.email.trim().toLowerCase(),
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip
    }
    var salt = helpers.getSalt();
    var hash = helpers.getHash(req.body.password, salt);
    user.salt = salt;
    user.hash = hash;
    models.Crawler.create(user)
        .then(function(resp) {
            res.json({
                success: true
            });
        })
        .catch(function(err) {
            console.error(err);
            throw err;
        });

});
router.post("/login", function(req, res) {
    var email = req.body.email;
    var password = req.body.password;
    models.Crawler.findOne({
            where: {
                email: email
            }
        })
        .then(function(resp) {
            if (resp) {
                //login
                var inputHash = helpers.getHash(password, resp.salt);
                console.log(inputHash.toString(), resp.hash);
                if (inputHash === resp.hash) {
                    res.json({
                        token: helpers.generateJWT(resp)
                    });
                } else {
                    return res.status(400).end('Wrong Password');
                }
            } else {
                //err
                return res.status(404).end('User not found');
            }
        })
        .catch(function(err) {
            return res.status(500).end('LMAO WTF');
            console.log(err);
        })

})
module.exports = router;