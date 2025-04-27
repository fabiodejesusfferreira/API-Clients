import jwt from "jsonwebtoken";
import config from "../../config.js";

const auth = (req, res, next) => {
    const token = req.headers.authorization;
    console.log(token);

    if (!token) {
        return res.status(401).json({ message: "Access denied" });
    }

    try {
        const decoded = jwt.verify(token.replace('Bearer ', ''), config.JWT_SECRET)

        console.log(decoded);
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token'})
    }
    next();
};

export default auth;
