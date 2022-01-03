const express =require("express");
const bodyParser=require("body-parser");
const { json } = require("body-parser");
const rezervasyonRoutes=require('./routers/rezervasyonRoutes');


const app =express();
const PORT=process.env.PORT||4111;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use("/rezervasyon",rezervasyonRoutes);



app.listen(PORT,console.log("Server don start for port:"+PORT));
