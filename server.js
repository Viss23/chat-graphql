import Koa from 'Koa';

import pkg1 from 'apollo-server-koa';
import pkg2 from 'graphql-tools';

import { sequelize } from './src/models/index.js';
import models from './src/models/index.js';

import typeDefs from './src/schema/index.js';
import resolvers from './src/resolvers.js';

const { ApolloServer } = pkg1;
const { makeExecutableSchema } = pkg2;

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const app = new Koa();

const port = 4000;

const httpServer = app.listen(port, () =>
  console.log(`app is listening on port ${port}`)
);

const server = new ApolloServer({
  schema,
  context: { models },
});

sequelize.sync(/* { force: true } */);

server.applyMiddleware({
  app,
});

server.installSubscriptionHandlers(httpServer);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });
