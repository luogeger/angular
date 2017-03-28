;(function (angular){
    //创建子模块
    var app = angular.module('theaterApp', []);
    app.controller('theaterCtrl', function ($scope){
        $scope.name = '子模块测试成功'
    });
})(angular);