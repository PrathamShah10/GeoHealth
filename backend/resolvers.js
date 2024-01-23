import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const User = mongoose.model("User");
const Chat = mongoose.model("Chat");
export const resolvers = {
  Query: {
    getUsers: async () => {
      return await User.find({});
    },
    getCommunityChats: async (_, { community }) => {
      return await Chat.find({ community });
    },
    getAllVolunteers: async (_, { community }) => {
      return await User.find({ community }) .select('name languages contact');
    },
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
    addVolunteer: async (_, { volunteerDetails }) => {
      const user = await User.findById(volunteerDetails._id);
      user.languages = volunteerDetails.languages;
      user.community = volunteerDetails.community;
      user.contact = volunteerDetails.contact;
      await user.save();
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
      return { token: token, userDetails: user };
    },
    updateDiseasesInfo: async (_, { diseaseDetails }) => {
      const user = await User.findOne({ _id: diseaseDetails._id });
      user.diseases = await diseaseDetails.diseases;
      await user.save();
      return user;
    },
    updateUserProfile: async (_, { userDetails }) => {
      const user = await User.findOne({ _id: userDetails._id });
      if (userDetails.name) {
        user.name = userDetails.name;
      }
      if (userDetails.email) {
        user.email = userDetails.email;
      }
      await user.save();
      return user;
    },
    addChats: async (_, { chatDetails }) => {
      const newChats = await new Chat({
        ...chatDetails,
      });
      await newChats.save();
      return "successful";
    },
  },
};
