interface IUser {
  name: string;
  email: string;
  username: string;
  _id: string;
}
interface IUserState {
  user?: IUser;
  diseases?: Array<string>;
  isPending: boolean;
}
interface ISignInDetails {
  username?: string;
  password?: string;
}
interface IDiseaseDetails {
  _id: string;
  diseases: Array<string>;
}
interface ILocation {
  latitude: number;
  longitude: number;
}
interface IMessage {
    sender: string;
    message: string;
}
export type { IUser, IUserState, ISignInDetails, IDiseaseDetails, ILocation, IMessage };
