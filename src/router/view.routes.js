import { Router } from "express";
import { uploader } from "../utils/multer.js";

const router = Router();

router.get('/subirArch', (req,res)=>{
    res.render('subirArch')
});

router.get('/register',(req, res)=>{
    res.render('register')
});

router.post('/subirArch', uploader.single('file') ,(req, res) =>{
    if(!req.file){
        return res.status(400).send({status:'error', error:'No se pudo guardar imagen'})
    }    

    res.send({status:'success', payload: 'archivo subido con exito.'})
});


export default router;
