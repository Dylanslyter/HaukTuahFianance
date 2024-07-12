import { db } from '../config/connection.js';
import { User } from '../models/index.js';

db.once('open', async () => {
  await User.insertMany([
    {
        username: "finnlambo",
        email: "finn@example.com",
        password: "password"
    },
    {
        username: "dylanslyter",
        email: "dylan@example.com",
        password: "password"
    },
  ]);

  console.log(User);
  console.log('database seeded!');
  process.exit(0);
});
