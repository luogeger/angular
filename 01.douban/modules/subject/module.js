;(function (angular){
    var app = angular.module('subjectApp', []);
    app.controller('subjectCtrl', function ($scope, $routeParams, jsonSer){
        $scope.name = $routeParams.id;

        var url = 'https://api.douban.com/v2/movie/subject/' + $routeParams.id;
        var pararms = {
            api: '00fa6c0654689a0202ef4412fd39ce06'
        };

        jsonSer.jsonp(url, pararms, function (data){
            $scope.data = data;
            //$scope.img = data.images.large;
            $scope.$apply();//更新$scope
        });
    })
})(angular);