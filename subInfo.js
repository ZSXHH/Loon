var bbody = $response.body;
var uurl = $request.url;
var GetExampleParams = {
       url:uurl,
   headers:{
        "User-Agent":"Quantumult%20X/1.0.30 (iPhone14,2; iOS 15.6)"
           }
}
    $httpClient.get(GetExampleParams,function(error,response,data)
    {
var siheader = response.headers;
$done({headers: siheader,body:bbody})
})
