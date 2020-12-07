const resolvers = {
  Query: {
    async user(root, { id }, { models }) {
      return models.User.findById(id);
    },
  },
  Mutation: {
    async createUser(root, { username, email, password }, { models }) {
      return models.User.create({
        username,
        email,
        password,
      });
    },
  },
};

export default resolvers;
