import gql from 'graphql-tag';

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    assets: [Asset]
    liabilities: [Liability]
  }

  type Asset {
    _id: ID 
    name: String
    value: Float
    userId: User
  }

  type Liability {
    _id: ID 
    name: String
    value: Float
    userId: User
  }

  type Query {
    users: [User]
    assets: [Asset]
    liabilities: [Liability]
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