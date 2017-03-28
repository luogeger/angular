;(function (angular){
    //主模块的route只去找主模块
    var app = angular.module('mainApp');

    //配置路由表
    app.config(function ($routeProvider){
        //主模块路由一般不配置其他路由，跳转到其他路由
        //$routeProvider
        //    .when(
        //        '/main',
        //        {template: '<h1>主模块测试成功</h1>'})
        $routeProvider
            .otherwise({
                redirectTo:'/theaters'
            });
    });
})(angular);
