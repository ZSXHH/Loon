if($request.headers["user-agent"].includes('Mozilla')){
  console.log('safari');
$done({});
}
else{
var res = $response.body;
    console.log('原内容：\n'+res);
//去多余
if($persistentStore.read('AuthHP') == 1){
   res = res.replace(/\#\!(author|homepage|icon)\s?=.*/g,'#!$1 =');
}

if($persistentStore.read('Icon') == 1){
   res = res.replace(/\#\!icon\s?=.*/g,'#!$1 =');
}

if($persistentStore.read('Desc') == 1){
var res = res.replace(/(\#\!desc\s*=.{0,18}).*/g,'$1');
}

var jsna = $persistentStore.read('JSN').split('&');
  for(j=0;j<5;j++){
    
    var jsnp = jsna[j] + '.js,';
         res = res.replace(jsnp,jsnp+'enabled = false,');
      if(res.includes(janp + 'enabled = false,')){break;}
  }
$done({body:res})
}
