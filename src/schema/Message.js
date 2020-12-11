export const types = `
  type Message {
    id: String!,
    message: String!,
    userId: String!,
    groupId: String,
    sender: User!
  }
  type MessageDeleted{
    messageId: String
    groupId: String
  }
`;

export const queries = `
  message(id: String!): Message
  allMessages: [Message!]!
  allMessagesOfUser(userId: String!): [Message!]!
`;

export const mutations = `
  createMessage(userId: String!,message: String!,groupId:String!): Message!
  deleteMessage(messageId: String): String
`;

export const subscriptions = `
  newMessageInGroup(groupId: String): Message!
  messageInGroupDeleted(groupId: String): MessageDeleted
`;
