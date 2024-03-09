// import { GraphQLUpload } from 'graphql-upload';
import { ApolloServer } from "@apollo/server";
export const typeDefs = `#graphql

type Query {
    getUsers: User
    getCommunityChats(community: String!): [chats]
    getAllVolunteers(community: String!): [Volunteer]
    getUserFiles(id:String!): [files]
    getNearbyHospitals(locationDetails: locationInput!): [Hospital]
}
type Mutation {
    addUser(newUserDetails: UserInput!) : User
    addVolunteer(volunteerDetails: volunteerInput!): Volunteer
    addHospital(hospitalDetails: hospitalInput!): String
    signInUser(signDetails: signInput!): UserToken
    updateDiseasesInfo(diseaseDetails: diseaseInput!): User
    updateUserProfile(userDetails: updatedUserInput): User
    addChats(chatDetails: chatInput!): String
    addFile(fileDetails: fileInput!): String
    addFileToHospital(fileData: fileDataInput!): String
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
type files {
    fileName: String
    fileHash: String
}
type Hospital {
    name: String
    speciality:  String
    latitude: Float
    longitude: Float
    _id: String
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
input fileInput {
    fileName: String!
    fileHash: String!
    userId: String!
}
input fileDataInput {
    fileHashes: [String]!
    hospitalId: String!
}
input hospitalInput {
    name: String!
    speciality:  String!
    latitude: Float!
    longitude: Float!
}
input locationInput {
    latitude: Float!
    longitude: Float!
}
`;
