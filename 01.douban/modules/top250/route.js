(function (angular){
    var app = angular.module('topApp');
    app.config(function ($routeProvider){
        $routeProvider
            .when(
                '/top250/:page?',
                {
                    templateUrl: 'modules/top250/template.html',
                    controller: 'topCtrl'
                }
            )
    })
})(angular);