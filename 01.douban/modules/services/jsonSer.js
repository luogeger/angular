;(function (angular){
    var app = angular.module('mainAppSer', []); // 引用的是这个服务名
    app.service('jsonSer',function () {         // 引用到theaterCtrl - controller函数里面的名字
        //这是封装好了一个jsonp的服务
        this.jsonp=function (url,params,callback) {
            //随机的名称
            var name='JSONP'+Math.random().toString().substring(2);
            var strUrl=url+'?callback='+name;
            for(var key in params){
                strUrl+='&'+key+'='+params[key];
            }
            window[name]=function (data) {
                //调用回调函数 将返回的数据传递给回调函数
                callback(data);

            };
            //创建一个script标签,通过script标签获取数据
            var script=document.createElement('script');
            script.src=strUrl;
            //将标签插入到body中
            document.body.appendChild(script);
            document.body.removeChild(script);
        }
    });
})(angular);