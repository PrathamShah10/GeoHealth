import { ComponentType } from "react";
import SignIn from "./components/SignIn";
const PrivateRoute = ({
  element: Element,
  props,
}: PrivateRouteProps) => {
  const isAuthenticated = localStorage.getItem("token") !== null;
  return isAuthenticated ? <Element {...props} /> : <SignIn />;
};
type PrivateRouteProps = {
  element: ComponentType<any>;
  isBuisness?: boolean;
  props?: any;
};
export default PrivateRoute;
