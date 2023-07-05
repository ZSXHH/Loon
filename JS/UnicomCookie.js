if($request.headers["content-length"]==149){var c=encodeURI($request.headers.cookie);$notification.post("联通App运行","点击写入Cookie","","shortcuts://run-shortcut?name=LTCX&input="+c);console.log("写入");}else{//$notification.post("小组件更新",'','');
console.log("小组件");}$done({});
