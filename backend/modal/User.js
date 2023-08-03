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
    buisnessMan: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BusinessPerson',
    }
})
mongoose.model('User', userSchema);