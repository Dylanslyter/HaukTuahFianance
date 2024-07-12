import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import http from 'http';
import { typeDefs, resolvers } from './schemas/index.js';
import { authMiddleware } from './utils/auth.js';

const app = express();
const httpServer = http.createServer(app);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

app.use(express.json());

app.use(
  '/graphql',
  expressMiddleware(server, {
    context: authMiddleware,
  }),
);

await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
console.log(` Server ready at http://localhost:4000/graphql`);