;(function (angular){
    var app = angular.module('theaterApp', []);

    app.controller('theaterCtrl', function ($scope, jsonSer){
        var url = 'https://api.douban.com/v2/book/1220562';
        var pararms = {api: '00fa6c0654689a0202ef4412fd39ce06'};
        jsonSer.jsonp(url, pararms, function (data){
            console.log(data);
        })


    }); //controller - end
})(angular);