export const types = `
  type User {
    id: String!,
    username: String!,
    email: String!,
    password: String!,
    imageUrl: String
  }
`;

export const queries = `
  user(id: String!): User
  allUsers: [User!]!
`;

export const mutations = `
  createUser(username: String!,
      email: String!,
      password: String!,
      imageUrl: String): User!
  getUserMessages(userId:String!): [Message]!
`;
