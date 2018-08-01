const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    // active: {
    //     type: Boolean,
    //     default: false
    // },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    photoURL: {
        type: String,
        default: 'images/user.png'
    },
    
    places: [
        {
            type: Schema.Types.ObjectId,
            ref: "Place",
        }
    ],
    confirmationCode: String
}, {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    });

userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

module.exports = mongoose.model('User', userSchema);
