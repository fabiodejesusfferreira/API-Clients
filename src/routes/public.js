import { Router } from "express";
import { genSalt, hash } from "bcrypt";
import User from "../models/User.js";

const router = Router();

router.post("/register", async (req, res) => {
    try {
        const user = req.body;

        let userToVerify = await User.findOne({ email: user.email })
        if(userToVerify) return res.status(403).json(`This user already exists!`)

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

router.get('/users', async (req, res) => {
    try {
        const users = await User.find()

        return res.status(200).json(users)
    } catch (error) {
        console.error(error)
    }
})

export default router;
