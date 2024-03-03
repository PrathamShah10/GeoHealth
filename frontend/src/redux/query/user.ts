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

export const ADD_VOLUNTEER = gql`
  mutation volunteer($volunteerDetails: volunteerInput!) {
    addVolunteer(volunteerDetails: $volunteerDetails) {
      languages
      community
    }
  }
`;

export const GET_ALL_VOLUNTEERS = gql`
  query getVolunteers($community: String!) {
    getAllVolunteers(community: $community) {
      name
      languages
      contact
    }
  }
`;

export const GET_ALL_USERFILES = gql`
  query getUserFiles($id: String!) {
    getUserFiles(id: $id) {
      fileName
      fileHash
    }
  }
`;
export const ADD_FILE = gql`
  mutation addFile($fileDetails: fileInput!) {
    addFile(fileDetails: $fileDetails)
  }
`;

export const ADD_HOSPITAL = gql`
  mutation addHospital($hospitalDetails: hospitalInput!) {
    addHospital(hospitalDetails: $hospitalDetails)
  }
`;

export const GET_NEARBY_HOSPTIALS = gql`
  query getNearbyHospitals($locationDetails: locationInput!) {
    getNearbyHospitals(locationDetails: $locationDetails) {
      name
      speciality
      latitude
      longitude
    }
  }
`;
