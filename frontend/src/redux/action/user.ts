import { SIGNIN_USER, UPDATE_DISEASES } from "../query/user";
import { AppDispatch } from "..";
import { client } from "../../index";
import {
  setUserData,
  setUserDiseases,
  setIsUserDataPending,
} from "../reducer/user";
import { ISignInDetails, IUser, IDiseaseDetails } from "../../interface/user";

export const getSignedUserDetailsAction = (signDetails: ISignInDetails) => {
  return (dispatch: AppDispatch) => {
    dispatch(setIsUserDataPending(true));
    client
      .mutate({
        mutation: SIGNIN_USER,
        variables: {
          signDetails: signDetails,
        },
        fetchPolicy: "network-only",
      })
      .then((response) => {
        const res = response.data.signInUser;
        localStorage.setItem("token", res.token);
        const { name, email, _id, username, diseases } = res.userDetails;
        localStorage.setItem("user", JSON.stringify({ _id }));
        const userData: IUser = {
          name,
          email,
          username,
          _id,
        };
        dispatch(setUserData(userData));
        dispatch(setUserDiseases(diseases));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        dispatch(setIsUserDataPending(false));
      });
  };
};

export const setUserDiseasesAction = (diseaseDetails: IDiseaseDetails) => {
  return (dispatch: AppDispatch) => {
    dispatch(setIsUserDataPending(true));
    client
      .mutate({
        mutation: UPDATE_DISEASES,
        variables: {
          diseaseDetails: diseaseDetails,
        },
        fetchPolicy: "network-only",
      })
      .then((response) => {
        const res = response.data.updateDiseasesInfo;
        dispatch(setUserDiseases(res));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        dispatch(setIsUserDataPending(false));
      });
  };
};
