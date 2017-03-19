(function (window) {
	//'use strict';
	// Your starting point. Enjoy the ride!

	//创建项目模块和控制器
	var app = angular.module('todoApp', [
		'todoApp.ser',
		'todoApp.dir'
	]);
	app.controller('todoCtrl', function($scope, $filter, $log, $location, storageSer){
		//console.log(storageSer.name); -- 检测服务是否引入成功
		//查看
		$scope.todoList = storageSer.get();

		//添加
		$scope.todo = '';
		$scope.addTodo = function(){
			storageSer.add($scope.todo);
			$scope.todo = '';
			//if($scope.todo.length > 0){
			//	$scope.todoList.push({text:$scope.todo, completed:false});
            //	$scope.todo = '';
			//	//console.log($scope.todoList);
			//}
		};

		//删除
		$scope.delTodo = function(todo){
			//var index = $scope.todoList.indexOf(todo);
			//$scope.todoList.splice(index, 1);
			storageSer.del(todo);
		};

		//修改
		$scope.tempTodo = {};
		$scope.ediTodo = function(todo){
			$scope.tempTodo = todo;
			//有个bug,双击只是加了个样式，并没有获取焦点
		};
		//失去焦点的时候保存todo
		$scope.saveTodo = function(){
			$scope.tempTodo = {};
			storageSer.save();
		};

		//统计的是 未完成，为false
		//监视动态的数据，$watch
		//引进过滤器
		$scope.falseCount = 7;
		$scope.isShowCount = false; //右下角显示隐藏
		$scope.toggleAll = false; // 全选框的样式状态
		$scope.$watch('todoList', function(newVal, oldVal){
			$scope.falseCount = $filter('filter')($scope.todoList, {completed:false}).length;
			$scope.toggleAll = !$scope.falseCount;
			//$log.info(oldVal);
			//console.log($filter('filter')($scope.todoList, {completed:false}));
			$scope.isShowCount = $filter('filter')($scope.todoList, {completed:true}).length > 0?true:false;
		},true);

		//删除： 已完成，为true
		//1.已完成数量大于0，就显示 ng-show = 'Boolean' _↑
		//2.点击清除：过滤器返回的是符合过滤条件的数据
		$scope.delComTodo = function(){
			//$scope.todoList = $filter('filter')($scope.todoList, {completed:false});
			storageSer.clearComStatus();
		};

		//全选：
		//1.全部完成，全选有样式。
		//2.点击全选框，也有样式
		$scope.changeOppo = function(){
			//$scope.todoList.forEach(function(item){
			//	item.completed = $scope.toggleAll;
			//})
			storageSer.changeAllStatus($scope.toggleAll);
		};

		//状态切换
		$scope.changeStatus = function(status){
			switch (status) {
				case 'all':
					$scope.todoComStatus = {};
					break;
				case 'active':
					$scope.todoComStatus = {completed:false};
					break;
				case 'completed':
					$scope.todoComStatus = {completed:true};
					break;
			}
		};

		//监视锚点值进行 状态切换
		$scope.maodian = $location;
		$scope.$watch('maodian.path()', function(newVal){
			//console.log(newVal.substring(1));
			var newVal = newVal.substring(1);
			switch(newVal){
				case 'active':
					$scope.todoComStatus = {completed:false};
					break;
				case 'completed':
					$scope.todoComStatus = {completed:true};
					break;
				default:
					$scope.todoComStatus = {};
					break;
			}
		})




	})//controller  end


})(window);

//查看： 准备一个数组，渲染界面
//1.把数组内容遍历上去
//2.找到text对应的位置, 查看能不能把数据渲染成功
//3.勾选状态：true和false
//4.勾选之后的文字状态：启用angular 样式, 采用对象的形式，值也是true和false
//5.input编辑状态，绑定 **

//添加：回车之后界面显示数据
//1.form表单绑定事件，
//2.数据绑定，初始化的时候是空字符串
//3.事件函数：追加到新数组， 5.输入框的字符为空，才能追加上，用length判断
//4.清除输入框的文字

//删除：
//1.要拿到才能删除，每一个li标签都是repeat的todo,所以传入这个todo就可以了

//修改：
//1.修改状态就是 editing:true
//2.要准备一个临时对象，
//3.双击的todo赋值给这个临时对象的话，就为true，这样就可以为编辑状态了
//4.失去焦点的时候，让临时对象为空，就处于false，就是编辑完成状态

//状态切换：
//1.切换的是过滤之后的数据，所以ng-repeat 后面要加过滤器
//2.过滤器的状态值会跟随切换键变化，所以用变量名代替
//3.根据传入的参数选择对应的状态，{completed:false/true} 或者 {}
//4.样式的状态也是Boolean , -->比较之后的Boolean值

//勾选框也保存到localStorage
//1.添加savetodo放方法就可以了

//全选状态 -- 状态修改
//1.用同一个方法saveTodo 有个小问题
//2. ？ ng-model= "toggleAll"

//清除数据 -- 删除数据
//1.引用赋值会修改地址，
//2.清空合并，angular.merge()

//全选样式 和 底部 的 显示/隐藏
//1. ng-hide="!todoList.length"


//获取焦点 -- 自定义指令directive
//通过点击其他 --> 让它获得焦点
//1.自定义指令操作dom
//2.监视锚点值的不同来切换数据
