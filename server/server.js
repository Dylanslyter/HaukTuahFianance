import { db } from './config/connection.js';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import http from 'http';
import cors from 'cors';
import { typeDefs, resolvers } from './schemas/index.js';
import { authMiddleware } from './utils/auth.js';

const PORT = process.env.PORT || 3000;

async function startServer() {
  // makes sure the database is connected
  db.once('open', () => console.log('Database connected'));
  
  // starts the app and apollo server
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();
  
  // sets up graphQL path with authorization middleware
  app.use(cors());
  app.use(
    '/graphql',
    express.json(),
    expressMiddleware(server, {
      context: authMiddleware,
    }),
  );

  // serves everything in the client/dist folder
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  app.use(express.static(path.join(__dirname, '../client/dist')));
  app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });

  // listens to the server and logs the server and apollo server
  await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
  console.log(`Now listening at http://localhost:${PORT}`);
  console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);

}

// starts the server once the database is open
db.once('open', () => {
  startServer()
});