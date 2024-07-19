import { gql } from '@apollo/client';

export const LOGIN_MUTATION = gql `
  mutation Login($email: String!, $password: String!) {
    login(email: $email,  password: $password) {
      token
      user {
        _id
        email
        username
      }
    }
  }
`;

export const ADD_USER_MUTATION = gql`
  mutation AddUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
     token
     user {
       _id
       email
      }
    }
  }`
;

export const USER_ASSETS_LIABILITIES_QUERY = gql`
  query UserAssetsLiabilities {
    listAssetsAndLiabilities {
      assets {
        _id
        name
        value
      }
      liabilities {
        _id
        name
        value
      }
    }
  }
`;
export const ADD_ASSET_MUTATION = gql`
  mutation AddAsset($name: String!, $value: Float!, $userId: ID!) {
    addAsset(name: $name, value: $value, userId: $userId) {
      _id
      name
      value
    }
  }
`;
export const DELETE_ASSET_MUTATION = gql`
  mutation DeleteAsset($assetId: ID!) {
    deleteAsset(assetId: $assetId) {
      _id
    }
  }
`;
export const ADD_LIABILITY_MUTATION = gql`
  mutation AddLiability($name: String!, $value: Float!, $userId: ID!) {
    addLiability(name: $name, value: $value, userId: $userId) {
      _id
      name
      value
    }
  }
`;
export const DELETE_LIABILITY_MUTATION = gql`
  mutation DeleteLiability($liabilityId: ID!) {
    deleteLiability(liabilityId: $liabilityId) {
      _id
    }
  }
`;
