import pkg from 'apollo-server-koa';

const { PubSub, withFilter } = pkg;

export const pubsub = new PubSub();

const NEW_MESSAGE_IN_GROUP = 'NEW_MESSAGE_IN_GROUP';
const MESSAGE_IN_GROUP_DELETED = 'MESSAGE_IN_GROUP_DELETED';

const resolvers = {
  Query: {
    async user(root, { id }, { models }) {
      return models.User.findById(id);
    },
    async allUsers(_, __, { models }) {
      return models.User.findAll();
    },
    async allGroups(_, __, { models }) {
      return models.Group.findAll({
        include: [
          {
            model: models.Message,
            as: 'messages',
          },
        ],
      });
    },
    async allMessagesInGroup(_, { groupId }, { models }) {
      const res = await models.Group.findByPk(groupId, {
        include: [
          {
            model: models.Message,
            as: 'messages',
            include: [
              {
                model: models.User,
                as: 'sender',
              },
            ],
          },
        ],
      });
      return res.messages;
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
    async createUser(
      root,
      { username, email, password, imageUrl },
      { models }
    ) {
      return models.User.create({
        username,
        email,
        password,
        imageUrl,
      });
    },
    async createMessage(root, { userId, groupId, message }, { models }) {
      const newMessage = await models.Message.create({
        userId,
        groupId,
        message,
      });
      const newMessageWithSender = await models.Message.findByPk(
        newMessage.id,
        {
          include: [
            {
              model: models.User,
              as: 'sender',
            },
          ],
        }
      );
      pubsub.publish(NEW_MESSAGE_IN_GROUP, {
        newMessageInGroup: newMessageWithSender,
      });
      return newMessageWithSender;
    },
    async createGroup(_, { name, imageUrl, userId: adminId }, { models }) {
      return models.Group.create({ name, imageUrl, adminId });
    },
    async deleteMessage(_, { messageId }, { models }) {
      const message = await models.Message.findByPk(messageId);
      const resultOfDeleting = await models.Message.destroy({
        where: { id: messageId },
      });
      const parsedResult = resultOfDeleting ? messageId : 'Deleting Failed';
      pubsub.publish(MESSAGE_IN_GROUP_DELETED, {
        messageInGroupDeleted: {
          messageId: messageId,
          groupId: message.groupId,
        },
      });
      return parsedResult;
    },
  },
  Subscription: {
    newMessageInGroup: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(NEW_MESSAGE_IN_GROUP),
        (payload, variables) => {
          return payload.newMessageInGroup.groupId === variables.groupId;
        }
      ),
    },
    messageInGroupDeleted: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(MESSAGE_IN_GROUP_DELETED),
        (payload, variables) => {
          return payload.messageInGroupDeleted.groupId === variables.groupId;
        }
      ),
    },
  },
};

export default resolvers;
