import { RouteObject } from "react-router-dom";
import SignUp from "./components/SignUp";
import PersonalHealth from "./components/PersonalHealth";
import SignIn from "./components/SignIn";
import Home from "./components/Home";
import PrivateRoute from "./PrivateRoute";
import Profile from "./components/Profile";
import Landing from "./components/Landing";
import News from "./components/News";
import Newspage from "./components/Newspage";
import StateSearch from "./components/StateSearch";
import CommunityChat from "./components/CommunityChat";
import VolunteerRegister from "./components/VolunteerRegister";
import SearchVolunteers from "./components/SearchVolunteers";
import FileUpload from "./components/FileUpload";
import HospitalFinder from "./components/HospitalFinder";
import UserDocumentsInput from "./components/UserDocumentsInput";
import MLmodel from "./components/MLmodel";
import StoreFile from "./components/StoreFile";
import GetFiles from "./components/GetFiles";
import HospitalRegistration from "./components/HospitalRegister";
import GetNearbyHospitals from "./components/GetNearbyHospitals";
import PostDisease from "./components/Diet_Rec";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/register",
    element: <SignUp />,
  },
  {
    path: "/user-home",
    element: <PrivateRoute element={Home} />,
  },
  {
    path: "/health-data",
    element: <PrivateRoute element={PersonalHealth} />,
  },
  {
    path: "/profile",
    element: <PrivateRoute element={Profile} />,
  },
  {
    path: "/newspage",
    element: <PrivateRoute element={Newspage} />,
  },
  {
    path: "/food",
    element: <PrivateRoute element={StateSearch} />,
  },
  {
    path: "/news/:state",
    element: <PrivateRoute element={News} />,
  },
  {
    path: "/community-chat",
    element: <PrivateRoute element={CommunityChat} />,
  },
  {
    path: "/register-volunteer",
    element: <PrivateRoute element={VolunteerRegister} />,
  },
  {
    path: "/search-volunteer",
    element: <PrivateRoute element={SearchVolunteers} />,
  },
  {
    path: "/upload-file",
    element: <PrivateRoute element={FileUpload} />,
  },
  {
    path: "/hospital",
    element: <PrivateRoute element={HospitalFinder} />,
  },
  {
    path: "/x",
    element: <PrivateRoute element={UserDocumentsInput} />,
  },
  {
    path: "/mlmodel",
    element: <PrivateRoute element={MLmodel} />,
  },
  {
    path: "/add- file",
    element: <PrivateRoute element={StoreFile} />,
  },
  {
    path: "/get-files",
    element: <PrivateRoute element={GetFiles} />,
  },
  {
    path: "/hospital-register",
    element: <HospitalRegistration />,
  },
  {
    path: "/nearby-hospitals",
    element: <PrivateRoute element={GetNearbyHospitals} />,
  },
  {
    path: "/diet-rec",
    element: <PrivateRoute element={PostDisease} />,
  },
  {
    path: "/send-file/:hospitalId",
    element: <PrivateRoute element={GetFiles} props={{ toSend: true }} />,
  },
];
