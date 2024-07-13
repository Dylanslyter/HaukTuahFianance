const mongoose = require('mongoose');
//added bcrypt for password hashing
const bcrypt = require('bcrypt');

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
//added assets and liabilities fields. These will be arrays of objects that reference the Asset and Liability models, respectively. Each object will have a value field that is a number.
  assets: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Asset',
      value: {
        type: Number,
        required: true,
      },
    },
  ],
  liabilities: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Liability',
      value: {
        type: Number,
        required: true,
      },
    },
  ],
  // other fields as needed
});

// ensures password is hashed before saving
userSchema.pre('save', async function(next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 10);
  }
})

const User = mongoose.model('User', userSchema);

module.exports = User;