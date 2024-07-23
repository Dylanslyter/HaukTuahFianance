import { GraphQLError } from 'graphql';
import { User, Asset, Liability } from '../models/index.js';
import { signToken } from '../utils/auth.js';
import axios from 'axios';
import redis from 'redis';
import mongoose from 'mongoose';
import { AuthenticationError } from 'apollo-server-express';

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
    listAssetsAndLiabilities: async (parent, args, context) => {
      const userId = context?.user._id;

      if (!userId) {
        throw new AuthenticationError('You must be logged in');
      }

      try {
        const user = await User.findById(userId).populate('assets').populate('liabilities');
        console.log(user);
        if (!user) {
          throw new GraphQLError('Uer not fousnd');
        }

        return {
          assets: user.assets,
          liabilities: user.liabilities,
        };
      } catch (error) {
        throw new GraphQLError('Error Occurred');
      }
    },
  
    // commenting out stock query for now
    // Added a resolver for the stock query
    // stock: async (parent, { symbol }) => {
    //   const cacheKey = `stock:${symbol}`;
    //   let cachedData = await client.get(cacheKey);
      
    //   if (cachedData) {
    //     return JSON.parse(cachedData);
    //   }
    //   try {
    //     const response = await axios.get(`https://api.polygon.io/v2/aggs/ticker/${symbol}/prev?unadjusted=true&apiKey=${polygonApiKey}`);
    //     const data = response.data;
        
    //     client.set(cacheKey, JSON.stringify(data));
    //     return [data]; // Return an array with the data
    //   } catch (error) {
    //     // Return an empty array if the API does not provide a response
    //     return [];
    //   }
    // }
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
    // addAsset: async ( parent, { name, value, userId }) => {
    //   const asset = new Asset ({ name, value, userId });
    //   await asset.save();
    //   return asset;
    // },
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

    // removes asset from user's assets array
    deleteAsset: async (parent, { assetId }) => {
      return Asset.findByIdAndDelete({ _id: assetId });
    },

    // adds liability to user's liabilities array
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

    // removes liability from user's liabilities array
    deleteLiability: async (parent, { liabilityId }) => {
      return Liability.findByIdAndDelete({ _id: liabilityId });
    },

    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
  }
};

export { resolvers };