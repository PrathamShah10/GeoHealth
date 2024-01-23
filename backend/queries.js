const User = mongoose.model("User");
const Chat = mongoose.model("Chat");
export const queries = {
  getUsers: async () => {
    return await User.find({});
  },
  getCommunityChats: async (_, { community }) => {
    return await Chat.find({ community });
  },
};
