import gql from 'graphql-tag';

const typeDefs = gql`
  type User {
    _id: ID
    username: String!
    email: String!
  }

  type Query {
    me: User
    users: [User]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
  }

  type Auth {
    token: ID!
    user: [User]
  }
`;

export { typeDefs };
