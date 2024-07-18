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
      return User.find().populate('assets').populate('liabilities')
    },

    assets: async () => {
      return Asset.find();
    },

    liabilities: async () => {
      return Liability.find();
    },
    
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findById(context.user._id);
      }
      throw new GraphQLError('Not logged in');
    },
    // Added a resolver for the stock query
    stock: async (parent, { symbol }) => {
      const cacheKey = `stock:${symbol}`;
      let cachedData = await client.get(cacheKey);
      
      if (cachedData) {
        return JSON.parse(cachedData);
      }
      
      try {
        const response = await axios.get(`https://api.polygon.io/v2/aggs/ticker/${symbol}/prev?unadjusted=true&apiKey=${polygonApiKey}`);
        const data = response.data;
        
        client.set(cacheKey, JSON.stringify(data));
        return [data]; // Return an array with the data
      } catch (error) {
        // Return an empty array if the API does not provide a response
        return [];
      }
    }
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
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    }
  }
};

export { resolvers };