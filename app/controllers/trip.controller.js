const Trip =require('../models/trip.model');
const Location =require('../models/location.model');
const Bus = require('../models/bus.model');
const User = require('../models/user.model');


exports.create = async (req, res) => {
    // Validate request
    if (!req.body.from ||!req.body.to ||!req.body.driver ||!req.body.bus) {
        await res.status(400).send("Content can not be empty!" );
        return;
    }
    const fromId = await Location.findOne({locationName: req.body.from});
    const toId = await Location.findOne({locationName: req.body.to});
    const driverId = await User.findOne({name: req.body.driver});
    const busId = await Bus.findOne({busName: req.body.bus});


    const trip =await new Trip({
        from: fromId._id,
        to: toId._id,
        driver: driverId._id,
        bus: busId._id,
        noOfSeat: req.body.noOfSeat,
        date: req.body.date,
        status:'Booking Progress'
    });

    await trip
        .save(trip)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the book."
            });
        });


};

exports.findAll = (req, res) => {

    Trip.find()
        .populate('from').populate('to').populate('driver').populate('bus')
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Trip.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found Location with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving Location with id=" + id });
        });
};

exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    Trip.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Location with id=${id}. Maybe Location was not found!`
                });
            } else res.send({ message: "Location was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Location with id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Trip.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Location with id=${id}. Maybe Location was not found!`
                });
            } else {
                res.send({
                    message: "Location was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Location with id=" + id
            });
        });
};

exports.deleteAll = (req, res) => {
    Trip.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} Locations were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Locations."
            });
        });
};
