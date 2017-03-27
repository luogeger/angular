(function (window) {
	'use strict';
	var app = angular.module('todoApp', ['todoApp.ser']);
	app.controller('todoCtrl', function ($scope, $filter, storageSer){
		//console.log(storageSer.test); //测试服务的引入是否成功
		$scope.Hlist = storageSer.get();

		//添加
		$scope.todo = '';
		$scope.addTodo = function (todo){
			storageSer.add(todo);
			$scope.todo = '';
		};

		//删除
		$scope.delTodo = function (todo){
			storageSer.del(todo);
		};

		//修改
		$scope.temp = {};
		$scope.ediTodo = function (todo){
			$scope.temp = todo;
		};

		//保存
		$scope.saveTodo = function (todo){
			storageSer.ediSave(todo);
			$scope.temp = {};
		};

		//统计
		$scope.item = 123;
		$scope.$watch('Hlist', function (newVal){
			$scope.item = $filter('filter')(newVal,  {completed: false}).length;
			//监视clearCompleted的显示隐藏
			$scope.clearShow = $filter('filter')($scope.Hlist,  {completed: true}).length > 0 ? true:false;
			storageSer.addSave();
		}, true);

		//删除已完成的
		$scope.clearCompleted = function (){
			storageSer.clearCompleted();
		};

		//全选
		$scope.changeAll = function (){
			storageSer.changeAll();
		};

		//状态切换

	})

})(window);
