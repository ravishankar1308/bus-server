const VerifyToken =require('../middlewares/VerifyToken');
const controller = require("../controllers/trip.controller");
const verify =require('../middlewares/VerifyUser');

module.exports = function(app) {
    app.use(function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization');
        next();
    });

    app.post("/api/trip",
        controller.create);

    app.get(
        "/api/trip",
        controller.findAll
    );

    app.get(
        "/api/trip/:id",
        controller.findOne
    );

    app.put(
        "/api/trip/:id",
        controller.update
    );

    app.delete(
        "/api/trip/:id",
        controller.delete
    );

    app.delete(
        "/api/trip",
        controller.deleteAll
    );

};