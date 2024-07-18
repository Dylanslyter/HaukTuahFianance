import { db } from "../config/connection.js";
import { User } from "../models/index.js";

db.once("open", async () => {
  await User.deleteMany();

  const user1 = new User({
    username: "finnlambo",
    email: "finn@example.com",
    password: "password",
  });
  await user1.save();
  
  const user2 = new User({
    username: "dylanslyter",
    email: "dylan@example.com",
    password: "password",
  });
  await user2.save();

  console.log(User);
  console.log("database seeded!");
  process.exit(0);
});
