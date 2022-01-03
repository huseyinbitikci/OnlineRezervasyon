function TrenYerleşim(tren) {
      var rezervasyonKisi=tren.RezervasyonYapilacakKisiSayisi;
      var yerAyrinti={"RezervasyonYapilabilir":true,"YerleşimAyrinti":[]}
      if (tren.Tren.Vagonlar.length>0 && rezervasyonKisi!=0) {
            if (tren.KisilerFarkliVagonlaraYerlestirilebilir) {
                  var vagonAyrinti=[]
                  for (let index = 0; index < rezervasyonKisi; index++) {
                        var result=index%tren.Tren.Vagonlar.length
                        tren.Tren.Vagonlar[result]= VagonYerleşim(tren.Tren.Vagonlar[result])
                        vagonAyrinti.push({"VagonAdi":tren.Tren.Vagonlar[result].Ad,"KisiSayisi":1})
                  }
                  
                  yerAyrinti.YerleşimAyrinti.push(response(vagonAyrinti));
            }else{
                  for (let index = 0; index <tren.RezervasyonYapilacakKisiSayisi ; index++) {
                        tren.Tren.Vagonlar[0]= VagonYerleşim(tren.Tren.Vagonlar[0])
                  }
                  var vagonAyrinti={"VagonAdi":tren.Tren.Vagonlar[0].Ad,"KisiSayisi":tren.RezervasyonYapilacakKisiSayisi}
                  yerAyrinti.YerleşimAyrinti.push(vagonAyrinti);
            }
            return yerAyrinti;
      }else{
            yerAyrinti.RezervasyonYapilabilir= false;
            return yerAyrinti
      }
      
}

function response(vagonAyrinti) {
      var result = [];
      vagonAyrinti.reduce(function(res, value) {
            if (!res[value.VagonAdi]) {
            res[value.VagonAdi] = {
                  VagonAdi: value.VagonAdi,
                  KisiSayisi: 0
            };
            result.push(res[value.VagonAdi])
            }
            res[value.VagonAdi].KisiSayisi += value.KisiSayisi;
            return res;
      }, {});
      return result;
}

function mapToProp(data, prop) {
      return data
        .reduce((res, item) => Object
          .assign(res, {
                
            [item[prop]]: 1 + (res[item[prop]] || 0)
          }), Object);
    }

function VagonYerleşim(vagon) {
      vagon.DoluKoltukAdet+=1;
      return VagonDolulukHes(vagon);
}

function VagonDolulukHes(vagon) {
      var result=vagon.DoluKoltukAdet/(vagon.Kapasite/100)
      vagon.dolulukOranı=result;
      return vagon;
}

function sortVagon(vagon) {
      var sorted = vagon.sort(function(a, b) {return a.dolulukOranı - b.dolulukOranı});
      return sorted;
}

function dolulukhes(vagon) {
      
      var hesVagon=[]
      for (let index = 0; index < vagon.length; index++) {
            var result=vagon[index].DoluKoltukAdet/(vagon[index].Kapasite/100);
            if (70 >result) {                     
                  vagon[index].dolulukOranı=result;
                  hesVagon.push(vagon[index])      
            }
      }
      if (hesVagon.length>1) {
            hesVagon= sortVagon(hesVagon);
      }
      return hesVagon;
}

module.exports={dolulukhes,TrenYerleşim}