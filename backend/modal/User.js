import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  diseases: {
    type: [String],
  },
  languages: {
    type: [String],
  },
  community: {
    type: String,
  },
  contact: {
    type: String,
  }
});
mongoose.model("User", userSchema);
