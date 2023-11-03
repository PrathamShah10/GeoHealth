export const typeDefs = `#graphql
type Query {
    getUsers: User
    getCommunityChats(community: String!): [chats]
}
type Mutation {
    addUser(newUserDetails: UserInput!) : User
    signInUser(signDetails: signInput!): UserToken
    updateDiseasesInfo(diseaseDetails: diseaseInput!): User
    updateUserProfile(userDetails: updatedUserInput): User
    addChats(chatDetails: chatInput!): String
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
type chats {
    sender: String
    message: String
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
input chatInput {
    sender: String
    message: String
    community: String
}
`;
