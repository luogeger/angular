(function (window) {
	'use strict';
	var app = angular.module('todoApp', ['todoApp.ser', 'mainDirective']);
	app.controller('todoCtrl', function ($scope, $filter, $location, storageSer){
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

		$scope.AllStatus = false;//全选框的默认样式
		//统计
		$scope.item = 123;
		$scope.$watch('Hlist', function (newVal){
			$scope.item = $filter('filter')(newVal,  {completed: false}).length;
			//监视clearCompleted的显示隐藏
			$scope.clearShow = $filter('filter')($scope.Hlist,  {completed: true}).length > 0 ? true:false;
			storageSer.addSave();
			//监视全选框的样式
			$scope.AllStatus = !$filter('filter')($scope.Hlist,  {completed: false}).length;
			//console.log($scope.AllStatus);
		}, true);

		//删除已完成的
		$scope.clearCompleted = function (){
			storageSer.clearCompleted();
		};

		//全选
		$scope.changeAllStatus = function (){
			$scope.Hlist.forEach(function (i, v){
				i.completed = $scope.AllStatus;
			})
		};

		//状态切换
		$scope.changeContent = function(status){
			switch (status) {
				case 'all':
					$scope.todoContent = {};
					break;
				case 'active':
					$scope.todoContent = {completed:false};
					break;
				case 'completed':
					$scope.todoContent = {completed:true};
					break;
			}
		};

		//锚点值的切换
		$scope.location = $location;
		$scope.$watch('location.path()', function(newVal){
			//console.log(newVal.substring(1));
			var newVal = newVal.substring(1);
			console.log(newVal);
			switch(newVal){
				case 'active':
					$scope.todoContent = {completed:false};
					break;
				case 'completed':
					$scope.todoContent = {completed:true};
					break;
				default:
					$scope.todoContent = {};
					break;
			}
		})
	})

})(window);
