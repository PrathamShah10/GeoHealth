import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  sender: {
    type: String,
    required: true,
  },
  senderName: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  community: {
    type: String,
    required: true,
  },
});
mongoose.model("Chat", chatSchema);
