const VerifyToken =require('../middlewares/VerifyToken');
const controller = require("../controllers/ticket.controller");
const verify =require('../middlewares/VerifyUser');

module.exports = function(app) {
    app.use(function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization');
        next();
    });

    app.post("/api/ticket",
        controller.create);

    app.get(
        "/api/ticket",
        controller.findAll
    );

    app.get(
        "/api/ticket/:id",
        controller.findOne
    );

    app.put(
        "/api/ticket/:id",
        controller.update
    );

    app.delete(
        "/api/ticket/:id",
        controller.delete
    );

    app.delete(
        "/api/ticket",
        controller.deleteAll
    );

};