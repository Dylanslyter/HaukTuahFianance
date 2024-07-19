import { db } from "../config/connection.js";
import { User, Asset, Liability } from "../models/index.js";

db.once("open", async () => {
  // Users
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

  // Assets
  const savedUser1 = await user1.save();
  const savedUser2 = await user2.save();

  await Asset.deleteMany({});

  const asset1 = new Asset({
    name: 'Car',
    value: 10000,
    userId: savedUser1._id
  });

  await asset1.save();
  await User.findOneAndUpdate(
    { _id: savedUser1._id },
    {
      $addToSet: {
        assets: asset1,
      },
    }
  );

  const asset2 = new Asset({
    name: 'Savings',
    value: 5000,
    userId: savedUser2._id
  })
  await asset2.save();
  await User.findOneAndUpdate(
    { _id: savedUser2._id },
    {
      $addToSet: {
        assets: asset1,
      },
    }
  );

  // Liabilities
  await Liability.deleteMany({});

  const liability1 = new Liability({
    name: 'Car Loan',
    value: 5000,
    userId: savedUser1._id
  });
  await liability1.save();
  await User.findOneAndUpdate(
    { _id: savedUser1._id },
    {
      $addToSet: {
        liabilities: liability1,
      },
    }
  );

  const liability2 = new Liability({
    name: 'Student Loan',
    value: 10000,
    userId: savedUser2._id
  })
  await liability2.save();
  await User.findOneAndUpdate(
    { _id: savedUser2._id },
    {
      $addToSet: {
        liabilities: liability2,
      },
    }
  );

  console.log("database seeded!");
  process.exit(0);
});
