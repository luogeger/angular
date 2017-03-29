;(function (angular){
    var app = angular.module('subjectApp');
    app.config(function ($routeProvider){
        $routeProvider
            .when('/subject/:id', {
                templateUrl: 'modules/subject/template.html',
                controller: 'subjectCtrl'
            })
    })
})(angular);