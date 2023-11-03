import { gql } from "@apollo/client";

export const SIGNUP_USER = gql`
  mutation example($newUserDetails: UserInput!) {
    addUser(newUserDetails: $newUserDetails) {
      name
      email
      username
      password
    }
  }
`;

export const SIGNIN_USER = gql`
  mutation SignIn($signDetails: signInput!) {
    signInUser(signDetails: $signDetails) {
      token
      userDetails {
        name
        email
        username
        diseases
        _id
      }
    }
  }
`;

export const UPDATE_DISEASES = gql`
  mutation DiseaseUpdate($diseaseDetails: diseaseInput!) {
    updateDiseasesInfo(diseaseDetails: $diseaseDetails) {
      diseases
    }
  }
`;

export const UPDATE_USER_PROFILE = gql`
  mutation updateUserProfile($userDetails: updatedUserInput) {
    updateUserProfile(userDetails: $userDetails) {
      name
      email
      username
    }
  }
`;

export const GET_USER_CHATS = gql`
query getChats($community: String!) {
  getCommunityChats(community: $community) {
    sender
    senderName
    message
  }
}
`;