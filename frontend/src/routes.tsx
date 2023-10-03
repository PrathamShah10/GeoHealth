import { RouteObject } from "react-router-dom";
import SignUp from "./components/SignUp";
import PersonalHealth from "./components/PersonalHealth";
import SignIn from "./components/SignIn";
import Home from "./components/Home";
import PrivateRoute from "./PrivateRoute";
import Profile from "./components/Profile";
import News from "./components/News";

export const routes: RouteObject[] = [
  {
    path: "/",
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
    path: "/news/:state",
    element: <PrivateRoute element={News} />,
  },
];
