import { Router } from "express";

const router = Router();
router.get('/profile', async (req, res) => {
    const userName = req.session.user ? req.session.user.name : null;

    if (!userName) {
        return res.status(401).send({ status: 'error', error: 'Usuario no autenticado' });
    }

    res.render('profile', { userName });
});


export default router;