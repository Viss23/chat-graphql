export const types = `
  type Group {
    id: String!
    adminId: String!,
    name: String!,
    imageUrl: String!,
  }
`;

export const queries = `
  group(id: String!): Group
  allGroups: [Group!]!
`;

export const mutations = `
  createGroup(name: String!,imageUrl:String!,userId: String!): Group!
`;

/* export const subscriptions = `
    newMessageToGroup(groupId: String): Group!
` */
