var conMysql=require('../sql_config');

var sehir=["Ankara", "İstanbul", "İzmir", "Bursa", "Edirne", "Konya", "Antalya", "Diyarbakır", "Van", "Rize"]

async function testVerisiOlustur(musteriAdet, sepetAdet) {
      musOlustur(musteriAdet);
      var sql ="SELECT * FROM musteri ORDER BY id DESC LIMIT "+musteriAdet
      await conMysql.query(sql,function (err,result) {
            if(err) throw err;
            sepetOlustur(result,sepetAdet,musteriAdet);
      sql ="SELECT * FROM sepet ORDER BY id DESC LIMIT "+sepetAdet
      conMysql.query(sql,function (err,result) {
            if(err) throw err;
            for (let index = 0; index < sepetAdet; index++) {
                  var result1= randomIntFromInterval(1,5);
                  var sepetİd=result[sepetAdet-index-1].id;
                  for (let index = 0; index < result1; index++) {
                        var tutar=randomIntFromInterval(100,1000);
                        sql="INSERT INTO sepeturun (sepetid, tutar,aciklama) VALUES ("+sepetİd+", "+tutar+",'asd')"
                        conMysql.query(sql,function (err) {
                              if(err) throw err;
                        })
                  }
            }
      })
})
}

function sepetOlustur(result,sepetAdet,musteriAdet) {
      for (let index = 0; index < sepetAdet; index++) {
            var musİd=randomIntFromInterval(result[musteriAdet-1].id,result[0].id)

            sql="INSERT INTO sepet (musteriid) VALUES ("+musİd+")"
            console.log(sql);
            conMysql.query(sql,function (err,result) {
                  if(err)throw err;
            })
      }
}


function musOlustur(musteriAdet) {
      for (let index = 0; index <musteriAdet; index++) {
            const rndInt = randomIntFromInterval(0, 9)
            var ad=adOlustur(5);
            var soyad=adOlustur(5);
            var sql="INSERT INTO musteri (ad, soyad,sehir) VALUES ('"+ad+"', '"+soyad+"','"+sehir[rndInt]+"')"
            console.log(sql);
            conMysql.query(sql,function (err,result) {
                  if(err) throw err;
                  
            })
      }
}




function adOlustur(length) {
      var result           = '';
      var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var charactersLength = characters.length;
      for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() *
   charactersLength));
     }
     return result;
  }

  function randomIntFromInterval(min, max) { 
      return Math.floor(Math.random() * (max - min + 1) + min)
    }
    
    
function SehirBazliAnalizYap(res) {
      var sql="SELECT sehir ,sum(tutar) as tutar,count(tutar) as adet  FROM test.sepeturun,test.sepet,test.musteri where test.sepeturun.sepetid=test.sepet.id and test.sepet.musteriid=test.musteri.id  group by test.sepeturun.sepetid , test.sepet.musteriid"
      var data=[]
      conMysql.query(sql,function (err,result) {
            if(err) throw err;
            
            result1 = result.reduce((r, { sehir: name, ...object }) => {
                  var temp = r.find(o => o.name === name);
                  if (!temp) r.push(temp = { name, children: [] });
                  temp.children.push(object);
                  return r;
              }, []);

            for (let index = 0; index < result1.length; index++) {
                  var sumData={};
                  var sumTutar=0;
                  var sumCount=0;
                  sumData.SehirAdi=result1[index].name
                  for (let indexy = 0; indexy < result1[index].children.length; indexy++) {
                        sumCount+=result1[index].children[indexy].adet;
                        sumTutar+=result1[index].children[indexy].tutar;
                  }
                  sumData.SepetAdet=sumCount;
                  sumData.ToplamTutar=sumTutar;
                  data.push(sumData)
                  
            }
            res.json(data)
      })
}



module.exports={testVerisiOlustur,SehirBazliAnalizYap}