const Tripmodel = require('../models/Tripmodel');
const mongoose = require('mongoose')

const createtrip = async (req, res) => {
    try {
        const data = req.body;
        if (Array.isArray(data)) {
            const result = await Tripmodel.insertMany(data);

            return res.status(201).json({
                success: true,
                message: 'All trips created',
                trip: result
            })
        }
        const singletrip = await Tripmodel.create({
            ...req.body,
            createdBy: req.user.id
        });
        await singletrip.save()

        res.status(201).json({
            success: true,
            message: "Trip been created",
            trip: singletrip
        })

    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        })
    }
}


//view all
const gettrip = async (req, res) => {
    try {

        const page = Number(req.query.page) || 1;

        const limit = 3;

        const skip = (page - 1) * limit;

        const totalTrips = await Tripmodel.countDocuments({
            createdBy: req.user.id
        });

        const alltrip = await Tripmodel.find({
            createdBy: req.user.id
        })
            .skip(skip)
            .limit(limit);

        res.status(200).json({
            success: true,
            alltrips: alltrip,
            currentPage: page,
            totalPages: Math.ceil(totalTrips / limit),
            totalTrips
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }
}

//find by id
const gettripbyId = async (req, res) => {
    try {
        const { id } = req.params;


        const trip = await Tripmodel.findOne({
            _id: req.params.id,
            createdBy: req.user.id
        });

        if (!trip) {
            return res.status(404).json({
                success: false,
                message: "Trip not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Trip found",
            trip: trip
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

////update
const updatetrip = async (req, res) => {
    try {
        const id = req.params.id;

        const {
            destination,
            country,
            city,
            startDate,
            endDate,
            budget,
            transport,
            hotelName,
            hotelAddress,
            totalDays,
            description,
            status,
        } = req.body;

        const update = await Tripmodel.findByIdAndUpdate(
            {
                _id: id,
                createdBy: req.user.id
            },
            {
                destination,
                country,
                city,
                startDate,
                endDate,
                budget,
                transport,
                hotelName,
                hotelAddress,
                totalDays,
                description,
                status,
            },
            {
                new: true,
                runValidators: true
            })

        if (update === null) {
            return res.status(404).json({
                success: false,
                message: 'No trips are found'
            })
        }

        res.status(200).json({
            success: true,
            message: "updated succesfully",
            updated: update
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

const deletetrip = async (req, res) => {
    try {
        const id = req.params.id;

        const deletenow = await Tripmodel.findOneAndDelete({
            _id: id,
            createdBy: req.user.id
        });

        if (!deletenow) {
            return res.status(404).json({
                success: false,
                message: 'It doesnt exists'
            })
        }

        res.status(200).json({
            message: 'Deleted succesfully',
            Deletedtrip: deletenow
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

module.exports = { createtrip, gettrip, updatetrip, deletetrip, gettripbyId }