export const typeDefs = `#graphql
type Query {
    getUsers: User
}
type Mutation {
    addUser(newUserDetails: UserInput!) : User
    signInUser(signDetails: signInput!): UserToken
    updateDiseasesInfo(diseaseDetails: diseaseInput!): User
    updateUserProfile(userDetails: updatedUserInput): User
}
type User {
    _id: ID!
    name: String
    email: String
    username: String
    password: String
    diseases: [String]
}
type UserToken {
    token: String
    userDetails: User
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
input updatedUserInput {
    _id: String!
    name: String
    email: String
}
input diseaseInput {
    diseases: [String]!
    _id: String!
}
`;
