import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Must use a valid email address'],
  },
  password: {
    type: String,
    required: true,
  },
  assets: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Asset',
    },
  ],
  liabilities: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Liability',
    },
  ],
  netWorth: {
      type: Number,
  }
});

// ensures password is hashed before saving
userSchema.pre('save', async function(next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 10);
  }
});

userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;