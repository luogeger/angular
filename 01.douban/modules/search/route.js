(function (angular){
    var app = angular.module('searchApp');
    app.config(function ($routeProvider){
        $routeProvider
            .when(
                '/search/:q/:page?',
                {
                    templateUrl: 'modules/search/template.html',
                    controller: 'searchCtrl'
                }
            )
    })
})(angular);