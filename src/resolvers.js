import pkg from 'apollo-server-koa';

const { PubSub, withFilter } = pkg;

export const pubsub = new PubSub();

const NEW_MESSAGE_IN_GROUP = 'NEW_MESSAGE_IN_GROUP';

const resolvers = {
  Query: {
    async user(root, { id }, { models }) {
      return models.User.findById(id);
    },
    async allUsers(_, __, { models }) {
      return models.User.findAll();
    },
    async allGroups(_, __, { models }) {
      return models.Group.findAll();
    },
    async allMessages(_, __, { models }) {
      return models.Message.findAll();
    },
    async allMessagesOfUser(_, { userId }, { models }) {
      return models.Message.findAll({
        where: {
          userId,
        },
      });
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
    async createMessage(root, { userId, groupId, message }, { models }) {
      const newMessage = await models.Message.create({
        userId,
        groupId,
        message,
      });
      pubsub.publish(NEW_MESSAGE_IN_GROUP, { newMessageInGroup: newMessage });
      return newMessage;
    },
    async createGroup(_, { name, imageUrl, userId: adminId }, { models }) {
      return models.Group.create({ name, imageUrl, adminId });
    },
  },
  Subscription: {
    newMessageInGroup: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(NEW_MESSAGE_IN_GROUP),
        (payload, variables) => {
          console.log(payload.newMessageInGroup, '///////////');
          return payload.newMessageInGroup.groupId === variables.groupId;
        }
      ),
    },
  },
};

export default resolvers;
