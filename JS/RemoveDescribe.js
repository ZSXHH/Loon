//1、0决定对应项是否删除
//Name-数字 填写格式：插件名&脚本名&脚本名&r
//r：删除插件自带规则。不删则去除&r

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

//新增去除插件内规则、关闭指定脚本
var Rname = $request.url.match(/[^\/]+(?=\.plugin)/)[0];
     console.log('请求插件名：'+Rname);
for(m=1;m<4;m++){
   var RNamm = $persistentStore.read('Name-'+m);
       if(typeof RNamm  === 'undefined'){console.log('预设项为空');continue;}
   var RName = RNamm.match(/^[^\&]+/)[0];
console.log('预设插件名：'+RName);
    if(RName==Rname){
      var Rarr = $persistentStore.read('Name-'+m).split('&'); 
     console.log('项目数组：'+Rarr);
           break;}
                }
if(typeof Rarr  === 'undefined'){
   console.log('该插件无需去除脚本、规则');
$done({body:res});
}
else{
 for(k=1;k<Rarr.length;k++){
  if(Rarr[k]=='r'){
    var res = res.replace(/\[Rule\]\s*?\n[^\[]+/g,'');
console.log('去规则：'+res);continue;
                  }
    var Rarrjs = Rarr[k] + '.js,';
    var res = res.replace(Rarrjs,Rarrjs+'enabled = false,');
//console.log('去脚本：'+res);
                           }
$done({body:res})
    }
}
