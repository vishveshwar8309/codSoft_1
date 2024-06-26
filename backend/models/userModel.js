import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
})

userSchema.methods.verifyPassword = async function (enteredPasssword) {
    return await bcrypt.compare(enteredPasssword, this.password)
}

userSchema.pre("save", async function (next) {
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt)
})

const User = new mongoose.model("User", userSchema);

export default User;