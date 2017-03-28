;(function (angular){
    var app = angular.module('theaterApp');
    app.config(function ($routeProvider){
        $routeProvider.when(
            'theater',//路由的名字
            {
                templateUrl: 'modules/theater/template.html',
                controller: 'theaterCtrl'
            }
        )
    })
})(angular);