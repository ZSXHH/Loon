main();
async function main() {
  var loonParams = $environment.params;
  var nodeName = loonParams.node;
  var nodeAdd = loonParams.nodeInfo.address;
  var aurl = `http://223.5.5.5/resolve?name=${nodeAdd}&type=A&short=1`;
  var ourl = "http://ip-api.com/json/?fields=28187&lang=zh-CN";
  var inParams = 'http://ip-api.com/json/119.29.29.29?fields=28187&lang=zh-CN';
  var outParams = {url:ourl,node:nodeName}
  var omsg = "",imsg ="";
  try {//落地信息
    var out = await getJSON(outParams);
    var out = JSON.parse(out);
    omsg = out ? json2info(out) : "";
    var lquery = out['query'];         
 }catch(error){
    omsg = `<p style="text-align: center; font-family: -apple-system; font-size: 15px;color:#ff0000;font-weight: bold;"></br>** 出口查询超时 **</p>`;}

  try{//入口信息
    var servertyped = serverType(nodeAdd);
    console.log('原始地址：'+nodeAdd);
    if(servertyped === 'domain'){
      console.log('是域名');
      var insIP = await getJSON(aurl);
      console.log('域名对应ip数组：'+insIP);
      var nodeAdd = JSON.parse(insIP)[0];
   }//else{console.log('不是域名');}
    console.log('入口ip（nodeAdd）：'+nodeAdd);
    console.log('落地ip（query）  ：'+lquery+'\n');
    if(nodeAdd == lquery){
      servertyped = 'v2';
      console.log('入口落地ip相同');
   }else{
      servertyped = serverType(nodeAdd);
      console.log('入口落地ip不相同');}

    switch(servertyped){ //选择入口查询url
      case 'v2':
       var inParams = {url:"https://api.live.bilibili.com/ip_service/v1/ip_service/get_ip_addr",node:nodeName};
        break;
      case 'v4':
       var inParams =`https://api-v3.speedtest.cn/ip?ip=${nodeAdd}`;
        break;
      case 'v6':
       var inParams = `http://ip-api.com/json/${nodeAdd}?fields=28187&lang=zh-CN`;
        break;
}

    console.log('入口url参数：'+inParams);
    var ins = await getJSON(inParams);
    imsg = ins ? ijson2info(ins) : "";

}catch(error){
    imsg = `<p style="text-align: center; font-family: -apple-system; font-size: 15px;color:#ff0000;font-weight: bold;"></br>** 入口查询超时 **</p>`;}
    
 var allmsg = imsg+omsg;
 $done({"title": "入口落地检测", "htmlMessage": allmsg});
}

//节点地址类型
function serverType(t){
  if(/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(t)){return"v4"}
  else if(/^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/.test(t)){return"v6"}
  else{return"domain"}
}

//入口内容生成
function ijson2info(ins) {
  ins = JSON.parse(ins);
  console.log(ins);
  var ires = `<p style="text-align: left; font-family: -apple-system; font-size: large; font-weight: thin">------------------------------------
<br><b>入 口 I P : </b>${ins.data['ip'] ? ins.data['ip'] : ins['query'] ? ins['query'] : ins.data['addr']}<br>
<br><b>入口国家 : </b>${ins.data['country'] ? ins.data['country'] : ins['country']} ${ins.data['countryCode'] ? ins.data['countryCode'] : ins['countryCode'] ? ins['countryCode'] : ""}<br>
<br><b>入口地区 : </b>${ins.data['province'] ? ins.data['province'] : ins['regionName']} ${ins.data['city'] ? ins.data['city'] : ins['city']} ${ins.data['district'] ? ins.data['district'] : ""}<br>
<br><b>入口机构 : </b>${ins.data['operator'] ? ins.data['operator'] : ins['org'] ? ins['org'] : ""}<br>
<br><b>入口 ISP : </b>${ins.data['isp'] ? ins.data['isp'] : ins['isp']}<br>
<br><b>入口ASN : </b>${ins.data['as'] ? ins.data['as'] : ins['as'] ? ins['as'] : ""}<br>`;
   return ires;
}

//落地内容生成
function json2info(out) {
  //out = JSON.parse(out);//因为提前要用到out['query']，故上面已读取，此处无需重复操作。
  console.log('检测节点：'+ $environment.params.node+'\n');
  console.log(out);
  var ores = `------------------------------------
<br><b>落 地 I P : </b>${out['query']}<br>
<br><b>落地国家 : </b>${out['country']} ${out['countryCode']}<br>
<br><b>落地地区 : </b>${out['regionName']} ${out['city']}<br>
<br><b>落地机构 : </b>${out['org']}<br>
<br><b>落地 ISP : </b>${out['isp']}<br>
<br><b>落地ASN : </b>${out['as']}<br>
------------------------------------
<br><font color='#ff0000'><b>检测节点</b> ➟ `+ $environment.params.node+`</font></p>`;
   return ores;
}

//封装请求
async function getJSON(url) {
    return new Promise((resolve, reject) => {
        $httpClient.get(url, (error, response, data) => {
            if (error) {
                reject(error);
            } else {
                //resolve(JSON.parse(data));
                resolve(data);
            }});});}
