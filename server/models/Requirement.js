const mongoose = require('mongoose');

const requirementSchema = new mongoose.Schema({
    eventName: {
        type: String,
        required: true,
    },
    eventType: {
        type: String,
        required: true,
    },
    eventDate: {
        type: Date,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    hiringFor: {
        type: String,
        required: true,
        enum: ['planner', 'performer', 'crew'],
    },
    details: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('Requirement', requirementSchema);
