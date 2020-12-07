import Koa from 'Koa';
import Router from 'koa-router';
import bodyParser from 'koa-body';
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
app.use(bodyParser());
const router = new Router();

const server = new ApolloServer({ schema, context: { models } });

/* router.post('/users', async (ctx, next) => {
  try {
    const { username, email, password } = ctx.request.body;
    console.log(username);
    const user = await models.User.create({ username, email, password });
    ctx.body = {
      user,
    };
  } catch (err) {
    console.log(err);
  }
});
router.get('/users', async (ctx, next) => {
  try {
    const users = await models.User.findAll();
    ctx.body = {
      users,
    };
  } catch (err) {
    console.log(err);
  }
});
router.post('/messages', async (ctx, next) => {
  try {
    const { message } = ctx.request.body;
    console.log(username);
    const user = await models.User.create({ username, email, password });
    ctx.body = {
      user,
    };
  } catch (err) {
    console.log(err);
  }
}); */

app.use(router.routes()).use(router.allowedMethods());

server.applyMiddleware({
  app,
});

sequelize.sync({ force: true });

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    console.log(sequelize.models.User);
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
