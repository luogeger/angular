;(function (angular){
    var app = angular.module('theaterApp', []);

    app.controller('theaterCtrl', function ($scope, jsonSer){
        var url = 'https://api.douban.com/v2/movie/in_theaters';
        var pararms = {api: '00fa6c0654689a0202ef4412fd39ce06'};
        jsonSer.jsonp(url, pararms, function (data){
            $scope.title = data.title;
            $scope.subjects = data.subjects;



            $scope.$apply();//更新$scope
        })
    }); //controller - end
})(angular);