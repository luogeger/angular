;(function (angular){
    var app = angular.module('mainApp', [
        'ngRoute',
        'mainAppSer',
        'mainApp',
        'theaterApp',
        'comingApp',
        'topApp',
        'subjectApp',
        'searchApp'
    ]);

    app.controller('mainSearchCtrl', function ($scope, $route,$location){
        $scope.searchResult = '';

        $scope.searchEnter = function (){
            //$location.path可以用来更新
            console.log($location.path());
            $location.path('/search/'+$scope.searchResult);
            //route.updateParams只能追加不能删除前面的参数
            //$route.updateParams({q:'张艺谋'});
        };
    });



})(angular);