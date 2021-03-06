;(function (angular){
    var app = angular.module('theaterApp', []);

    app.controller('theaterCtrl', function ($scope,$route,$routeParams,jsonSer){

        $scope.page = parseInt($routeParams.page || '1'); //页码数
        $scope.countPage = 4; // 页容量
        $scope.startPage = ($scope.page - 1)*$scope.countPage; // 每页显示的第一条
        $scope.total = 0;
        $scope.maxPage = 0;
        var url = 'https://api.douban.com/v2/movie/in_theaters';
        var pararms = {
            api: '00fa6c0654689a0202ef4412fd39ce06',
            start:$scope.startPage, //页码数
            count:$scope.countPage, //页容量
        };

        jsonSer.jsonp(url, pararms, function (data){
            $scope.total = data.total;
            $scope.maxPage = Math.ceil($scope.total/$scope.countPage);
            $scope.title = data.title;
            $scope.subjects = data.subjects;
            $scope.$apply();//更新$scope
        });

        //$scope.upPage = function (nowPage){
        //    if(nowPage > 0){
        //        $scope.page = nowPage;
        //        $route.updateParams({page: nowPage})
        //    }
        //
        //};
        //
        //$scope.downPage = function (nowPage){
        //    if(nowPage <= $scope.maxPage){
        //        $scope.page = nowPage;
        //        $route.updateParams({page: nowPage})
        //    }
        //
        //};

        $scope.updataPage = function (nowPage){
            if(nowPage > 0 && nowPage <= $scope.maxPage){
                $scope.page = nowPage;
                $route.updateParams({page: nowPage});
                console.log(nowPage);
            }
        };

    }); //controller - end
})(angular);