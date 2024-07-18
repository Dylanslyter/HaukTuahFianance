import mongoose from 'mongoose';
const { Schema } = mongoose;

const assetSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    value: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    }
})

const Asset = mongoose.model('Asset', assetSchema);

export default Asset;