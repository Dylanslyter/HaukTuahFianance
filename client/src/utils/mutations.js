import { gql } from '@apollo/client';

export const LOGIN_MUTATION = gql `
  mutation Login($email: String!, $password: String!) {
    login(email: $email,  password: $password) {
      email
      password
    }
  }`
;

export const ADD_USER_MUTATION = gql`
  mutation AddUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      username
      email
      password
    }
  }`
;