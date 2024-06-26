import User from "../models/userModel.js";
import jwt from 'jsonwebtoken';

const protect = async (req, res, next) => {
    let token = req.cookies.jwt;
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.userId).select('-password');

            if (!req.user) {
                res.status(401);
                return next(new Error("Unauthorized! User not found"));
            }
            next();
        } catch (error) {
            res.status(401);
            throw new Error("unauthorised! invalid token");
        }
    } else {
        res.status(401);
        throw new Error("unauthorised! no token found");
    }
};

export { protect };