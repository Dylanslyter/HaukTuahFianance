import { GraphQLError } from 'graphql';
import { User, Asset, Liability } from '../models/index.js';
import { signToken } from '../utils/auth.js';
import redis from 'redis';
import { AuthenticationError } from 'apollo-server-express';

const polygonApiKey = 'YOUR_POLYGON_API_KEY';
const client = redis.createClient({ host: 'localhost', port: 6379 });

const resolvers = {
  Query: {
    // returns all users with their assets and liabilities
    users: async () => {
      return User.find().populate('assets').populate('liabilities');
    },

    // returns all assets with their associated user
    assets: async () => {
      return Asset.find().populate('userId');
    },

    // returns all liabilities with their associated user
    liabilities: async () => {
      return Liability.find().populate('userId');
    },

    // returns the logged in user
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findById(context.user._id);
      }
      throw new GraphQLError('Not logged in');
    },

    // returns the current user's assets and liabilities
    listAssetsAndLiabilities: async (parent, args, context) => {
      const userId = context?.user._id;

      if (!userId) {
        throw new AuthenticationError('You must be logged in');
      }

      try {
        const user = await User.findById(userId).populate('assets').populate('liabilities');
        console.log(user);
        if (!user) {
          throw new GraphQLError('User not found');
        }

        return {
          assets: user.assets,
          liabilities: user.liabilities,
        };
      } catch (error) {
        throw new GraphQLError('Error Occurred');
      }
    },
  },
  Mutation: {
    // allows a user to login if their credentials are correct
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new GraphQLError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new GraphQLError('Incorrect credentials')
      }

      const token = signToken(user);

      return { token, user };
    },

    // adds an asset to the user's assets array
    addAsset: async (parent, { name, value }, context) => {
      const userId = context?.user._id;
      if (!userId) {
        throw new GraphQLError('Not logged in or invalid user');
      }
      const asset = new Asset({ name, value, userId });
      await asset.save();
      const user = await User.findById(userId).populate('assets');
      user.assets.push(asset);
      await user.save();
      return asset;
    },

    // removes an asset from the user's assets array
    deleteAsset: async (parent, { assetId }) => {
      return Asset.findByIdAndDelete({ _id: assetId });
    },

    // adds a liability to the user's liabilities array
    addLiability: async (parent, { name, value }, context) => {
      const userId = context?.user._id;
      if (!userId) {
        throw new GraphQLError('Not logged in or invalid user');
      }
      const liability = new Liability({ name, value, userId });
      await liability.save();
      const user = await User.findById(userId).populate('liabilities');
      user.liabilities.push(liability);
      await user.save();
      return liability;
    },

    // removes a liability from the user's liabilities array
    deleteLiability: async (parent, { liabilityId }) => {
      return Liability.findByIdAndDelete({ _id: liabilityId });
    },

    // adds a user to the database
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
  }
};

export { resolvers };