;(function (angular){
    var app = angular.module('mainApp', [
        'ngRoute',
        'mainAppSer',
        'mainApp',
        'theaterApp',
        'comingApp',
        'topApp',
        'subjectApp',
        //'searchApp'
    ]);

    app.controller('searchCtrl', function ($scope){
        $scope.searchResult = 'luogeger';
        $scope.searchEnter = function ($scope, $routeParams){
            console.log($routeParams);
        };
    });



})(angular);