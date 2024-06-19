import User from "../models/userModel.js";
import { generateToken } from '../utils/generateToken.js'


const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    const savedUserData = await User.findOne({ email });
    if (savedUserData) {
        res.status(403)
        throw new Error({ message: "email already exists, try to login or use different email to register" });
    } else {
        const data = await User.create({ email, name, password });
        if (data) {
            generateToken(res, data._id)

            res.status(201).json({
                _id: data._id,
                name: data.name,
                email: data.email
            })
        } else {
            res.status(401)
            throw new Error({ message: "invalid user data" });
        }
    }
}

const authenticateUser = async (req, res) => {
    const { email, password } = req.body;
    const data = await User.findOne({ email });

    if (data && (await data.verifyPassword(password))) {
        generateToken(res, data._id)
        res.status(200).json({
            _id: data._id,
            name: data.name,
            email: data.email
        })
    } else {
        res.status(400).json({ message: "invalid credentials" })
    }

}

const logoutUser = async (req, res) => {
    res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({ message: "logout successful" });
}

const updateUser = async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        const updatedUser = await user.save();

        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        });
    } else {
        res.status(404).son({ message: "unsuccesful" })
    }
}


export { registerUser, authenticateUser, logoutUser, updateUser };