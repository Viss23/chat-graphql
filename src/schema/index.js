import * as User from './User.js';
import * as Message from './Message.js';
import * as Group from './Group.js';

const types = [];
const queries = [];
const mutations = [];
const subscriptions = [];

const schemas = [User, Message, Group];

schemas.forEach((s) => {
  types.push(s.types),
    queries.push(s.queries),
    mutations.push(s.mutations),
    subscriptions.push(s.subscriptions);
});

export default `

  ${types.join('\n')}

  type Query {
    ${queries.join('\n')}
  }

  type Mutation {
    ${mutations.join('\n')}
  }

  type Subscription {
    ${subscriptions.join('\n')}
  }
`;
