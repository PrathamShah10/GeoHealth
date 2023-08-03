export const typeDefs = `#graphql
type Query {
    getUsers: User
}
type Mutation {
    addUser(newUserDetails: UserInput!) : User
    signInUser(signDetails: signInput!): UserToken
}
type User {
    _id: ID!
    name: String
    email: String
    username: String
    password: String
}
type UserToken {
    token: String
    userDetails: User
    isCustomer: Boolean
}
input signInput {
    username: String!
    password: String!
}
input UserInput {
    name: String!
    email: String!
    username: String!
    password: String!
}
`;
