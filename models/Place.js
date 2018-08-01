const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const placeSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            childPath: 'places'
        },
        deporte: {
            type: String,
            enum: [
                'SKATE',
                'PARKOUR',
                'FREE-RUNNING',
                'SLACK-LINE',
                'ROLLING',
                'BMX'
            ]
        },
        image: String,
        location: {
            type: {
                type: String,
                default: 'Point'
            },
            address: String,
            coordinates: [
                {
                    type: Number
                }
            ]
        },
        timeleft: Number,
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    }
);

module.exports = mongoose.model('Place', placeSchema);