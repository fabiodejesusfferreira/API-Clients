import { Router } from 'express'

const router = Router()

router.post('/register', (req, res) => {
    try {
        const user = req.body
        
        return res.status(201).json(user)
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: `Error when creating the customer`})
    }
})

export default router