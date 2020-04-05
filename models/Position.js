const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const positionSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    oldCost: {
        type: Number,
        default: 0
    },
    cost: {
        type: Number,
        required: true
    },
    category: {
        ref: 'categories',
        type: Schema.Types.ObjectId
    },
    user: {
        ref: 'users',
        type: Schema.Types.ObjectId
    }
});

module.exports = mongoose.model('positions', positionSchema);
