import { RouteObject } from "react-router-dom";
import SignIn from "./components/SignUp";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <SignIn />,
  },
];
