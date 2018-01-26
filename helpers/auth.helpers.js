var crypto = require("crypto");
var jwt = require("jsonwebtoken");
var self = {};
self.getHash = function(password, salt) {
    return crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
}

self.getSalt= function() {
    return crypto.randomBytes(16).toString("hex");
}

self.generateJWT = function(user) {
    var expire = new Date();
    expire.setDate(expire.getDate() + 7);
    return jwt.sign({
        id: user.id,
        first: user.firstName,
        last: user.lastName,
        email: user.email,
        exp: expire.getTime() / 1000
    }, process.env.JWT_SECRET);
}
module.exports = self;
