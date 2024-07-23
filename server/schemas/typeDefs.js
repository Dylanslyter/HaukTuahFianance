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
  type AssetsAndLiabilities {
    assets: [Asset]
    liabilities: [Liability]
  }
  type Query {
    me: User
    users: [User]
    assets: [Asset]
    liabilities: [Liability]
    listAssetsAndLiabilities: AssetsAndLiabilities
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addAsset(name: String!, value: Float!): Asset
    deleteAsset(assetId: ID!): Asset
    addLiability(name: String!, value: Float!, userId: ID!): Liability
    deleteLiability(liabilityId: ID!): Liability!
  }
  type Auth {
    token: ID!
    user: User
  }
`;

export { typeDefs };