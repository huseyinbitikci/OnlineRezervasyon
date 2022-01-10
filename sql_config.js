var mysql=require('mysql')
const config={
      host: "localhost",
      user: "root",
      password: "Parola12",
      database:"test"
};
var con=mysql.createConnection(config);

module.exports=con;
