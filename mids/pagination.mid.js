module.exports = async function (req, res, next) {
    if (req.query?.page == undefined || req.query.page < 0)
        req.query.page = 0;
    if (req.query?.size == undefined || req.query.size < 1)
        req.query.size = 10;
    return next();
}