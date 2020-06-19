const Trip =require('../models/trip.model');
const Location =require('../models/location.model');
const Bus = require('../models/bus.model');
const User = require('../models/user.model');
const Ticket = require('../models/ticket.model');


exports.create = async (req, res) => {
    // Validate request
    // if (!req.body.trip || !req.body.tripUser) {
    //     await res.status(400).send("Content can not be empty!" );
    //     return;
    // }
    console.log(req.body);

    const ticket =await new Ticket({
        trip: req.body.trip,
        tripUser: req.body.tripUser,
        ticketStatus:req.body.status
    });

    await ticket
        .save(ticket)
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

    Ticket.find()
        .populate('trip')
        .populate('tripUser')
        .populate('from')
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

    Ticket.findById(id)
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

    Ticket.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
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

    Ticket.findByIdAndRemove(id)
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
    Ticket.deleteMany({})
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
