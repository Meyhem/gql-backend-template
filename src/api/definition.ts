import { gql } from 'apollo-server'

export const typeDefs = gql`
  # Roots
  type Query {
    users: [User]
  }

  type Mutation {
    createUser(input: CreateUserInput): User
    issueToken(username: String!, password: String!): String
  }

  # Entities
  type User {
    id: Int!
    username: String!
    firstname: String!
    lastname: String!
    role: Role!
  }

  enum Role {
    Admin
    Editor
    Guest
  }

  # Inputs
  input CreateUserInput {
    username: String!
    firstname: String!
    lastname: String!
    password: String!
    role: Role!
  }
`
