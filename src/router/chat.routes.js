import { Router } from "express";
const router = Router()

router.get("/", async (req, res) => {
    // const userName = req.session.userName
    res.render('chat')

})

export default router