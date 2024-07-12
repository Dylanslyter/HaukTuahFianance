import mongoose from 'mongoose';

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/net-worth-tracker');

const db = mongoose.connection

export { db };