import pkg from 'apollo-server-koa';
const { gql } = pkg;

const typeDefs = gql`
  type Book {
    title: String
    author: Author
  }

  type Author {
    name: String
    books: [Book]
  }

  type Query {
    books: [Book]
    author: [Author]
  }

  type Mutation {
    addBook(title: String, author: String): Book
  }
`;

export default typeDefs;
