;(function (angular){
    var app = angular.module('subjectApp', []);
    app.controller('subjectCtrl', function ($scope, $routeParams){
        $scope.name = $routeParams;
    })
})(angular);