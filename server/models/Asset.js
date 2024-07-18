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
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    }
})

const Asset = mongoose.model('Asset', assetSchema);

export default Asset;