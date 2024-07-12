const db = require('../config/connection');
const { User } = require('../models');

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
