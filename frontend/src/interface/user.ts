interface IUser {
  name?: string;
  email?: string;
  username?: string;
  _id?: string;
}
interface IUserState {
    user?: IUser;
  }
export type { IUser, IUserState };
