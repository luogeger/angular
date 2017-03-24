(function (window) {
	'use strict';
	var app = angular.module('todoApp', ['todoApp.ser']);
	app.controller('todoCtrl', function ($scope, storageSer){
		//console.log(storageSer.test); //测试服务的引入是否成功
		$scope.Hlist = storageSer.get();

		//添加
		$scope.todo = '';
		$scope.addTodo = function (){
			storageSer.add($scope.todo);
			$scope.todo = '';
		};

	})

})(window);
