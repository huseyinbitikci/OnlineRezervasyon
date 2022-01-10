const express= require('express');
const bodyParser=require('body-parser');
const router=require('./router/index_router');

const app=express();
const PORT=process.env.PORT||4422;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use('/',router);




app.listen(PORT,console.log("Server start for port: "+PORT));