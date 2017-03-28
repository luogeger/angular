(function (angular){
    var app = angular.module('mainApp');
    app.config(function ($routeProvider){
        $routeProvider
            .otherwise({
                    redirectTo:'/theater'
                }
                //.when(
                //'/main',
                //{template: '<h2>主路由测试</h2>'}
            )
    })
})(angular);