const VerifyToken =require('../middlewares/VerifyToken');
const controller = require("../controllers/bus.controller");
const verify =require('../middlewares/VerifyUser');

module.exports = function(app) {
    app.use(function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization');
        next();
    });

    app.post("/api/bus/",
        controller.create);

    app.get(
        "/api/bus",
        controller.findAll
    );

    app.get(
        "/api/bus/:id",
        controller.findOne
    );

    app.put(
        "/api/bus/:id",
        controller.update
    );

    app.delete(
        "/api/bus/:id",
        controller.delete
    );

    app.delete(
        "/api/bus",
        controller.deleteAll
    );

};