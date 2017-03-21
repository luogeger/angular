(function (window) {
	'use strict';
	var app = angular.module('todoApp', []);
	app.controller('todoCtrl', function ($scope, $window){
		//$scope.list = [
		//	{text:'html', completed:true},
		//	{text:'css', completed:true},
		//	{text:'angular', completed:false},
		//	{text:'node.js', completed:false},
		//	{text:'jquery', completed:false}
		//];

		//开始使用localStorage代替数组
		//1.先获取storage存放在变量里

		var storage = $window.localStorage;

		$scope.list = JSON.parse(storage.getItem('todoList')||'[]');

	})

})(window);
