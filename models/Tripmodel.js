const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema({

    destination: {
        type: String,
        required: true,
        trim: true
    },

    country: {
        type: String,
        required: true,
        trim: true
    },

    city: {
        type: String,
        required: true,
        trim: true
    },

    startDate: {
        type: Date,
        required: true
    },

    endDate: {
        type: Date,
        required: true
    },

    budget: {
        type: Number,
        required: true
    },

    transport: {
        type: String,
        enum: [
            "Flight",
            "Train",
            "Bus",
            "Car",
            "Bike"
        ],
        required: true
    },

    hotelName: {
        type: String,
        required: true
    },

    hotelAddress: {
        type: String
    },

    totalDays: {
        type: Number,
        required: true
    },

    description: {
        type: String
    },

    status: {
        type: String,
        enum: [
            "Planned",
            "Ongoing",
            "Completed",
            "Cancelled"
        ],
        default: "Planned"
    },
    createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
}
}, {
    timestamps: true
});

module.exports = mongoose.model("Trip", tripSchema);