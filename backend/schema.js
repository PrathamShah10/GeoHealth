// import { GraphQLUpload } from 'graphql-upload';
import { ApolloServer } from "@apollo/server";
export const typeDefs = `#graphql

type Query {
    getUsers: User
    getCommunityChats(community: String!): [chats]
    getAllVolunteers(community: String!): [Volunteer]
}
type Mutation {
    addUser(newUserDetails: UserInput!) : User
    addVolunteer(volunteerDetails: volunteerInput!): Volunteer
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
type Volunteer {
    name: String
    languages: [String]
    community: String
    contact: String
}
type UserToken {
    token: String
    userDetails: User
}
type chats {
    sender: String
    senderName: String
    message: String
}
input signInput {
    username: String!
    password: String!
}
input volunteerInput {
    _id: ID!
    languages: [String]!
    community: String!
    contact: String!
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
    senderName: String
    message: String
    community: String
}
`;
