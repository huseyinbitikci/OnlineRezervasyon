const express= require('express');
const controller=require('../controllers/rezervasyonController')

const router=express.Router();

router.post("/",(req,res)=>{
      req.body.Tren.Vagonlar= controller.dolulukhes(req.body.Tren.Vagonlar);
      var response= controller.TrenYerleşim(req.body);
      res.json(response);
})

module.exports=router;