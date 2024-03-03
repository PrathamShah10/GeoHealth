import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
  fileName: {
    type: String,
    required: true,
  },
  fileHash: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  }
});
mongoose.model("File", fileSchema);
