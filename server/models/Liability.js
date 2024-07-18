import mongoose from 'mongoose';
const { Schema } = mongoose;

const liabilitySchema = new Schema({
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
        required: true,
    }
})

const Liability = mongoose.model('Liability', liabilitySchema);

export default Liability;