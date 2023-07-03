if($request.headers["user-agent"].includes('Mozilla')){
  console.log('safari');
$done({});
}
else{
var res = $response.body;
    console.log('原内容：\n'+res);
//去多余
if($persistentStore.read(AuthorHomepage) == 1){
   res = res.replace(/\#\!(author|homepage|icon)\s?=.*/g,'#!$1 =');
}

if($persistentStore.read(Icon) == 1){
   res = res.replace(/\#\!icon\s?=.*/g,'#!$1 =');
}

if($persistentStore.read(Desc) == 1){
var res = res.replace(/(\#\!desc\s*=.{0,18}).*/g,'$1');
}

$done({body:res})
}
