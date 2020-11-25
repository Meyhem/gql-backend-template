import { gql } from 'apollo-server'

export const typeDefs = gql`
  # Helpers
  enum OrderDirection {
    ASC
    DESC
  }

  input OrderEntry {
    name: String!
    dir: OrderDirection!
  }

  input ListFilter {
    skip: Int!
    take: Int!
    orderBy: [OrderEntry]
  }

  # Roots
  type Query {
    users(filter: ListFilter!): [User]
    posts: [Post]
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
    posts: [Post]
  }

  enum Role {
    Admin
    Editor
    Guest
  }

  type Post {
    id: ID
    title: String
    createdAt: String
    updatedAt: String
    deletedAt: String
    isPublished: Boolean
    lastPublished: String
    author: User
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
