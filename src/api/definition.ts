import { gql } from 'apollo-server'

export const typeDefs = gql`
  # Roots
  type Query {
    users: [User]
  }

  type Mutation {
    createUser(input: CreateUserInput): User
  }

  # Entities
  type User {
    username: String!
  }

  enum Role {
    Admin
    Editor
    Guest
  }

  # Inputs
  input CreateUserInput {
    username: String!
    role: Role
  }
`
