import Koa from 'Koa';
//import Router from 'koa-router';
import { createServer } from 'http';
import pkg1 from 'apollo-server-koa';
import pkg2 from 'graphql-tools';
import pkg3 from 'subscriptions-transport-ws';
import pkg4 from 'graphql';
import { sequelize } from './src/models/index.js';
import models from './src/models/index.js';

import typeDefs from './src/schema/index.js';
import resolvers from './src/resolvers.js';
import { pubsub } from './src/resolvers.js';

const { ApolloServer } = pkg1;
const { makeExecutableSchema } = pkg2;
const { SubscriptionServer } = pkg3;
const { execute, subscribe } = pkg4;

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const app = new Koa();
//const router = new Router();

/* const pubsub = PubSub(); */

const port = 4000;

const httpServer = app.listen(port, () =>
  console.log(`app is listening on port ${port}`)
);

const server = new ApolloServer({
  schema,
  context: { models },
});

//app.use(router.routes()).use(router.allowedMethods());

sequelize.sync(/* { force: true } */);

//const httpServer = createServer(app);

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

/* httpServer.listen(port, () => {
  console.log(
    `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
  );
  console.log(
    `🚀 Subscriptions ready at ws://localhost:${port}${server.subscriptionsPath}`
  );
  new SubscriptionServer(
    {
      execute,
      subscribe,
      schema,
    },
    {
      server: websocketServer,
      path: '/subscriptions',
    }
  );
});
 */
