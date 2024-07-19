import { GraphQLError } from 'graphql';
import { User, Asset, Liability } from '../models/index.js';
import { signToken } from '../utils/auth.js';
import axios from 'axios';
import redis from 'redis';

const polygonApiKey = 'YOUR_POLYGON_API_KEY';
const client = redis.createClient({ host: 'localhost', port: 6379 });

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('assets').populate('liabilities');
    },

    assets: async () => {
      return Asset.find().populate('userId');
    },

    liabilities: async () => {
      return Liability.find().populate('userId');
    },    
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findById(context.user._id);
      }
      throw new GraphQLError('Not logged in');
    },
  },
  Mutation: {
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

    // adds asset to user's assets array
    addAsset: async ( parent, { name, value, userId }) => {
      const asset = new Asset ({ name, value, userId });
      await asset.save();

      await User.findOneAndUpdate(
        { _id: userId._id },
        {
          $addToSet: {
            assets: asset,
          },
        }
      );

      return asset;
    },

    // removes asset from user's assets array
    deleteAsset: async (parent, { assetId, userId  }) => {
      const asset = await Asset.findByIdAndDelete({ _id: assetId });

      await User.findOneAndUpdate(
        { _id: userId._id },
        {
          $pull: {
            assets: asset,
          },
        }
      );
    },

    // adds liability to user's liabilities array
    addLiability: async ( parent, { name, value, userId }) => {
      const liability = new Liability ({ name, value, userId });
      await liability.save();

      await User.findOneAndUpdate(
        { _id: userId._id },
        {
          $addToSet: {
            liabilities: liability,
          },
        }
      );

      return liability;
    },

    // removes liability from user's liabilities array
    deleteLiability: async (parent, { liabilityId, userId }) => {
      const liability = await Liability.findByIdAndDelete({ _id: liabilityId });

      await User.findOneAndUpdate(
        { _id: userId._id },
        {
          $pull: {
            liabilities: liability,
          },
        }
      );
    },

    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
  }
};

export { resolvers };