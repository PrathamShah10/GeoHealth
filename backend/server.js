import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

mongoose.connect("mongodb://0.0.0.0:27017/geoHealthDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => {
  console.log("connected to mongoDB");
});

import "./modal/User.js";
import { typeDefs } from "./schema.js";
import { resolvers } from "./resolvers.js";

const server = new ApolloServer({
  typeDefs,
  resolvers,
});
const { url } = await startStandaloneServer(server, {
  context: async ({ req }) => {
    const { authorization } = req.headers;
    if (authorization) {
      const { userId } = jwt.verify(authorization, "Az!@#$%bd1_@]_b");
      return { userId: userId };
    }
  },
});
console.log(`🚀 Server ready at ${url}`);
