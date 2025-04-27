import { Router } from "express";
import { compare, genSalt, hash } from "bcrypt";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import config from "../../config.js";

const router = Router();

router.post("/register", async (req, res) => {
    try {
        const user = req.body;

        let userToVerify = await User.findOne({ email: user.email });
        if (userToVerify)
            return res.status(403).json(`This user already exists!`);

        const salt = await genSalt(10);
        const hashPassword = await hash(user.password, salt);

        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        const maxLength = 10;
        let idUser = "";
        for (let i = 0; i < maxLength; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            idUser += characters[randomIndex];
        }

        const newUser = await User.create({
            id: idUser,
            name: user.name,
            email: user.email,
            password: hashPassword,
        });

        /*  data: {
                name: user.name,
                email: user.email,
                password: hashPassword
        }) */

        return res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({ message: `Error when creating the customer` });
    }
});

router.post("/login", async (req, res) => {
    try {
        const userInfo = req.body;

        const user = await User.findOne({ email: userInfo.email });

        if (!user) return res.status(404).json({ message: `User not found` });

        const isMatch = await compare(userInfo.password, user.password);

        if (!isMatch)
            return res
                .status(400)
                .json({ message: "invalid email or password" });

        const token = jwt.sign({ id: user.id }, config.JWT_SECRET, {
            expiresIn: "3d",
        });

        return res.status(200).json(token);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: `Error when trying to login` });
    }
});

export default router;
