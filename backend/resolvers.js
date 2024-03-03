import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./keys.js";
const User = mongoose.model("User");
const Chat = mongoose.model("Chat");
const File = mongoose.model("File");
const Hospital = mongoose.model("Hospital");

const { PI, cos, sin, sqrt, atan2 } = Math;
const deg2rad = (degrees) => degrees * (PI / 180);
const earthRadiusKm = 6371;

// Function to calculate distance between two points in kilometers
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);

  const a =
    sin(dLat / 2) * sin(dLat / 2) +
    cos(deg2rad(lat1)) * cos(deg2rad(lat2)) * sin(dLon / 2) * sin(dLon / 2);

  const c = 2 * atan2(sqrt(a), sqrt(1 - a));

  return earthRadiusKm * c * 1000; // Distance in meters
};

export const resolvers = {
  Query: {
    getUsers: async () => {
      return await User.find({});
    },
    getCommunityChats: async (_, { community }) => {
      return await Chat.find({ community });
    },
    getAllVolunteers: async (_, { community }) => {
      return await User.find({ community }).select("name languages contact");
    },
    getUserFiles: async (_, { id }) => {
      return await File.find({ userId: id }).select("-userId");
    },
    getNearbyHospitals: async (_, { locationDetails }) => {
      const hospitals = await Hospital.find();
      const hospitalsWithin3km = hospitals.filter((hospital) => {
        const distance = calculateDistance(
          locationDetails.latitude,
          locationDetails.longitude,
          hospital.latitude,
          hospital.longitude
        );
        return distance <= 3000;
      });
      console.log("Hospitals within 3km:", hospitalsWithin3km);
      return hospitalsWithin3km;
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
    addHospital: async (_, { hospitalDetails }) => {
      const newHospital = await new Hospital({
        ...hospitalDetails,
      });
      await newHospital.save();
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
      const token = jwt.sign({ userId: user._id }, JWT_SECRET);
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
    addFile: async (_, { fileDetails }) => {
      const newFile = await new File({
        ...fileDetails,
      });
      await newFile.save();
      return "successful";
    },
  },
};
