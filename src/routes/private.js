import express from 'express'
import User from '../models/User.js'

const router = express.Router()

router.get('/list', async (req, res) => {
    try {
        const users = await User.find()

        res.status(200).json({ message: 'Successfully listed users', users})
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: `Server error` });
    }
})

export default router