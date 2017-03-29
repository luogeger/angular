(function (angular){
    var app = angular.module('searchApp');
    app.config(function ($routeProvider){
        $routeProvider
            .when(
                '/coming/:page?',
                {
                    templateUrl: 'modules/coming/template.html',
                    controller: 'comingCtrl'
                }
            )
    })
})(angular);