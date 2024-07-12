// import { ApolloError } from '@apollo/server';
import { User } from '../models/index.js';
import { signToken } from '../utils/auth.js';

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
    
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findById(context.user._id);
      }
      // throw new ApolloError('Not logged in', 'UNAUTHENTICATED');
    }
  },
  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        // throw new ApolloError('Incorrect credentials', 'INVALID_CREDENTIALS');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        // throw new ApolloError('Incorrect credentials', 'INVALID_CREDENTIALS');
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
