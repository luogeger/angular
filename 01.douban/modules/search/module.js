;(function (angular){
    var app = angular.module('searchApp', []);

    app.controller('searchCtrl', function ($scope,$route,$routeParams,jsonSer){

        $scope.page = parseInt($routeParams.page || '1'); //页码数
        $scope.countPage = 4; // 页容量
        $scope.startPage = ($scope.page - 1)*$scope.countPage; // 每页显示的第一条
        $scope.total = 0;
        $scope.maxPage = 0;
        var url = 'https://api.douban.com/v2/movie/search';
        var pararms = {
            api: '00fa6c0654689a0202ef4412fd39ce06',
            start:$scope.startPage, //页码数
            count:$scope.countPage, //页容量
            q:$routeParams.q,
        };

        jsonSer.jsonp(url, pararms, function (data){
            $scope.total = data.total;
            $scope.maxPage = Math.ceil($scope.total/$scope.countPage);
            $scope.title = data.title;
            $scope.subjects = data.subjects;
            $scope.$apply();//更新$scope
        });

        $scope.updataPage = function (nowPage){
            if(nowPage > 0 && nowPage <= $scope.maxPage){
                $scope.page = nowPage;
                $route.updateParams({page: nowPage});
                console.log(nowPage);
            }
        };

    }); //controller - end
})(angular);