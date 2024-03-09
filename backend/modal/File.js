import mongoose from "mongoose";
const {ObjectId}=mongoose.Schema.Types;
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
  },
  sentTo: [{
    type:ObjectId,
    ref: 'Hospital'
  }]
});
mongoose.model("File", fileSchema);
