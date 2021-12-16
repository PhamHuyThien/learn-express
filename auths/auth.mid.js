const jwt = require("jsonwebtoken");

const SERECT_KEY = "bothiendepztraii";
const AUTHORIZATION_KEY = "authorization";
const AUTHORIZATION_TYPE = "Bearer";

async function isAuthenticated(req, res, next) {
    if (req.headers?.[AUTHORIZATION_KEY] && req.headers[AUTHORIZATION_KEY].split(" ")[0] == AUTHORIZATION_TYPE) {
        let token = req.headers[AUTHORIZATION_KEY].split(" ")[1];
        try {
            let tokenDecode = await verifySync(token);
            res.locals.user = tokenDecode;
            return next();
        } catch (e) {
            return res.status(403).json({ status: false, message: "Phiên đăng nhập hết hạn." });
        }
    }
    return res.status(403).json({ status: false, message: "Bạn phải đăng nhập để thực hiện chức năng này." });
}

function verifySync(token) {
    return new Promise(function (resolve, reject) {
        jwt.verify(token, SERECT_KEY, function (err, decode) {
            if (err)
                reject(err);
            resolve(decode);
        });
    });
}

module.exports.SERECT_KEY = SERECT_KEY;
module.exports.AUTHORIZATION_KEY = AUTHORIZATION_KEY;
module.exports.AUTHORIZATION_TYPE = AUTHORIZATION_TYPE;
module.exports.isAuthenticated = isAuthenticated;