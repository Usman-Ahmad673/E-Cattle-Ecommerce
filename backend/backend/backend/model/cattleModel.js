const mongoose = require('mongoose');

const cattleSchema = mongoose.Schema({
    age: {
        type: String,
        trim: true,
        default: '0',
    },
    images: [
        {
            public_id: {
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true,
            },
        },
    ],
    size: {
        height: {
            type: String,
            default: '',
        },
        width: {
            type: String,
            default: '',
        },
        weight: {
            type: String,
            default: '',
        },
    },
    category: {
        type: String,
    },
    feed: {
        type: String,
        default: '0',
    },
    cost: {
        type: Number,
        default: 0,
    },
    milk: {
        type: Number,
        default: 0,
    },
    vaccinationDate: {
        type: Date,
    },
    pregnancyDate: {
        type: Date,
    },
    calvingDate: {
        type: Date,
    },
    trackPerformance: [
        {
            date: {
                type: Date,
                default: Date.now,
            },
            weight: {
                type: String,
                default: '0',
            },
            milkProduction: {
                type: Number,
                default: 0,
            },
            feedCost: {
                type: Number,
                default: 0,
            },
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = mongoose.model('Cattle', cattleSchema);
