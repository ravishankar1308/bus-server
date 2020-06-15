const VerifyToken =require('../middlewares/VerifyToken');
const controller = require("../controllers/location.controller");
const verify =require('../middlewares/VerifyUser');

module.exports = function(app) {
    app.use(function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization');
        next();
    });

    app.post("/api/location",
        controller.create);

    app.get(
        "/api/location",
        controller.findAll
    );

    app.get(
        "/api/location/:id",
        controller.findOne
    );

    app.put(
        "/api/location/:id",
        controller.update
    );

    app.delete(
        "/api/location/:id",
        controller.delete
    );

    app.delete(
        "/api/location",
        controller.deleteAll
    );

};