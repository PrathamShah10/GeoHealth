import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const User = mongoose.model("User");
export const resolvers = {
  Query: {
    getUsers: async () => {
      return await User.find({});
    }
  },
  Mutation: {
    addUser: async (_, { newUserDetails }) => {
      const alreadyUser = await User.findOne({
        username: newUserDetails.username,
      });
      if (alreadyUser) {
        throw new Error("user already exsits");
      }
      const hashedPassword = await bcrypt.hash(newUserDetails.password, 12);
      const newUser = await new User({
        ...newUserDetails,
        password: hashedPassword,
      });
      await newUser.save();
    },
    signInUser: async (_, { signDetails }) => {
      const user = await User.findOne({ username: signDetails.username });
      if (!user) {
        throw new Error("crediantials invalid");
      }
      const equality = await bcrypt.compare(
        signDetails.password,
        user.password
      );
      if (!equality) {
        throw new Error("crediantials invalid");
      }
      const token = jwt.sign({ userId: user._id }, "Az!@#$%bd1_@]_b");
      return { token: token, userDetails: user, isCustomer: true };
    },
  },
};
