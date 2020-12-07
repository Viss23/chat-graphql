import * as User from './User.js';

const types = [];
const queries = [];
const mutations = [];

const schemas = [User];

schemas.forEach((s) => {
  types.push(s.types), queries.push(s.queries), mutations.push(s.mutations);
});

export default `
  ${types.join('\n')}

  type Query {
    ${queries.join('\n')}
  }

  type Mutation {
    ${mutations.join('\n')}
  }
`;
