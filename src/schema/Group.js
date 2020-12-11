export const types = `
  type Group {
    id: String!
    adminId: String!,
    name: String!,
    imageUrl: String!,
    messages: [Message]
  }
`;

export const queries = `
  group(id: String!): Group
  allGroups: [Group!]!
  allMessagesInGroup(groupId: String!): [Message]
`;

export const mutations = `
  createGroup(name: String!,imageUrl:String!,userId: String!): Group!
`;

/* export const subscriptions = `
    newMessageToGroup(groupId: String): Group!
` */
