const express=require('express');

const controller=require('../controllers/index_controller');
const router=express.Router();

router.get('/',(req,res)=>{
      controller.testVerisiOlustur(10,20);
      res.send('anasayfa');
})

router.get('/analiz', async(req,res)=>{
      controller.SehirBazliAnalizYap(res);
})




module.exports=router;