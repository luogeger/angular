(function (angular){
    var app = angular.module('theaterApp');
    app.config(function ($routeProvider){
        $routeProvider
            .when(
                '/theater',
                {
                    templateUrl: 'modules/theater/template.html',
                    controller: 'theaterCtrl'
                }
            )
    })
})(angular);