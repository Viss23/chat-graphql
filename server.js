import Koa from 'Koa';
import Router from 'koa-router';
import bodyParser from 'koa-body';
import pkg1 from 'apollo-server-koa';
import typeDefs from './src/schema.js';
import { sequelize } from './src/models/index.js';
import models from './src/models/index.js';
//const resolvers = require('./src/resolvers');

const { ApolloServer, gql } = pkg1;

const books = [
  {
    title: 'The Awakening',
    author: 'Kate Chopin',
  },
  {
    title: 'City of Glass',
    author: 'Paul Auster',
  },
];

/* const author = [
  {
    name: 'Paul',
    books: [
      {
        title: 'City of Glass',
        author: 'Paul Auster',
      },
      {
        title: 'City of Glass2',
        author: 'Paul Auster',
      },
    ],
  },
];
 */
const resolvers = {
  Query: {
    books: () => books,
    author: () => books,
  },
  Mutation: {},
};

const app = new Koa();
app.use(bodyParser());
const router = new Router();

const server = new ApolloServer({ typeDefs, resolvers });

router.post('/users', async (ctx, next) => {
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
});

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
